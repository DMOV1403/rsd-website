// Shared interactions for all RSD pages
(function () {
  // --- header: solid background once scrolled past the top ---
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // --- mobile nav ---
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- scroll reveal ---
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.14 });
  document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

  // --- projects filter (projects page) ---
  var filters = document.querySelectorAll('.filter');
  if (filters.length) {
    filters.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filters.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var f = btn.getAttribute('data-filter');
        document.querySelectorAll('.project').forEach(function (card) {
          var match = f === 'all' || card.getAttribute('data-sector') === f;
          card.classList.toggle('hide', !match);
        });
      });
    });
  }

  // --- contact form (no backend: hand off to the visitor's email app) ---
  var form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.querySelector('#name').value.trim();
      var company = form.querySelector('#company').value.trim();
      var email = form.querySelector('#email').value.trim();
      var message = form.querySelector('#message').value.trim();
      var subject = 'Website enquiry from ' + name + (company ? ' (' + company + ')' : '');
      var body = message + '\n\n' + name + (company ? ', ' + company : '') + '\n' + email;
      var note = form.querySelector('.form-note');
      if (note) {
        note.style.color = 'var(--teal)';
        note.textContent = 'Opening your email app to send the message…';
      }
      window.location.href = 'mailto:hello@rsd.services?subject=' +
        encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
  }
})();
