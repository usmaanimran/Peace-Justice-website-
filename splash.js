/* Copyright (C) 2026 Muhammed Usmaan Imran
   This program is free software: you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation, either version 3 of the License.
*/


/**
 * Cinematic Splash Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    let timeLeft = 4;
    const timeElement = document.getElementById('time');
    const skipBtn = document.getElementById('skipBtn');
    const targetPage = 'home.html';
    let isTransitioning = false;

    // Countdown Timer
    const countdownInterval = setInterval(() => {
        if (isTransitioning) return;

        timeLeft--;
        if (timeElement) timeElement.textContent = timeLeft;

        // trigger the fade out
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            initiateTransition();
        }
    }, 1000);

    // Skip Intro Button Logic
    if (skipBtn) {
        skipBtn.addEventListener('click', () => {
            if (isTransitioning) return;
            clearInterval(countdownInterval);
            initiateTransition();
        });
    }

    // Fade Out
    function initiateTransition() {
        isTransitioning = true;

        // Target the wrapper and backgrounds to fade out to pure black
        document.body.style.transition = 'background-color 0.6s ease';
        document.body.style.backgroundColor = '#000';

        const wrapper = document.querySelector('.splash-wrapper');
        const bg = document.querySelector('.ambient-bg');
        const glow = document.querySelector('.ambient-glow');

        if (wrapper) wrapper.style.transition = 'opacity 0.4s ease';
        if (wrapper) wrapper.style.opacity = '0';

        if (bg) bg.style.transition = 'opacity 0.6s ease';
        if (bg) bg.style.opacity = '0';

        if (glow) glow.style.transition = 'opacity 0.4s ease';
        if (glow) glow.style.opacity = '0';

        // Wait for the animation to finish, then redirect
        setTimeout(() => {
            window.location.href = targetPage;
        }, 600);
    }
});
