/* Florista Frescura (Leen, Lagoa). Shared config, copy and language switch for
   index.html (landing page) and opiniao.html (review form).

   To change something later, edit only this block:
   - WHATSAPP: Leen's number, digits only, with 351 in front.
   - PHOTOS: one line per photo in img/. cat is ramos | casamentos | homenagens | arranjos.
   - REVIEWS: published reviews. New ones arrive in Supabase (slug "frescura-review")
     and are added here by hand once the person said yes to publishing. */
(function () {
  "use strict";

  var F = window.FRESCURA = {};

  F.WHATSAPP = "351964834963";
  F.PHONE = "+351964834963";
  F.MAPS = "https://www.google.com/maps/search/?api=1&query=Florista+Frescura+Rua+da+Liberdade+98+Lagoa";
  F.FACEBOOK = "https://www.facebook.com/frescuraleen/";

  F.PHOTOS = [
    { f: "18.jpg", cat: "ramos" },
    { f: "4.jpg", cat: "casamentos" },
    { f: "1.jpg", cat: "arranjos" },
    { f: "17.jpg", cat: "ramos" },
    { f: "15.jpg", cat: "homenagens" },
    { f: "9.jpg", cat: "casamentos" },
    { f: "7.jpg", cat: "arranjos" },
    { f: "5.jpg", cat: "ramos" },
    { f: "2.jpg", cat: "homenagens" },
    { f: "19.jpg", cat: "casamentos" },
    { f: "8.jpg", cat: "arranjos" },
    { f: "11.jpg", cat: "homenagens" },
    { f: "6.jpg", cat: "arranjos" },
    { f: "3.jpg", cat: "homenagens" },
    { f: "14.jpg", cat: "ramos" },
    { f: "12.jpg", cat: "homenagens" },
    { f: "16.jpg", cat: "arranjos" },
    { f: "13.jpg", cat: "homenagens" },
    { f: "10.jpg", cat: "homenagens" },
    { f: "20.jpg", cat: "homenagens" }
  ];

  F.REVIEWS = [
    { text: "As flores favoritas da mãe foram entregues com muito carinho.", name: "Bárbara", where: "Facebook" }
  ];

  var T = {
    pt: {
      title: "Florista Frescura · Flores em Lagoa",
      h1: "Flores frescas em Lagoa, há 26 anos.",
      sub: "Ramos, casamentos e homenagens, feitos à mão pela Leen.",
      cta: "Encomendar por WhatsApp",
      occTitle: "Para que ocasião?",
      occHint: "Toque numa e fale logo com a Leen.",
      occ: ["Aniversário", "Amor", "Casamento", "Nascimento", "Funeral", "Só porque sim"],
      galTitle: "O trabalho da Leen",
      galHint: "Toque numa foto para pedir algo parecido.",
      all: "Tudo", ramos: "Ramos", casamentos: "Casamentos", homenagens: "Homenagens", arranjos: "Arranjos",
      like: "Quero algo assim",
      close: "Fechar", prev: "Anterior", next: "Seguinte",
      revTitle: "Quem já encomendou",
      revCta: "Deixar a minha opinião",
      visitTitle: "Sim, a loja está aberta.",
      visitSub: "Rua da Liberdade, 98 · Lagoa",
      directions: "Como chegar", call: "Ligar",
      foot: "Florista Frescura · Lagoa, Algarve",
      waHello: "Olá Leen! Gostava de encomendar flores.",
      waOcc: "Olá Leen! Preciso de flores para: ",
      waPhoto: "Olá Leen! Vi esta foto no seu site e gostava de algo parecido: ",
      alt: "Flores da Florista Frescura",
      // review page
      rTitle: "Uma palavra para a Leen",
      rH1: "Recebeu flores da Leen?",
      rSub: "Conte como foi. Demora um minuto.",
      rName: "O seu primeiro nome",
      rOcc: "Qual foi a ocasião?",
      rText: "O que achou das flores e do serviço?",
      rTextPh: "As flores chegaram lindas e...",
      rOk: "Pode publicar as minhas palavras no site, com o meu primeiro nome.",
      rSend: "Enviar",
      rSending: "A enviar...",
      rNeed: "Escreva o seu nome e algumas palavras.",
      rFail: "Não foi possível enviar. Tente outra vez daqui a pouco.",
      rDone: "Obrigada!",
      rDoneSub: "A Leen vai ler as suas palavras.",
      rFb: "Recomendar também no Facebook",
      rBack: "Ver as flores"
    },
    en: {
      title: "Florista Frescura · Flowers in Lagoa",
      h1: "Fresh flowers in Lagoa for 26 years.",
      sub: "Bouquets, weddings and sympathy flowers, made by hand by Leen.",
      cta: "Order on WhatsApp",
      occTitle: "What is the occasion?",
      occHint: "Tap one and talk to Leen straight away.",
      occ: ["Birthday", "Love", "Wedding", "New baby", "Funeral", "Just because"],
      galTitle: "Leen's work",
      galHint: "Tap a photo to ask for something similar.",
      all: "All", ramos: "Bouquets", casamentos: "Weddings", homenagens: "Sympathy", arranjos: "Arrangements",
      like: "I'd like something like this",
      close: "Close", prev: "Previous", next: "Next",
      revTitle: "From people who ordered",
      revCta: "Leave my review",
      visitTitle: "Yes, the shop is open.",
      visitSub: "Rua da Liberdade, 98 · Lagoa",
      directions: "Get directions", call: "Call",
      foot: "Florista Frescura · Lagoa, Algarve",
      waHello: "Hello Leen! I would like to order flowers.",
      waOcc: "Hello Leen! I need flowers for: ",
      waPhoto: "Hello Leen! I saw this photo on your site and would like something similar: ",
      alt: "Flowers by Florista Frescura",
      rTitle: "A few words for Leen",
      rH1: "Did you get flowers from Leen?",
      rSub: "Tell us how it went. It takes a minute.",
      rName: "Your first name",
      rOcc: "What was the occasion?",
      rText: "How were the flowers and the service?",
      rTextPh: "The flowers arrived looking beautiful and...",
      rOk: "You may publish my words on the site, with my first name.",
      rSend: "Send",
      rSending: "Sending...",
      rNeed: "Please add your name and a few words.",
      rFail: "That did not send. Please try again in a moment.",
      rDone: "Thank you!",
      rDoneSub: "Leen will read your words.",
      rFb: "Recommend on Facebook too",
      rBack: "See the flowers"
    },
    nl: {
      title: "Florista Frescura · Bloemen in Lagoa",
      h1: "Al 26 jaar verse bloemen in Lagoa.",
      sub: "Boeketten, bruidswerk en rouwwerk, met de hand gemaakt door Leen.",
      cta: "Bestellen via WhatsApp",
      occTitle: "Voor welke gelegenheid?",
      occHint: "Tik er één aan en praat meteen met Leen.",
      occ: ["Verjaardag", "Liefde", "Huwelijk", "Geboorte", "Uitvaart", "Zomaar"],
      galTitle: "Het werk van Leen",
      galHint: "Tik op een foto om iets gelijkaardigs te vragen.",
      all: "Alles", ramos: "Boeketten", casamentos: "Bruidswerk", homenagens: "Rouwwerk", arranjos: "Bloemstukken",
      like: "Ik wil zoiets",
      close: "Sluiten", prev: "Vorige", next: "Volgende",
      revTitle: "Van klanten",
      revCta: "Mijn ervaring delen",
      visitTitle: "Ja, de winkel is open.",
      visitSub: "Rua da Liberdade, 98 · Lagoa",
      directions: "Route", call: "Bellen",
      foot: "Florista Frescura · Lagoa, Algarve",
      waHello: "Dag Leen! Ik wil graag bloemen bestellen.",
      waOcc: "Dag Leen! Ik heb bloemen nodig voor: ",
      waPhoto: "Dag Leen! Ik zag deze foto op je site en wil graag iets gelijkaardigs: ",
      alt: "Bloemen van Florista Frescura",
      rTitle: "Een woordje voor Leen",
      rH1: "Bloemen van Leen gekregen?",
      rSub: "Vertel hoe het was. Het duurt een minuutje.",
      rName: "Je voornaam",
      rOcc: "Wat was de gelegenheid?",
      rText: "Hoe waren de bloemen en de service?",
      rTextPh: "De bloemen waren prachtig en...",
      rOk: "Mijn woorden mogen op de site, met mijn voornaam.",
      rSend: "Versturen",
      rSending: "Bezig...",
      rNeed: "Vul je naam en een paar woorden in.",
      rFail: "Versturen is niet gelukt. Probeer het zo meteen opnieuw.",
      rDone: "Dank je wel!",
      rDoneSub: "Leen leest je woorden.",
      rFb: "Ook aanbevelen op Facebook",
      rBack: "Bekijk de bloemen"
    }
  };

  function startLang() {
    var q = (location.search.match(/[?&]lang=(pt|en|nl)/) || [])[1];
    if (q) { return q; }
    try { var s = localStorage.getItem("frescura-lang"); if (T[s]) { return s; } } catch (e) {}
    var n = (navigator.language || "pt").slice(0, 2).toLowerCase();
    return T[n] ? n : "pt";
  }

  F.lang = startLang();
  F.t = function (k) { return T[F.lang][k]; };
  F.wa = function (text) { return "https://wa.me/" + F.WHATSAPP + "?text=" + encodeURIComponent(text); };

  var listeners = [];
  F.onLang = function (fn) { listeners.push(fn); };

  F.apply = function () {
    document.documentElement.lang = F.lang;
    var titleKey = document.documentElement.getAttribute("data-title");
    if (titleKey) { document.title = F.t(titleKey); }
    var i, els = document.querySelectorAll("[data-i18n]");
    for (i = 0; i < els.length; i++) { els[i].textContent = F.t(els[i].getAttribute("data-i18n")); }
    els = document.querySelectorAll("[data-i18n-ph]");
    for (i = 0; i < els.length; i++) { els[i].placeholder = F.t(els[i].getAttribute("data-i18n-ph")); }
    els = document.querySelectorAll("[data-i18n-label]");
    for (i = 0; i < els.length; i++) { els[i].setAttribute("aria-label", F.t(els[i].getAttribute("data-i18n-label"))); }
    els = document.querySelectorAll("[data-wa]");
    for (i = 0; i < els.length; i++) { els[i].href = F.wa(F.t("waHello")); }
    els = document.querySelectorAll(".lang button");
    for (i = 0; i < els.length; i++) { els[i].setAttribute("aria-pressed", String(els[i].getAttribute("data-lang") === F.lang)); }
    for (i = 0; i < listeners.length; i++) { listeners[i](); }
  };

  F.setLang = function (l) {
    if (!T[l]) { return; }
    F.lang = l;
    try { localStorage.setItem("frescura-lang", l); } catch (e) {}
    F.apply();
  };

  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest(".lang button");
    if (b) { F.setLang(b.getAttribute("data-lang")); }
  });
})();
