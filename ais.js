/* Copyright (C) 2026 Muhammed Usmaan Imran
   This program is free software: you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation, either version 3 of the License.
*/

/**
 * Action Impact Simulator v4.0
 * Student 2 Usmaan Imran 20240530
 */

document.addEventListener('DOMContentLoaded', () => {

  /* Constants for the gauge math: 565 is the circumference (2 * PI * Radius of 90) */
  const MAX_PTS = 150;
  const CIRCUM = 565;

  /* DOM references for JS manipulation  */
  const cards = document.querySelectorAll('.ais-action-card');
  const gaugeFill = document.getElementById('gaugeFill');
  const scoreDisplay = document.getElementById('scoreDisplay');
  const levelDisplay = document.getElementById('levelDisplay');
  const descDisplay = document.getElementById('descDisplay');
  const resetBtn = document.getElementById('resetBtn');

  let score = 0;

  /* Loops through each action card to set up selection logic  */
  cards.forEach((card, i) => {

    /* Simple staggered fade-in effect on load */
    setTimeout(() => card.classList.add('visible'), 60 * i);

    /* Grabs the point value from the HTML data-pts attribute  */
    const pts = parseInt(card.dataset.pts, 10);

    /* Function to add or subtract points when a card is clicked  */
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

  /* Logic to update sidebar visuals and impact level feedback */
  function updateDashboard() {
    /* Triggers the number counting animation */
    animateScore(score);

    /* Calculates the stroke-dashoffset to visually fill the SVG gauge circle  */
    const pct = Math.min(score / MAX_PTS, 1);
    const offset = CIRCUM - CIRCUM * pct;
    gaugeFill.style.strokeDashoffset = offset;

    /* Removes previous level classes before applying the current one  */
    document.body.classList.remove('ais-low', 'ais-med', 'ais-high');

    /* Conditional logic to set the impact level based on point thresholds */
    let currentTier = 'ais-low'; // Keep track of the current tier for the videos

    if (score >= 90) {
      currentTier = 'ais-high';
      document.body.classList.add('ais-high');
      levelDisplay.textContent = 'High Systemic Impact';
      descDisplay.textContent = 'Exceptional. Structural reform and full accountability achieved.';
    } else if (score >= 40) {
      currentTier = 'ais-med';
      document.body.classList.add('ais-med');
      levelDisplay.textContent = 'Substantial Progress';
      descDisplay.textContent = 'Solid foundation increasing pressure brings visibility.';
    } else {
      currentTier = 'ais-low';
      document.body.classList.add('ais-low');
      levelDisplay.textContent = score > 0 ? 'Building Momentum' : 'Awaiting Input';
      descDisplay.textContent = score > 0
        ? 'Keep combining actions to escalate systemic pressure.'
        : 'Select actions above to measure their combined systemic power.';
    }
    
    /* Trigger the video background crossfade */
    updateVisualState(currentTier);
  }

  /* Animates the score number from the old value to the new value over 900ms */
  let animFrame, displayedScore = 0;
  function animateScore(target) {
    cancelAnimationFrame(animFrame);
    const start = displayedScore;
    const delta = target - start;
    const dur = 900;
    const startTime = performance.now();

    /* Mathematical easing function to slow down the animation as it nears the target */
    function step(now) {
      const p = Math.min((now - startTime) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      displayedScore = Math.round(start + delta * ease);
      scoreDisplay.textContent = displayedScore;
      if (p < 1) animFrame = requestAnimationFrame(step);
    }
    animFrame = requestAnimationFrame(step);
  }

  /* Resets the score and all visual card states to their default  */
  resetBtn.addEventListener('click', () => {
    score = 0;
    displayedScore = 0;
    cards.forEach(c => {
      c.classList.remove('selected');
      c.setAttribute('aria-pressed', 'false');
    });
    updateDashboard();
  });

  /* Logic to crossfade videos seamlessly without reloading */
  function updateVisualState(tier) {
      const vidLow = document.getElementById('vid-low');
      const vidMed = document.getElementById('vid-med');
      const vidHigh = document.getElementById('vid-high');

      if (!vidLow || !vidMed || !vidHigh) return;

      // Remove active class from all videos
      vidLow.classList.remove('active');
      vidMed.classList.remove('active');
      vidHigh.classList.remove('active');

      // Fade in the correct video based on the score
      if (tier === 'ais-low') {
          vidLow.classList.add('active');
      } else if (tier === 'ais-med') {
          vidMed.classList.add('active');
      } else if (tier === 'ais-high') {
          vidHigh.classList.add('active');
      }
  }

  // Initialize the dashboard on load after everything is defined
  updateDashboard();

});
