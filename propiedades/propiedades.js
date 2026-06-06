// Propiedades — navbar, gallery lightbox, reveal-on-scroll. Self-contained.
(function () {
  'use strict';

  // --- Hamburger -----------------------------------------------------------
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open);
    });
  }

  // --- Navbar shadow on scroll --------------------------------------------
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onScroll = () => {
      navbar.style.boxShadow = window.pageYOffset > 80
        ? '0 10px 20px -8px rgba(0,0,0,0.18)'
        : '0 4px 6px -1px rgba(0,0,0,0.1)';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // --- Gallery lightbox ----------------------------------------------------
  const items = Array.from(document.querySelectorAll('.re-gallery__item'));
  const box = document.querySelector('.re-lightbox');
  if (items.length && box) {
    const img = box.querySelector('img');
    const cap = box.querySelector('.re-lightbox__cap');
    const count = box.querySelector('.re-lightbox__count');
    let idx = 0;

    const slides = items.map((el) => ({
      src: el.dataset.full || el.querySelector('img').src,
      cap: el.dataset.caption || el.querySelector('img').alt || ''
    }));

    const render = () => {
      img.src = slides[idx].src;
      img.alt = slides[idx].cap;
      cap.textContent = slides[idx].cap;
      count.textContent = (idx + 1) + ' / ' + slides.length;
    };
    const open = (i) => { idx = i; render(); box.classList.add('is-open'); document.body.style.overflow = 'hidden'; };
    const close = () => { box.classList.remove('is-open'); document.body.style.overflow = ''; };
    const step = (d) => { idx = (idx + d + slides.length) % slides.length; render(); };

    items.forEach((el, i) => {
      el.addEventListener('click', () => open(i));
    });
    box.querySelector('.re-lightbox__close').addEventListener('click', close);
    box.querySelector('.re-lightbox__prev').addEventListener('click', () => step(-1));
    box.querySelector('.re-lightbox__next').addEventListener('click', () => step(1));
    box.addEventListener('click', (e) => { if (e.target === box) close(); });
    document.addEventListener('keydown', (e) => {
      if (!box.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    });
  }

  // --- Reveal on scroll ----------------------------------------------------
  const reveals = document.querySelectorAll('[data-reveal]');
  if (reveals.length && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    reveals.forEach((el) => obs.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-in'));
  }
})();
