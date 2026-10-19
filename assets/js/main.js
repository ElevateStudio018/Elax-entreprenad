(function () {
  var CONTACT_EMAIL = 'info@elax.se';

  // Mobilmeny
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  var header = document.querySelector('.header');
  function closeMenu() {
    nav.classList.remove('is-open');
    header.classList.remove('menu-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.textContent = 'Meny';
    document.body.style.overflow = '';
  }
  burger.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    header.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.textContent = open ? 'Stäng' : 'Meny';
    document.body.style.overflow = open ? 'hidden' : '';
  });
  nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeMenu); });

  // Vitt sidhuvud när man scrollat förbi toppen av heron
  function onScroll() { header.classList.toggle('is-scrolled', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Förval av uppdragstyp när man klickar från en tjänst
  var typ = document.getElementById('typ');
  document.querySelectorAll('[data-service]').forEach(function (el) {
    el.addEventListener('click', function () { typ.value = el.getAttribute('data-service'); });
  });

  // Fade-in vid scroll
  var targets = document.querySelectorAll('.section-head, .card, .step, .about__grid > *, .contact__grid > *');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    targets.forEach(function (t) { t.classList.add('reveal'); io.observe(t); });
  }

  // Kontaktformulär – öppnar e-postklienten med ifylld förfrågan
  var form = document.getElementById('contact-form');
  var note = document.getElementById('form-note');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var valid = true;
    form.querySelectorAll('[required]').forEach(function (f) {
      var ok = f.value.trim() !== '' && (f.type !== 'email' || /\S+@\S+\.\S+/.test(f.value));
      f.classList.toggle('is-invalid', !ok);
      if (!ok) valid = false;
    });
    if (!valid) { note.textContent = 'Fyll i namn, en giltig e-postadress och ett meddelande.'; return; }

    var d = new FormData(form);
    var subject = 'Offertförfrågan – ' + d.get('typ');
    var body = 'Namn: ' + d.get('namn') + '\nTelefon: ' + d.get('telefon') + '\nE-post: ' + d.get('epost') +
      '\nTyp av uppdrag: ' + d.get('typ') + '\n\n' + d.get('meddelande');
    window.location.href = 'mailto:' + CONTACT_EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    note.textContent = 'Tack! Ditt e-postprogram öppnas med förfrågan ifylld. Du kan också ringa 076-033 41 41.';
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
