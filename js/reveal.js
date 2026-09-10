/* =========================================================
   Claudia & Jacopo - Scroll reveal (fade/slide-up)

   Lo stato "nascosto" iniziale e' interamente gestito dal CSS
   (selettore html.js-reveal main section, html.js-reveal main .card),
   attivato da uno script inline sincrono in <head> PRIMA del primo
   paint. Questo script si occupa solo di rivelare gli elementi
   (classe .reveal-visible) quando entrano in viewport, o subito se
   l'osservazione non e' possibile/opportuna.
   ========================================================= */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var targets = document.querySelectorAll('main section, main .card');
    if (!targets.length) return;

    var reduceMotion = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Se il movimento ridotto e' richiesto o IntersectionObserver non e'
    // supportato, rivela tutto subito: il CSS gestisce gia' questo caso
    // per reduced-motion, ma aggiungiamo comunque la classe per coerenza
    // e per coprire il caso "niente IntersectionObserver".
    if (reduceMotion || !('IntersectionObserver' in window)) {
      targets.forEach(function (el) {
        el.classList.add('reveal-visible');
      });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(function (el) {
      io.observe(el);
    });
  });
})();
