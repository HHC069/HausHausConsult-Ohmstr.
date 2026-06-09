/*
  HausHoch Consult - Animation Layer only
  Adds scroll reveal, subtle 3D hover and parallax effects to the existing website.
  It does not alter text, colors, fonts, layout, images or content.
*/
(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  root.classList.add('hhc-motion-ready');

  var excludedSelector = [
    '[class*="cookie" i]', '[id*="cookie" i]',
    '[class*="consent" i]', '[id*="consent" i]',
    '[class*="modal" i]', '[id*="modal" i]',
    '[role="dialog"]', 'script', 'style', 'noscript'
  ].join(',');

  function isVisible(el) {
    if (!el || el.matches(excludedSelector)) return false;
    var rect = el.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }

  function safeQuery(selector) {
    return Array.prototype.slice.call(document.querySelectorAll(selector)).filter(isVisible);
  }

  function addReveal() {
    var selectors = [
      'main section', 'section', 'article',
      'h1', 'h2', 'h3',
      'p', 'ul', 'ol',
      'img', 'picture', 'figure',
      'a[href]', 'button',
      '[class*="card" i]', '[class*="box" i]', '[class*="teaser" i]', '[class*="container" i]'
    ];

    var elements = safeQuery(selectors.join(','));
    elements.forEach(function (el, index) {
      if (el.closest(excludedSelector)) return;
      if (el.classList.contains('hhc-reveal')) return;

      el.classList.add('hhc-reveal');
      if (index % 7 === 0) el.setAttribute('data-hhc-reveal', 'zoom');
      else if (index % 5 === 0) el.setAttribute('data-hhc-reveal', 'left');
      else if (index % 6 === 0) el.setAttribute('data-hhc-reveal', 'right');
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('hhc-in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.13, rootMargin: '0px 0px -8% 0px' });

    safeQuery('.hhc-reveal').forEach(function (el) { observer.observe(el); });
  }

  function addTilt() {
    var candidates = safeQuery([
      'a[href]', 'button',
      '[class*="card" i]', '[class*="box" i]', '[class*="teaser" i]',
      'article', 'figure'
    ].join(','));

    candidates.forEach(function (el) {
      if (el.closest(excludedSelector)) return;
      var rect = el.getBoundingClientRect();
      if (rect.width < 80 || rect.height < 40) return;
      el.classList.add('hhc-tilt');

      el.addEventListener('pointermove', function (event) {
        var r = el.getBoundingClientRect();
        var x = (event.clientX - r.left) / r.width;
        var y = (event.clientY - r.top) / r.height;
        var rotateY = (x - 0.5) * 7;
        var rotateX = (0.5 - y) * 7;
        el.style.setProperty('--hhc-tilt-x', rotateX.toFixed(2) + 'deg');
        el.style.setProperty('--hhc-tilt-y', rotateY.toFixed(2) + 'deg');
        el.style.setProperty('--hhc-tilt-z', '2px');
        el.classList.add('hhc-tilt-active');
      }, { passive: true });

      el.addEventListener('pointerleave', function () {
        el.style.setProperty('--hhc-tilt-x', '0deg');
        el.style.setProperty('--hhc-tilt-y', '0deg');
        el.style.setProperty('--hhc-tilt-z', '0px');
        el.classList.remove('hhc-tilt-active');
      }, { passive: true });
    });
  }

  function addParallaxAndProgress() {
    var parallaxElements = safeQuery('img, picture, figure, [class*="hero" i], [class*="banner" i], [class*="image" i]')
      .filter(function (el) {
        var r = el.getBoundingClientRect();
        return r.width >= 180 && r.height >= 90 && !el.closest(excludedSelector);
      })
      .slice(0, 40);

    parallaxElements.forEach(function (el) { el.classList.add('hhc-parallax'); });

    var progress = document.createElement('div');
    progress.className = 'hhc-scroll-progress';
    progress.setAttribute('aria-hidden', 'true');
    document.body.appendChild(progress);

    var ticking = false;
    function update() {
      var y = window.scrollY || window.pageYOffset || 0;
      var max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      root.style.setProperty('--hhc-scroll-progress', Math.min(1, y / max).toString());

      parallaxElements.forEach(function (el, index) {
        var r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        var intensity = index % 2 === 0 ? 0.035 : -0.025;
        var offset = (r.top - window.innerHeight / 2) * intensity;
        el.style.setProperty('--hhc-parallax-y', offset.toFixed(2) + 'px');
      });

      ticking = false;
    }

    function requestUpdate() {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate, { passive: true });
    update();
  }

  function addNavMotion() {
    var nav = document.querySelector('header, nav, [class*="header" i], [class*="nav" i]');
    if (!nav || nav.closest(excludedSelector)) return;
    nav.classList.add('hhc-nav-lift');

    var lastY = window.scrollY || 0;
    var ticking = false;
    function updateNav() {
      var y = window.scrollY || 0;
      if (y > lastY && y > 140) nav.classList.add('hhc-nav-hidden');
      else nav.classList.remove('hhc-nav-hidden');
      lastY = y;
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(updateNav);
        ticking = true;
      }
    }, { passive: true });
  }

  function init() {
    addReveal();
    addTilt();
    addParallaxAndProgress();
    addNavMotion();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
