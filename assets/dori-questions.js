/* Dor: child therapist at the forest school Adam's children go to. About 20 years with
   children, no website, no social media, all word of mouth. Parents at the school credit her
   with real change (ADHD, behaviour). Splits her life between Portugal and Israel and is
   unsure where to settle, so working online would free her from one place.
   Met 13 Nov 2026 at school pickup; she was excited and asked for the questions.

   One question set, three languages. dori.html, dori-pt.html and dori-he.html each set
   window.DORI_LANG and load this file before intake.js. Each language has its own slug
   (dori, dori-pt, dori-he) so a half-finished answer in one language never mixes with another.
   The English `short` labels stay the same in every language so the answers line up.

   Read first: gift (what nobody else does), story, firststep and mistakes (ready-made content),
   online and camera (what to build first), where (Portugal or Israel). */
(function () {
  var L = window.DORI_LANG || 'en';
  function pick(o) { return o[L] || o.en; }

  var QUESTIONS = [
    { id: 'describe', type: 'text', short: 'What she does, in her words',
      en: { q: 'How do you describe what you do, in your own words?', hint: 'The way you would explain it to a parent meeting you for the first time.', placeholder: 'I help children who...' },
      pt: { q: 'Como descreve o que faz, por palavras suas?', hint: 'Como o explicaria a um pai ou mãe que a conhece pela primeira vez.', placeholder: 'Ajudo crianças que...' },
      he: { q: 'איך את מתארת את מה שאת עושה, במילים שלך?', hint: 'כמו שהיית מסבירה להורה שפוגש אותך בפעם הראשונה.', placeholder: 'אני עוזרת לילדים ש...' } },

    { id: 'training', type: 'text', short: 'Training and qualifications',
      en: { q: 'What training and qualifications do you have?', hint: 'Degrees, methods, courses, anything that shaped how you work. A list is fine.', placeholder: 'BA in..., trained in...' },
      pt: { q: 'Que formação e qualificações tem?', hint: 'Cursos, métodos, formações, tudo o que moldou a sua forma de trabalhar. Uma lista chega.', placeholder: 'Licenciatura em..., formação em...' },
      he: { q: 'איזו הכשרה ואילו תעודות יש לך?', hint: 'תארים, שיטות, קורסים, כל מה שעיצב את הדרך שבה את עובדת. רשימה זה מספיק.', placeholder: 'תואר ב..., הכשרה ב...' } },

    { id: 'methods', type: 'many', short: 'How she works',
      en: { q: 'Which ways of working do you use most?', hint: 'Tap all that apply.', opts: ['Play', 'Talking', 'Movement and the body', 'Nature and the outdoors', 'Art and creative work', 'Guiding the parents', 'Something else'] },
      pt: { q: 'Que formas de trabalhar usa mais?', hint: 'Toque em tudo o que se aplica.', opts: ['Brincadeira', 'Conversa', 'Movimento e corpo', 'Natureza e ar livre', 'Arte e trabalho criativo', 'Orientar os pais', 'Outra coisa'] },
      he: { q: 'באילו דרכי עבודה את משתמשת הכי הרבה?', hint: 'סמני את כל מה שמתאים.', opts: ['משחק', 'שיחה', 'תנועה וגוף', 'טבע ועבודה בחוץ', 'אמנות ויצירה', 'הדרכת הורים', 'משהו אחר'] } },

    { id: 'children', type: 'many', short: 'Children she helps most',
      en: { q: 'Which children do you help most often?', hint: 'Tap all that apply.', opts: ['ADHD and focus', 'Big emotions and meltdowns', 'Anxiety and worries', 'Autism and sensory needs', 'Struggles at school', 'Friendships and social life', 'Family changes (divorce, a move, a new sibling)', 'Trauma'] },
      pt: { q: 'Que crianças ajuda com mais frequência?', hint: 'Toque em tudo o que se aplica.', opts: ['PHDA e concentração', 'Emoções fortes e birras', 'Ansiedade e preocupações', 'Autismo e necessidades sensoriais', 'Dificuldades na escola', 'Amizades e vida social', 'Mudanças na família (divórcio, mudança de casa, um irmão novo)', 'Trauma'] },
      he: { q: 'באילו ילדים את עוזרת הכי הרבה?', hint: 'סמני את כל מה שמתאים.', opts: ['הפרעת קשב וריכוז', 'רגשות גדולים והתפרצויות', 'חרדה ודאגות', 'אוטיזם וצרכים חושיים', 'קשיים בבית הספר', 'חברויות וחיי חברה', 'שינויים במשפחה (גירושין, מעבר דירה, אח חדש)', 'טראומה'] } },

    { id: 'ages', type: 'many', short: 'Ages',
      en: { q: 'What ages do you work with?', hint: 'Tap all that apply.', opts: ['Under 4', '4 to 7', '8 to 12', 'Teenagers'] },
      pt: { q: 'Com que idades trabalha?', hint: 'Toque em tudo o que se aplica.', opts: ['Menos de 4', '4 a 7', '8 a 12', 'Adolescentes'] },
      he: { q: 'עם אילו גילים את עובדת?', hint: 'סמני את כל מה שמתאים.', opts: ['מתחת לגיל 4', '4 עד 7', '8 עד 12', 'מתבגרים'] } },

    { id: 'parentsrole', type: 'one', short: 'Work with parents',
      en: { q: 'How much of your work is with the parents themselves?', opts: ['Mostly with the child', 'About half and half', 'Mostly guiding the parents', 'It depends on the family'] },
      pt: { q: 'Que parte do seu trabalho é com os próprios pais?', opts: ['Sobretudo com a criança', 'Mais ou menos metade', 'Sobretudo a orientar os pais', 'Depende da família'] },
      he: { q: 'כמה מהעבודה שלך היא עם ההורים עצמם?', opts: ['בעיקר עם הילד', 'בערך חצי חצי', 'בעיקר הדרכת הורים', 'תלוי במשפחה'] } },

    { id: 'story', type: 'text', short: 'A change she will never forget',
      en: { q: 'Tell me about one child whose change you will never forget.', hint: 'No names. Just what was happening, what you did, and what changed.', placeholder: 'A boy of seven who...' },
      pt: { q: 'Fale-me de uma criança cuja mudança nunca vai esquecer.', hint: 'Sem nomes. Só o que se passava, o que fez e o que mudou.', placeholder: 'Um menino de sete anos que...' },
      he: { q: 'ספרי לי על ילד אחד שהשינוי שלו לא תשכחי לעולם.', hint: 'בלי שמות. רק מה קרה, מה עשית ומה השתנה.', placeholder: 'ילד בן שבע ש...' } },

    { id: 'gift', type: 'text', short: 'What nobody else does',
      en: { q: 'What do parents say you did that nobody else had done?', hint: 'This is the answer I will read first. It is usually the heart of your brand.', placeholder: 'They often tell me...' },
      pt: { q: 'O que dizem os pais que fez e que mais ninguém tinha feito?', hint: 'É a resposta que vou ler primeiro. Normalmente é o coração da sua marca.', placeholder: 'Muitas vezes dizem-me...' },
      he: { q: 'מה ההורים אומרים שעשית ואף אחד אחר לא עשה?', hint: 'את התשובה הזאת אקרא ראשונה. בדרך כלל זה הלב של המותג שלך.', placeholder: 'הרבה פעמים אומרים לי...' } },

    { id: 'firststep', type: 'text', short: 'First advice to a desperate parent',
      en: { q: 'When a parent at the end of their rope calls you, what is the first thing you tell them?', hint: 'Answers like this become your first videos.', placeholder: 'First, I tell them...' },
      pt: { q: 'Quando um pai ou mãe já sem forças lhe liga, qual é a primeira coisa que lhe diz?', hint: 'Respostas como esta tornam-se os seus primeiros vídeos.', placeholder: 'Primeiro, digo-lhes...' },
      he: { q: 'כשהורה שכבר אין לו כוח מתקשר אלייך, מה הדבר הראשון שאת אומרת לו?', hint: 'תשובות כאלה הופכות לסרטונים הראשונים שלך.', placeholder: 'קודם כל, אני אומרת...' } },

    { id: 'mistakes', type: 'text', short: 'What loving parents get wrong',
      en: { q: 'What do loving parents most often get wrong without realising?', hint: 'Two or three things is plenty.', placeholder: 'They try to...' },
      pt: { q: 'O que fazem mal, sem se aperceberem, os pais que mais amam os filhos?', hint: 'Duas ou três coisas chegam.', placeholder: 'Tentam...' },
      he: { q: 'מה הורים אוהבים עושים לא נכון הכי הרבה, בלי לשים לב?', hint: 'שניים או שלושה דברים זה מספיק.', placeholder: 'הם מנסים...' } },

    { id: 'therapists', type: 'one', short: 'Teaching other therapists',
      en: { q: 'Have you trained or guided other therapists?', opts: ['Yes, regularly', 'Sometimes', 'Not yet, but I would like to', 'No'] },
      pt: { q: 'Já formou ou orientou outros terapeutas?', opts: ['Sim, com regularidade', 'Às vezes', 'Ainda não, mas gostava', 'Não'] },
      he: { q: 'הכשרת או הדרכת מטפלים אחרים?', opts: ['כן, באופן קבוע', 'לפעמים', 'עדיין לא, אבל הייתי רוצה', 'לא'] } },

    { id: 'languages', type: 'many', short: 'Languages she works in',
      en: { q: 'Which languages can you work in?', hint: 'Tap all that apply.', opts: ['English', 'Portuguese', 'Hebrew', 'Spanish', 'Another language'] },
      pt: { q: 'Em que línguas consegue trabalhar?', hint: 'Toque em tudo o que se aplica.', opts: ['Inglês', 'Português', 'Hebraico', 'Espanhol', 'Outra língua'] },
      he: { q: 'באילו שפות את יכולה לעבוד?', hint: 'סמני את כל מה שמתאים.', opts: ['אנגלית', 'פורטוגזית', 'עברית', 'ספרדית', 'שפה אחרת'] } },

    { id: 'week', type: 'one', short: 'How full her week is',
      en: { q: 'How full is your week with families right now?', opts: ['Full, with a waiting list', 'Full', 'Some space', 'Quite quiet'] },
      pt: { q: 'Quão cheia está a sua semana com famílias neste momento?', opts: ['Cheia, com lista de espera', 'Cheia', 'Algum espaço', 'Bastante calma'] },
      he: { q: 'כמה השבוע שלך מלא במשפחות כרגע?', opts: ['מלא, עם רשימת המתנה', 'מלא', 'יש קצת מקום', 'די שקט'] } },

    { id: 'price', type: 'one', short: 'Price per session',
      en: { q: 'Roughly what does a family pay you for one session now?', hint: 'Only so I can suggest sensible prices later.', opts: ['Under €40', '€40 to €60', '€60 to €90', 'More than €90', 'I would rather not say'] },
      pt: { q: 'Mais ou menos, quanto paga uma família por uma sessão consigo?', hint: 'Só para depois sugerir preços sensatos.', opts: ['Menos de 40 €', '40 € a 60 €', '60 € a 90 €', 'Mais de 90 €', 'Prefiro não dizer'] },
      he: { q: 'בערך כמה משפחה משלמת לך היום על מפגש אחד?', hint: 'רק כדי שאוכל להציע מחירים הגיוניים בהמשך.', opts: ['פחות מ-40 יורו', '40 עד 60 יורו', '60 עד 90 יורו', 'יותר מ-90 יורו', 'מעדיפה לא לומר'] } },

    { id: 'where', type: 'one', short: 'Where in five years',
      en: { q: 'Where do you see yourself living in five years?', hint: 'No wrong answer. Working online can make this choice easier.', opts: ['Mostly in Portugal', 'Mostly in Israel', 'Between the two', 'Anywhere, working online', 'Not sure yet'] },
      pt: { q: 'Onde se imagina a viver daqui a cinco anos?', hint: 'Não há resposta errada. Trabalhar online pode tornar esta escolha mais fácil.', opts: ['Sobretudo em Portugal', 'Sobretudo em Israel', 'Entre os dois', 'Em qualquer lugar, a trabalhar online', 'Ainda não sei'] },
      he: { q: 'איפה את רואה את עצמך גרה בעוד חמש שנים?', hint: 'אין תשובה לא נכונה. עבודה אונליין יכולה להקל על הבחירה הזאת.', opts: ['בעיקר בפורטוגל', 'בעיקר בישראל', 'בין שתיהן', 'בכל מקום, עובדת אונליין', 'עוד לא יודעת'] } },

    { id: 'online', type: 'many', short: 'Ways to help from a distance',
      en: { q: 'Which ways of helping families from a distance feel right to you?', hint: 'Tap all that apply. We would start with one.', opts: ['Video calls with parents', 'An online course for parents', 'Short videos with practical tips', 'A small group for parents', 'A book or printed guide', 'Workshops for schools or therapists', 'Not sure yet'] },
      pt: { q: 'Que formas de ajudar famílias à distância lhe parecem certas?', hint: 'Toque em tudo o que se aplica. Começaríamos por uma.', opts: ['Videochamadas com os pais', 'Um curso online para pais', 'Vídeos curtos com dicas práticas', 'Um pequeno grupo de pais', 'Um livro ou guia', 'Workshops para escolas ou terapeutas', 'Ainda não sei'] },
      he: { q: 'אילו דרכים לעזור למשפחות מרחוק מרגישות לך נכונות?', hint: 'סמני את כל מה שמתאים. נתחיל עם אחת.', opts: ['שיחות וידאו עם הורים', 'קורס אונליין להורים', 'סרטונים קצרים עם טיפים מעשיים', 'קבוצה קטנה של הורים', 'ספר או מדריך כתוב', 'סדנאות לבתי ספר או למטפלים', 'עוד לא יודעת'] } },

    { id: 'camera', type: 'one', short: 'On camera',
      en: { q: 'How do you feel about being on camera?', hint: 'Honest answer. There are good ways to start either way.', opts: ['Comfortable', 'A bit shy, but willing', 'I would rather use only my voice', 'Not for me'] },
      pt: { q: 'Como se sente em relação a aparecer em vídeo?', hint: 'Resposta sincera. Há boas formas de começar em qualquer caso.', opts: ['À vontade', 'Um pouco tímida, mas disposta', 'Prefiro usar só a voz', 'Não é para mim'] },
      he: { q: 'איך את מרגישה עם להופיע מול מצלמה?', hint: 'תשובה כנה. יש דרכים טובות להתחיל בכל מקרה.', opts: ['בנוח', 'קצת ביישנית, אבל מוכנה', 'מעדיפה רק את הקול שלי', 'לא בשבילי'] } },

    { id: 'time', type: 'one', short: 'Time she can give',
      en: { q: 'How much time a week could you give to building this?', opts: ['Under 2 hours', '2 to 5 hours', '5 to 10 hours', 'More than 10 hours'] },
      pt: { q: 'Quanto tempo por semana poderia dedicar a construir isto?', opts: ['Menos de 2 horas', '2 a 5 horas', '5 a 10 horas', 'Mais de 10 horas'] },
      he: { q: 'כמה זמן בשבוע תוכלי להקדיש לבנייה של זה?', opts: ['פחות משעתיים', '2 עד 5 שעות', '5 עד 10 שעות', 'יותר מ-10 שעות'] } },

    { id: 'testimonials', type: 'one', short: 'Parents she can ask today',
      en: { q: 'How many parents could you ask for a testimonial this week?', hint: 'The parents page is ready to send them.', opts: ['1 to 3', '4 to 10', 'More than 10', 'Not sure'] },
      pt: { q: 'A quantos pais poderia pedir um testemunho esta semana?', hint: 'A página para os pais já está pronta para enviar.', opts: ['1 a 3', '4 a 10', 'Mais de 10', 'Não sei'] },
      he: { q: 'כמה הורים תוכלי לבקש מהם המלצה השבוע?', hint: 'העמוד להורים כבר מוכן לשליחה.', opts: ['1 עד 3', '4 עד 10', 'יותר מ-10', 'לא בטוחה'] } },

    { id: 'worry', type: 'text', short: 'Worry about going online',
      en: { q: 'What worries you most about putting yourself out there online?', hint: 'Anything at all. It helps me plan around it.', placeholder: 'I am not sure that...' },
      pt: { q: 'O que mais a preocupa em mostrar-se online?', hint: 'Qualquer coisa. Ajuda-me a planear à volta disso.', placeholder: 'Não tenho a certeza de que...' },
      he: { q: 'מה הכי מדאיג אותך בלהציג את עצמך אונליין?', hint: 'כל דבר. זה עוזר לי לתכנן סביב זה.', placeholder: 'אני לא בטוחה ש...' } },

    { id: 'dream', type: 'text', short: 'Her work in a few years',
      en: { q: 'Last one. If this goes well, what does your work look like in a few years?', hint: 'Dream a little. A sentence or two is plenty.', placeholder: 'I would love to...' },
      pt: { q: 'A última. Se isto correr bem, como é o seu trabalho daqui a alguns anos?', hint: 'Sonhe um pouco. Uma ou duas frases chegam.', placeholder: 'Adorava...' },
      he: { q: 'שאלה אחרונה. אם זה יצליח, איך נראית העבודה שלך בעוד כמה שנים?', hint: 'תחלמי קצת. משפט או שניים זה מספיק.', placeholder: 'הייתי שמחה...' } }
  ];

  var UI = {
    pt: {
      howLong: 'São {n} perguntas. Sobretudo toques, com algumas respostas curtas para escrever. Cerca de dez minutos.',
      resume: 'Pode parar a meio e voltar mais tarde no mesmo dispositivo. A página lembra-se de onde ficou.',
      private: 'Nada disto é partilhado com mais ninguém. Vem diretamente para mim.',
      start: 'Começar', 'continue': 'Continuar onde parei', restart: 'Começar de novo',
      next: 'Seguinte', done: 'Feito', back: 'Voltar', previous: 'Anterior', skip: 'Saltar', toSummary: 'Voltar ao resumo',
      of: '{a} de {b}', answered: '{a} de {b} respondidas',
      reviewTitle: 'É tudo. Veja rapidamente e depois envie.', reviewHint: 'Toque em Alterar no que quiser refazer.', change: 'Alterar',
      send: 'Enviar ao Adam', sendNote: 'Vai diretamente para o Adam, para mais ninguém.', sending: 'A enviar...', retry: 'Tentar outra vez',
      whatsapp: 'Ou enviar por WhatsApp', waOpener: 'Olá Adam, aqui estão as minhas respostas.',
      sentEyebrow: 'Enviado', sentTitle: 'Obrigado, {name}. <em>É tudo o que preciso.</em>',
      sentBody: 'Vou ler tudo com calma e volto a falar consigo com as primeiras ideias.', sentFirst: 'Vamos começar por esta:'
    },
    he: {
      howLong: '{n} שאלות. בעיקר לחיצות, ועוד כמה תשובות קצרות לכתוב. בערך עשר דקות.',
      resume: 'אפשר לעצור באמצע ולחזור מאוחר יותר מאותו מכשיר. העמוד זוכר איפה עצרת.',
      private: 'שום דבר כאן לא משותף עם אף אחד אחר. זה מגיע ישירות אליי.',
      start: 'מתחילים', 'continue': 'להמשיך מאיפה שעצרתי', restart: 'להתחיל מחדש',
      next: 'הבא', done: 'סיימתי', back: 'חזרה', previous: 'הקודם', skip: 'דלגי', toSummary: 'חזרה לסיכום',
      of: '{a} מתוך {b}', answered: 'נענו {a} מתוך {b}',
      reviewTitle: 'זה הכול. תעיפי מבט ואז תשלחי.', reviewHint: 'לחצי על "שינוי" כדי לתקן תשובה.', change: 'שינוי',
      send: 'שליחה לאדם', sendNote: 'זה מגיע ישירות לאדם, לאף אחד אחר.', sending: 'שולחת...', retry: 'לנסות שוב',
      whatsapp: 'או לשלוח בוואטסאפ', waOpener: 'היי אדם, הנה התשובות שלי.',
      sentEyebrow: 'נשלח', sentTitle: 'תודה, {name}. <em>זה כל מה שאני צריך.</em>',
      sentBody: 'אקרא הכול בשקט ואחזור אלייך עם הרעיונות הראשונים.', sentFirst: 'נתחיל מזה:'
    }
  };

  var INTRO = {
    en: { greeting: 'Hi Dor', title: 'Twenty years of changing children’s lives. <em>Let’s help more families find you.</em>',
          note: 'These questions help me find three things: what makes your work different, the first videos and posts to make, and the first thing you could offer families wherever you live. Skip anything you like, and write in whichever language feels easiest.' },
    pt: { greeting: 'Olá Dor', title: 'Vinte anos a mudar a vida de crianças. <em>Vamos ajudar mais famílias a encontrá-la.</em>',
          note: 'Estas perguntas ajudam-me a perceber três coisas: o que torna o seu trabalho diferente, os primeiros vídeos e publicações a fazer, e a primeira coisa que poderia oferecer a famílias, viva onde viver. Pode saltar o que quiser e escrever na língua que lhe for mais fácil.' },
    he: { greeting: 'היי דור', title: 'עשרים שנה של שינוי בחיים של ילדים. <em>בואי נעזור ליותר משפחות למצוא אותך.</em>',
          note: 'השאלות האלה עוזרות לי להבין שלושה דברים: מה מייחד את העבודה שלך, הסרטונים והפוסטים הראשונים שכדאי ליצור, והדבר הראשון שתוכלי להציע למשפחות, לא משנה איפה תגורי. אפשר לדלג על כל שאלה ולכתוב בשפה שהכי נוחה לך.' }
  };

  var questions = QUESTIONS.map(function (q) {
    var w = pick(q);
    var out = { id: q.id, type: q.type, short: q.short, q: w.q };
    if (w.hint) { out.hint = w.hint; }
    if (w.opts) { out.opts = w.opts; }
    if (w.placeholder) { out.placeholder = w.placeholder; }
    return out;
  });

  var ui = UI[L] ? Object.assign({}, UI[L]) : {};
  if (ui.howLong) { ui.howLong = ui.howLong.replace('{n}', questions.length); }

  window.INTAKE = {
    slug: L === 'en' ? 'dori' : 'dori-' + L,
    name: 'Dor',
    business: 'Dor, child therapist (forest school)',
    headline: 'gift',
    brand: L === 'he' ? 'דור · מטפלת ילדים' : (L === 'pt' ? 'Dor · terapeuta infantil' : 'Dor · child therapist'),
    greeting: pick(INTRO).greeting,
    introTitle: pick(INTRO).title,
    introNote: pick(INTRO).note,
    ui: ui,
    questions: questions
  };

  /* Language links in the top bar, added once the engine has drawn the page. */
  document.addEventListener('DOMContentLoaded', function () {
    var top = document.querySelector('.top');
    if (!top) { return; }
    var box = document.createElement('nav');
    box.className = 'dlang'; box.setAttribute('aria-label', 'Language');
    [['en', 'EN', 'dori.html'], ['pt', 'PT', 'dori-pt.html'], ['he', 'עב', 'dori-he.html']].forEach(function (x) {
      var a = document.createElement('a');
      a.href = x[2]; a.textContent = x[1]; a.lang = x[0];
      if (x[0] === L) { a.setAttribute('aria-current', 'page'); }
      box.appendChild(a);
    });
    top.insertBefore(box, top.querySelector('.count'));
  });
})();
