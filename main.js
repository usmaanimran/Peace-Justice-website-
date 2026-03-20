/* Copyright (C) 2026 Muhammed Usmaan Imran
   This program is free software: you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation, either version 3 of the License.
*/

/**
 * Main Application Logic
 * Author: Thasreef Mohomad (Student 1 — 20240991)
 
 */

document.addEventListener('DOMContentLoaded', () => {

  /* DOM REFS  */
  const header = document.querySelector('.site-header');
  const heroSec = document.querySelector('.hero-section');
  const heroH1 = heroSec?.querySelector('h1');
  const heroSub = heroSec?.querySelector('p');
  const bentoTiles = document.querySelectorAll('.content-link-tile[data-speed]');

  /*  SCROLL PROGRESS BAR */
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  document.body.appendChild(progressBar);

  /*  HEADER & INSTANT SCROLL */
  let scrollY_last = 0;
  let rafPending = false;

  function onScrollFrame() {
    const y = window.scrollY;

    // Header Toggle
    if (header) {
      if (y > 80 && !header.classList.contains('header-scrolled')) {
        header.classList.add('header-scrolled');
      } else if (y <= 20 && header.classList.contains('header-scrolled')) {
        header.classList.remove('header-scrolled');
      }
    }

    // Progress bar
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = docH > 0 ? (y / docH * 100) + '%' : '0%';

    // INDIVIDUAL ELEMENT MAPPING 
    if (y < 800) {
      let scale = 1 + (y / 400);
      let opacity = 1 - (y / 350);
      let translateY = y * 0.4;


      if (heroH1) {
        heroH1.style.setProperty('transition', 'none', 'important');
        heroH1.style.transform = `translateY(${translateY}px) scale(${scale})`;
        heroH1.style.opacity = Math.max(0, opacity);
      }

      if (heroSub) {
        heroSub.style.setProperty('transition', 'none', 'important');
        heroSub.style.transform = `translateY(${translateY * 1.3}px) scale(${1 + (y / 600)})`;
        heroSub.style.opacity = Math.max(0, opacity - 0.1);
      }
    }


    bentoTiles.forEach(tile => {
      const r = tile.getBoundingClientRect();

      // If the tile is visible in the viewport
      if (r.top < window.innerHeight && r.bottom > 0) {
        // Calculate how far the center of the tile is from the center of the screen
        const tileCenter = r.top + (r.height / 2);
        const screenCenter = window.innerHeight / 2;
        const distanceFromCenter = Math.abs(tileCenter - screenCenter);


        let dynamicScale = 1.05 - (distanceFromCenter / window.innerHeight) * 0.2;


        const spd = parseFloat(tile.dataset.speed || '0');
        const yOffset = (r.top - screenCenter) * spd;


        tile.style.transform = `translateY(${yOffset}px) scale(${dynamicScale})`;
      }
    });

    // visibility
    if (bttBtn) {
      if (y > 500) bttBtn.classList.add('visible');
      else bttBtn.classList.remove('visible');
    }

    rafPending = false;
  }

  window.addEventListener('scroll', () => {
    if (!rafPending) {
      rafPending = true;
      requestAnimationFrame(onScrollFrame);
    }
  }, { passive: true });

  /*INTERSECTION REVEALS */
  const revealElements = document.querySelectorAll('.reveal, .reveal-element');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });

  }, { root: null, threshold: 0.01, rootMargin: "100px 0px 0px 0px" });

  revealElements.forEach(el => revealObserver.observe(el));

  // only after all CSS, fonts, and images are fully loaded
  window.addEventListener('load', () => {
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      // If the element is anywhere near the viewport on load, force it visible
      if (rect.top <= window.innerHeight + 150) {
        el.classList.add('visible');
      }
    });
  });

  /* TILT CARDS */
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const rx = ((e.clientY - r.top - r.height / 2) / (r.height / 2)) * -9;
      const ry = ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 9;
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.025,1.025,1.025)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`;
    });
  });

  /* BACK-TO-TOP BUTTON */
  let bttBtn = null;


  if (!document.querySelector('.back-to-top-css')) {
    bttBtn = document.createElement('button');
    bttBtn.id = 'back-to-top';
    bttBtn.innerHTML = `<svg viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"></polyline></svg>`;
    document.body.appendChild(bttBtn);
    bttBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* PAGE TRANSITIONS */
  setTimeout(() => document.body.classList.remove('page-fade-in'), 800);
  document.querySelectorAll('a:not([target="_blank"]):not([href^="#"])').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href && !href.startsWith('#')) {
        e.preventDefault();
        document.body.classList.add('page-fade-out');
        setTimeout(() => { window.location.href = href; }, 450);
      }
    });
  });

  /* MOUSE GLOW */
  document.addEventListener('mousemove', e => {
    document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
  });
});
