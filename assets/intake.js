/* Shared engine for every prospect questions page.
   Each page sets window.INTAKE = { slug, name, business, headline, questions }
   before loading this file. Nothing in here is prospect-specific.

   The publishable key below can add a row to intake_responses and cannot
   read any back (row level security, insert-only). Never put a service role
   or sb_secret_ key in this folder. */
(function () {
  "use strict";

  var SUPABASE_URL = "https://mfyykvrwukchowlxywnz.supabase.co";
  var SUPABASE_KEY = "sb_publishable_kT-2p3JgFG22wh4cff5jwg_5Zrnd_Ti";
  var WHATSAPP = "351922102740";

  var C = window.INTAKE || {};
  var PROSPECT = String(C.slug || 'unknown').slice(0, 60);
  var NAME = String(C.name || 'there').slice(0, 60);
  var BUSINESS = String(C.business || '').slice(0, 200);
  var Q = C.questions || [];
  /* Optional per-page wording, so a page can run in another language.
     Any key left out falls back to the English below. */
  var UI = C.ui || {};
  function t(key, fallback) { return typeof UI[key] === 'string' ? UI[key] : fallback; }
  // Public pages (no known prospect) set nameFrom to the typed question that asks for a name.
  function who() {
    var typed = C.nameFrom ? ((state.text[C.nameFrom] || '').trim().split(/[,\n]/)[0].trim()) : '';
    return (typed || NAME).slice(0, 60);
  }

  var TEXT_IDS = Q.filter(function (q) { return q.type === 'text'; }).map(function (q) { return q.id; });
  // The typed answer that goes into the worst_hour column and the thank-you quote.
  var HEADLINE = C.headline || TEXT_IDS[TEXT_IDS.length - 1] || null;

  var TOTAL = Q.length;
  var REVIEW = TOTAL + 1;
  var DONE = TOTAL + 2;

  var WORDS = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
    'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'];
  function word(n) { return WORDS[n] || String(n); }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  /* ---------------- Page shell ---------------- */
  document.body.insertAdjacentHTML('afterbegin',
    '<div class="shell">' +
      '<div class="top"><span class="brand" id="brand"></span><span class="count" id="count"></span></div>' +
      '<div class="track" id="track" hidden><span id="trackfill"></span></div>' +
      '<div class="calcada" id="calcada"></div>' +
      '<main class="stage" id="stage" aria-live="polite"></main>' +
    '</div>');

  var stage = document.getElementById('stage');
  var countEl = document.getElementById('count');
  var track = document.getElementById('track');
  var trackfill = document.getElementById('trackfill');
  var calcada = document.getElementById('calcada');
  document.getElementById('brand').textContent = C.brand || ('Before we meet · ' + NAME);

  /* ---------------- State ---------------- */
  var STORAGE = 'questions-' + PROSPECT + '-v2';
  var state = { step: 0, answers: {}, text: {} };
  var hadSaved = false;
  var savedStep = 0;
  var returnToReview = false;

  function save() { try { localStorage.setItem(STORAGE, JSON.stringify(state)); } catch (e) { /* private mode, carry on */ } }
  function clearSaved() { try { localStorage.removeItem(STORAGE); } catch (e) { /* fine */ } }

  function followOn(q, label) {
    if (!q.follow) { return false; }
    var w = q.follow.when;
    return Array.isArray(w) ? w.indexOf(label) !== -1 : w === label;
  }

  function answered(q) {
    var a = state.answers[q.id];
    if (q.type === 'text') { return !!(state.text[q.id] || '').trim(); }
    if (q.type === 'many') { return Array.isArray(a) && a.length > 0; }
    if (q.type === 'number') { return typeof a === 'number'; }
    return !!a;
  }
  function answeredCount() { return Q.filter(answered).length; }

  (function load() {
    try {
      var raw = localStorage.getItem(STORAGE);
      if (!raw) { return; }
      var s = JSON.parse(raw);
      if (s && typeof s === 'object' && s.answers) {
        state.answers = s.answers || {};
        state.text = s.text || {};
        savedStep = Math.min(Math.max(parseInt(s.step, 10) || 0, 0), REVIEW);
        hadSaved = answeredCount() > 0;
      }
    } catch (e) { /* nothing usable stored */ }
  })();

  function valueOf(q) {
    if (q.type === 'text') { return (state.text[q.id] || '').trim(); }
    if (q.type === 'many') { return state.answers[q.id] || []; }
    if (q.type === 'number') { return typeof state.answers[q.id] === 'number' ? state.answers[q.id] : ''; }
    return state.answers[q.id] || '';
  }
  function display(q) {
    var v = valueOf(q);
    if (Array.isArray(v)) { v = v.join(', '); }
    if (q.type === 'number' && v !== '') { v = v + ' ' + (q.unit || ''); }
    var extra = q.follow ? (state.text[q.follow.key] || '').trim() : '';
    if (extra && followOn(q, state.answers[q.id])) { v += ' (' + extra + ')'; }
    return String(v).trim();
  }

  /* ---------------- Rendering helpers ---------------- */
  function h(tag, attrs, kids) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === 'text') { node.textContent = attrs[k]; }
        else if (k === 'html') { node.innerHTML = attrs[k]; }
        else if (k === 'on') { Object.keys(attrs.on).forEach(function (ev) { node.addEventListener(ev, attrs.on[ev]); }); }
        else { node.setAttribute(k, attrs[k]); }
      });
    }
    (kids || []).forEach(function (c) { if (c) { node.appendChild(c); } });
    return node;
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
  }

  function go(step) {
    state.step = step;
    save();
    render();
    window.scrollTo(0, 0);
  }

  function render() {
    var step = state.step;
    var inQuestions = step >= 1 && step <= TOTAL;
    track.hidden = !inQuestions;
    calcada.hidden = inQuestions;
    countEl.textContent = inQuestions ? step + ' of ' + TOTAL : '';
    if (inQuestions) { trackfill.style.width = ((step - 1) / TOTAL * 100) + '%'; }

    stage.innerHTML = '';
    var screen;
    if (step === 0) { screen = introScreen(); }
    else if (inQuestions) { screen = questionScreen(Q[step - 1], step); }
    else if (step === REVIEW) { screen = reviewScreen(); }
    else { screen = doneScreen(); }
    stage.appendChild(screen);

    var heading = screen.querySelector('h1, h2');
    if (heading && step !== 0) { heading.setAttribute('tabindex', '-1'); heading.focus({ preventScroll: true }); }
  }

  /* ---------------- Screens ---------------- */
  function introScreen() {
    var typing = TEXT_IDS.length === 0 ? 'All taps, no typing.'
      : TEXT_IDS.length === 1 ? 'Mostly taps, one bit of typing at the end.'
      : 'Mostly taps, plus ' + word(TEXT_IDS.length) + ' short answers to type.';
    var minutes = Math.max(3, Math.round(TOTAL * 0.2 + TEXT_IDS.length * 0.7));

    var kids = [
      h('p', { class: 'eyebrow', text: C.greeting || ('Hi ' + NAME) }),
      h('h1', { html: C.introTitle || 'A few quick questions, so I turn up knowing your business <em>instead of guessing at it.</em>' }),
      C.introNote ? h('p', { class: 'muted', text: C.introNote }) : null,
      h('p', { class: 'muted', text: t('howLong', cap(word(TOTAL)) + ' of them. ' + typing + ' About ' + word(minutes) + ' minutes.') }),
      h('p', { class: 'muted', text: t('resume', 'You can stop halfway and come back later on the same device. It remembers where you were.') }),
      h('p', { class: 'muted', text: t('private', 'Nothing here is shared with anyone else. It comes straight to me.') }),
      h('p', { class: 'sig', text: 'Adam' })
    ];
    var actions = h('div', { class: 'stack', style: 'margin-top:28px' });
    if (hadSaved) {
      actions.appendChild(h('button', { class: 'btn block', type: 'button', text: t('continue', 'Carry on where I left off'), on: { click: function () { go(savedStep || firstUnanswered()); } } }));
      actions.appendChild(h('button', { class: 'link', type: 'button', text: t('restart', 'Start again from the beginning'), on: { click: function () { state.answers = {}; state.text = {}; hadSaved = false; go(1); } } }));
    } else {
      actions.appendChild(h('button', { class: 'btn block', type: 'button', text: t('start', 'Start'), on: { click: function () { go(1); } } }));
    }
    kids.push(actions);
    return h('section', { class: 'screen' }, kids);
  }

  function firstUnanswered() {
    for (var i = 0; i < Q.length; i++) { if (!answered(Q[i])) { return i + 1; } }
    return REVIEW;
  }

  function questionScreen(q, step) {
    var returning = returnToReview;
    var screen = h('section', { class: 'screen' });

    if (q.section) { screen.appendChild(h('p', { class: 'eyebrow', text: q.section })); }
    screen.appendChild(h('h2', { text: q.q }));
    screen.appendChild(h('p', { class: 'hint', text: q.hint || '' }));

    function advance() {
      returnToReview = false;
      if (returning) { go(REVIEW); } else { go(step >= TOTAL ? REVIEW : step + 1); }
    }
    var nextBtn = h('button', { class: 'btn', type: 'button', text: returning ? t('toSummary', 'Back to summary') : (step === TOTAL ? t('done', 'Done') : t('next', 'Next')), on: { click: advance } });

    if (q.type === 'number') {
      var min = q.min || 1, max = q.max || 500;
      if (typeof state.answers[q.id] !== 'number') { state.answers[q.id] = q.def || min; }
      var input = h('input', { type: 'number', inputmode: 'numeric', min: String(min), max: String(max), 'aria-label': q.label || q.q, value: String(state.answers[q.id]) });
      var setNum = function (v) {
        var n = Math.max(min, Math.min(max, Math.round(v) || min));
        state.answers[q.id] = n; input.value = String(n); save();
      };
      input.addEventListener('input', function () { var n = parseInt(input.value, 10); if (!isNaN(n)) { state.answers[q.id] = Math.max(min, Math.min(max, n)); save(); } });
      input.addEventListener('blur', function () { setNum(parseInt(input.value, 10)); });
      input.addEventListener('keydown', function (e) { if (e.key === 'Enter') { setNum(parseInt(input.value, 10)); advance(); } });
      screen.appendChild(h('div', { class: 'stepper' }, [
        h('button', { type: 'button', 'aria-label': 'One fewer', text: '−', on: { click: function () { setNum(state.answers[q.id] - 1); } } }),
        input,
        h('button', { type: 'button', 'aria-label': 'One more', text: '+', on: { click: function () { setNum(state.answers[q.id] + 1); } } })
      ]));
      screen.appendChild(h('p', { class: 'unit', text: q.unit || '' }));
    }

    if (q.type === 'one' || q.type === 'many') {
      var box = h('div', { class: 'opts', role: q.type === 'one' ? 'radiogroup' : 'group', 'aria-label': q.q });
      var followWrap = null;
      q.opts.forEach(function (label) {
        var isOn = q.type === 'many' ? (state.answers[q.id] || []).indexOf(label) !== -1 : state.answers[q.id] === label;
        var b = h('button', { class: 'opt' + (q.type === 'many' ? ' sq' : ''), type: 'button', 'aria-pressed': String(isOn) }, [
          h('span', { class: 'mark', 'aria-hidden': 'true' }),
          h('span', { text: label })
        ]);
        b.addEventListener('click', function () {
          if (q.type === 'many') {
            var list = state.answers[q.id] || [];
            var at = list.indexOf(label);
            if (at === -1) { list.push(label); } else { list.splice(at, 1); }
            state.answers[q.id] = list;
            b.setAttribute('aria-pressed', String(list.indexOf(label) !== -1));
            save();
            return;
          }
          state.answers[q.id] = label;
          Array.prototype.forEach.call(box.children, function (c) { c.setAttribute('aria-pressed', 'false'); });
          b.setAttribute('aria-pressed', 'true');
          save();
          if (followOn(q, label)) {
            followWrap.hidden = false;
            followWrap.querySelector('input').focus();
            return;
          }
          if (followWrap) { followWrap.hidden = true; }
          setTimeout(advance, 260);
        });
        box.appendChild(b);
      });
      screen.appendChild(box);

      if (q.follow) {
        var fin = h('input', { class: 'field', type: 'text', placeholder: q.follow.placeholder || '', value: state.text[q.follow.key] || '' });
        fin.addEventListener('input', function () { state.text[q.follow.key] = fin.value; save(); });
        fin.addEventListener('keydown', function (e) { if (e.key === 'Enter') { advance(); } });
        followWrap = h('div', {}, [fin]);
        followWrap.hidden = !followOn(q, state.answers[q.id]);
        screen.appendChild(followWrap);
      }
    }

    if (q.type === 'text') {
      var ta = h('textarea', { class: 'field', placeholder: q.placeholder || '', 'aria-label': q.q });
      ta.value = state.text[q.id] || '';
      ta.addEventListener('input', function () { state.text[q.id] = ta.value; save(); });
      screen.appendChild(ta);
    }

    var left = h('button', { class: 'link back', type: 'button', text: step === 1 ? t('back', 'Back') : t('previous', 'Previous'), on: { click: function () { returnToReview = false; go(step - 1); } } });
    var skipBtn = h('button', { class: 'link', type: 'button', text: t('skip', 'Skip'), on: { click: advance } });
    var rightGroup = h('div', { style: 'display:flex; gap:14px; align-items:center' }, [skipBtn, nextBtn]);
    screen.appendChild(h('div', { class: 'actions' }, [left, rightGroup]));

    // Single-choice questions move on by themselves, so they only need a Next
    // button once answered, or when a follow-up field is waiting to be filled.
    function syncActions() {
      var isAnswered = answered(q);
      skipBtn.hidden = isAnswered || q.type === 'number';
      nextBtn.hidden = !(q.type !== 'one' || isAnswered || returning);
    }
    screen.addEventListener('click', function () { setTimeout(syncActions, 0); });
    screen.addEventListener('input', syncActions);
    syncActions();
    return screen;
  }

  function reviewScreen() {
    var screen = h('section', { class: 'screen' });
    var n = answeredCount();
    screen.appendChild(h('p', { class: 'eyebrow', text: n + ' of ' + TOTAL + ' answered' }));
    screen.appendChild(h('h2', { text: t('reviewTitle', 'That is everything. Have a quick look, then send it over.') }));
    screen.appendChild(h('p', { class: 'hint', text: t('reviewHint', 'Tap Change on anything you want to redo.') }));

    var list = h('div', { class: 'review' });
    Q.forEach(function (q, i) {
      var v = display(q);
      list.appendChild(h('div', { class: 'rrow' }, [
        h('span', { class: 'rl', text: q.short || ('Question ' + (i + 1)) }),
        h('span', { class: 'ra' + (v ? '' : ' skipped'), text: v || 'skipped' }),
        h('button', { class: 'link', type: 'button', text: t('change', 'Change'), 'aria-label': t('change', 'Change') + ' ' + (q.short || 'this answer'), on: { click: function () { returnToReview = true; go(i + 1); } } })
      ]));
    });
    screen.appendChild(list);

    var note = h('p', { class: 'note', text: t('sendNote', 'It goes straight to Adam, nobody else.') });
    var send = h('button', { class: 'btn block', type: 'button', text: t('send', 'Send to Adam') });
    var wa = h('a', { class: 'btn block quiet', href: 'https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(buildMessage()), target: '_blank', rel: 'noopener', text: t('whatsapp', 'Or send it on WhatsApp instead') });

    if (n === 0) { send.disabled = true; note.textContent = 'Answer at least one question first.'; }

    send.addEventListener('click', function () {
      send.disabled = true;
      send.textContent = t('sending', 'Sending...');
      note.classList.remove('bad');
      note.textContent = 'One moment.';
      submit().then(function () {
        clearSaved();
        state.step = DONE;
        render();
        window.scrollTo(0, 0);
      }).catch(function () {
        send.disabled = false;
        send.textContent = t('retry', 'Try again');
        note.classList.add('bad');
        note.textContent = 'That did not go through. The WhatsApp button just below sends exactly the same answers.';
      });
    });

    screen.appendChild(h('div', { class: 'stack' }, [send, wa, note]));
    screen.appendChild(h('div', { class: 'actions' }, [
      h('button', { class: 'link back', type: 'button', text: t('previous', 'Previous'), on: { click: function () { go(TOTAL); } } })
    ]));
    return screen;
  }

  function doneScreen() {
    var kids = [
      h('p', { class: 'eyebrow', text: t('sentEyebrow', 'Sent') }),
      h('h1', { html: t('sentTitle', 'Thank you, {name}. <em>That is all I need.</em>').replace('{name}', escapeHtml(who())) }),
      h('p', { class: 'muted', text: t('sentBody', 'I will have read it properly before we speak, so we can skip the boring questions and go straight to the interesting part.') })
    ];
    var headline = HEADLINE ? (state.text[HEADLINE] || '').trim() : '';
    if (headline) {
      kids.push(h('p', { class: 'muted', style: 'margin:22px 0 0', text: t('sentFirst', 'We will start with this one:') }));
      kids.push(h('p', { class: 'quote', text: headline }));
    }
    kids.push(h('p', { class: 'sig', style: 'margin-top:28px', text: 'Adam' }));
    return h('section', { class: 'screen' }, kids);
  }

  /* ---------------- Sending ---------------- */
  function buildPayload() {
    var answers = {};
    Q.forEach(function (q, i) {
      // n keeps question order: Postgres jsonb does not preserve key order.
      var entry = { n: i + 1, question: q.q, answer: valueOf(q), type: q.type };
      if (q.type === 'number' && q.unit) { entry.unit = q.unit; }
      if (q.follow) {
        var extra = (state.text[q.follow.key] || '').trim();
        if (extra && followOn(q, state.answers[q.id])) { entry.detail = extra; }
      }
      answers[q.id] = entry;
    });
    return {
      prospect_slug: PROSPECT,
      prospect_name: who(),
      business: BUSINESS,
      properties_target: null,
      answers: answers,
      worst_hour: HEADLINE ? ((state.text[HEADLINE] || '').trim() || null) : null,
      source: 'questions'
    };
  }

  function buildMessage() {
    var lines = [t('waOpener', 'Hi Adam, here are my answers.'), ''];
    Q.forEach(function (q, i) {
      lines.push((i + 1) + '. ' + q.q);
      lines.push('   ' + (display(q) || '(skipped)'));
      lines.push('');
    });
    return lines.join('\n');
  }

  function submit() {
    return fetch(SUPABASE_URL + '/rest/v1/intake_responses', {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': 'Bearer ' + SUPABASE_KEY,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(buildPayload())
    }).then(function (res) { if (!res.ok) { throw new Error('status ' + res.status); } });
  }

  render();
})();
