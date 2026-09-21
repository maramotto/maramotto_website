/* ============================================
   maramotto.com — Nav interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----- 1. Logo letter wave (every 10s) ----- */
  // The 9 letters are separate <g class="nav__logo-letter"> groups in the
  // brand SVG (see partials/nav.njk) — no DOM construction needed here.
  const logo = document.querySelector('.nav__logo');
  if (logo && !prefersReducedMotion) {
    const letters = logo.querySelectorAll('.nav__logo-letter');

    function triggerWave() {
      letters.forEach(l => l.classList.remove('wave'));
      // Force reflow so animation restarts
      void logo.offsetWidth;
      letters.forEach(l => l.classList.add('wave'));
    }

    // First wave after 3s, then every 10s
    setTimeout(triggerWave, 3000);
    setInterval(triggerWave, 10000);
  }


  /* ----- 2. Dropdown toggle (triangle click) ----- */
  document.querySelectorAll('.nav__dropdown-toggle').forEach(btn => {
    const item = btn.closest('.nav__item');

    btn.setAttribute('aria-expanded', 'false');

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = item.classList.toggle('dropdown-open');
      btn.setAttribute('aria-expanded', isOpen);
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    document.querySelectorAll('.nav__item.dropdown-open').forEach(item => {
      if (!item.contains(e.target)) {
        item.classList.remove('dropdown-open');
      }
    });
  });


  /* ----- 3. Triangle shake on mouse proximity ----- */
  document.querySelectorAll('.nav__item').forEach(item => {
    const arrow = item.querySelector('.nav__dropdown-arrow');
    if (!arrow) return;

    item.addEventListener('mouseenter', () => {
      if (!item.classList.contains('dropdown-open')) {
        arrow.classList.add('shake');
      }
    });

    item.addEventListener('mouseleave', () => {
      arrow.classList.remove('shake');
    });
  });


  /* ----- 4. Mobile hamburger ----- */
  const toggle = document.querySelector('.nav__toggle');
  const links = document.querySelector('.nav__links');
  if (toggle && links) {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.addEventListener('click', () => {
      const isOpen = links.classList.toggle('active');
      toggle.setAttribute('aria-expanded', isOpen);
    });
  }

});
