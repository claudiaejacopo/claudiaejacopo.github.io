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

      // Il cordoncino si scioglie e il sigillo si frattura insieme, non
      // appena si clicca (~0.75s); solo dopo, a busta "slegata", la falda
      // puo' scivolare via verso l'alto ed uscire dallo schermo (il
      // ritardo/durata della falda e' gestito via CSS con
      // animation-delay, cosi' i due movimenti restano sincronizzati
      // anche se il timing dell'animazione cambia in futuro).
      seal.classList.add('is-open');
      if (envelope) envelope.classList.add('is-open');

      // Avvia la musica: questo click e' un vero "user gesture", quindi
      // l'autoplay del browser lo consente in modo affidabile.
      if (window.CJMusicPlayer) {
        window.CJMusicPlayer.init({ autoplayIntent: true });
      }

      // La dissolvenza parte solo a busta completamente aperta: la falda
      // (ritardo 400ms + durata 1500ms) finisce a ~1900ms; aggiungiamo
      // una pausa di ~350ms prima di far sfumare via l'intera schermata.
      setTimeout(function () {
        invitoScreen.classList.add('is-hidden');
        home.classList.add('is-visible');
        home.setAttribute('tabindex', '-1');
        home.focus({ preventScroll: true });
        document.body.classList.add('site-entered');
      }, 2250);

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
