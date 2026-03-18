/**
 * ==========================================================
 * SHARED INTERACTIVE ENGINE (Implemented by Student 1)
 * ==========================================================
 * Handles Intersection Observer, Hysteresis, Ambient Glow, 
 * Cinematic Page Transitions, Hero Zoom, Bento Parallax, 
 * Scroll Progress, and 3D Magnetic Cards.
 */

document.addEventListener("DOMContentLoaded", () => {
    
   
    setTimeout(() => {
        document.body.classList.remove('page-fade-in');
    }, 1250);

    // Auto Inject Scroll Progress Bar
    const progressBar = document.createElement('div');
    progressBar.id = 'scroll-progress';
    document.body.appendChild(progressBar);

    // Animations on Scroll
    const revealElements = document.querySelectorAll('.reveal-element');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { root: null, threshold: 0.15, rootMargin: "0px 0px -50px 0px" });
    revealElements.forEach(el => revealObserver.observe(el));

    // Header Hysteresis & Scroll Progress 
    const header = document.querySelector('.site-header');
    
    // --- 4. Ambient Background Mesh Glow ---
    document.addEventListener('mousemove', (e) => {
        const xPos = e.clientX / window.innerWidth;
        const yPos = e.clientY / window.innerHeight;
        document.documentElement.style.setProperty('--mouse-x', xPos);
        document.documentElement.style.setProperty('--mouse-y', yPos);
    });

    // 3D Tilt Cards
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x pos
            const y = e.clientY - rect.top;  // y pos
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10; // Max tilt
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            
        });
    });

    // Page Out Transition Interceptor
    const body = document.body;
    const navLinks = document.querySelectorAll('a:not([target="_blank"]):not([href^="#"])');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const destination = link.getAttribute('href');
            if (destination && !destination.startsWith('#')) {
                e.preventDefault();
                body.classList.add('page-fade-out');
                setTimeout(() => { window.location.href = destination; }, 550);
            }
        });
    });

    // (Hero Zoom, Parallax, Progress Bar) 
    const heroText = document.querySelector('.hero-section h1');
    const heroSub = document.querySelector('.hero-section p');
    const parallaxTiles = document.querySelectorAll('.content-link-tile');
    
    let lastScrollY = window.scrollY;
    let ticking = false;

    window.addEventListener('scroll', () => {
        lastScrollY = window.scrollY;
        
        if (!ticking) {
            window.requestAnimationFrame(() => {
                
                // Header Hysteresis
                if (header) {
                    if (lastScrollY > 80 && !header.classList.contains('header-scrolled')) { header.classList.add('header-scrolled'); } 
                    else if (lastScrollY < 20 && header.classList.contains('header-scrolled')) { header.classList.remove('header-scrolled'); }
                }

                // Scroll Progress Bar Update
                const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (winScroll / height) * 100;
                document.getElementById("scroll-progress").style.width = scrolled + "%";
                
                // Hero Section Scroll Zoom
                if (lastScrollY < 600) {
                    let opacity = 1 - (lastScrollY / 450);
                    let scale = 1 + (lastScrollY / 2000);
                    let translateY = lastScrollY * 0.3;
                    
                    if (opacity < 0) opacity = 0;
                    if (heroText) {
                        heroText.style.transform = `scale(${scale}) translateY(${translateY}px)`;
                        heroText.style.opacity = opacity;
                    }
                    if (heroSub) {
                        heroSub.style.transform = `translateY(${translateY * 1.2}px)`;
                        heroSub.style.opacity = opacity - 0.2;
                    }
                }

                // Bento Grid Scroll Parallax
                parallaxTiles.forEach(tile => {
                    const rect = tile.getBoundingClientRect();
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        const speed = parseFloat(tile.getAttribute('data-speed')) || 0;
                        const yOffset = (rect.top - (window.innerHeight / 2)) * speed;
                        tile.style.transform = `translateY(${yOffset}px)`;
                    }
                });

                ticking = false;
            });
            ticking = true;
        }
    });
});