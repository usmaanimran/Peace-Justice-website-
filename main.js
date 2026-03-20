/* Copyright (C) 2026 Muhammed Usmaan Imran
   This program is free software: you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation, either version 3 of the License.
*/


document.addEventListener('DOMContentLoaded', () => {

  const hdr = document.querySelector('.site-header');
  const hSec = document.querySelector('.hero-section');
  const hH1 = hSec?.querySelector('h1');
  const hSub = hSec?.querySelector('p');
  const bTls = document.querySelectorAll('.content-link-tile[data-speed]');

  const pBar = document.createElement('div');
  pBar.id = 'scroll-progress';
  document.body.appendChild(pBar);

  /* PARTICLES (HOME PAGE)*/
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

    const orgs = [
      { x: w1 * 0.5, y: h1 * 0.45 },
      { x: w1 * 0.25, y: h1 * 0.6 },
      { x: w1 * 0.75, y: h1 * 0.35 },
      { x: w1 * 0.15, y: h1 * 0.25 },
      { x: w1 * 0.85, y: h1 * 0.7 },
    ];

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
        bx: (Math.random() - 0.5) * 0.5,
        by: (Math.random() - 0.5) * 0.5,
      });
    }

    document.addEventListener('mousemove', e => { mx1 = e.clientX; my1 = e.clientY; });
    window.addEventListener('resize', () => {
      w1 = cv1.width = window.innerWidth;
      h1 = cv1.height = window.innerHeight;
    });

    function tk1() {
      ctx1.clearRect(0, 0, w1, h1);
      ctx1.fillStyle = 'rgba(212, 175, 55, 0.6)';
      ctx1.beginPath();

      pts.forEach(p => {
        const dx = mx1 - p.x;
        const dy = my1 - p.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 150) {
          p.vx -= (dx / d) * 0.05;
          p.vy -= (dy / d) * 0.05;
        }

        p.vx = p.vx * 0.95 + p.bx * 0.05;
        p.vy = p.vy * 0.95 + p.by * 0.05;
        p.x += p.vx;
        p.y += p.vy;

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
  const cv2 = document.getElementById('ps4-bg');
  if (cv2) {
    const ctx2 = cv2.getContext('2d');
    let w2 = window.innerWidth;
    let h2 = window.innerHeight;
    cv2.width = w2;
    cv2.height = h2;

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

    function tk2() {
      ctx2.clearRect(0, 0, w2, h2);

      ang += 0.002;
      const cx = w2 * 0.5 + Math.cos(ang) * (w2 * 0.15);
      const cy = h2 * 0.5 + Math.sin(ang * 0.7) * (h2 * 0.15);

      const grd = ctx2.createRadialGradient(cx, cy, 0, cx, cy, w2 * 0.8);
      grd.addColorStop(0, 'rgba(212, 175, 55, 0.05)');
      grd.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx2.fillStyle = grd;
      ctx2.fillRect(0, 0, w2, h2);

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

  function scrF() {
    const y = window.scrollY;

    if (hdr) {
      if (y > 80 && !hdr.classList.contains('header-scrolled')) {
        hdr.classList.add('header-scrolled');
      } else if (y <= 20 && hdr.classList.contains('header-scrolled')) {
        hdr.classList.remove('header-scrolled');
      }
    }

    const dH = document.documentElement.scrollHeight - window.innerHeight;
    pBar.style.width = dH > 0 ? (y / dH * 100) + '%' : '0%';

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

    if (bBtn) {
      if (y > 500) bBtn.classList.add('visible');
      else bBtn.classList.remove('visible');
    }

    rafP = false;
  }

  window.addEventListener('scroll', () => {
    if (!rafP) {
      rafP = true;
      requestAnimationFrame(scrF);
    }
  }, { passive: true });

  /* REVEALS & TILT */
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

  window.addEventListener('load', () => {
    rEls.forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top <= window.innerHeight + 150) {
        el.classList.add('visible');
      }
    });
  });

  document.querySelectorAll('.tilt-card').forEach(c => {
    c.addEventListener('mousemove', e => {
      const r = c.getBoundingClientRect();
      const rx = ((e.clientY - r.top - r.height / 2) / (r.height / 2)) * -9;
      const ry = ((e.clientX - r.left - r.width / 2) / (r.width / 2)) * 9;
      c.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.025,1.025,1.025)`;
    });
    c.addEventListener('mouseleave', () => {
      c.style.transform = `perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`;
    });
  });

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

  setTimeout(() => document.body.classList.remove('page-fade-in'), 800);
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

  document.addEventListener('mousemove', e => {
    document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
  });
});
