document.addEventListener("DOMContentLoaded", () => {
    const countdownText = document.getElementById("countdownText");
    const skipBtn = document.getElementById("skipBtn");
    const splashWrapper = document.getElementById("splashWrapper");
    const splashBg = document.querySelector(".splash-bg");
    const flashOverlay = document.getElementById("flashOverlay");
    const particlesContainer = document.getElementById("particles-container");

    //Particles
    function createParticles() {
        const particleCount = 30; // Amount
        for (let i = 0; i < particleCount; i++) {
            let particle = document.createElement("div");
            particle.classList.add("particle");
            
            // Randomize position
            let size = Math.random() * 4 + 1; 
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}vw`;
            particle.style.animationDuration = `${Math.random() * 3 + 3}s`; 
            particle.style.animationDelay = `${Math.random() * 2}s`;
            
            particlesContainer.appendChild(particle);
        }
    }
    createParticles();

    // Exit Function 
    function triggerHyperDive() {
        splashWrapper.classList.add("warp-card");
        splashBg.classList.add("warp-bg");
        if (flashOverlay) flashOverlay.classList.add("flash-active");
    }

    // Countdown 
    let timeLeft = 4;
    const countdownInterval = setInterval(() => {
        timeLeft--;
        if (timeLeft > 0) {
            countdownText.textContent = `Entering site in ${timeLeft}...`;
        } else {
            countdownText.textContent = "Redirecting...";
            clearInterval(countdownInterval);
        }
    }, 1000);

    // Auto Transitio
    setTimeout(() => {
        triggerHyperDive();
    }, 3400);

    // Skip Override
    if (skipBtn) {
        skipBtn.addEventListener("click", (e) => {
            e.preventDefault(); 
            clearInterval(countdownInterval);
            
            
            triggerHyperDive();
            
            
            setTimeout(() => {
                window.location.href = "home.html";
            }, 500); 
        });
    }
});
