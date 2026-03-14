document.addEventListener("DOMContentLoaded", () => {
    // UI Elements
    const titleElement = document.getElementById("typewriterText");
    const fadeElements = document.querySelectorAll(".fade-in-element");
    const progressBar = document.getElementById("progressBar");
    const skipBtn = document.getElementById("skipBtn");
    const gavel = document.getElementById("gavel");
    const body = document.getElementById("mainBody");

    // Typewriter Effect Logic
    const textToType = "Peace & Justice";
    let charIndex = 0;
    const typingSpeed = 120; 

    // Add the blinking cursor immediately
    titleElement.classList.add("typewriter-cursor");

    function typeWriter() {
        if (charIndex < textToType.length) {
            titleElement.textContent += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, typingSpeed);
        } else {
           
            fadeElements.forEach(el => el.classList.add("visible"));
            
            
            setTimeout(startProgressBar, 500);
        }
    }

    
    setTimeout(typeWriter, 400);

   
    const loadingDuration = 3500; 

    function startProgressBar() {
        let startTime = Date.now();

        function updateProgress() {
            let elapsed = Date.now() - startTime;
            let percentage = Math.min((elapsed / loadingDuration) * 100, 100);
            
            progressBar.style.width = percentage + "%";

            if (elapsed < loadingDuration) {
                requestAnimationFrame(updateProgress);
            } else {
                // redirect
                window.location.href = "home.html";
            }
        }
        
        requestAnimationFrame(updateProgress);
    }

    // Gavel Slam & Manual Skip
    if (skipBtn) {
        skipBtn.addEventListener("click", (e) => {
            e.preventDefault(); 
            
            // Visual impact
            if (gavel) gavel.classList.add("gavel-active");
            if (body) body.classList.add("shake");

            // Redirect 
            setTimeout(() => {
                window.location.href = "home.html";
            }, 400); 
        });
    }
});