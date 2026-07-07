const siteHeaderHtml = `
  <div class="max-w-screen-xxl mx-auto flex justify-center items-center gap-16 px-5 md:px-16 py-4 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30">
    <a class="font-display text-headline-sm md:text-headline-md text-primary italic" href="homepage.html">C & J</a>
    <nav class="hidden md:flex gap-8 items-center">
      <a href="homepage.html" class="font-label-lg uppercase tracking-widest text-on-surface-variant">Home</a>
      <a href="programma.html" class="font-label-lg uppercase tracking-widest text-on-surface-variant">Programma</a>
      <a href="rsvp.html" class="font-label-lg uppercase tracking-widest text-on-surface-variant">RSVP</a>
      <a href="lista-nozze.html" class="font-label-lg uppercase tracking-widest text-on-surface-variant">Lista Nozze</a>
    </nav>
  </div>
`;

document.addEventListener('DOMContentLoaded', ()=>{
  const header = document.getElementById('site-header');
  if (!header) return;
  header.innerHTML = siteHeaderHtml;
});