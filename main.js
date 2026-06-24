/* RSD shared interactions. Minimal motion, progressive enhancement. */
(function () {
  'use strict';

  /* Sticky header + scroll progress bar */
  var header = document.querySelector('.site-header');
  var bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.appendChild(bar);

  function onScroll() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 24);
    var doc = document.documentElement;
    var max = doc.scrollHeight - doc.clientHeight;
    bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();

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
        note.style.color = '#7c9bff';
      }
      form.reset();
    });
  }
})();
