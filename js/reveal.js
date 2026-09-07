/* =========================================================
   Claudia & Jacopo — Scroll reveal (fade/slide-up)
   ========================================================= */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    var reduceMotion = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var targets = document.querySelectorAll('main section, main .card');
    if (!targets.length) return;

    if (reduceMotion) {
      return;
    }

    if (!('IntersectionObserver' in window)) {
      return;
    }

    targets.forEach(function (el) {
      el.classList.add('reveal-init');
    });

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
