const siteHeaderHtml = `
  <div class="max-w-screen-xl mx-auto flex items-center justify-between px-margin-mobile md:px-margin-desktop py-4 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30">
    <a class="font-display text-headline-sm md:text-headline-md text-primary italic" href="homepage.html">C &amp; J</a>
    <nav class="hidden md:flex gap-md items-center">
      <a class="font-label-lg text-label-lg uppercase tracking-widest text-secondary border-b border-secondary hover:text-secondary transition-colors duration-300" href="homepage.html">Home</a>
      <a class="font-label-lg text-label-lg uppercase tracking-widest text-on-surface-variant hover:text-secondary transition-colors duration-300" href="programma.html">Programma</a>
      <a class="font-label-lg text-label-lg uppercase tracking-widest text-on-surface-variant hover:text-secondary transition-colors duration-300" href="rsvp.html">RSVP</a>
      <a class="font-label-lg text-label-lg uppercase tracking-widest text-on-surface-variant hover:text-secondary transition-colors duration-300" href="lista-nozze.html">Lista Nozze</a>
    </nav>
    <button class="md:hidden text-primary p-2" id="mobile-menu-btn" type="button" aria-label="Apri menu">
      <span class="material-symbols-outlined text-3xl">menu</span>
    </button>
    <a class="hidden md:inline-flex bg-primary px-6 py-2 text-on-primary font-label-lg text-label-lg uppercase tracking-widest hover:bg-primary/90 transition-all" href="rsvp.html">RSVP</a>
  </div>
  <div class="fixed inset-0 z-[60] bg-surface/95 translate-x-full transition-transform duration-500 ease-in-out md:hidden" id="mobile-menu">
    <div class="flex flex-col h-full p-margin-mobile">
      <div class="flex justify-between items-center mb-xl">
        <span class="font-display text-headline-md text-primary italic">C &amp; J</span>
        <button class="text-primary" id="close-menu-btn" type="button" aria-label="Chiudi menu">
          <span class="material-symbols-outlined text-3xl">close</span>
        </button>
      </div>
      <div class="flex flex-col gap-lg">
        <a class="mobile-nav-link font-display text-headline-lg text-primary border-b border-outline-variant pb-2" href="homepage.html">Home</a>
        <a class="mobile-nav-link font-display text-headline-lg text-on-surface-variant border-b border-outline-variant pb-2" href="programma.html">Programma</a>
        <a class="mobile-nav-link font-display text-headline-lg text-on-surface-variant border-b border-outline-variant pb-2" href="rsvp.html">RSVP</a>
        <a class="mobile-nav-link font-display text-headline-lg text-on-surface-variant border-b border-outline-variant pb-2" href="lista-nozze.html">Lista Nozze</a>
      </div>
      <div class="mt-auto py-lg">
        <a class="block w-full bg-primary text-on-primary py-4 rounded-full font-label-lg text-label-lg uppercase tracking-widest text-center" href="rsvp.html">RSVP Ora</a>
      </div>
    </div>
  </div>
`;

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('site-header');
  if (!header) return;

  header.innerHTML = siteHeaderHtml;

  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const closeMenuBtn = document.getElementById('close-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const toggleMenu = () => {
    mobileMenu?.classList.toggle('translate-x-full');
    document.body.classList.toggle('overflow-hidden');
  };

  mobileMenuBtn?.addEventListener('click', toggleMenu);
  closeMenuBtn?.addEventListener('click', toggleMenu);
  mobileNavLinks.forEach((link) => link.addEventListener('click', toggleMenu));

  window.addEventListener('scroll', () => {
    const currentHeader = document.querySelector('#site-header > div');
    if (!currentHeader) return;
    if (window.scrollY > 50) {
      currentHeader.classList.add('py-2', 'shadow-sm');
      currentHeader.classList.remove('py-4');
    } else {
      currentHeader.classList.remove('py-2', 'shadow-sm');
      currentHeader.classList.add('py-4');
    }
  });
});