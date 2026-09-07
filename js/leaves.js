/* =========================================================
   Claudia & Jacopo — Foglie autunnali cadenti (decorazione)
   ========================================================= */
(function () {
  var LEAF_COLORS = ['#c99a7c', '#d9c193', '#b98f80', '#a9b39a', '#c7a583'];

  // Silhouette di foglia d'acero (contorno realistico, non stellare).
  var LEAF_PATH =
    'M36 20.917c0-.688-2.895-.5-3.125-1s3.208-4.584 2.708-5.5' +
    '-5.086 1.167-5.375.708c-.288-.458.292-3.5-.208-3.875s-5.25 4.916-5.917 4.292' +
    'c-.666-.625 1.542-10.5 1.086-10.698-.456-.198-3.419 1.365-3.793 1.282C21.002 6.042 18.682 0 18 0' +
    's-3.002 6.042-3.376 6.125c-.374.083-3.337-1.48-3.793-1.282-.456.198 1.752 10.073 1.085 10.698' +
    'C11.25 16.166 6.5 10.875 6 11.25s.08 3.417-.208 3.875c-.289.458-4.875-1.625-5.375-.708s2.939 5 2.708 5.5' +
    '-3.125.312-3.125 1 8.438 5.235 9 5.771c.562.535-2.914 2.802-2.417 3.229.576.496 3.839-.83 10.417-.957V35' +
    'c0 .553.448 1 1 1 .553 0 1-.447 1-1v-6.04c6.577.127 9.841 1.453 10.417.957.496-.428-2.979-2.694-2.417-3.229' +
    'c.562-.536 9-5.084 9-5.771z';

  function makeLeaf(color) {
    var svgNS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 36 36');
    var path = document.createElementNS(svgNS, 'path');
    path.setAttribute('d', LEAF_PATH);
    path.setAttribute('fill', color);
    svg.appendChild(path);
    return svg;
  }

  function populate(container) {
    var count = parseInt(container.getAttribute('data-leaves'), 10) || 10;
    for (var i = 0; i < count; i++) {
      var leaf = document.createElement('span');
      leaf.className = 'leaf';
      leaf.setAttribute('aria-hidden', 'true');

      var size = 14 + Math.random() * 13;
      var duration = 13 + Math.random() * 10;
      var delay = -(Math.random() * duration);
      var drift = Math.round(Math.random() * 90 - 45);
      var rotateStart = Math.round(Math.random() * 60 - 30);

      leaf.style.left = Math.random() * 100 + '%';
      leaf.style.width = size + 'px';
      leaf.style.height = size + 'px';
      leaf.style.setProperty('--leaf-drift', drift + 'px');
      leaf.style.setProperty('--leaf-rotate-start', rotateStart + 'deg');
      leaf.style.animationDuration = duration + 's';
      leaf.style.animationDelay = delay + 's';

      leaf.appendChild(makeLeaf(LEAF_COLORS[i % LEAF_COLORS.length]));
      container.appendChild(leaf);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var reduceMotion = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    document.querySelectorAll('[data-leaves]').forEach(populate);
  });
})();
