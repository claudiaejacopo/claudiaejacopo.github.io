/* =========================================================
   Claudia & Jacopo - Apertura del sigillo d'invito
   ========================================================= */

(function () {
  var SEEN_KEY = 'cjInvitoSeen';

  function hasSeenInvito() {
    try {
      return window.sessionStorage.getItem(SEEN_KEY) === '1';
    } catch (e) {
      return false;
    }
  }

  function markInvitoSeen() {
    try {
      window.sessionStorage.setItem(SEEN_KEY, '1');
    } catch (e) {
      /* sessionStorage non disponibile: nessun problema, si vedrà di nuovo */
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var invitoScreen = document.querySelector('[data-invito-screen]');
    var seal = document.querySelector('[data-seal]');
    var home = document.getElementById('home');

    if (!invitoScreen || !seal || !home) return;

    // Se l'invito è già stato aperto in questa sessione del browser,
    // si salta direttamente alla home senza mostrare l'animazione.
    if (hasSeenInvito()) {
      invitoScreen.classList.add('no-transition', 'is-hidden');
      invitoScreen.setAttribute('aria-hidden', 'true');
      home.classList.add('is-visible');
      home.setAttribute('tabindex', '-1');
      document.body.classList.add('site-entered');
      if (window.CJMusicPlayer) {
        window.CJMusicPlayer.init();
      }
      return;
    }

    var opened = false;
    var envelope = document.querySelector('[data-envelope]');

    function openInvito() {
      if (opened) return;
      opened = true;

      markInvitoSeen();

      // La falda si ripiega su se stessa restando sempre a schermo (niente
      // piu' un pezzo che vola via): sigillo, falda e cartoncino animano
      // insieme non appena si clicca.
      seal.classList.add('is-open');
      if (envelope) envelope.classList.add('is-open');

      // Avvia la musica: questo click e' un vero "user gesture", quindi
      // l'autoplay del browser lo consente in modo affidabile.
      if (window.CJMusicPlayer) {
        window.CJMusicPlayer.init({ autoplayIntent: true });
      }

      // La dissolvenza parte solo a cartoncino completamente rivelato: lo
      // slide del cartoncino (ritardo 350ms + durata 1400ms) finisce a
      // ~1750ms; aggiungiamo una breve pausa di lettura di 1.2 secondi
      // prima di far sfumare via l'intera schermata verso la home.
      setTimeout(function () {
        invitoScreen.classList.add('is-hidden');
        home.classList.add('is-visible');
        home.setAttribute('tabindex', '-1');
        home.focus({ preventScroll: true });
        document.body.classList.add('site-entered');
      }, 2950);

      invitoScreen.setAttribute('aria-hidden', 'true');
    }

    invitoScreen.addEventListener('click', openInvito);
    invitoScreen.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openInvito();
      }
    });
  });
})();