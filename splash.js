document.addEventListener("DOMContentLoaded", () => {
    // UI Elements
    const titleElement = document.getElementById("typewriterText");
    const fadeElements = document.querySelectorAll(".fade-in-element");
    const countdownText = document.getElementById("countdownText");
    const skipBtn = document.getElementById("skipBtn");
    const gavel = document.getElementById("gavel");
    const body = document.getElementById("mainBody");

    // Typewriter Effect Logic
    const textToType = "Peace & Justice";
    let charIndex = 0;
    const typingSpeed = 70; 

    titleElement.classList.add("typewriter-cursor");

    function typeWriter() {
        if (charIndex < textToType.length) {
            titleElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, typingSpeed);
        } else {
            
            fadeElements.forEach(el => el.classList.add("visible"));
            startCountdown();
        }
    }

    setTimeout(typeWriter, 200);

    // Visible Countdown Logic
    let timeLeft = 4;
    function startCountdown() {
        countdownText.textContent = `Entering site in ${timeLeft}...`;
        const interval = setInterval(() => {
            timeLeft--;
            if (timeLeft > 0) {
                countdownText.textContent = `Entering site in ${timeLeft}...`;
            } else {
                clearInterval(interval);
                
            }
        }, 1000);
    }

    // Manual Skip
    if (skipBtn) {
        skipBtn.addEventListener("click", (e) => {
            e.preventDefault(); 
            
            if (gavel) gavel.classList.add("gavel-active");
            if (body) body.classList.add("shake");
            
            
            document.body.classList.add("page-fade-out");

            // Wait for the fade out to finish 
            setTimeout(() => {
                window.location.href = "home.html";
            }, 500); 
        });
    }
});
