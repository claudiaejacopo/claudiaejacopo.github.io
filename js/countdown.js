/* =========================================================
   Claudia & Jacopo — Countdown al matrimonio (14 Ottobre 2027)
   ========================================================= */

(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const el = document.querySelector('[data-countdown]');
    if (!el) return;

    const WEDDING_DATE = new Date('2027-10-14T11:00:00');
    const daysEl = el.querySelector('[data-cd-days]');
    const hoursEl = el.querySelector('[data-cd-hours]');
    const minsEl = el.querySelector('[data-cd-mins]');
    const secsEl = el.querySelector('[data-cd-secs]');

    function update() {
      const now = new Date();
      let diff = WEDDING_DATE.getTime() - now.getTime();

      if (diff <= 0) {
        el.innerHTML = '<p class="countdown-arrived">Oggi è il grande giorno! 🍂</p>';
        clearInterval(timer);
        return;
      }

      const day = Math.floor(diff / (1000 * 60 * 60 * 24));
      diff -= day * (1000 * 60 * 60 * 24);
      const hour = Math.floor(diff / (1000 * 60 * 60));
      diff -= hour * (1000 * 60 * 60);
      const min = Math.floor(diff / (1000 * 60));
      diff -= min * (1000 * 60);
      const sec = Math.floor(diff / 1000);

      if (daysEl) daysEl.textContent = day;
      if (hoursEl) hoursEl.textContent = String(hour).padStart(2, '0');
      if (minsEl) minsEl.textContent = String(min).padStart(2, '0');
      if (secsEl) secsEl.textContent = String(sec).padStart(2, '0');
    }

    update();
    const timer = setInterval(update, 1000);
  });
})();
