/* =========================================================
   Claudia & Jacopo — Apertura del sigillo d'invito
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

      // Il sigillo si frattura per primo, poi la falda si solleva come se
      // si stesse aprendo una vera busta con cera lacca.
      seal.classList.add('is-open');
      setTimeout(function () {
        if (envelope) envelope.classList.add('is-open');
      }, 260);

      // Avvia la musica: questo click e' un vero "user gesture", quindi
      // l'autoplay del browser lo consente in modo affidabile.
      if (window.CJMusicPlayer) {
        window.CJMusicPlayer.init({ autoplayIntent: true });
      }

      // La busta si apre (sigillo che si spacca + falda che si solleva)
      // e poi l'intera schermata dissolve, lasciando spazio al sito.
      setTimeout(function () {
        invitoScreen.classList.add('is-hidden');
        home.classList.add('is-visible');
        home.setAttribute('tabindex', '-1');
        home.focus({ preventScroll: true });
        document.body.classList.add('site-entered');
      }, 1300);

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
