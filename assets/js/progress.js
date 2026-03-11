// Page Progress Bar Logic
const pageProgress = document.getElementById('pageProgress'); // Mobile
const pageProgressDesktop = document.getElementById('pageProgressDesktop'); // Desktop
const progressFill = document.getElementById('progressFill');
const progressFillDesktop = document.getElementById('progressFillDesktop');
const progressIndicator = document.getElementById('progressIndicator');
const progressIndicatorDesktop = document.getElementById('progressIndicatorDesktop');
const progressPercentage = document.getElementById('progressPercentage');
const progressPercentageDesktop = document.getElementById('progressPercentageDesktop');
const progressRemaining = document.getElementById('progressRemaining');
const progressRemainingDesktop = document.getElementById('progressRemainingDesktop');

let aboutSection = null;
let isProgressVisible = false;
let isScrolling = false;
let scrollTimeout = null;
let lastScrollPosition = 0;

function updateProgress() {
    if (!aboutSection) {
        aboutSection = document.getElementById('about');
        if (!aboutSection) return;
    }

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const aboutSectionTop = aboutSection.offsetTop;
    
    // Detect scrolling direction and activity
    const isScrollingDown = scrollTop > lastScrollPosition;
    const isScrollingUp = scrollTop < lastScrollPosition;
    lastScrollPosition = scrollTop;
    
    // Only show progress bar when actively scrolling and past About section
    if (scrollTop >= aboutSectionTop - 100 && (isScrollingDown || isScrollingUp)) {
        isScrolling = true;
        
        if (!isProgressVisible) {
            // Show both progress bars
            if (pageProgress) pageProgress.classList.add('visible');
            if (pageProgressDesktop) pageProgressDesktop.classList.add('visible');
            isProgressVisible = true;
        }
        
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollPosition = scrollTop + windowHeight;
        
        // Calculate progress percentage
        const progress = Math.min(100, Math.max(0, ((scrollPosition - aboutSectionTop) / (documentHeight - aboutSectionTop)) * 100));
        const remaining = Math.max(0, 100 - progress);
        
        // Update mobile progress bar
        if (progressFill) {
            progressFill.style.height = `${progress}%`;
        }
        if (progressIndicator) {
            const indicatorPosition = (progress / 100) * 67; // 67px is the height of mobile progress bar
            progressIndicator.style.top = `${indicatorPosition}px`;
        }
        if (progressPercentage) {
            progressPercentage.textContent = `${Math.round(progress)}%`;
        }
        if (progressRemaining) {
            progressRemaining.textContent = `${Math.round(remaining)}%`;
        }
        
        // Update desktop progress bar
        if (progressFillDesktop) {
            progressFillDesktop.style.height = `${progress}%`;
        }
        if (progressIndicatorDesktop) {
            const indicatorPositionDesktop = (progress / 100) * 200; // 200px is the height of desktop progress bar
            progressIndicatorDesktop.style.top = `${indicatorPositionDesktop}px`;
        }
        if (progressPercentageDesktop) {
            progressPercentageDesktop.textContent = `${Math.round(progress)}%`;
        }
        if (progressRemainingDesktop) {
            progressRemainingDesktop.textContent = `${Math.round(remaining)}%`;
        }
        
        // Clear existing timeout
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        // Hide progress bar after scrolling stops (1.5 seconds of inactivity)
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
            if (isProgressVisible) {
                if (pageProgress) pageProgress.classList.remove('visible');
                if (pageProgressDesktop) pageProgressDesktop.classList.remove('visible');
                isProgressVisible = false;
            }
        }, 1500);
        
    } else if (scrollTop < aboutSectionTop - 100) {
        // Hide immediately if before About section
        if (isProgressVisible) {
            if (pageProgress) pageProgress.classList.remove('visible');
            if (pageProgressDesktop) pageProgressDesktop.classList.remove('visible');
            isProgressVisible = false;
        }
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
    }
}

// Throttle scroll events for better performance
let ticking = false;
function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
    }
}

function onScroll() {
    ticking = false;
    requestTick();
}

// Add scroll event listener
window.addEventListener('scroll', onScroll, { passive: true });

// Initial update