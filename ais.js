/**
 * Action Impact Simulator v4.0
 * Student 2 Usmaan Imran 20240530
 
 */

document.addEventListener('DOMContentLoaded', () => {

  const MAX_PTS = 150;
  const CIRCUM = 565;

  /* DOM references */
  const cards = document.querySelectorAll('.ais-action-card');
  const gaugeFill = document.getElementById('gaugeFill');
  const scoreDisplay = document.getElementById('scoreDisplay');
  const levelDisplay = document.getElementById('levelDisplay');
  const descDisplay = document.getElementById('descDisplay');
  const resetBtn = document.getElementById('resetBtn');


  let score = 0;


  cards.forEach((card, i) => {

    setTimeout(() => card.classList.add('visible'), 60 * i);


    const pts = parseInt(card.dataset.pts, 10);

    function toggle() {
      const on = card.classList.toggle('selected');
      card.setAttribute('aria-pressed', String(on));
      score += on ? pts : -pts;
      updateDashboard();
    }

    card.addEventListener('click', toggle);
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault(); toggle();
      }
    });
  });

  /* dashboard visuals and logic */
  function updateDashboard() {
    /* Score counter animation */
    animateScore(score);


    const pct = Math.min(score / MAX_PTS, 1);
    const offset = CIRCUM - CIRCUM * pct;
    gaugeFill.style.strokeDashoffset = offset;



    document.body.classList.remove('ais-low', 'ais-med', 'ais-high');

    if (score >= 90) {
      document.body.classList.add('ais-high');
      levelDisplay.textContent = 'High Systemic Impact';
      descDisplay.textContent = 'Exceptional. Structural reform and full accountability achieved.';
    } else if (score >= 40) {
      document.body.classList.add('ais-med');
      levelDisplay.textContent = 'Substantial Progress';
      descDisplay.textContent = 'Solid foundation increasing pressure brings visibility.';
    } else {
      document.body.classList.add('ais-low');
      levelDisplay.textContent = score > 0 ? 'Building Momentum' : 'Awaiting Input';
      descDisplay.textContent = score > 0
        ? 'Keep combining actions to escalate systemic pressure.'
        : 'Select actions above to measure their combined systemic power.';
    }
  }


  let animFrame, displayedScore = 0;
  function animateScore(target) {
    cancelAnimationFrame(animFrame);
    const start = displayedScore;
    const delta = target - start;
    const dur = 900;
    const startTime = performance.now();

    function step(now) {
      const p = Math.min((now - startTime) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      displayedScore = Math.round(start + delta * ease);
      scoreDisplay.textContent = displayedScore;
      if (p < 1) animFrame = requestAnimationFrame(step);
    }
    animFrame = requestAnimationFrame(step);
  }


  resetBtn.addEventListener('click', () => {
    score = 0;
    displayedScore = 0;
    cards.forEach(c => {
      c.classList.remove('selected');
      c.setAttribute('aria-pressed', 'false');
    });
    updateDashboard();
  });


  updateDashboard();

  /* Liquid Effect  */
  const blobs = document.querySelectorAll('.liquid-blob');

  document.addEventListener('click', (e) => {
    // Only react if the user is clicking an action card
    if (e.target.closest('.ais-action-card')) {
      const clickX = e.clientX;
      const clickY = e.clientY;

      blobs.forEach(blob => {
        const rect = blob.getBoundingClientRect();
        const blobCenterX = rect.left + rect.width / 2;
        const blobCenterY = rect.top + rect.height / 2;

        const distX = blobCenterX - clickX;
        const distY = blobCenterY - clickY;
        const distance = Math.max(Math.sqrt(distX * distX + distY * distY), 1);

        // Increased range slightly so it reacts from further away
        if (distance < 800) {
          // Push it a bit further
          const pushIntensity = (800 - distance) * 0.6;
          const pushX = (distX / distance) * pushIntensity;
          const pushY = (distY / distance) * pushIntensity;

          //  smooth push out 
          blob.style.transition = 'translate 1.5s cubic-bezier(0.1, 0.9, 0.2, 1)';
          blob.style.translate = `${pushX}px ${pushY}px`;


          setTimeout(() => {

            blob.style.transition = 'translate 8s ease-in-out';
            blob.style.translate = '0px 0px';


            setTimeout(() => {
              blob.style.transition = '';
            }, 8000);

          }, 1500);
        }
      });
    }
  });

});
