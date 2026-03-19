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
  const bgLow = document.getElementById('bgLow');
  const bgMed = document.getElementById('bgMed');
  const bgHigh = document.getElementById('bgHigh');

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


    bgLow.classList.remove('active');
    bgMed.classList.remove('active');
    bgHigh.classList.remove('active');
    document.body.classList.remove('ais-low', 'ais-med', 'ais-high');

    if (score >= 90) {
      bgHigh.classList.add('active');
      document.body.classList.add('ais-high');
      levelDisplay.textContent = 'High Systemic Impact';
      descDisplay.textContent = 'Exceptional. Structural reform and full accountability achieved.';
    } else if (score >= 40) {
      bgMed.classList.add('active');
      document.body.classList.add('ais-med');
      levelDisplay.textContent = 'Substantial Progress';
      descDisplay.textContent = 'Solid foundation increasing pressure brings visibility.';
    } else {
      bgLow.classList.add('active');
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

});
