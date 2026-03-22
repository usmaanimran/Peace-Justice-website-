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


  updateDashboard();

  /* Liquid Blob Interaction Logic ] */
  const blobs = document.querySelectorAll('.liquid-blob');

  document.addEventListener('click', (e) => {
    // Only react if the user is clicking an action card
    if (e.target.closest('.ais-action-card')) {
      /* Get the exact mouse position coordinates */
      const clickX = e.clientX;
      const clickY = e.clientY;

      blobs.forEach(blob => {
        /* Find the center position of each liquid blob */
        const rect = blob.getBoundingClientRect();
        const blobCenterX = rect.left + rect.width / 2;
        const blobCenterY = rect.top + rect.height / 2;

        /* Uses the Pythagorean theorem (A^2 + B^2 = C^2) to find the straight-line distance to the click */
        const distX = blobCenterX - clickX;
        const distY = blobCenterY - clickY;
        const distance = Math.max(Math.sqrt(distX * distX + distY * distY), 1);

        // Increased range slightly so it reacts from further away
        if (distance < 800) {
          // Push it a bit further
          const pushIntensity = (800 - distance) * 0.6;
          const pushX = (distX / distance) * pushIntensity;
          const pushY = (distY / distance) * pushIntensity;

          //  Apply smooth push out movement using CSS translate 
          blob.style.transition = 'translate 1.5s cubic-bezier(0.1, 0.9, 0.2, 1)';
          blob.style.translate = `${pushX}px ${pushY}px`;


          /* Returns the blob to its original position after the push effect ends */
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