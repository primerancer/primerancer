// Skills filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.skill-filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');
    
    // Filter skills based on category
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.classList.remove('bg-gradient-to-r', 'from-blue-600', 'to-purple-600');
                btn.classList.add('bg-gray-700/50');
            });
            
            this.classList.add('active');
            this.classList.remove('bg-gray-700/50');
            this.classList.add('bg-gradient-to-r', 'from-blue-600', 'to-purple-600');
            
            // Filter skill cards
            skillCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    card.classList.add('scale-in');
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Animate progress bars when they become visible
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBars = entry.target.querySelectorAll('.skill-progress-bar');
                progressBars.forEach(bar => {
                    const targetProgress = bar.getAttribute('data-progress');
                    if (targetProgress) {
                        // Start from 0% and animate to target progress
                    bar.style.width = '0%';
                    setTimeout(() => {
                            bar.style.width = targetProgress + '%';
                        }, 300);
                    }
                });
                progressObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    skillCards.forEach(card => {
        progressObserver.observe(card);
    });
    
    // Counter animation for skills summary card
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.counter-animation');
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000; // 2 seconds
                    const step = target / (duration / 16); // 60fps
                    let current = 0;
                    
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        counter.textContent = Math.floor(current) + '+';
                    }, 16);
                });
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe the skills summary card for counter animation
    const skillsSummaryCard = document.querySelector('.col-span-2 .skill-card');
    if (skillsSummaryCard) {
        counterObserver.observe(skillsSummaryCard);
    }
});