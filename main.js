/**
 * ==========================================================
 * SHARED INTERACTIVE ENGINE (Implemented by Student 1)
 * ==========================================================
 * This file handles the Intersection Observer for scroll-linked 
 * reveal animations and the smooth header hysteresis logic.
 * Native Vanilla JS is used to ensure maximum compatibility 
 * and compliance with JANET regulations.
 */

document.addEventListener("DOMContentLoaded", () => {
    
   
    const revealElements = document.querySelectorAll('.reveal-element');

    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
               
                entry.target.classList.add('visible');
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, 
        threshold: 0.15, 
        rootMargin: "0px 0px -50px 0px" 
    });

    
    revealElements.forEach(el => revealObserver.observe(el));


    
    const header = document.querySelector('.site-header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            
            if (window.scrollY > 80 && !header.classList.contains('header-scrolled')) { 
                header.classList.add('header-scrolled'); 
            } 
            
            else if (window.scrollY < 20 && header.classList.contains('header-scrolled')) { 
                header.classList.remove('header-scrolled'); 
            }
        });
    }


 
    const cursorDot = document.createElement('div');
    cursorDot.classList.add('cursor-dot');
    document.body.appendChild(cursorDot);

    const cursorGlow = document.createElement('div');
    cursorGlow.classList.add('cursor-glow');
    document.body.appendChild(cursorGlow);

    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // Instantly snap the dot to the cursor
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // The glow follows (CSS transitions create the smooth drag effect)
        cursorGlow.style.left = `${posX}px`;
        cursorGlow.style.top = `${posY}px`;
    });

    // Add interactivity: Expand cursor/glow when hovering over links or clickable cards
    const interactables = document.querySelectorAll('a, button, .gallery-item, .card, .content-link-tile');
    
    interactables.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.classList.add('hovered');
            cursorGlow.classList.add('hovered');
        });
        
        el.addEventListener('mouseleave', () => {
            cursorDot.classList.remove('hovered');
            cursorGlow.classList.remove('hovered');
        });
    });
});