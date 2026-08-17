/* Small progressive enhancements. The page works fine without this file. */
(function () {
  'use strict';

  // Mark that JS is on, so CSS can safely hide .reveal elements before animating
  // them in. Without JS, sections stay visible.
  document.documentElement.classList.add('js');

  // Keep the footer copyright year current.
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  var sections = document.querySelectorAll('.reveal');

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion || !('IntersectionObserver' in window)) {
    for (var i = 0; i < sections.length; i++) {
      sections[i].classList.add('is-visible');
    }
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });

  sections.forEach(function (section) { observer.observe(section); });
})();
