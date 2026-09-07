/* =========================================================
   Claudia & Jacopo — Apertura della lettera d'invito
   ========================================================= */

(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const invitoScreen = document.querySelector('[data-invito-screen]');
    const envelope = document.querySelector('[data-envelope]');
    const home = document.getElementById('home');

    if (!invitoScreen || !envelope || !home) return;

    let opened = false;

    function openInvito() {
      if (opened) return;
      opened = true;

      envelope.classList.add('is-open');

      // Avvia la musica: questo click e' un vero "user gesture", quindi
      // l'autoplay del browser lo consente in modo affidabile.
      if (window.CJMusicPlayer) {
        window.CJMusicPlayer.init({ autoplayIntent: true });
      }

      setTimeout(function () {
        invitoScreen.classList.add('is-hidden');
        home.classList.add('is-visible');
        home.setAttribute('tabindex', '-1');
        home.focus({ preventScroll: true });
        document.body.classList.add('site-entered');
      }, 900);

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
