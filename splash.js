/* Copyright (C) 2026 Muhammed Usmaan Imran
   This program is free software: you can redistribute it and/or modify
   it under the terms of the GNU General Public License as published by
   the Free Software Foundation, either version 3 of the License.
*/


/**
 * Cinematic Splash Logic
 */

// Wait until the HTML is fully loaded before trying to grab elements or run the timer
document.addEventListener('DOMContentLoaded', () => {
    
    // Auto-redirect after 4 seconds
    let timeLeft = 4;
    const timeElement = document.getElementById('time');
    const skipBtn = document.getElementById('skipBtn');
    const targetPage = 'home.html';
    let isTransitioning = false;

    // Countdown Timer (JavaScript)
    // setInterval runs the code inside it every 1000 milliseconds
    const countdownInterval = setInterval(() => {
        // Stop counting if the user already clicked skip
        if (isTransitioning) return;

        // Subtract 1 from the timer and update the visible text on the screen
        timeLeft--;
        if (timeElement) timeElement.textContent = timeLeft;

        // When the timer hits 0, stop the interval loop and trigger the fade out
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            initiateTransition();
        }
    }, 1000);

    // "Skip Intro" Button (JavaScript)
    if (skipBtn) {
        skipBtn.addEventListener('click', () => {
            // Prevent spam clicking the button while it's already fading out
            if (isTransitioning) return;
            
            // Instantly stop the 4 second timer and start the fade out process
            clearInterval(countdownInterval);
            initiateTransition();
        });
    }

    // Fade Out Animation Logic
    function initiateTransition() {
        isTransitioning = true;

        // Target the wrapper and backgrounds to smoothly fade out to pure black over 0.6 seconds
        document.body.style.transition = 'background-color 0.6s ease';
        document.body.style.backgroundColor = '#000';

        const wrapper = document.querySelector('.splash-wrapper');
        const bg = document.querySelector('.ambient-bg');
        const glow = document.querySelector('.ambient-glow');

        // Apply CSS opacity transitions dynamically via JavaScript
        if (wrapper) wrapper.style.transition = 'opacity 0.4s ease';
        if (wrapper) wrapper.style.opacity = '0';

        if (bg) bg.style.transition = 'opacity 0.6s ease';
        if (bg) bg.style.opacity = '0';

        if (glow) glow.style.transition = 'opacity 0.4s ease';
        if (glow) glow.style.opacity = '0';

        // Wait 600 milliseconds for the fade animations to finish, then redirect the browser to home.html
        setTimeout(() => {
            window.location.href = targetPage;
        }, 600);
    }
});