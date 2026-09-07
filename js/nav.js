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

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
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
