/* ============================================================
   Typed.js — hero role text
   ============================================================ */
new Typed('#typed-text', {
  strings: ['Mobile Developer', 'Flutter Developer', 'Software Engineer', 'Problem Solver'],
  typeSpeed: 65,
  backSpeed: 35,
  backDelay: 1800,
  loop: true,
  cursorChar: '|',
});

/* ============================================================
   Sticky header
   ============================================================ */
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
  updateActiveSection();
});

/* ============================================================
   Mobile menu
   ============================================================ */
const menuBtn = document.getElementById('menuBtn');
const navbar  = document.getElementById('navbar');

menuBtn.addEventListener('click', () => {
  const isOpen = menuBtn.classList.toggle('open');
  navbar.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

function closeMobileMenu() {
  menuBtn.classList.remove('open');
  navbar.classList.remove('open');
  document.body.style.overflow = '';
}

/* ============================================================
   Smooth scroll for nav links & in-page anchors
   ============================================================ */
document.querySelectorAll('.nav-link, .scroll-to').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;

    e.preventDefault();
    closeMobileMenu();

    setTimeout(() => {
      if (href === '#home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const target = document.querySelector(href);
        if (target) {
          const offset = target.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: offset, behavior: 'smooth' });
        }
      }
    }, 150);
  });
});

/* ============================================================
   Active nav link tracking
   ============================================================ */
function updateActiveSection() {
  const scrollPos = window.scrollY;
  const navLinks  = document.querySelectorAll('.nav-link');

  if (scrollPos < 80) {
    navLinks.forEach(l => l.classList.remove('active'));
    document.querySelector('.nav-link[href="#home"]')?.classList.add('active');
    return;
  }

  document.querySelectorAll('section[id]').forEach(section => {
    const top    = section.offsetTop - 100;
    const bottom = top + section.offsetHeight;

    if (scrollPos >= top && scrollPos < bottom) {
      navLinks.forEach(l => l.classList.remove('active'));
      document.querySelector(`.nav-link[href="#${section.id}"]`)?.classList.add('active');
    }
  });
}

/* ============================================================
   ScrollReveal animations
   ============================================================ */
const sr = ScrollReveal({
  distance: '40px',
  duration: 750,
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
  reset: false,
});

sr.reveal('.hero-greeting', { origin: 'bottom', delay: 100 });
sr.reveal('.hero-name',     { origin: 'bottom', delay: 180 });
sr.reveal('.hero-role',     { origin: 'bottom', delay: 260 });
sr.reveal('.hero-desc',     { origin: 'bottom', delay: 320 });
sr.reveal('.hero-actions',  { origin: 'bottom', delay: 380 });
sr.reveal('.social-links',  { origin: 'bottom', delay: 440 });
sr.reveal('.hero-image',    { origin: 'right',  delay: 200 });

sr.reveal('.reveal-up',    { origin: 'bottom', interval: 80 });
sr.reveal('.reveal-left',  { origin: 'left',   delay: 100 });
sr.reveal('.reveal-right', { origin: 'right',  delay: 150 });

sr.reveal('.skill-category', { origin: 'bottom', interval: 80 });
sr.reveal('.project-card',   { origin: 'bottom', interval: 100 });
sr.reveal('.timeline-item',  { origin: 'bottom', interval: 80 });

/* ============================================================
   Contact form → Google Sheets
   ============================================================ */
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzUSaaX3XmlE5m9YLOHOBrRuCh2Ohv49N9bs4bew7xPd1qlgpvXtnudDs5Xhp3jF-Fx/exec';
const form       = document.forms['submitToGoogleSheet'];
const msgEl      = document.getElementById('msg');

form.addEventListener('submit', async e => {
  e.preventDefault();

  const submitBtn = form.querySelector('.submit-btn');
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Sending…';

  try {
    await fetch(SCRIPT_URL, { method: 'POST', body: new FormData(form) });
    msgEl.textContent = '✓ Message sent successfully!';
    form.reset();
  } catch (err) {
    msgEl.textContent = '✗ Failed to send. Please try again.';
    console.error('Form error:', err);
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fa fa-paper-plane"></i> Send Message';
    setTimeout(() => { msgEl.textContent = ''; }, 5000);
  }
});
