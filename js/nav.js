/* ============================================
   maramotto.com — Nav interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ----- 1. Logo letter wave (every 10s) ----- */
  const logo = document.querySelector('.nav__logo');
  if (logo) {
    // Wrap each letter in a span, preserving the <span> child for "motto"
    const raw = logo.innerHTML;            // e.g. mara<span>motto</span>
    // Build letter spans from full text "maramotto"
    const fullText = logo.textContent;     // "maramotto"
    logo.innerHTML = '';
    fullText.split('').forEach((char, i) => {
      const s = document.createElement('span');
      s.className = 'nav__logo-letter';
      s.textContent = char;
      s.style.setProperty('--i', i);
      logo.appendChild(s);
    });

    function triggerWave() {
      const letters = logo.querySelectorAll('.nav__logo-letter');
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
    const dropdown = item.querySelector('.nav__dropdown');
    const arrow = btn.querySelector('.nav__dropdown-arrow');

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = item.classList.toggle('dropdown-open');
      arrow.setAttribute('aria-expanded', isOpen);
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
    toggle.addEventListener('click', () => {
      links.classList.toggle('active');
    });
  }

});
