/* Gestione toggle del menu di navigazione su mobile (overlay fullscreen) */
(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.querySelector('[data-nav-toggle]');
    const nav = document.querySelector('[data-site-nav]');
    if (!toggle || !nav) return;

    function setOpen(isOpen) {
      nav.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggle.textContent = isOpen ? '✕' : '☰';
      document.body.classList.toggle('nav-open-lock', isOpen);
    }

    toggle.addEventListener('click', function () {
      setOpen(!nav.classList.contains('open'));
    });

    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function (e) {
        // Naviga verso un'altra pagina (non un'ancora sulla pagina corrente):
        // rimanda la navigazione a dopo la chiusura del menu per evitare che
        // il cambio pagina interrompa a metà l'animazione, creando un salto.
        // Rilevante solo quando il menu overlay mobile è effettivamente
        // aperto: su desktop (o menu già chiuso) il link segue il normale
        // comportamento, senza ritardi.
        const isSamePageAnchor = link.pathname === window.location.pathname && link.hash;
        const isMenuOpen = nav.classList.contains('open');

        if (!isMenuOpen || isSamePageAnchor || prefersReducedMotion) {
          setOpen(false);
          return;
        }

        e.preventDefault();
        const destination = link.href;
        let navigated = false;
        const goToDestination = function () {
          if (navigated) return;
          navigated = true;
          window.location.href = destination;
        };

        nav.addEventListener('transitionend', goToDestination, { once: true });
        // Fallback nel caso transitionend non scatti (es. proprietà non transizionata).
        setTimeout(goToDestination, 400);

        setOpen(false);
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        setOpen(false);
      }
    });
  });
})();
