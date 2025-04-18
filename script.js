document.addEventListener('DOMContentLoaded', function() {
    createStars();
    setupMusicPlayer();
    
    // Prevent scrolling on mobile devices
    document.addEventListener('touchmove', function(e) {
        e.preventDefault();
    }, { passive: false });
});

function createStars() {
    const starsContainer = document.getElementById('stars');
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    const starCount = Math.floor((screenWidth * screenHeight) / 1000);
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Random size between 1px and 3px
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Random position
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        star.style.left = `${left}%`;
        star.style.top = `${top}%`;
        
        // Random delay for twinkling effect
        star.style.animationDelay = `${Math.random() * 5}s`;
        
        // Add some stars with glow effect
        if (Math.random() > 0.8) {
            star.style.boxShadow = `0 0 ${Math.random() * 10 + 5}px rgba(255, 255, 255, 0.8)`;
        }
        
        starsContainer.appendChild(star);
    }
}

function setupMusicPlayer() {
    const musicButton = document.getElementById('musicButton');
    const bgMusic = document.getElementById('bgMusic');
    let started = false;
    
    musicButton.addEventListener('click', function() {
        if (!started) {
            bgMusic.play().catch(error => {
                console.log("Autoplay prevented: ", error);
            });
            
            // Add class for subtle background animation
            document.body.classList.add('music-playing');
            
            // Change button text
            this.innerHTML = "Eksplorasi";
            
            // Set started flag
            started = true;
        }
    });
    
    // Prevent music from being paused
    bgMusic.addEventListener('pause', function() {
        bgMusic.play();
    });
    
    // Error handling for audio
    bgMusic.addEventListener('error', function(e) {
        console.error('Error loading audio: ', e);
    });
}

// Parallax effect when moving mouse
document.addEventListener('mousemove', function(e) {
    const stars = document.getElementById('stars');
    const moon = document.querySelector('.moon');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    stars.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
    moon.style.transform = `translate(${-x * 10}px, ${-y * 10}px)`;
});

// Resize stars when window size changes
window.addEventListener('resize', function() {
    const starsContainer = document.getElementById('stars');
    starsContainer.innerHTML = '';
    createStars();
});