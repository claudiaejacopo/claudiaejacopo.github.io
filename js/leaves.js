/* =========================================================
   Claudia & Jacopo — Foglie autunnali cadenti (decorazione)
   ========================================================= */
(function () {
  var LEAF_COLORS = ['#b5502d', '#c9a24b', '#7a3b3b', '#8a9575', '#c1653f'];

  var LEAF_PATH = 'M12 2C7 6 3 10 3 15a9 9 0 0018 0c0-5-4-9-9-13z';

  function makeLeaf(color) {
    var svgNS = 'http://www.w3.org/2000/svg';
    var svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('viewBox', '0 0 24 24');
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

      var size = 14 + Math.random() * 14;
      var duration = 11 + Math.random() * 9;
      var delay = -(Math.random() * duration);
      var drift = Math.round(Math.random() * 90 - 45);

      leaf.style.left = Math.random() * 100 + '%';
      leaf.style.width = size + 'px';
      leaf.style.height = size + 'px';
      leaf.style.setProperty('--leaf-drift', drift + 'px');
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
