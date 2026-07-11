const lb=document.getElementById('lightbox');const img=lb.querySelector('img');document.querySelectorAll('[data-full]').forEach(el=>{el.addEventListener('click',()=>{img.src=el.dataset.full;lb.classList.add('open')})});lb.querySelector('button').addEventListener('click',()=>lb.classList.remove('open'));lb.addEventListener('click',e=>{if(e.target===lb)lb.classList.remove('open')});document.addEventListener('keydown',e=>{if(e.key==='Escape')lb.classList.remove('open')});

// Versione 1.2 — navigazione mobile, animazioni e link attivo.
(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav .nav-links');
  const navLinks = [...document.querySelectorAll('.site-nav .nav-links a[href^="#"]')];

  const closeMenu = () => {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Apri menu');
    nav.classList.remove('open');
    document.body.classList.remove('menu-open');
  };

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const opening = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(opening));
      toggle.setAttribute('aria-label', opening ? 'Chiudi menu' : 'Apri menu');
      nav.classList.toggle('open', opening);
      document.body.classList.toggle('menu-open', opening);
    });

    navLinks.forEach(link => link.addEventListener('click', closeMenu));
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) closeMenu();
    });
  }

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -35px 0px' });
    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  const sections = navLinks
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const sectionObserver = new IntersectionObserver(entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === `#${visible.target.id}`
        );
      });
    }, { threshold: [0.15, 0.35], rootMargin: '-20% 0px -60% 0px' });
    sections.forEach(section => sectionObserver.observe(section));
  }

  const backTop = document.querySelector('.back-to-top');
  if (backTop) {
    const updateBackTop = () => backTop.classList.toggle('visible', window.scrollY > 700);
    updateBackTop();
    window.addEventListener('scroll', updateBackTop, { passive: true });
  }
})();


// Versione 2.0 — protezione discreta delle immagini e navigazione accessibile.
(() => {
  document.addEventListener('contextmenu', event => {
    if (event.target.closest('img, video, .kobe-feature, .recognition-card, .current-role-card')) {
      event.preventDefault();
    }
  });
  document.addEventListener('dragstart', event => {
    if (event.target.matches('img')) event.preventDefault();
  });
})();
