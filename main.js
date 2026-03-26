/* Copyright (C) 2026 Muhammed Usmaan Imran
   This program is free software: you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation, either version 3 of the License.
*/

/* ========================================================================= */
/* DO NOT EDIT - SHARED TEMPLATE: GLOBAL JS FILE                            */
/* Student 1, 2 and 4 is responsible for this file.    */
/* ALL TEAM MEMBERS MUST USE THIS FILE. Do not put page specific JS here.   */
/* ========================================================================= */




// Wait for the HTML document to finish loading before running any of this code.
document.addEventListener('DOMContentLoaded', () => {

  // Grab the main UI elements from the DOM to manipulate later.
  const hdr = document.querySelector('.site-header');
  const hSec = document.querySelector('.hero-section');
  const hH1 = hSec?.querySelector('h1');
  const hSub = hSec?.querySelector('p');
  const bTls = document.querySelectorAll('.content-link-tile[data-speed]');

  // Dynamically create a scroll progress bar and stick it at the top of the body.
  const pBar = document.createElement('div');
  pBar.id = 'scroll-progress';
  document.body.appendChild(pBar);

  /* PARTICLES (HOME PAGE)*/
  // Grabs the canvas ID 'prtc' from home.html to draw the interactive background.
  const cv1 = document.getElementById('prtc');
  if (cv1) {
    const ctx1 = cv1.getContext('2d');
    let w1 = window.innerWidth;
    let h1 = window.innerHeight;
    let mx1 = w1 / 2;
    let my1 = h1 / 2;
    let pts = [];

    cv1.width = w1;
    cv1.height = h1;

    // Define 5 origin points on the screen where particles will spawn from.
    const orgs = [
      { x: w1 * 0.5, y: h1 * 0.45 },
      { x: w1 * 0.25, y: h1 * 0.6 },
      { x: w1 * 0.75, y: h1 * 0.35 },
      { x: w1 * 0.15, y: h1 * 0.25 },
      { x: w1 * 0.85, y: h1 * 0.7 },
    ];

    // Generate 90 particles, assign them random speeds, directions, and a base origin point.
    for (let i = 0; i < 90; i++) {
      const o = orgs[i % orgs.length];
      const a = Math.random() * Math.PI * 2;
      const bst = 10 + Math.random() * 18;
      const jt = 60;
      pts.push({
        x: o.x + (Math.random() - 0.5) * jt,
        y: o.y + (Math.random() - 0.5) * jt,
        r: Math.random() * 2 + 0.5,
        vx: Math.cos(a) * bst,
        vy: Math.sin(a) * bst,
        bx: (Math.random() - 1) * 0.5,
        by: (Math.random() - 1) * 0.5,
      });
    }

    // Track mouse X and Y coordinates to make particles react to the cursor.
    document.addEventListener('mousemove', e => { mx1 = e.clientX; my1 = e.clientY; });
    // Keep canvas size synced with browser window size.
    window.addEventListener('resize', () => {
      w1 = cv1.width = window.innerWidth;
      h1 = cv1.height = window.innerHeight;
    });

    // The main animation loop for the home page particles.
    function tk1() {
      ctx1.clearRect(0, 0, w1, h1);
      ctx1.fillStyle = 'rgba(212, 175, 55, 0.6)';
      ctx1.beginPath();

      pts.forEach(p => {
        // Calculate the distance between the mouse and the particle using the Pythagorean theorem (a^2 + b^2 = c^2).
        const dx = mx1 - p.x;
        const dy = my1 - p.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        
        // If the mouse gets closer than 150px, push the particle away by modifying its velocity.
        if (d < 150) {
          p.vx -= (dx / d) * 0.05;
          p.vy -= (dy / d) * 0.05;
        }

        // Apply friction to slow the particles down over time and add base drift.
        p.vx = p.vx * 0.95 + p.bx * 0.05;
        p.vy = p.vy * 0.95 + p.by * 0.05;
        p.x += p.vx;
        p.y += p.vy;

        // Wrap particles around the screen if they float off the edge.
        if (p.x < 0) p.x = w1;
        if (p.x > w1) p.x = 0;
        if (p.y < 0) p.y = h1;
        if (p.y > h1) p.y = 0;

        ctx1.moveTo(p.x, p.y);
        ctx1.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      });

      ctx1.fill();
      requestAnimationFrame(tk1);
    }
    requestAnimationFrame(tk1);
  }

  /* (CONTENT PAGES)*/
  // Canvas background for content pages. Draws floating blocks instead of circular particles.
  const cv2 = document.getElementById('ps4-bg');
  if (cv2) {
    const ctx2 = cv2.getContext('2d');
    let w2 = window.innerWidth;
    let h2 = window.innerHeight;
    cv2.width = w2;
    cv2.height = h2;

    // Generate 18 square blocks with random sizes, angles, and drift speeds.
    let blks = [];
    for (let i = 0; i < 18; i++) {
      blks.push({
        x: Math.random() * w2,
        y: Math.random() * h2,
        s: 100 + Math.random() * 250,
        a: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.05,
        vy: (Math.random() - 0.5) * 0.05,
        va: (Math.random() - 0.5) * 0.001,
        df: Math.random() * Math.PI * 2
      });
    }

    window.addEventListener('resize', () => {
      w2 = cv2.width = window.innerWidth;
      h2 = cv2.height = window.innerHeight;
    });

    let ang = 0;

    // Main animation loop for the content page blocks.
    function tk2() {
      ctx2.clearRect(0, 0, w2, h2);

      // Create a slow moving radial gradient background using sine and cosine waves for smooth circular motion.
      ang += 0.002;
      const cx = w2 * 0.5 + Math.cos(ang) * (w2 * 0.15);
      const cy = h2 * 0.5 + Math.sin(ang * 0.7) * (h2 * 0.15);

      const grd = ctx2.createRadialGradient(cx, cy, 0, cx, cy, w2 * 0.8);
      grd.addColorStop(0, 'rgba(212, 175, 55, 0.05)');
      grd.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx2.fillStyle = grd;
      ctx2.fillRect(0, 0, w2, h2);

      // Move and rotate each block. Reset their position to the opposite side if they drift completely off screen.
      blks.forEach(b => {
        b.df += 0.0015;
        b.x += b.vx + Math.cos(b.df) * 0.03;
        b.y += b.vy + Math.sin(b.df) * 0.03;
        b.a += b.va;

        if (b.y + b.s < -200) b.y = h2 + b.s;
        if (b.y - b.s > h2 + 200) b.y = -b.s;
        if (b.x + b.s < -200) b.x = w2 + b.s;
        if (b.x - b.s > w2 + 200) b.x = -b.s;

        ctx2.save();
        ctx2.translate(b.x, b.y);
        ctx2.rotate(b.a);

        ctx2.fillStyle = 'rgba(212, 175, 55, 0.025)';
        ctx2.shadowBlur = 45;
        ctx2.shadowColor = 'rgba(212, 175, 55, 0.04)';
        ctx2.fillRect(-b.s / 2, -b.s / 2, b.s, b.s);

        ctx2.restore();
      });
      requestAnimationFrame(tk2);
    }
    requestAnimationFrame(tk2);
  }

  /* SCROLL & PARALLAx*/
  let rafP = false;

  // Function that runs every time the user scrolls.
  function scrF() {
    const y = window.scrollY;

    // Add a CSS class to the header if scrolled past 80px to shrink it, remove it if back at the top.
    if (hdr) {
      if (y > 80 && !hdr.classList.contains('header-scrolled')) {
        hdr.classList.add('header-scrolled');
      } else if (y <= 20 && hdr.classList.contains('header-scrolled')) {
        hdr.classList.remove('header-scrolled');
      }
    }

    // Calculate total scroll percentage and apply it to the width of the progress bar div.
    const dH = document.documentElement.scrollHeight - window.innerHeight;
    pBar.style.width = dH > 0 ? (y / dH * 100) + '%' : '0%';

    // Parallax effect for the hero section: scale up and fade out the title/subtitle as you scroll down.
    if (y < 800) {
      let sc = 1 + (y / 400);
      let op = 1 - (y / 350);
      let ty = y * 0.4;

      if (hH1) {
        hH1.style.setProperty('transition', 'none', 'important');
        hH1.style.transform = `translateY(${ty}px) scale(${sc})`;
        hH1.style.opacity = Math.max(0, op);
      }

      if (hSub) {
        hSub.style.setProperty('transition', 'none', 'important');
        hSub.style.transform = `translateY(${ty * 1.3}px) scale(${1 + (y / 600)})`;
        hSub.style.opacity = Math.max(0, op - 0.1);
      }
    }

    // Parallax effect for the bento gallery tiles based on their specific data-speed attribute.
    bTls.forEach(t => {
      const r = t.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) {
        const tc = r.top + (r.height / 2);
        const sc = window.innerHeight / 2;
        const df = Math.abs(tc - sc);
        let ds = 1.05 - (df / window.innerHeight) * 0.2;
        const sp = parseFloat(t.dataset.speed || '0');
        const yo = (r.top - sc) * sp;
        t.style.transform = `translateY(${yo}px) scale(${ds})`;
      }
    });

    // Show the Go to Top button if scrolled past 500px.
    if (bBtn) {
      if (y > 500) bBtn.classList.add('visible');
      else bBtn.classList.remove('visible');
    }

    rafP = false;
  }

  // Throttle the scroll event using requestAnimationFrame so it doesn't lag the browser.
  window.addEventListener('scroll', () => {
    if (!rafP) {
      rafP = true;
      requestAnimationFrame(scrF);
    }
  }, { passive: true });

  /* REVEALS & TILT */
  // Use IntersectionObserver to watch for elements with .reveal classes entering the screen.
  // When they enter the viewport, add the 'visible' class to trigger their CSS fade-in animations.
  const rEls = document.querySelectorAll('.reveal, .reveal-element');
  const rObs = new IntersectionObserver((es, ob) => {
    es.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        ob.unobserve(e.target);
      }
    });
  }, { root: null, threshold: 0.01, rootMargin: "100px 0px 0px 0px" });

  rEls.forEach(el => rObs.observe(el));

  // Fallback: If elements are already in the viewport on initial load, reveal them immediately.
  window.addEventListener('load', () => {
    rEls.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top <= window.innerHeight + 150) {
        el.classList.add('visible');
      }
    });
  });

  // Calculate the mouse position relative to the center of any .tilt-card element.
  // Rotate the card on the X and Y axes depending on how far the mouse is from the center.
  document.querySelectorAll('.tilt-card').forEach(c => {
    c.addEventListener('mousemove', e => {
      const r = c.getBoundingClientRect();
      const rx = ((e.clientY - r.top - r.height / 2) / (r.height / 2)) * -9;
      const ry = ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 9;
      c.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.025,1.025,1.025)`;
    });
    // Flatten the card back out when the mouse leaves.
    c.addEventListener('mouseleave', () => {
      c.style.transform = `perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`;
    });
  });

  // Update custom CSS variables for tile hover effects based on cursor position inside the tile.
  document.querySelectorAll('.content-link-tile').forEach(t => {
    t.addEventListener('mousemove', e => {
      const r = t.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width * 100).toFixed(1);
      const y = ((e.clientY - r.top) / r.height * 100).toFixed(1);
      t.style.setProperty('--tx', x + '%');
      t.style.setProperty('--ty', y + '%');
    });
  });

  /* UTILS*/
  // Creates the required "Go to Top" button dynamically if it doesn't already exist in the HTML.
  let bBtn = null;
  if (!document.querySelector('.back-to-top-css') && !document.querySelector('#back-to-top')) {
    bBtn = document.createElement('button');
    bBtn.id = 'back-to-top';
    bBtn.innerHTML = `<svg viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"></polyline></svg>`;
    document.body.appendChild(bBtn);
    bBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  } else {
    bBtn = document.querySelector('.back-to-top-css') || document.querySelector('#back-to-top');
  }

  // Remove the initial page load fade-in class after 800ms.
  setTimeout(() => document.body.classList.remove('page-fade-in'), 800);
  
  // Intercept standard link clicks. Play a fade-out animation first, wait 450ms, then actually navigate to the new page.
  document.querySelectorAll('a:not([target="_blank"]):not([href^="#"])').forEach(l => {
    l.addEventListener('click', e => {
      const hf = l.getAttribute('href');
      if (hf && !hf.startsWith('#')) {
        e.preventDefault();
        document.body.classList.add('page-fade-out');
        setTimeout(() => { window.location.href = hf; }, 450);
      }
    });
  });

  // Track global mouse position and save to CSS variables for custom cursors or global hover effects.
  document.addEventListener('mousemove', e => {
    document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
  });
});
