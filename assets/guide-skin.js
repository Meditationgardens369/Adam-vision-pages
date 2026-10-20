/* Small decorations for the four public guides. Runs after the page is built.
   Adds a top bar with a link back to the hub, logo tiles on the "What you need"
   cards (matched on the card title), and a footer line. No tracking, no data. */
(function () {
  var KW = document.body.getAttribute("data-guide") || "";
  var wrap = document.querySelector(".wrap");
  if (!wrap) return;

  /* top bar */
  var bar = document.createElement("div");
  bar.className = "gbar";
  bar.innerHTML = '<a href="guides.html?s=guide"><i aria-hidden="true">A</i>All free guides</a>' + (KW ? '<span class="kw">' + KW + '</span>' : "");
  wrap.insertBefore(bar, wrap.firstChild);

  /* logos on the what-you-need cards */
  var ICON = {
    phone: '<svg viewBox="0 0 24 24"><rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18h2"/></svg>',
    film: '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M3 9h18M3 15h18M8 4v16M16 4v16"/></svg>',
    task: '<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8.5 12.5l2.5 2.5 4.5-5"/></svg>',
    folder: '<svg viewBox="0 0 24 24"><path d="M3 7.5A2.5 2.5 0 0 1 5.5 5h4l2 2h7A2.5 2.5 0 0 1 21 9.5v8A2.5 2.5 0 0 1 18.5 20h-13A2.5 2.5 0 0 1 3 17.5z"/></svg>',
    globe: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/></svg>',
    key: '<svg viewBox="0 0 24 24"><circle cx="8" cy="12" r="4"/><path d="M12 12h9M18 12v3M15 12v2"/></svg>'
  };
  function img(file, alt, wide) { return '<span' + (wide ? ' class="wide"' : '') + '><img src="assets/hub/' + file + '.png" alt="' + alt + '" loading="lazy" decoding="async"></span>'; }
  function logosFor(title) {
    var t = title.toLowerCase();
    if (t.indexOf("grok") > -1) return img("grokbot", "Grok Bots", true);
    if (t.indexOf("claude or chatgpt") > -1) return img("claude", "Claude") + img("chatgpt", "ChatGPT");
    if (t.indexOf("claude code") > -1) return img("claude-code", "Claude Code");
    if (t.indexOf("obsidian") > -1) return img("obsidian", "Obsidian");
    if (t.indexOf("chrome") > -1) return '<i aria-hidden="true">' + ICON.globe + '</i>';
    if (t.indexOf("claude") > -1) return img("claude", "Claude");
    if (t.indexOf("phone") > -1) return '<i aria-hidden="true">' + ICON.phone + '</i>';
    if (t.indexOf("footage") > -1 || t.indexOf("clip") > -1 || t.indexOf("video") > -1) return '<i aria-hidden="true">' + ICON.film + '</i>';
    if (t.indexOf("job") > -1 || t.indexOf("task") > -1) return '<i aria-hidden="true">' + ICON.task + '</i>';
    if (t.indexOf("account") > -1) return '<i aria-hidden="true">' + ICON.key + '</i>';
    return '<i aria-hidden="true">' + ICON.folder + '</i>';
  }
  Array.prototype.forEach.call(document.querySelectorAll(".needs > div"), function (card) {
    var b = card.querySelector("b"); if (!b) return;
    var row = document.createElement("div"); row.className = "logo"; row.innerHTML = logosFor(b.textContent);
    card.insertBefore(row, card.firstChild);
  });

  /* footer line */
  var foot = document.createElement("div");
  foot.className = "gfoot";
  foot.innerHTML = '<span>Adam Cholodowski · Aligned AI</span><a href="guides.html?s=guide">All the free guides</a><span>Your email stays with Adam, never sold, unsubscribe any time.</span>';
  wrap.appendChild(foot);
})();
