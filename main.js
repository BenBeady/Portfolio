/* ============================================================
   Benjamen Beady — Portfolio  |  js/main.js
   ============================================================ */

/* ─── SCROLL REVEAL ──────────────────────────────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal, .stagger').forEach((el) => {
  revealObserver.observe(el);
});

/* ─── HEADER — scroll shadow ─────────────────────────────── */
const header = document.querySelector('header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
window.addEventListener('scroll', onScroll, { passive: true });

/* ─── MOBILE NAV TOGGLE ──────────────────────────────────── */
const navToggle = document.querySelector('.nav-toggle');
const nav       = document.querySelector('header nav');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  });

  // Close on link click
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!header.contains(e.target)) {
      nav.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ─── TYPING EFFECT (index page) ────────────────────────── */
const typedText = document.querySelector('.typed-text');
if (typedText) {
  const words   = ['Web Developer.', 'Full Stack Dev.', 'Problem Solver.', 'Clean Code Advocate.'];
  let wordIdx   = 0;
  let charIdx   = 0;
  let deleting  = false;
  let pausing   = false;

  function type() {
    if (pausing) return;

    const word = words[wordIdx];

    if (deleting) {
      typedText.textContent = word.slice(0, charIdx - 1);
      charIdx--;
    } else {
      typedText.textContent = word.slice(0, charIdx + 1);
      charIdx++;
    }

    if (!deleting && charIdx === word.length) {
      pausing = true;
      setTimeout(() => { deleting = true; pausing = false; type(); }, 2200);
      return;
    }

    if (deleting && charIdx === 0) {
      deleting = false;
      wordIdx  = (wordIdx + 1) % words.length;
    }

    setTimeout(type, deleting ? 55 : 100);
  }

  setTimeout(type, 1200);
}

/* ─── ACTIVE NAV LINK ────────────────────────────────────── */
(function markActiveNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('nav a').forEach((a) => {
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.style.color = 'var(--primary)';
    }
  });
})();
