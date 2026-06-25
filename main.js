/* RSD shared interactions. Minimal motion, progressive enhancement. */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Sticky header + scroll progress bar + back-to-top */
  var header = document.querySelector('.site-header');

  var bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.appendChild(bar);

  var toTop = document.createElement('button');
  toTop.className = 'to-top';
  toTop.setAttribute('aria-label', 'Back to top');
  toTop.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  document.body.appendChild(toTop);
  toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  });

  function onScroll() {
    var y = window.scrollY;
    if (header) header.classList.toggle('scrolled', y > 24);
    var doc = document.documentElement;
    var max = doc.scrollHeight - doc.clientHeight;
    bar.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    toTop.classList.toggle('show', y > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();

  /* Cursor-follow spotlight on cards */
  if (!reduce && window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.scard, .pcard, .project').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  }

  /* Mobile nav */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    var overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    function setMenu(open) {
      nav.classList.toggle('open', open);
      header.classList.toggle('menu-open', open);
      overlay.classList.toggle('show', open);
      document.documentElement.style.overflow = open ? 'hidden' : '';
      toggle.setAttribute('aria-expanded', open);
    }

    toggle.addEventListener('click', function () { setMenu(!nav.classList.contains('open')); });
    overlay.addEventListener('click', function () { setMenu(false); });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });
  }

  /* Scroll reveal */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* Project filter + expand (projects page) */
  var filters = document.querySelectorAll('.filter');
  var projects = document.querySelectorAll('.project');
  if (filters.length) {
    filters.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filters.forEach(function (f) { f.classList.remove('active'); });
        btn.classList.add('active');
        var sector = btn.dataset.filter;
        projects.forEach(function (p) {
          var show = sector === 'all' || p.dataset.sector === sector;
          p.classList.toggle('hide', !show);
        });
      });
    });
  }
  projects.forEach(function (p) {
    p.addEventListener('click', function () { p.classList.toggle('open'); });
  });

  /* Contact form: demo only, no backend wired yet */
  var form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = form.querySelector('.form-note');
      if (note) {
        note.textContent = 'Thank you. This is a draft form. Connect it to email or a form service before launch.';
        note.style.color = '#0C7B74';
      }
      form.reset();
    });
  }
})();
