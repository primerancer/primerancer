// Back to Top Button Logic
const backToTopButton = document.getElementById('back-to-top');

function updateBackToTopVisibility() {
    const scrollThreshold = 100;
    const isScrolledDown = document.body.scrollTop > scrollThreshold || document.documentElement.scrollTop > scrollThreshold;
    if (isScrolledDown) {
        backToTopButton.classList.remove('hidden');
    } else {
        backToTopButton.classList.add('hidden');
    }
}

window.onscroll = updateBackToTopVisibility;

backToTopButton.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// GIF Modal Logic
const modal = document.getElementById('gif-modal');
const modalGif = document.getElementById('modal-gif');
const closeModalBtn = document.getElementById('close-modal');

function openModal(gifSrc) {
    modalGif.src = gifSrc;
    modal.classList.remove('hidden');
    modal.classList.remove('animate-fade-out');
    modal.classList.add('animate-fade-in');
}

function closeModal() {
    modal.classList.remove('animate-fade-in');
    modal.classList.add('animate-fade-out');
    setTimeout(() => {
        modal.classList.add('hidden');
        modalGif.src = ''; // Stop GIF to save resources
    }, 300); // Must match animation duration
}

closeModalBtn.addEventListener('click', closeModal);

modal.addEventListener('click', (e) => {
    // Close if clicked outside the image container
    if (e.target === modal) {
        closeModal();
    }
});

// Mobile menu toggle
// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Close mobile menu if open
        mobileMenu.classList.add('hidden');
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Highlight active navigation link based on scroll position
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
const aboutButton = document.querySelector('button[data-translate="nav-about"]');
const projectsButton = document.querySelector('button[data-translate="nav-projects"]');


// Function to scroll to about section
function scrollToAbout() {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
        
        // Activate About section animations after scrolling
        setTimeout(() => {
            activateAboutAnimations();
        }, 1000);
    }
}

// Function to activate About section animations
function activateAboutAnimations() {
    // About section text animations
    document.querySelectorAll('.about-text-left').forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('animate');
        }, index * 200); // Staggered animation
    });
    
    document.querySelectorAll('.about-text-right').forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('animate');
        }, index * 200 + 100); // Staggered animation with offset
    });

    // About image animation
    setTimeout(() => {
        document.querySelector('.about-image-animation')?.classList.add('animate');
    }, 800);

    // About button animation
    setTimeout(() => {
        document.querySelector('.about-button-show')?.classList.add('animate');
    }, 1200);

    // Education section animations
    document.querySelectorAll('.education-text-left').forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('animate');
        }, 1400 + index * 200);
    });
    
    document.querySelectorAll('.education-text-right').forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('animate');
        }, 1400 + index * 200 + 100);
    });
}

// Intersection Observer for About section animations on scroll
const aboutAnimationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.id === 'about') {
            // Activate animations when About section comes into view
            activateAboutAnimations();
            aboutAnimationObserver.unobserve(entry.target); // Only trigger once
        }
    });
}, { threshold: 0.3 });

// Observe About section for scroll-based animation
document.addEventListener('DOMContentLoaded', () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        aboutAnimationObserver.observe(aboutSection);
    }


});

// Handle hover on image to show button again
document.addEventListener('DOMContentLoaded', () => {
    const imageContainer = document.querySelector('.about-image-animation').parentElement;
    const button = document.querySelector('.about-button-show');
    let hoverTimeout;

    if (imageContainer && button) {
        imageContainer.addEventListener('mouseenter', () => {
            // Clear any existing timeout
            if (hoverTimeout) {
                clearTimeout(hoverTimeout);
            }
            
            // Remove previous animation classes
            button.classList.remove('animate', 'show-on-hover');
            
            // Force reflow to restart animation
            button.offsetHeight;
            
            // Add hover class to show button again
            button.classList.add('show-on-hover');
        });

        imageContainer.addEventListener('mouseleave', () => {
            // Clear the hover class after a short delay to allow for smooth transition
            hoverTimeout = setTimeout(() => {
                button.classList.remove('show-on-hover');
            }, 100);
        });
    }
});



// Typewriter effect
const typewriterText = "フルスタック & AI エンジニア";
const typewriterElement = document.getElementById('typewriter-text');
let i = 0;

typewriterElement.innerHTML = '';

function typeWriter() {
    if (i < typewriterText.length) {
        typewriterElement.innerHTML = typewriterText.substring(0, i + 1) + '<span class="blinking-cursor">|</span>';
        i++;
        // Szybsze pisanie na urządzeniach mobilnych
        const speed = window.innerWidth <= 768 ? 40 : 80;
        setTimeout(typeWriter, speed);
    } else {
        // Keep the blinking cursor at the end
        typewriterElement.innerHTML = typewriterText + '<span class="blinking-cursor">|</span>';
    }
}

// Start the typewriter effect - szybszy start na mobilnych
const startDelay = window.innerWidth <= 768 ? 300 : 1000;
setTimeout(typeWriter, startDelay);

// Skills Expand/Collapse functionality
function toggleSkills(button) {
    const skillsGrid = button.closest('.skills-container').querySelector('.skills-grid');
    const btnText = button.querySelector('.btn-text');
    const icon = button.querySelector('i');
    
    if (skillsGrid.classList.contains('expanded')) {
        // Collapse
        skillsGrid.classList.remove('expanded');
        button.classList.remove('expanded');
        btnText.textContent = 'Expand';
        icon.className = 'fas fa-chevron-down mr-1';
        
        // Hide technologies smoothly
        setTimeout(() => {
            if (!skillsGrid.classList.contains('expanded')) {
                skillsGrid.style.maxHeight = '0';
                skillsGrid.style.opacity = '0';
            }
        }, 300);
    } else {
        // First, collapse all other expanded skill cards
        const allExpandedGrids = document.querySelectorAll('.skills-grid.expanded');
        const allExpandedButtons = document.querySelectorAll('.expand-collapse-btn.expanded');
        
        allExpandedGrids.forEach(grid => {
            if (grid !== skillsGrid) {
                grid.classList.remove('expanded');
                grid.style.maxHeight = '0';
                grid.style.opacity = '0';
            }
        });
        
        allExpandedButtons.forEach(btn => {
            if (btn !== button) {
                btn.classList.remove('expanded');
                const otherBtnText = btn.querySelector('.btn-text');
                const otherIcon = btn.querySelector('i');
                otherBtnText.textContent = 'Expand';
                otherIcon.className = 'fas fa-chevron-down mr-1';
            }
        });
        
        // Now expand the clicked card
        skillsGrid.classList.add('expanded');
        button.classList.add('expanded');
        btnText.textContent = '';
        icon.className = 'fas fa-chevron-up mr-1';
        
        // Show technologies smoothly
        skillsGrid.style.maxHeight = 'none';
        skillsGrid.style.opacity = '1';
    }
}

// One-time rotation animation for code icon
const codeIcon = document.getElementById('code-icon');
if (codeIcon) {
    setTimeout(() => {
        codeIcon.classList.add('code-icon-rotate');
    }, 1500); // Start after typewriter begins
}

// Cookie Consent Logic
const cookieBanner = document.getElementById('cookie-banner');
const acceptCookiesBtn = document.getElementById('accept-cookies');
const rejectCookiesBtn = document.getElementById('reject-cookies');

// Check if user has already made a choice
const cookieChoice = localStorage.getItem('cookieChoice');

if (!cookieChoice) {
    // Show banner after 1 second
    setTimeout(() => {
        cookieBanner.classList.remove('translate-y-full');
    }, 1000);
}

acceptCookiesBtn.addEventListener('click', () => {
    localStorage.setItem('cookieChoice', 'accepted');
    cookieBanner.classList.add('translate-y-full');
    
    // Initialize analytics (Plausible)
    if (typeof plausible !== 'undefined') {
        plausible('Cookie Accepted');
    }
});

rejectCookiesBtn.addEventListener('click', () => {
    localStorage.setItem('cookieChoice', 'rejected');
    cookieBanner.classList.add('translate-y-full');
});

// Theme Toggle Logic
const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const themeIcon = themeToggle.querySelector('i');
const themeIconMobile = themeToggleMobile.querySelector('i');

// Check for saved theme preference or default to dark
const currentTheme = localStorage.getItem('theme') || 'dark';
document.body.classList.toggle('light-mode', currentTheme === 'light');
updateThemeIcon(currentTheme);

function toggleTheme() {
    const isLight = document.body.classList.toggle('light-mode');
    const newTheme = isLight ? 'light' : 'dark';
    
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
    
    // Track theme change
    if (typeof plausible !== 'undefined') {
        plausible('Theme Changed', {props: {theme: newTheme}});
    }
}

themeToggle.addEventListener('click', toggleTheme);
themeToggleMobile.addEventListener('click', toggleTheme);

function updateThemeIcon(theme) {
    const iconClass = theme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
    themeIcon.className = iconClass;
    themeIconMobile.className = iconClass;
}

// Analytics (Plausible) - Lightweight and privacy-friendly
if (typeof plausible !== 'undefined') {
    // Track page views
    plausible('Page View', {props: {page: window.location.pathname}});
    
    // Track project clicks
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('a')) {
                const projectTitle = card.querySelector('h3').textContent;
                plausible('Project Clicked', {props: {project: projectTitle}});
            }
        });
    });
}

// GitHub API Integration for automatic repo updates
async function updateGitHubStats() {
    try {
        const response = await fetch('https://api.github.com/users/adi1985a/repos?sort=updated&per_page=5');
        const repos = await response.json();
        
        // Update project cards with latest GitHub data
        repos.forEach(repo => {
            const projectCard = document.querySelector(`[data-github-repo="${repo.name}"]`);
            if (projectCard) {
                const starsElement = projectCard.querySelector('.github-stars');
                const updatedElement = projectCard.querySelector('.github-updated');
                
                if (starsElement) {
                    starsElement.textContent = `${repo.stargazers_count} ⭐`;
                }
                if (updatedElement) {
                    updatedElement.textContent = `Updated: ${new Date(repo.updated_at).toLocaleDateString()}`;
                }
            }
        });
    } catch (error) {
        console.log('GitHub API not available or rate limited');
    }
}

// Initialize GitHub stats update
updateGitHubStats();


// Słownik tłumaczeń
const translations = {
    en: {
        // Navigation
        'nav-home': 'Home',
        'nav-about': 'About',
        'nav-passions': 'Passions',
        'nav-projects': 'Projects',
    'nav-testimonials': 'Testimonials',
    'nav-featured-projects': 'Featured Projects',
    'dropdown-featured-projects': 'I want to see your featured projects',
    'dropdown-all-projects': 'I want to see all your projects',
    'dropdown-testimonials': 'I want to see client feedback',
    'dropdown-about': 'I want to get to know you',
    'dropdown-presentation': 'I want to see your presentation',
    'dropdown-tech-stack': 'I want to see your tech stack',
    'dropdown-interests': 'I want to see your interests',
    'dropdown-inspirations': 'I want to see who inspires you',
    'dropdown-fun': 'I want to have some Fun',
    'dropdown-contact': 'I want to contact you',
    'go-button': 'Go',
        'nav-all-projects': 'All Projects',
        'nav-education': 'Education & Grades',
        'nav-skills': 'Skills',
        'nav-elevator': 'Elevator Pitch',
        'nav-fun': 'Fun & Creativity',
        'nav-why-hire-me': 'Why Hire Me',
        'nav-subscribe': 'Subscribe',
        'nav-contact': 'Contact',
        'nav-about-me': 'About Me',
        'nav-career-timeline': 'Career Timeline',
        'nav-mentors': 'My Mentors',
        'nav-articles': 'Articles',
        
        // Hero Section
        'hero-greeting': 'Hi, I\'m',
        'hero-typewriter-1': 'Fullstack Developer',
        'hero-typewriter-2': 'AI Engineer',
        'hero-typewriter-3': 'Software Engineer',
        'hero-description': 'I build scalable, modern applications with clean code and meaningful user experiences. Passionate about fullstack development, AI/ML engineering, graphic design, and creating impactful solutions.',
        'hero-contact': 'Contact Me',
        'hero-projects': 'View Projects',
                           'scroll-down-text': 'Scroll down to explore more',
           'click-to-scroll': 'Click to scroll down',
           'tech-stack-hint': 'Hover to scroll Tech Stack',
        
        // About Section
        'about-title': 'About',
        'about-subtitle': 'Me',
        'about-description': 'Get to know more about my background, education, and what drives me as a developer.',
        'about-who': 'Who I Am',
    'about-click-pitch': 'Click to see my pitch',
        'about-description-1': 'I\'m a passionate Software Engineer (GPA 5.0/5.0) with hands-on experience across fullstack development, AI/ML engineering, embedded systems, and DevOps.',
        'about-description-2': 'I enjoy building scalable, modern applications with clean code and meaningful user experiences. I specialize in Python, JavaScript, C++, and comfortably navigate frontend, backend, and low-level stacks.',
        'about-what': 'What I Do',
        'about-build': 'Build modern, responsive web, desktop, and mobile applications',
        'about-ai': 'Develop and deploy AI/ML models for real-world use cases',
        'about-embedded': 'Design and program embedded systems and IoT devices',
        'about-devops': 'Implement CI/CD pipelines and cloud infrastructure',
        'about-devops': 'Implement CI/CD pipelines and cloud infrastructure',
        
        // Projects Section
        'projects-title': 'Featured',
        'projects-subtitle': 'Projects',
        'projects-description': 'Here are some of my most notable projects that showcase my skills and expertise.',
        'view-details': 'View Details',
        'all-skills': 'All Skills',
        'lang-stats-4': '4 Languages',
        'lang-stats-multilingual': 'Multilingual',
        'lang-stats-international': 'International',
        'lang-stats-communication': 'Communication',
        'lang-stats-teamwork': 'Team Work',
        'lang-stats-collaboration': 'Collaboration',
        'view-all-projects': 'View All Projects on GitHub',
        
        // All Projects Section
        'all-projects-title': 'More',
        'all-projects-subtitle': 'Projects',
        'all-projects-description': 'Explore all my projects, including advanced AI tools, simulators, and more. For full details, visit the dedicated page below.',
        'view-all-projects-page': 'View All Projects',
        
        // Education Section
        'education-title': 'Education &',
        'education-subtitle': 'Grades',
        'education-description': 'My academic background and university grades.',
        'computer-science': 'Computer Science',
        'bachelors-degree': 'Bachelor\'s Degree',
        'university': 'AHE University',
        'years': '2021 - 2025',
        'gpa': 'GPA: 5.0',
        'excellent': 'Excellent',
        'professional-cv': 'Professional CV',
        'updated-resume': 'Updated Resume',
        'cv-description': 'Comprehensive CV with all my experience, skills, and project highlights.',
        'last-updated': 'Last updated: December 2024',
        'pdf-format': 'PDF Format',
        'experience': 'Experience',
        'projects-count': 'Projects',
        'technologies': 'Technologies',
        'years-exp': '8+ years',
        'projects-plus': '80+',
        'tech-plus': '50+',
        'university-grades': 'University Grades',
        'academic-performance': 'Academic Performance',
        'grades-description': 'Complete transcript of all university courses and grades.',
        'all-subjects': 'All subjects included',
        'official-transcript': 'Official transcript',
        'download-diploma': 'Download Diploma',
        'download-all-grades': 'Download All Grades',
        
        // Education Details
        'degree-title': 'Engineer\'s Degree in Software Development',
        'degree-description': 'Graduated with distinction (5.0 / 5.0 GPA)',
        'thesis-title': 'Bachelor Thesis',
        'thesis-description': 'Offline AI Assistant – a fully offline voice assistant built in Python with Vosk, Ollama, Tkinter, SQLite & cryptography. Focused on speech-to-text, TTS, secure local note-taking and data visualization.',
        'current-focus-title': 'Current Focus & Interests',
        'focus-ai-ml': 'Machine Learning',
        'focus-cloud': 'Cloud-native',
        'focus-backend': 'Scalable backends',
        'focus-ai-industry': 'AI industry applications',
        'tech-stack-section-title': 'Technology Stack',
        
        // About Me Section Specific
        'education-title-about': 'Education & Thesis',
        'education-subtitle-thesis': 'Thesis',
        'about-embedded': 'Design and program embedded systems and IoT devices',
        'about-ai': 'Develop and deploy AI/ML models for real-world use cases',
        'about-build': 'Build modern, responsive web, desktop, and mobile applications',
        'about-apis': 'Design secure and efficient REST/GraphQL APIs',
        'about-offline-ai': 'Create offline AI solutions using local LLMs',
        
        // Education Timeline
        'education-degree-title': 'Computer Science Degree',
        'education-university': 'AHE University, Łódź',
        'education-gpa': 'GPA: 5.0 (Excellent)',
        'education-focus': 'AI & Machine Learning focus',
        'education-skills': 'Programming & Web Development',
        
        // Manpower Experience
        'manpower-title': 'Manpower Experience',
        'manpower-role': 'Production & Service Roles',
        'manpower-production': 'Production, construction & service',
        'manpower-optimization': 'Process optimization & digitization',
        'manpower-reduction': 'Reduced reporting time by 75%',
        
        // Marketing & Management
        'marketing-title': 'Marketing & Management',
        'marketing-university': 'WSB - National Louis University',
        'marketing-focus': 'International Marketing focus',
        'marketing-principles': 'Management principles',
        'marketing-perspective': 'International perspective',
        
        // Graphic Design Freelance
        'graphic-design-title': 'Graphic Design Freelance',
        'graphic-design-experience': '15 Years of Creative Experience',
        'graphic-design-ui': 'UI/UX design & visual aesthetics',
        'graphic-design-brand': 'Brand identity & marketing materials',
        'graphic-design-principles': 'User-centered design principles',
        
        // Future Vision
        'future-vision-title': 'Future Vision',
        'future-vision-description': 'Evolving as a full-stack developer, focusing on AI/ML integration, cloud solutions, and innovative applications that solve real-world problems.',
        'future-vision-progress': 'In Progress',
        
        // Case Studies
        'case-studies-title': 'Case Studies',
        'case-study-1-title': 'E-commerce Platform Optimization',
        'case-study-1-company': 'TechStart Solutions',
        'case-study-1-loading': 'Loading Speed',
        'case-study-1-conversion': 'Conversion Rate',
        'case-study-1-mobile': 'Mobile Performance',
        'case-study-1-description': 'Implemented React optimization, lazy loading, and mobile-first design resulting in significant performance improvements and increased sales.',
        'case-study-2-title': 'AI-Powered Analytics Dashboard',
        'case-study-2-company': 'DataCorp Research',
        'case-study-2-processing': 'Data Processing',
        'case-study-2-accuracy': 'Accuracy',
        'case-study-2-adoption': 'User Adoption',
        'case-study-2-description': 'Developed machine learning algorithms for real-time data analysis, providing actionable insights and improving decision-making processes.',
        
        // Mentor Recommendations
        'mentor-recommendations-title': 'Mentor & Academic Recommendations',
        'mentor-1-name': 'Ahmad Sharifinejad',
        'mentor-1-role': 'SW Manager Norway, Zenitel',
        'mentor-1-quote': '"The ability to handle complex tasks, adapt to new technologies, and collaborate effectively within a team indicates strong potential in future technological roles."',
        'mentor-1-skills': 'Team Collaboration • Problem Solving • Mentoring',
        'mentor-2-name': 'PhD. Wanda Gryglewicz-Kacerka',
        'mentor-2-role': 'Evaluation supervisor, Professor, AHE University',
        'mentor-2-quote': '"Adrian\'s academic performance and practical skills are outstanding. His projects reflect a strong grasp of AI concepts and creative, innovative thinking."',
        'mentor-2-skills': 'Academic Excellence • AI Expertise • Innovation',
        'mentor-3-name': 'Peter Ommundsen',
        'mentor-3-role': 'Software Engineer, Zenitel',
        'mentor-3-quote': '"Adrian\'s mobile app development skills are exceptional. He transformed our concept into a polished, user-friendly application that our customers love."',
        'mentor-3-skills': 'Mobile Development • User Experience • Technical Excellence',
        'mentor-4-name': 'Tomasz Kłoczko',
        'mentor-4-role': 'Tønsberg Sykkelservice Owner',
        'mentor-4-quote': '"Adrian transformed our online presence with a modern website and effective marketing strategy. His professionalism and creativity went above and beyond our expectations."',
        'mentor-4-skills': 'Web Development • Marketing Strategy • Professional Excellence',
        
        // Recommendation Letter Button
        'recommendation-letter-button': 'View Official Recommendation Letter',
        'recommendation-letter-description': 'Official internship recommendation document',
        
        // Skills Section
        'skills-title': 'My',
        'skills-subtitle': 'Skills',
        'skills-description': 'Here\'s a comprehensive overview of my technical skills and the tools I work with across 80+ projects.',
        'frontend': 'Frontend',
        'backend': 'Backend',
        'ai-ml': 'AI/ML',
        'languages': 'Languages',
        'cloud-cicd': 'Cloud & CI/CD',
        'cloud-cicd-description': 'Cloud infrastructure, continuous integration, deployment automation, and DevOps practices.',
        'databases': 'Databases',
        'databases-description': 'Database design, management & optimization for reliable, scalable apps.',
        'tools': 'Tools',
        
        // Skills Categories
        'analysis-management': 'Analysis & Management',
        'analysis-management-description': 'Project management, business analysis, and agile methodologies.',
        'ai-deep-learning': 'AI & Deep Learning',
        'ai-deep-learning-description': 'Deep learning, neural networks, computer vision, and NLP.',
        'cloud-cicd-skills': 'Cloud & CI/CD',
        'desktop-apps': 'Desktop Applications',
        'desktop-apps-description': 'Cross-platform desktop applications with modern frameworks.',
        'embedded-iot': 'Embedded Systems & IoT',
        'fullstack-dev': 'Full-Stack Development',
        'fullstack-dev-description': 'Modern web applications, RESTful APIs, database design, and cloud deployment.',
        'other-tools': 'Other Tools',
        'other-tools-description': 'Project management, design tools, mobile development, and productivity software.',
        'scientific-computing': 'Data Science',
        'scientific-computing-description': 'Mathematical modeling, data analysis, and scientific simulations.',
        'security-dev': 'Security & Development',
        'security-dev-description': 'Cybersecurity, secure development practices, encryption, and network security tools.',
        
        // Career Timeline Section
        'career-timeline-title': 'Career',
        'career-timeline-subtitle': 'Timeline',
        'career-timeline-description': 'My journey in technology and development.',
        
        // Client Testimonials Section
        'testimonials-title': 'Client',
        'testimonials-subtitle': 'Testimonials',
        'testimonials-description': 'What my clients and colleagues say about my work.',
        
        // Testimonials Details
        'testimonial-1-name': 'Eldbjørg Kalvenes',
        'testimonial-1-role': 'CEO, Italian Design AS',
        'testimonial-1-text': '"Adrian delivered our e-commerce platform ahead of schedule with exceptional quality. His attention to detail and problem-solving skills are outstanding. Highly recommended!"',
        'testimonial-1-project': 'Project: E-commerce Platform',
        'testimonial-1-result': '+40% Sales',
        
        // Languages Section
        'languages-title': 'Languages',
        'languages-subtitle': 'I Speak',
        'languages-description': 'I speak multiple languages that help me with international projects.',
        
        // Language Details
        'language-skills-title': 'Language Skills & Proficiency',
        'language-polish': 'Polish',
        'polish-pronunciation': 'Perfect pronunciation',
        'polish-fluency': 'Native fluency',
        'language-norwegian': 'Norwegian',
        'norwegian-work': 'Work environment',
        'norwegian-daily': 'Daily conversation',
        'language-english': 'English',
        'english-technical': 'Technical communication',
        'english-international': 'International projects',
        'language-italian': 'Italian',
        'italian-basic': 'Basic conversation',
        'italian-cultural': 'Cultural appreciation',
        
        // Language Statistics
        'lang-stats-4': '4 Languages',
        'lang-stats-multilingual': 'Multilingual',
        'lang-stats-international': 'International',
        'lang-stats-communication': 'Communication',
        'lang-stats-teamwork': 'Team Work',
        'lang-stats-collaboration': 'Collaboration',
        
        // Language Names for Progress Bars
        'language-polish-progress': 'Polish',
        'language-norwegian-progress': 'Norwegian',
        'language-english-progress': 'English',
        'language-italian-progress': 'Italian',
        
        // Testimonials Additional
        'testimonial-2-project': 'Project: Website & Marketing',
        'testimonial-2-result': '+60% Efficiency',
        'testimonial-3-project': 'Project: Mobile App',
        'testimonial-3-rating': '4.8★ Rating',
        
        // Case Studies
        'case-studies-title': 'Case Studies',
        'case-study-1-title': 'E-commerce Platform Optimization',
        'case-study-1-company': 'TechStart Solutions',
        'case-study-1-loading': 'Loading Speed',
        'case-study-1-conversion': 'Conversion Rate',
        'case-study-1-mobile': 'Mobile Performance',
        'case-study-1-description': 'Implemented React optimization, lazy loading, and mobile-first design resulting in significant performance improvements and increased sales.',
        
        // Intellectual Inspirations Section
        'inspirations-title': 'Intellectual',
        'inspirations-subtitle': 'Inspirations',
        'inspirations-description': 'Thinkers and scientists who have influenced my approach to technology and philosophy.',
        
        // Inspirations Details
        'meet-mentors-btn': 'Meet My Mentors',
        'meet-mentors-description': 'Discover the brilliant minds that have shaped my thinking and approach to science, technology, and creativity.',
        
        // Complete Tech Stack Overview
        'tech-stack-title': 'Complete Tech',
        'tech-stack-subtitle': 'Stack Overview',
        'tech-stack-description': 'A comprehensive overview of all technologies and tools I use.',
        
        // Skills Statistics
        'stats-projects': 'Projects',
        'stats-technologies': 'Technologies',
        'stats-years': 'Years',
        
        // Core Strengths & Specializations
        'core-strengths-title': '🎯 Core Strengths',
        'fullstack-dev-strength': 'Full-Stack Development',
        'ai-ml-strength': 'AI & Machine Learning',
        'embedded-iot-strength': 'Embedded Systems & IoT',
        'specializations-title': '🚀 Specializations',
        'cross-platform-dev': 'Cross-Platform Development',
        'cloud-devops': 'Cloud & DevOps',
        'security-best-practices': 'Security & Best Practices',
        
        // Programming Articles Section
        'articles-title': 'Programming',
        'articles-subtitle': 'Articles',
        'articles-description': 'Sharing knowledge and experiences in development.',
        
        // Have Some Fun Section
        'fun-title': 'Have Some',
        'fun-subtitle': 'Fun',
        'fun-description': 'Take a break and enjoy a quick game! Challenge yourself with this simple but addictive puzzle game.',
        
        // Game Details
        'game-title': '🎮 Memory Card Game',
        'game-description': 'Find matching pairs of cards. Test your memory and concentration!',
        'game-score': 'Score:',
        'game-moves': 'Moves:',
        'game-start': 'Start Game',
        'game-instructions': 'Click "Start Game" to begin. Find all matching pairs to win!',
        'game-win-message': '🎉 Congratulations! You won in ${moves} moves with a score of ${score}! 🎉',
        'game-reset-button': 'Reset Game',
        
        // Skills Buttons
        'show-projects': 'Show Projects',
        'explore-all-projects': 'Explore All Projects',
        
        // Programming Articles Section
        'tutorials-title': 'Tutorials',
        'tutorials-description': 'Practical guides with code, examples, and implementation steps for various technologies.',
        'visit-w3schools': 'Visit W3Schools',
        'reflections-title': 'Reflections',
        'reflections-description': 'Reflections on learning, skill development, and personal experiences in the programming world.',
        'read-on-medium': 'Read on Medium',
        'trends-title': 'Trends',
        'trends-description': 'Latest trends, innovations, and future technologies in the programming and IT world.',
        'read-article': 'Read Article',
        'stay-connected-title': 'Stay Connected with the Developer Community',
        'stay-connected-description': 'Join thousands of developers worldwide in exploring the latest programming insights, sharing knowledge, and staying ahead of technology trends.',
        
        // Search Section
        'search-title': 'Looking for?',
        'search-placeholder': 'Select an option...',
        
        // Blog Section
        'blog-title': 'Programming',
        'blog-subtitle': 'Articles',
        'blog-description': 'Latest insights, tips, and trends in programming and technology. Stay updated with the developer community.',
        
        // Career Section
        'career-title': 'Career',
        'career-subtitle': 'Timeline',
        'career-description': 'My professional journey from studies to freelancing, showcasing growth, achievements, and technological evolution.',
        'career-my': 'My',
        'career-professional-journey': 'professional journey',
        'career-from': 'from',
        'career-studies': 'studies',
        'career-to': 'to',
        'career-freelancing': 'freelancing',
        'career-showcasing': 'showcasing',
        'career-growth': 'growth',
        'career-achievements': 'achievements',
        'career-and': 'and',
        'career-technological-evolution': 'technological evolution',
        
        // Career Timeline Details
        'zenitel-title': 'Zenitel Internship',
        'zenitel-description': 'Mobile App Development & API Integration',
        'zenitel-improvement': 'Mobile app improving processes by 20%',
        'zenitel-tech': 'Python & Microsoft Power Apps',
        'zenitel-api': 'API integrations & database management',
        'freelance-title': 'Freelance Development',
        'freelance-description': 'Full-Stack Projects & Client Solutions',
        'freelance-web': 'Web applications & e-commerce platforms',
        'freelance-automation': 'Process automation & system integration',
        'freelance-collaboration': 'Client collaboration & project management',
        
        // Contact Section
        'contact-title': 'Get In',
        'contact-subtitle': 'Touch',
        'contact-description': 'Ready to collaborate? Let\'s discuss your project and how I can help bring your ideas to life.',
        'contact-subject': 'Subject',
        'contact-name': 'Name',
        'contact-email': 'Email',
        'contact-message': 'Message',
        'contact-send': 'Send Message',
        'contact-sending': 'Sending...',
        'contact-success': 'Thank you! Your message has been sent successfully.',
        'contact-error': 'There was an error sending your message. Please try again later.',
        'contact-email-label': 'Email',
        'contact-linkedin-label': 'LinkedIn',
        'contact-github-label': 'GitHub',
        
        // Footer
        'footer-rights': 'All rights reserved.',
        'footer-made': 'Made with',
        'footer-description': 'Fullstack Developer & Data Engineer passionate about creating innovative solutions and pushing the boundaries of technology.',
        'footer-privacy': 'Privacy Policy',
        'footer-terms': 'Terms of Service',
        'footer-cookies': 'Cookie Policy',
        'footer-quick-links': 'Quick Links',
        'footer-services': 'Services',
        'footer-contact-info': 'Contact Info',
        'footer-available': 'Available for projects',
        'footer-and': 'and',
        
        // Footer Links
        'footer-home': 'Home',
        'footer-about': 'About Me',
        'footer-skills': 'Skills',
        'footer-all-projects': 'All Projects',
        'footer-articles': 'Articles',
        'footer-contact': 'Contact',
        'footer-web-dev': 'Web Development',
        'footer-mobile-apps': 'Mobile Apps',
        'footer-data-engineering': 'Data Engineering',
        'footer-ai-ml': 'AI/ML Solutions',
        'footer-system-analysis': 'System Analysis',
        'footer-consulting': 'Consulting',
        
        // Cookie Banner
        'cookie-title': 'Cookie Policy',
        'cookie-text': 'This website uses cookies to enhance your browsing experience. By continuing to use this site, you consent to our use of cookies.',
        'cookie-accept': 'Accept',
        'cookie-reject': 'Reject',
        
        // Passions Section
        'passions-title': 'My',
        'passions-subtitle': 'Passions',
        'passions-description': 'Besides programming, I have many passions that inspire my growth and creativity.',
        
        // Passions Section - Individual Cards
        'passion-ai-title': 'Artificial Intelligence',
        'passion-ai-description': 'My dream is to create artificial consciousness. Every day I explore AI in depth, designing models, developing tools, and testing new ideas that move this vision closer to reality.',
        'passion-music-title': 'Music',
        'passion-music-description': 'Played piano since 8 years old. Compose electronic, synth tracks in FL Studio. I’ve taught beginner piano classes. My tracks are available on SoundCloud.',
        'passion-travel-title': 'Travel',
        'passion-travel-description': 'Love forest walks, hiking, cycling, mountain trails, snowboarding, and discovering new places and cultures that broaden my horizons.',
        'passion-design-title': 'Design',
        'passion-design-description': 'For 12 years I’ve freelanced as a designer, delivering catalogs, ads, banners, web assets, and full marketing campaigns. I craft final visuals with Adobe CC, Corel DRAW, and the classic JASC Paint Shop.',
        'passion-science-title': 'Science',
        'passion-science-description': 'I follow the latest news in physics, astronomy, psychology, and IT every day. I code my own simulations from math models to quantum mechanics. Learning & experimenting is my way to grow.',
        'passion-astronomy-title': 'Astronomy',
        'passion-astronomy-description': 'Exploring the cosmos and understanding the universe\'s mysteries fascinates me the most and meditation to me. My app PySolarSim predicts the position of any celestial body for any date and time.',
        'passion-quantum-title': 'Quantum Physics',
        'passion-quantum-description': 'Captivated by the particle realm, I built a minimal double-slit simulator to visualises an electron’s path. I eagerly follow research that bridges quantum theory and philosophy.',
        'passion-philosophy-title': 'Philosophy',
        'passion-philosophy-description': 'Deep thinking about existence, consciousness, and the nature of reality through philosophical exploration. I mix Aristotle with modern cognitive science, asking: can a machine truly understand?',
        'passion-psychology-title': 'Psychology',
        'passion-psychology-description': 'Love to learn about human behavior, cognition & the mind’s complexities. I explore its potential inspired by new findings in psychology & neuroscience.',
        
        // Section Descriptions with Colors and Animations
        'testimonials-what': 'What',
        'testimonials-my': 'my',
        'testimonials-clients': 'clients',
        'testimonials-and': 'and',
        'testimonials-colleagues': 'colleagues',
        'testimonials-say': 'say',
        'testimonials-about': 'about',
        'testimonials-work': 'work',
        'languages-i': 'I',
        'languages-speak': 'speak',
        'languages-multiple': 'multiple',
        'languages-languages': 'languages',
        'languages-that': 'that',
        'languages-help': 'help',
        'languages-me': 'me',
        'languages-with': 'with',
        'languages-international': 'international',
        'languages-projects': 'projects',
        'passions-besides': 'Besides',
        'passions-programming': 'programming',
        'passions-i': 'I',
        'passions-have': 'have',
        'passions-many': 'many',
        'passions-passions': 'passions',
        'passions-that': 'that',
        'passions-inspire': 'inspire',
        'passions-my': 'my',
        'passions-growth': 'growth',
        'passions-and': 'and',
        'passions-creativity': 'creativity',
        'projects-here': 'Here',
        'projects-are': 'are',
        'projects-some': 'some',
        'projects-of': 'of',
        'projects-my': 'my',
        'projects-most': 'most',
        'projects-notable': 'notable',
        'projects-projects': 'projects',
        'projects-that': 'that',
        'projects-showcase': 'showcase',
        'projects-skills': 'skills',
        'projects-and': 'and',
        'projects-expertise': 'expertise',
        'all-projects-explore': 'Explore',
        'all-projects-all': 'all',
        'all-projects-my': 'my',
        'all-projects-projects': 'projects',
        'all-projects-including': 'including',
        'all-projects-advanced': 'advanced',
        'all-projects-ai-tools': 'AI tools',
        'all-projects-simulators': 'simulators',
        'all-projects-and-more': 'and more',
        'all-projects-for-full-details': 'For full details',
        'all-projects-visit': 'visit',
        'all-projects-the': 'the',
        'all-projects-dedicated': 'dedicated',
        'all-projects-page': 'page',
        'all-projects-below': 'below',
        'skills-heres': 'Here\'s',
        'skills-a': 'a',
        'skills-comprehensive': 'comprehensive',
        'skills-overview': 'overview',
        'skills-of': 'of',
        'skills-my': 'my',
        'skills-technical': 'technical',
        'skills-skills': 'skills',
        'skills-and': 'and',
        'skills-the': 'the',
        'skills-tools': 'tools',
        'skills-i': 'I',
        'skills-work': 'work',
        'skills-with': 'with',
        'skills-across': 'across',
        'skills-75-projects': '80+ projects',
        'blog-latest': 'Latest',
        'blog-insights': 'insights',
        'blog-tips': 'tips',
        'blog-and': 'and',
        'blog-trends': 'trends',
        'blog-in': 'in',
        'blog-programming': 'programming',
        'blog-technology': 'technology',
        'blog-stay-updated': 'Stay updated',
        'blog-with': 'with',
        'blog-the': 'the',
        'blog-developer-community': 'developer community',
        'fun-take': 'Take',
        'fun-a': 'a',
        'fun-break': 'break',
        'fun-and-enjoy': 'and enjoy',
        'fun-quick': 'quick',
        'fun-game': 'game',
        'fun-challenge': 'Challenge',
        'fun-yourself': 'yourself',
        'fun-with-this': 'with this',
        'fun-simple': 'simple',
        'fun-but': 'but',
        'fun-addictive': 'addictive',
        'fun-puzzle-game': 'puzzle game',
        'contact-ready': 'Ready',
        'contact-to': 'to',
        'contact-collaborate': 'collaborate',
        'contact-lets': 'Let\'s',
        'contact-discuss': 'discuss',
        'contact-your': 'your',
        'contact-project': 'project',
        'contact-and': 'and',
        'contact-how': 'how',
        'contact-i': 'I',
        'contact-can': 'can',
        'contact-help': 'help',
        'contact-bring': 'bring',
        'contact-ideas': 'ideas',
        'contact-life': 'life',
        
        // Contact Section - Additional Elements
        'contact-info-title': 'Contact Information',
        'contact-message-title': 'Send Me a Message',
        'contact-open-to': 'I\'m always open to:',
        'contact-learning': 'Learning new technologies and methodologies',
        'contact-collaborating': 'Collaborating on meaningful and innovative tech initiatives',
        'contact-building': 'Building something impactful that solves real-world problems',
        
        // Project Descriptions
        'project-solar-description': 'Responsive HTML website for space learning with video backgrounds and interactive features.',
        'project-userprofile-description': 'A comprehensive user management system with advanced analytics & customizations.',
        'project-norway-description': 'An interactive map showcasing the best tourist spots in Norway with dynamic filtering.',
        'project-bakery-description': 'An online bakery ordering system with real-time inventory management and payment processing.',
        'project-luxury-description': 'A premium real estate website showcasing luxury properties with advanced search and virtual tours.',
        'project-gym-description': 'A responsive website for a fitness center with schedules and class information.',
        'project-product-description': 'A comprehensive tool for managing product lifecycles, features, and roadmaps with advanced analytics.',
        'project-todo-description': 'A modern to-do list app built with React, designed for efficient task management & seamless organization of daily activities.',
        'project-bike-description': 'A responsive website for a bike service center with booking and service information.',
        'project-ai-career-description': 'An AI-powered career guidance system that helps developers choose their next career path.',
        'project-mindmapper-description': 'A desktop application for creating and organizing mind maps with interactive features.',
        'project-temptracker-description': 'A Java Swing app for monitoring sensor data with real-time logging and visualization.',
        
        // Subscribe Section
        'subscribe-title': 'Subscribe for',
        'subscribe-subtitle': 'Updates',
        'subscribe-description': 'Stay updated with my latest projects, tech insights, and development tips. Get notified when I release new applications or share interesting findings.',
        'subscribe-email-label': 'Email Address',
        'subscribe-email-placeholder': 'your@email.com',
        'subscribe-name-label': 'Name (Optional)',
        'subscribe-name-placeholder': 'Your name',
        'subscribe-button': 'Subscribe for Updates',
    'subscribe-form-title': 'Join My Newsletter',
    'subscribe-form-subtitle': 'Get exclusive insights and project updates',
    'subscribe-privacy': '🔒 Your privacy is protected. No spam, ever.',
        'subscribe-success': 'Thank you! You have been successfully subscribed to updates.',
        'subscribe-error': 'Error subscribing. Please try again.',
        'subscribe-invalid-email': 'Please enter a valid email address.',
        
        // Elevator Pitch Section
        'elevator-title': 'Elevator',
        'elevator-subtitle': 'Pitch',
        'elevator-description': 'Watch my elevator pitch to learn more about my background, skills, and what makes me unique as a developer.',
    'elevator-form-title': 'My Story in 1 Minute',
    'elevator-form-subtitle': 'Learn about my journey, skills, and what drives me',
    'elevator-views': 'HD Quality',
    'elevator-time': '1 min',
        'elevator-video-error': 'Your browser does not support the video tag.',
        'elevator-click-to-play': 'Click to play',
        'elevator-duration': 'Duration: ~1 minute',
        
        // Why Hire Me Section
        'why-hire-title': 'Is it worth hiring me',
        'why-hire-subtitle': 'and why?',
        'why-hire-description': 'Absolutely yes! Here\'s why I\'m the ideal candidate for your programmer and designer. I combine technical skills with creativity, fast learning, and passion for creating innovative solutions.',
        'why-hire-fast-learning-title': 'Fast Learning',
        'why-hire-fast-learning-desc': 'I master new technologies at record speed. Within a week, I can go from basics to advanced implementations.',
        'why-hire-ai-ml-title': 'AI/ML & Fullstack Experience',
        'why-hire-ai-ml-desc': 'I specialize in artificial intelligence, machine learning, and full-stack development. I create intelligent applications from frontend to backend.',
        'why-hire-creativity-title': 'UI/UX Creativity',
        'why-hire-creativity-desc': 'I combine programming with design. I create not only functional but also beautiful and intuitive user interfaces.',
        'why-hire-integration-title': 'System Integration',
        'why-hire-integration-desc': 'I can connect different technologies and systems into a cohesive whole. I create architectures that are scalable and easy to maintain.',
        'why-hire-communication-title': 'Effective Communication',
        'why-hire-communication-desc': 'I communicate clearly and professionally in three languages. I can translate complex technical concepts in an understandable way.',
        'why-hire-problem-solving-title': 'Problem Solving',
        'why-hire-problem-solving-desc': 'I love technical challenges. I analyze problems from different perspectives and find innovative solutions.',
        'why-hire-cta-title': 'Ready to collaborate?',
        'why-hire-cta-desc': 'Don\'t wait! Contact me today and see how I can help with your projects.',
        'why-hire-cta-button': 'Start Collaboration'
    },
    no: {
        // Navigation
        'nav-home': 'Hjem',
        'nav-about': 'Om',
        'nav-passions': 'Mine Passioner',
        'nav-projects': 'Prosjekter',
    'nav-testimonials': 'Anbefalinger',
    'nav-featured-projects': 'Utvalgte Prosjekter',
    'dropdown-featured-projects': 'Jeg vil se dine utvalgte prosjekter',
    'dropdown-all-projects': 'Jeg vil se alle dine prosjekter',
    'dropdown-testimonials': 'Jeg vil se kundefeedback',
    'dropdown-about': 'Jeg vil kjenne deg bedre',
    'dropdown-presentation': 'Jeg vil se din presentasjon',
    'dropdown-tech-stack': 'Jeg vil se din teknologistakk',
    'dropdown-interests': 'Jeg vil se dine interesser',
    'dropdown-inspirations': 'Jeg vil se hvem som inspirerer deg',
    'dropdown-fun': 'Jeg vil ha det gøy',
    'dropdown-contact': 'Jeg vil kontakte deg',
    'go-button': 'Gå',
        'nav-all-projects': 'Alle Prosjekter',
        'nav-education': 'Utdanning & Karakterer',
        'nav-skills': 'Ferdigheter',
        'nav-elevator': 'Elevator Pitch',
        'nav-fun': 'Moro & Kreativitet',
        'nav-why-hire-me': 'Hvorfor Ansette Meg',
        'nav-subscribe': 'Abonner',
        'nav-contact': 'Kontakt',
        'nav-about-me': 'Om meg',
        'nav-career-timeline': 'Karriere Tidslinje',
        'nav-mentors': 'Mine Mentorer',
        'nav-articles': 'Artikler',
        
        // Hero Section
        'hero-greeting': 'Hei, jeg er',
        'hero-typewriter-1': 'Fullstack Utvikler',
        'hero-typewriter-2': 'AI Ingeniør',
        'hero-typewriter-3': 'Programvareingeniør',
        'hero-description': 'Jeg bygger skalerbare, moderne applikasjoner med ren kode og meningsfulle brukeropplevelser. Lidenskapelig for fullstack-utvikling, AI/ML-ingeniørfag, grafisk design og å skape innflytelsesrike løsninger.',
        'hero-contact': 'Kontakt meg',
        'hero-projects': 'Se prosjekter',
                           'scroll-down-text': 'Rull ned for å utforske mer',
           'click-to-scroll': 'Klikk for å rulle ned',
           'tech-stack-hint': 'Hover for å bla til høyre',
        
        // About Section
        'about-title': 'Om',
        'about-subtitle': 'meg',
        'about-description': 'Lær mer om min bakgrunn, utdanning og hva som driver meg som utvikler.',
        'about-who': 'Hvem jeg er',
    'about-click-pitch': 'Klikk for å se min pitch',
        'about-description-1': 'Jeg er en lidenskapelig programvareingeniør (GPA 5.0/5.0) med praktisk erfaring innen fullstack-utvikling, AI/ML-ingeniørfag, innebygde systemer og DevOps.',
        'about-description-2': 'Jeg liker å bygge skalerbare, moderne applikasjoner med ren kode og meningsfulle brukeropplevelser. Jeg spesialiserer meg på Python, JavaScript, C++, og navigerer komfortabelt frontend, backend og lavnivå-stakker.',
        'about-what': 'Hva jeg gjør',
        'about-build': 'Bygger moderne, responsive nett-, skrivebords- og mobilapper',
        'about-ai': 'Utvikler og distribuerer AI/ML-modeller for virkelige brukstilfeller',
        'about-embedded': 'Designer og programmerer innebygde systemer og IoT-enheter',
        'about-devops': 'Implementerer CI/CD-pipelines og skyinfrastruktur',
        
        // Projects Section
        'projects-title': 'Utvalgte',
        'projects-subtitle': 'Prosjekter',
        'projects-description': 'Her er noen av mine mest bemerkelsesverdige prosjekter som viser mine ferdigheter og ekspertise.',
        'view-details': 'Se Detaljer',
        'all-skills': 'Alle Ferdigheter',
        'lang-stats-4': '4 Språk',
        'lang-stats-multilingual': 'Flerspråklig',
        'lang-stats-international': 'Internasjonal',
        'lang-stats-communication': 'Kommunikasjon',
        'lang-stats-teamwork': 'Lagarbeid',
        'lang-stats-collaboration': 'Samarbeid',
        
        // Language Names for Progress Bars
        'language-polish-progress': 'Polsk',
        'language-norwegian-progress': 'Norsk',
        'language-english-progress': 'Engelsk',
        'language-italian-progress': 'Italiensk',
        'view-all-projects': 'Se Alle Prosjekter på GitHub',
        
        // All Projects Section
        'all-projects-title': 'Flere',
        'projects-subtitle': 'Prosjekter',
        'all-projects-description': 'Utforsk alle mine prosjekter, inkludert avanserte AI-verktøy, simulatorer og mer. For fullstendige detaljer, besøk den dedikerte siden nedenfor.',
        'view-all-projects-page': 'Se Alle Prosjekter',
        
        // Education Section
        'education-title': 'Utdanning &',
        'education-subtitle': 'Karakterer',
        'education-description': 'Min akademiske bakgrunn og universitetskarakterer.',
        'computer-science': 'Informatikk',
        'bachelors-degree': 'Bachelorgrad',
        'university': 'AHE Universitet',
        'years': '2021 - 2025',
        'gpa': 'GPA: 5.0',
        'excellent': 'Utmerket',
        'professional-cv': 'Profesjonell CV',
        'updated-resume': 'Oppdatert CV',
        'cv-description': 'Omfattende CV med all min erfaring, ferdigheter og prosjekthøydepunkter.',
        'last-updated': 'Sist oppdatert: desember 2024',
        'pdf-format': 'PDF-format',
        'experience': 'Erfaring',
        'projects-count': 'Prosjekter',
        'technologies': 'Teknologier',
        'years-exp': '8+ år',
        'projects-plus': '80+',
        'tech-plus': '50+',
        'university-grades': 'Universitetskarakterer',
        'academic-performance': 'Akademisk ytelse',
        'grades-description': 'Fullstendig transkript av alle universitetskurs og karakterer.',
        'all-subjects': 'Alle fag inkludert',
        'official-transcript': 'Offisielt transkript',
        'download-diploma': 'Last Ned Diplom',
        'download-all-grades': 'Last Ned Alle Karakterer',
        
        // Education Details
        'degree-title': 'Ingeniørgrad i Programvareutvikling',
        'degree-description': 'Utdannet med utmerkelse (5.0 / 5.0 GPA)',
        'thesis-title': 'Bachelorgradsavhandling',
        'thesis-description': 'Offline AI-assistent – en fullstendig offline stemmeassistent bygget i Python med Vosk, Ollama, Tkinter, SQLite og kryptografi. Fokusert på tale-til-tekst, TTS, sikker lokal notatføring og datavisualisering.',
        'current-focus-title': 'Nåværende Fokus & Interesser',
        'focus-ai-ml': 'Avansert Maskinlæring',
        'focus-cloud': 'Sky-nativ utvikling',
        'focus-backend': 'Backend-arkitekturer',
        'focus-ai-industry': 'AI-industriapplikasjoner',
        'tech-stack-section-title': 'Teknologistakk',
        
        // About Me Section Specific
        'education-title-about': 'Utdanning & Avhandling',
        'education-subtitle-thesis': 'Avhandling',
        'about-embedded': 'Designer og programmerer innebygde systemer og IoT-enheter',
        'about-ai': 'Utvikler og distribuerer AI/ML-modeller for virkelige brukstilfeller',
        'about-build': 'Bygger moderne, responsive nett-, skrivebords- og mobilapper',
        'about-apis': 'Designer sikre og effektive REST/GraphQL APIer',
        'about-offline-ai': 'Lager offline AI-løsninger med lokale LLM-er',
        
        // Skills Section
        'skills-title': 'Mine',
        'skills-subtitle': 'Ferdigheter',
        'skills-description': 'Her er en omfattende oversikt over mine tekniske ferdigheter og verktøyene jeg jobber med på tvers av 80+ prosjekter.',
        'frontend': 'Frontend',
        'backend': 'Backend',
        'ai-ml': 'AI/ML',
        'languages': 'Språk',
        'cloud-cicd': 'Sky & CI/CD',
        'cloud-cicd-description': 'Skyinfrastruktur, kontinuerlig integrasjon, deployment-automatisering og DevOps-praksiser.',
        'databases': 'Databaser',
        'databases-description': 'Databaseutforming, -administrasjon og -optimalisering for pålitelige og skalerbare apper.',
        'tools': 'Verktøy',
        
        // Skills Categories
        'analysis-management': 'Analyse & Ledelse',
        'analysis-management-description': 'Prosjektledelse, forretningsanalyse og agile metodologier.',
        'ai-deep-learning': 'AI & Dyp Læring',
        'ai-deep-learning-description': 'Dyp læring, nevrale nettverk, datamaskinsyn og NLP.',
        'cloud-cicd-skills': 'Sky & CI/CD',
        'desktop-apps': 'Skrivebordsapplikasjoner',
        'desktop-apps-description': 'Tverrplattform skrivebordsapplikasjoner med moderne rammeverk.',
        'embedded-iot': 'Innebygde Systemer & IoT',
        'fullstack-dev': 'Full-Stack Utvikling',
        'fullstack-dev-description': 'Moderne nettapplikasjoner, RESTful APIer, database-design og sky-deployment.',
        'other-tools': 'Andre Verktøy',
        'other-tools-description': 'Prosjektledelse, designverktøy, mobilutvikling og produktivitetsprogramvare.',
        'scientific-computing': 'Data Science',
        'scientific-computing-description': 'Matematisk modellering, dataanalyse og vitenskapelige simuleringer.',
        'security-dev': 'Sikkerhet & Utvikling',
        'security-dev-description': 'Cybersikkerhet, sikre utviklingspraksiser, kryptering og nettverkssikkerhetsverktøy.',
        
        // Career Timeline Section
        'career-timeline-title': 'Karriere',
        'career-timeline-subtitle': 'Tidslinje',
        'career-timeline-description': 'Min reise innen teknologi og utvikling.',
        
        // Client Testimonials Section
        'testimonials-title': 'Kunde',
        'testimonials-subtitle': 'Anbefalinger',
        'testimonials-description': 'Hva mine klienter og kolleger sier om mitt arbeid.',
        
        // Testimonials Details
        'testimonial-1-name': 'Eldbjørg Kalvenes',
        'testimonial-1-role': 'CEO, Italian Design AS',
        'testimonial-1-text': '"Adrian leverte e-handelsplattformen før tidsplanen med høy kvalitet. Hans oppmerksomhet på detaljer og problemløsningsferdigheter er fremragende. Anbefales sterkt!"',
        'testimonial-1-project': 'Prosjekt: E-handelsplattform',
        'testimonial-1-result': '+40% Salg',
        
        // Languages Section
        'languages-title': 'Språk',
        'languages-subtitle': 'Jeg Snakker',
        'languages-description': 'Jeg snakker flere språk som hjelper meg med internasjonale prosjekter.',
        
        // Language Details
        'language-skills-title': 'Språkferdigheter & Kompetanse',
        'language-polish': 'Polsk',
        'polish-pronunciation': 'Perfekt uttale',
        'polish-fluency': 'Morsmål flyt',
        
        // Intellectual Inspirations Section
        'inspirations-title': 'Intellektuelle',
        'inspirations-subtitle': 'Inspirasjoner',
        'inspirations-description': 'Tenkere og vitenskapsmenn som har påvirket min tilnærming til teknologi og filosofi.',
        
        // Inspirations Details
        'meet-mentors-btn': 'Møt Mine Mentorer',
        'meet-mentors-description': 'Oppdag de briljante sinnene som har formet min tenkning og tilnærming til vitenskap, teknologi og kreativitet.',
        
        // Complete Tech Stack Overview
        'tech-stack-title': 'Komplett Teknologi',
        'tech-stack-subtitle': 'Oversikt',
        'tech-stack-description': 'En omfattende oversikt over alle teknologier og verktøy jeg bruker.',
        
        // Skills Statistics
        'stats-projects': 'Prosjekter',
        'stats-technologies': 'Teknologier',
        'stats-years': 'År',
        
        // Core Strengths & Specializations
        'core-strengths-title': '🎯 Kjerneferdigheter',
        'fullstack-dev-strength': 'Full-Stack Utvikling',
        'ai-ml-strength': 'AI & Maskinlæring',
        'embedded-iot-strength': 'Innebygde Systemer & IoT',
        'specializations-title': '🚀 Spesialiseringer',
        'cross-platform-dev': 'Tverrplattform Utvikling',
        'cloud-devops': 'Sky & DevOps',
        'security-best-practices': 'Sikkerhet & Beste Praksis',
        
        // Programming Articles Section
        'articles-title': 'Programmerings',
        'articles-subtitle': 'Artikler',
        'articles-description': 'Deling av kunnskap og erfaringer innen utvikling.',
        
        // Have Some Fun Section
        'fun-title': 'Ha Det',
        'fun-subtitle': 'Gøy',
        'fun-description': 'Interaktive elementer og underholdning.',
        
        // Game Details
        'game-title': '🎮 Minnekortspill',
        'game-description': 'Finn matchende kortpar. Test hukommelsen og konsentrasjonen din!',
        'game-score': 'Poeng:',
        'game-moves': 'Trekk:',
        'game-start': 'Start Spill',
        'game-instructions': 'Klikk "Start Spill" for å begynne. Finn alle matchende par for å vinne!',
        'game-win-message': '🎉 Gratulerer! Du vant på ${moves} trekk med en poengsum på ${score}! 🎉',
        'game-reset-button': 'Tilbakestill Spill',
        
        // Search Section
        'search-title': 'Hva leter du etter?',
        'search-placeholder': 'Velg et alternativ...',
        
        // Blog Section
        'blog-title': 'Programmerings',
        'blog-subtitle': 'Artikler',
        'blog-description': 'Siste innsikter, tips og trender innen programmering og teknologi. Hold deg oppdatert med utviklersamfunnet.',
        
        // Career Section
        'career-title': 'Karriere',
        'career-subtitle': 'Tidslinje',
        'career-description': 'Min profesjonelle reise fra studier til frilansing, som viser vekst, prestasjoner og teknologisk evolusjon.',
        'career-my': 'Min',
        'career-professional-journey': 'profesjonelle reise',
        'career-from': 'fra',
        'career-studies': 'studier',
        'career-to': 'til',
        'career-freelancing': 'frilansing',
        'career-showcasing': 'som viser',
        'career-growth': 'vekst',
        'career-achievements': 'prestasjoner',
        'career-and': 'og',
        'career-technological-evolution': 'teknologisk evolusjon',
        
        // Career Timeline Details
        'zenitel-title': 'Zenitel Internship',
        'zenitel-description': 'Mobil App-utvikling & API-integrasjon',
        'zenitel-improvement': 'Mobilapp som forbedrer prosesser med 20%',
        'zenitel-tech': 'Python & Microsoft Power Apps',
        'zenitel-api': 'API-integrasjoner og databaseadministrasjon',
        'freelance-title': 'Frilansutvikling',
        'freelance-description': 'Full-Stack Prosjekter & Klientløsninger',
        'freelance-web': 'Nettapplikasjoner og e-handelsplattformer',
        'freelance-automation': 'Prosessautomatisering og systemintegrasjon',
        'freelance-collaboration': 'Klientkollaborasjon og prosjektledelse',
        
        // Contact Section
        'contact-title': 'Kom I',
        'contact-subtitle': 'Kontakt',
        'contact-description': 'Klar til samarbeid? La oss diskutere ditt prosjekt og hvordan jeg kan hjelpe med å bringe ideene dine til live.',
        'contact-subject': 'Emne',
        'contact-name': 'Navn',
        'contact-email': 'E-post',
        'contact-message': 'Melding',
        'contact-send': 'Send Melding',
        'contact-sending': 'Sender...',
        'contact-success': 'Takk! Din melding har blitt sendt.',
        'contact-error': 'Det oppstod en feil ved sending av meldingen. Vennligst prøv igjen senere.',
        
        // Footer
        'footer-rights': 'Alle rettigheter forbeholdt.',
        'footer-made': 'Made with ',
        'footer-description': 'Fullstack Utvikler & Dataingeniør, lidenskapelig opptatt av å skape innovative løsninger og dytte grensene for teknologi.',
        'footer-privacy': 'Personvern',
        'footer-terms': 'Brukervilkår',
        'footer-cookies': 'Cookie Policy',
        'visit-counter': 'Besøk',
        'footer-quick-links': 'Raske Lenker',
        'footer-services': 'Tjenester',
        'footer-contact-info': 'Kontakt Info',
        'footer-available': 'Tilgjengelig for prosjekter',
        'footer-and': 'og',
        
        // Cookie Banner
        'cookie-title': 'Cookie-policy',
        'cookie-text': 'Denne nettsiden bruker informasjonskapsler for å forbedre din nettleseropplevelse. Ved å fortsette å bruke denne siden samtykker du til vår bruk av informasjonskapsler.',
        'cookie-accept': 'Aksepter',
        'cookie-reject': 'Avvis',
        
        // Passions Section
        'passions-title': 'Mine',
        'passions-subtitle': 'Passioner',
        'passions-description': 'Bortsett fra programmering har jeg mange lidenskaper som inspirerer min vekst og kreativitet.',
        
        // Passions Section - Individual Cards
        'passion-ai-title': 'Kunstig Intelligens',
        'passion-ai-description': 'Min langsiktige drøm er å skape kunstig bevissthet. Jeg utforsker AI & maskinlæring hver dag, trener egendefinerte modeller og bygger verktøy.',
        'passion-music-title': 'Musikk',
        'passion-music-description': 'Spilte piano siden jeg var 8 år gammel. Komponerer elektronisk, synth-spor i FL Studio. Jeg har undervist i nybegynner pianoklasser. Mine spor er tilgjengelige på SoundCloud.',
        'passion-travel-title': 'Reise',
        'passion-travel-description': 'Elsker skogsturer, fjellturer, sykling, fjellstier, snøbrett og oppdage nye steder og kulturer som utvider mine horisonter.',
        'passion-design-title': 'Design',
        'passion-design-description': 'I 12 år har jeg frilanset som designer og levert brosjyrer, annonser, bannere, nettressurser og komplette markedsføringskampanjer. Jeg lager endelige visuelle elementer med Adobe CC, Corel DRAW og den klassiske JASC Paint Shop.',
        'passion-science-title': 'Vitenskap',
        'passion-science-description': 'Følger de siste nyhetene innen fysikk, astronomi, psykologi og IT hver dag. Jeg koder mine egne simuleringer fra matematiske modeller til kvantemekanikk. Læring & eksperimentering er min måte å vokse på.',
        'passion-astronomy-title': 'Astronomi',
        'passion-astronomy-description': 'Å utforske kosmos og forstå universets mysterier fascinerer meg mest og meditasjon for meg. Min app PySolarSim forutsier posisjonen til enhver himmellegeme for enhver dato og tid.',
        'passion-quantum-title': 'Kvantefysikk',
        'passion-quantum-description': 'Fascinert av partikkelriket, bygde jeg en minimal dobbeltspalte-simulator som visualiserer en elektrons bane. Jeg følger ivrig forskning som bygger bro mellom kvanteteori og filosofi.',
        'passion-philosophy-title': 'Filosofi',
        'passion-philosophy-description': 'Dyp tenkning om eksistens, bevissthet og virkelighetens natur gjennom filosofisk utforskning. Jeg blander Aristoteles med moderne kognitiv vitenskap og spør: kan en maskin virkelig forstå?',
        'passion-psychology-title': 'Psykologi',
        'passion-psychology-description': 'Elsker å lære om menneskelig atferd, kognisjon og sinnets kompleksitet. Jeg eksperimenterer med sinnets potensial og holder meg oppglødd av nye funn innen psykologi og nevrovitenskap.',
        
        // Contact Section - Additional Elements
        'contact-info-title': 'Kontaktinformasjon',
        'contact-message-title': 'Send Meg En Melding',
        'contact-open-to': 'Jeg er alltid åpen for:',
        'contact-learning': 'Å lære nye teknologier og metodologier',
        'contact-collaborating': 'Å samarbeide på meningsfulle og innovative teknologiske initiativ',
        'contact-building': 'Å bygge noe innflytelsesrikt som løser virkelige problemer',
        
        // Project Descriptions
        'project-solar-description': 'Responsiv HTML-nettside for romlæring med videobakgrunner og interaktive funksjoner.',
        'project-userprofile-description': 'Et omfattende brukerstyringssystem med avanserte analyser og tilpasninger.',
        'project-norway-description': 'Et interaktivt kart som viser de beste turiststedene i Norge med dynamisk filtrering.',
        'project-bakery-description': 'Et online bakeribestillingssystem med sanntids lagerstyring og betalingsbehandling.',
        'project-luxury-description': 'En premium nettside som viser luksuseiendommer med avansert søk & virtuelle turer.',
        'project-gym-description': 'En responsiv nettside for et treningssenter med tidsplaner og klasseinformasjon.',
        'project-product-description': 'Et omfattende verktøy for å styre produktlivssykluser, funksjoner og veikart med avanserte analyser.',
        'project-todo-description': 'En moderne to-do-listeapplikasjon bygget med React for effektiv oppgavestyring.',
        'project-bike-description': 'En responsiv nettside for et sykkelservice med booking, salg katalog og serviceinformasjon.',
        'project-ai-career-description': 'Et AI-drevet karriereveiledningssystem som hjelper utviklere med å velge sin neste karrierevei.',
        'project-mindmapper-description': 'En skrivebordsapplikasjon for å lage og organisere tankekart med interaktive funksjoner.',
        'project-temptracker-description': 'En Java Swing-app for overvåking av sensordata med sanntids logging og visualisering.',
        
        // Subscribe Section
        'subscribe-title': 'Abonner på',
        'subscribe-subtitle': 'Oppdateringer',
        'subscribe-description': 'Hold deg oppdatert med mine siste prosjekter, teknologiske innsikter og utviklingstips. Få varsel når jeg lanserer nye applikasjoner eller deler interessante funn.',
        'subscribe-email-label': 'E-postadresse',
        'subscribe-email-placeholder': 'din@epost.no',
        'subscribe-name-label': 'Navn (Valgfritt)',
        'subscribe-name-placeholder': 'Ditt navn',
        'subscribe-button': 'Abonner på Oppdateringer',
        'subscribe-form-title': 'Bli Med I Mitt Nyhetsbrev',
        'subscribe-form-subtitle': 'Få eksklusive innsikter og prosjektoppdateringer',
        'subscribe-privacy': '🔒 Ditt personvern er beskyttet. Ingen spam, aldri.',
        'subscribe-success': 'Takk! Du har blitt abonnert på oppdateringer.',
        'subscribe-error': 'Feil ved abonnement. Vennligst prøv igjen.',
        'subscribe-invalid-email': 'Vennligst skriv inn en gyldig e-postadresse.',
        
        // Elevator Pitch Section
        'elevator-title': 'Elevator',
        'elevator-subtitle': 'Pitch',
        'elevator-description': 'Se min elevator pitch for å lære mer om min bakgrunn, ferdigheter og hva som gjør meg unik som utvikler.',
        'elevator-form-title': 'Min Historie på 1 Minutt',
        'elevator-form-subtitle': 'Lær om min reise, ferdigheter og hva som driver meg',
        'elevator-views': 'HD Kvalitet',
        'elevator-time': '1 min',
        'elevator-video-error': 'Nettleseren din støtter ikke video-taggen.',
        'elevator-click-to-play': 'Klikk for å spille',
        'elevator-duration': 'Varighet: ~1 minutt',
        'about-devops': 'Implementerer CI/CD-pipelines og skyinfrastruktur',
        
        // Why Hire Me Section
        'why-hire-title': 'Er det verdt å ansette meg',
        'why-hire-subtitle': 'og hvorfor?',
        'why-hire-description': 'Absolutt ja! Her er grunnen til at jeg er den ideelle kandidaten som din programmerer og designer. Jeg kombinerer tekniske ferdigheter med kreativitet, rask læring og lidenskap for å skape innovative løsninger.',
        'why-hire-fast-learning-title': 'Rask Læring',
        'why-hire-fast-learning-desc': 'Jeg mestrer nye teknologier i rekordfart. Innen en uke kan jeg gå fra grunnleggende til avanserte implementeringer.',
        'why-hire-ai-ml-title': 'AI/ML & Fullstack Erfaring',
        'why-hire-ai-ml-desc': 'Jeg spesialiserer meg på kunstig intelligens, maskinlæring og fullstack-utvikling. Jeg lager intelligente applikasjoner fra frontend til backend.',
        'why-hire-creativity-title': 'UI/UX Kreativitet',
        'why-hire-creativity-desc': 'Jeg kombinerer programmering med design. Jeg skaper ikke bare funksjonelle, men også vakre og intuitive brukergrensesnitt.',
        'why-hire-integration-title': 'Systemintegrasjon',
        'why-hire-integration-desc': 'Jeg kan koble sammen forskjellige teknologier og systemer til en sammenhengende helhet. Jeg lager arkitekturer som er skalerbare og enkle å vedlikeholde.',
        'why-hire-communication-title': 'Effektiv Kommunikasjon',
        'why-hire-communication-desc': 'Jeg kommuniserer klart og profesjonelt på tre språk. Jeg kan oversette komplekse tekniske konsepter på en forståelig måte.',
        'why-hire-problem-solving-title': 'Problemløsning',
        'why-hire-problem-solving-desc': 'Jeg elsker tekniske utfordringer. Jeg analyserer problemer fra forskjellige perspektiver og finner innovative løsninger.',
        'why-hire-cta-title': 'Klar for samarbeid?',
        'why-hire-cta-desc': 'Ikke vent! Kontakt meg i dag og se hvordan jeg kan hjelpe med prosjektene dine.',
        'why-hire-cta-button': 'Start Samarbeid',
        

        

        

        
        // Education Details
        'degree-title': 'Ingeniørgrad i Programvareutvikling',
        'degree-description': 'Utdannet med utmerkelse (5.0 / 5.0 GPA)',
        'thesis-title': 'Bachelorgradsavhandling',
        'thesis-description': 'Offline AI-assistent – en fullstendig offline stemmeassistent bygget i Python med Vosk, Ollama, Tkinter, SQLite og kryptografi. Fokusert på tale-til-tekst, TTS, sikker lokal notatføring og datavisualisering.',
        'current-focus-title': 'Nåværende Fokus & Interesser',
        'focus-ai-ml': 'Avansert Maskinlæring',
        'focus-cloud': 'Sky-nativ utvikling',
        'focus-backend': 'Backend-arkitekturer',
        'focus-ai-industry': 'AI-industriapplikasjoner',
        
        // Education Timeline
        'education-degree-title': 'Informatikkgrad',
        'education-university': 'AHE Universitet, Łódź',
        'education-gpa': 'GPA: 5.0 (Utmerket)',
        'education-focus': 'AI & Maskinlæring fokus',
        'education-skills': 'Programmering & Nettutvikling',
        
        // Manpower Experience
        'manpower-title': 'Manpower Erfaring',
        'manpower-role': 'Produksjon & Serviceroller',
        'manpower-production': 'Produksjon, bygg & service',
        'manpower-optimization': 'Prosessoptimalisering & digitalisering',
        'manpower-reduction': 'Reduserte rapporteringstid med 75%',
        
        // Marketing & Management
        'marketing-title': 'Markedsføring & Ledelse',
        'marketing-university': 'WSB - National Louis University',
        'marketing-focus': 'Internasjonal markedsføring fokus',
        'marketing-principles': 'Ledelsesprinsipper',
        'marketing-perspective': 'Internasjonalt perspektiv',
        
        // Graphic Design Freelance
        'graphic-design-title': 'Grafisk Design Frilans',
        'graphic-design-experience': '15 års kreativ erfaring',
        'graphic-design-ui': 'UI/UX-design & visuell estetikk',
        'graphic-design-brand': 'Merkeidentitet & markedsføringsmateriell',
        'graphic-design-principles': 'Brukersentrerte designprinsipper',
        
        // Future Vision
        'future-vision-title': 'Fremtidssyn',
        'future-vision-description': 'Utvikler meg som fullstack-utvikler, med fokus på AI/ML-integrasjon, skyløsninger og innovative applikasjoner som løser virkelige problemer.',
        'future-vision-progress': 'Under arbeid',
        
        // Case Studies
        'case-studies-title': 'Case Studies',
        'case-study-1-title': 'E-handelsplattform Optimalisering',
        'case-study-1-company': 'TechStart Solutions',
        'case-study-1-loading': 'Lastehastighet',
        'case-study-1-conversion': 'Konverteringsrate',
        'case-study-1-mobile': 'Mobil ytelse',
        'case-study-1-description': 'Implementerte React-optimalisering, lazy loading og mobil-først design som resulterte i betydelige ytelsesforbedringer og økte salg.',
        'case-study-2-title': 'AI-drevet Analyse Dashboard',
        'case-study-2-company': 'DataCorp Research',
        'case-study-2-processing': 'Databehandling',
        'case-study-2-accuracy': 'Nøyaktighet',
        'case-study-2-adoption': 'Brukeradopsjon',
        'case-study-2-description': 'Utviklet maskinlæringsalgoritmer for sanntids dataanalyse, som gir handlingsbare innsikter og forbedrer beslutningsprosesser.',
        
        // Mentor Recommendations
        'mentor-recommendations-title': 'Mentor & Akademiske Anbefalinger',
        'mentor-1-name': 'Ahmad Sharifinejad',
        'mentor-1-role': 'SW Manager Norge, Zenitel',
        'mentor-1-quote': '"Evnen til å håndtere komplekse oppgaver, tilpasse seg nye teknologier og samarbeide effektivt innenfor et team indikerer sterk potensial i fremtidige teknologiske roller."',
        'mentor-1-skills': 'Team Samarbeid • Problemløsning • Veiledning',
        'mentor-2-name': 'PhD. Wanda Gryglewicz-Kacerka',
        'mentor-2-role': 'Evalueringsoppsyn, Professor, AHE Universitet',
        'mentor-2-quote': '"Adrians akademiske ytelse og praktiske ferdigheter er fremragende. Hans prosjekter reflekterer en sterk forståelse av AI-konsepter og kreativ, innovativ tenkning."',
        'mentor-2-skills': 'Akademisk Ekspertise • AI Ekspertise • Innovasjon',
        'mentor-3-name': 'Peter Ommundsen',
        'mentor-3-role': 'Programvareingeniør, Zenitel',
        'mentor-3-quote': '"Adrians mobilapp-utviklingsferdigheter er eksepsjonelle. Han transformerte vårt konsept til en polert, brukervennlig applikasjon som våre kunder elsker."',
        'mentor-3-skills': 'Mobil Utvikling • Brukeropplevelse • Teknisk Ekspertise',
        'mentor-4-name': 'Tomasz Kłoczko',
        'mentor-4-role': 'Tønsberg Sykkelservice Eier',
        'mentor-4-quote': '"Adrian transformerte vårt nettsted med en moderne nettside og effektiv markedsføringsstrategi. Hans profesjonalitet og kreativitet gikk langt utover våre forventninger."',
        'mentor-4-skills': 'Nettutvikling • Markedsføringsstrategi • Profesjonell Ekspertise',
        
        // Recommendation Letter Button
        'recommendation-letter-button': 'Se Offisielt Anbefalingsbrev',
        'recommendation-letter-description': 'Offisielt praksis anbefalingsdokument',
        
        // Skills Section
        'skills-title': 'Mine',
        'skills-subtitle': 'Ferdigheter',
        'skills-description': 'Her er en omfattende oversikt over mine tekniske ferdigheter og verktøyene jeg jobber med på tvers av 80+ prosjekter.',
        'frontend': 'Frontend',
        'backend': 'Backend',
        'ai-ml': 'AI/ML',
        'languages': 'Språk',
        'cloud-cicd': 'Sky & CI/CD',
        'cloud-cicd-description': 'Skyinfrastruktur, kontinuerlig integrasjon, deployment-automatisering og DevOps-praksiser.',
        'databases': 'Databaser',
        'databases-description': 'Databaseutforming, -administrasjon og -optimalisering for pålitelige og skalerbare apper.',
        'tools': 'Verktøy',
        
        // Skills Categories
        'analysis-management': 'Analyse & Ledelse',
        'analysis-management-description': 'Prosjektledelse, forretningsanalyse og agile metodologier.',
        'ai-deep-learning': 'AI & Dyp Læring',
        'ai-deep-learning-description': 'Dyp læring, nevrale nettverk, datamaskinsyn og NLP.',
        'cloud-cicd-skills': 'Sky & CI/CD',
        'desktop-apps': 'Skrivebordsapplikasjoner',
        'desktop-apps-description': 'Tverrplattform skrivebordsapplikasjoner med moderne rammeverk.',
        'embedded-iot': 'Innebygde Systemer & IoT',
        'fullstack-dev': 'Full-Stack Utvikling',
        'other-tools': 'Andre Verktøy',
        'other-tools-description': 'Prosjektledelse, designverktøy, mobilutvikling og produktivitetsprogramvare.',
        'scientific-computing': 'Data Science',
        'scientific-computing-description': 'Matematisk modellering, dataanalyse og vitenskapelige simuleringer.',
        'security-dev': 'Sikkerhet & Utvikling',
        'security-dev-description': 'Cybersikkerhet, sikre utviklingspraksiser, kryptering og nettverkssikkerhetsverktøy.',
        
        // Contact Section
        'contact-title': 'Kom i',
        'contact-subtitle': 'kontakt',
        'contact-description': 'Klar til samarbeid? La oss diskutere prosjektet ditt og hvordan jeg kan hjelpe med å bringe ideene dine til live.',
        'contact-subject': 'Emne',
        'contact-name': 'Navn',
        'contact-email': 'E-post',
        'contact-message': 'Melding',
        'contact-send': 'Send melding',
        'contact-sending': 'Sender...',
        'contact-success': 'Takk! Din melding har blitt sendt.',
        'contact-error': 'Det oppstod en feil ved sending av meldingen. Vennligst prøv igjen senere.',
        
        // Footer
        'footer-rights': 'Alle rettigheter forbeholdt.',
        'footer-made': 'Made with ',
        'footer-description': 'Fullstack Utvikler & Dataingeniør, lidenskapelig opptatt av å skape innovative løsninger og dytte grensene for teknologi.',
        'footer-privacy': 'Personvern',
        'footer-terms': 'Brukervilkår',
        'footer-cookies': 'Cookie Policy',
        'visit-counter': 'Besøk',
        'footer-quick-links': 'Raske Lenker',
        'footer-services': 'Tjenester',
        'footer-contact-info': 'Kontakt Info',
        'footer-available': 'Tilgjengelig for prosjekter',
        'footer-and': 'and',
        
        // Footer Links
        'footer-home': 'Hjem',
        'footer-about': 'Om Meg',
        'footer-skills': 'Ferdigheter',
        'footer-all-projects': 'Alle Prosjekter',
        'footer-articles': 'Artikler',
        'footer-contact': 'Kontakt',
        'footer-web-dev': 'Web Utvikling',
        'footer-mobile-apps': 'Mobilapper',
        'footer-data-engineering': 'Data Engineering',
        'footer-ai-ml': 'AI/ML Løsninger',
        'footer-system-analysis': 'System Analyse',
        'footer-consulting': 'Rådgivning',
        
        // Testimonials Additional
        'testimonial-2-text': '"Adrian transformerte vårt nettsted med en moderne nettside og effektiv markedsføringsstrategi. Hans profesjonalitet og kreativitet gikk langt utover våre forventninger."',
        'testimonial-2-project': 'Prosjekt: Nettsted & Markedsføring',
        'testimonial-2-result': '+60% Effektivitet',
        'testimonial-3-text': '"Adrians mobilapp-utviklingsferdigheter er eksepsjonelle. Han transformerte vårt konsept til en polert, brukervennlig applikasjon som våre kunder elsker."',
        'testimonial-3-project': 'Prosjekt: Mobil App',
        'testimonial-3-rating': '4.8★ Vurdering',
        
        // Language Skills
        'language-norwegian': 'Norsk',
        'norwegian-work': 'Arbeidsmiljø',
        'norwegian-daily': 'Daglig samtale',
        'language-english': 'Engelsk',
        'english-technical': 'Teknisk kommunikasjon',
        'english-international': 'Internasjonale prosjekter',
        'language-italian': 'Italiensk',
        'italian-basic': 'Grunnleggende samtale',
        'italian-cultural': 'Kulturell forståelse',
        
        // Skills Buttons
        'show-projects': 'Vis Prosjekter',
        'explore-all-projects': 'Utforsk Alle Prosjekter',
        
        // Programming Articles Section
        'tutorials-title': 'Tutorials',
        'tutorials-description': 'Praktiske guider med kode, eksempler og implementeringssteg for ulike teknologier.',
        'visit-w3schools': 'Besøk W3Schools',
        'reflections-title': 'Refleksjoner',
        'reflections-description': 'Refleksjoner om læring, ferdighetsutvikling og personlige erfaringer i programmeringsverdenen.',
        'read-on-medium': 'Les på Medium',
        'trends-title': 'Trender',
        'trends-description': 'Siste trender, innovasjoner og fremtidige teknologier i programmerings- og IT-verdenen.',
        'read-article': 'Les Artikkel',
        'stay-connected-title': 'Hold Kontakt med Utviklersamfunnet',
        'stay-connected-description': 'Bli med tusenvis av utviklere verden over i å utforske de siste programmeringsinnsiktene, dele kunnskap og holde deg foran teknologitrender.',
        
        // Cookie Banner
        'cookie-title': 'Cookie-policy',
        'cookie-text': 'Denne nettsiden bruker informasjonskapsler for å forbedre din nettleseropplevelse. Ved å fortsette å bruke dette nettstedet samtykker du til vår bruk av informasjonskapsler.',
        'cookie-accept': 'Godta',
        'cookie-reject': 'Avvis',
        
        // Passions Section
        'passions-title': 'Mine',
        'passions-subtitle': 'Passioner',
        'passions-description': 'Utenom programmering har jeg mange lidenskaper som inspirerer min vekst og kreativitet.',
        
        // Passions Section - Individual Cards
        'passion-ai-title': 'Kunstig Intelligens',
        'passion-ai-description': 'Min drøm er å skape kunstig bevissthet. Hver dag utforsker jeg AI i dybden, designer avanserte modeller, utvikler innovative verktøy og tester stadig nye ideer som gradvis bringer denne visjonen enda nærmere virkeligheten.',
        'passion-music-title': 'Musikk',
        'passion-music-description': 'Jeg har spilt piano siden jeg var 8 år. Lager elektroniske & synth-låter i FL Studio. Jeg har undervist nybegynnere i piano. Mine låter er tilgjengelige på SoundCloud.',
        'passion-travel-title': 'Reise',
        'passion-travel-description': 'Jeg elsker turer i skogen, fotturer, sykling, fjellturer, snowboard og å oppdage nye steder og kulturer som utvider horisonten min.',
        'passion-design-title': 'Design',
        'passion-design-description': 'I 12 år har jeg jobbet som frilanser som designer, levert kataloger, annonser, bannere, web-assets og komplette markedsføringskampanjer. Jeg lager endelige visuelle løsninger med Adobe, Corel DRAW & JASC PaintShop.',
        
        // Section Descriptions with Colors and Animations (Norwegian)
        'testimonials-what': 'Hva',
        'testimonials-my': 'mine',
        'testimonials-clients': 'klienter',
        'testimonials-and': 'og',
        'testimonials-colleagues': 'kolleger',
        'testimonials-say': 'sier',
        'testimonials-about': 'om',
        'testimonials-work': 'arbeid',
        'languages-i': 'Jeg',
        'languages-speak': 'snakker',
        'languages-multiple': 'flere',
        'languages-languages': 'språk',
        'languages-that': 'som',
        'languages-help': 'hjelper',
        'languages-me': 'meg',
        'languages-with': 'med',
        'languages-international': 'internasjonale',
        'languages-projects': 'prosjekter',
        'passions-besides': 'Utenom',
        'passions-programming': 'programmering',
        'passions-i': 'har',
        'passions-have': 'jeg',
        'passions-many': 'mange',
        'passions-passions': 'lidenskaper',
        'passions-that': 'som',
        'passions-inspire': 'inspirerer',
        'passions-my': 'min',
        'passions-growth': 'vekst',
        'passions-and': 'og',
        'passions-creativity': 'kreativitet',
        'projects-here': 'Her',
        'projects-are': 'er',
        'projects-some': 'noen',
        'projects-of': 'av',
        'projects-my': 'mine',
        'projects-most': 'mest',
        'projects-notable': 'bemerkelsesverdige',
        'projects-projects': 'prosjekter',
        'projects-that': 'som',
        'projects-showcase': 'viser',
        'projects-skills': 'ferdigheter',
        'projects-and': 'og',
        'projects-expertise': 'ekspertise',
        'all-projects-explore': 'Utforsk',
        'all-projects-all': 'alle',
        'all-projects-my': 'mine',
        'all-projects-projects': 'prosjekter',
        'all-projects-including': 'inkludert',
        'all-projects-advanced': 'avanserte',
        'all-projects-ai-tools': 'AI-verktøy',
        'all-projects-simulators': 'simulatorer',
        'all-projects-and-more': 'og mer',
        'all-projects-for-full-details': 'For fullstendige detaljer',
        'all-projects-visit': 'besøk',
        'all-projects-the': 'den',
        'all-projects-dedicated': 'dedikerte',
        'all-projects-page': 'siden',
        'all-projects-below': 'nedenfor',
        'skills-heres': 'Her er',
        'skills-a': 'en',
        'skills-comprehensive': 'omfattende',
        'skills-overview': 'oversikt',
        'skills-of': 'over',
        'skills-my': 'mine',
        'skills-technical': 'tekniske',
        'skills-skills': 'ferdigheter',
        'skills-and': 'og',
        'skills-the': 'verktøyene',
        'skills-tools': 'verktøyene',
        'skills-i': 'jeg',
        'skills-work': 'jobber',
        'skills-with': 'med',
        'skills-across': 'på tvers av',
        'skills-75-projects': '80+ prosjekter',
        'blog-latest': 'Siste',
        'blog-insights': 'innsikter',
        'blog-tips': 'tips',
        'blog-and': 'og',
        'blog-trends': 'trender',
        'blog-in': 'innen',
        'blog-programming': 'programmering',
        'blog-technology': 'teknologi',
        'blog-stay-updated': 'Hold deg oppdatert',
        'blog-with': 'med',
        'blog-the': '',
        'blog-developer-community': 'utviklersamfunnet',
        'fun-take': 'Ta',
        'fun-a': 'en',
        'fun-break': 'pause',
        'fun-and-enjoy': 'og nyt',
        'fun-quick': 'raskt',
        'fun-game': 'spill',
        'fun-challenge': 'Utfordre',
        'fun-yourself': 'deg selv',
        'fun-with-this': 'med dette',
        'fun-simple': 'enkle',
        'fun-but': 'men',
        'fun-addictive': 'avhengighetsskapende',
        'fun-puzzle-game': 'puslespillet',
        'contact-ready': 'Klar',
        'contact-to': 'til',
        'contact-collaborate': 'samarbeide',
        'contact-lets': 'La oss',
        'contact-discuss': 'diskutere',
        'contact-your': 'ditt',
        'contact-project': 'prosjekt',
        'contact-and': 'og',
        'contact-how': 'hvordan',
        'contact-i': 'jeg',
        'contact-can': 'kan',
        'contact-help': 'hjelpe',
        'contact-bring': 'bringe',
        'contact-ideas': 'ideer',
        'contact-life': 'liv',
        
        'passion-science-title': 'Vitenskap',
        'passion-science-description': 'Jeg følger daglig de siste nyhetene innen fysikk, astronomi, psykologi og IT. Jeg programmerer egne simuleringer, fra matematiske modeller til kvantemekanikk. Å lære og eksperimentere er min måte å utvikle meg på.',
        'passion-astronomy-title': 'Astronomi',
        'passion-astronomy-description': 'Å utforske kosmos og forstå universets mysterier fascinerer meg mest, og det fungerer som meditasjon for meg. Appen min, PySolarSim, forutsier posisjonen til hvilken som helst himmellegeme for hvilken som helst dato og tid.',
        'passion-quantum-title': 'Kvantefysikk',
        'passion-quantum-description': 'Fascinert av partikkelverdenen bygde jeg en minimal dobbelspalte-simulator som heter Young\'s Experiment for å visualisere elektronets bane. Jeg følger ivrig forskning som forbinder kvanteteorien med filosofi.',
        'passion-philosophy-title': 'Filosofi',
        'passion-philosophy-description': 'Dype refleksjoner om eksistens, bevissthet og realitetens natur gjennom filosofisk utforskning. Jeg kombinerer Aristoteles med moderne kognitiv vitenskap og spør: kan en maskin virkelig forstå?',
        'passion-psychology-title': 'Psykologi',
        'passion-psychology-description': 'Jeg elsker å lære om menneskelig atferd, kognisjon og sinnets kompleksitet. Jeg utforsker potensialet inspirert av nye funn innen psykologi og nevrovitenskap.',
        
        // Contact Section - Additional Elements
        'contact-info-title': 'Kontaktinformasjon',
        'contact-message-title': 'Send meg en melding',
        'contact-open-to': 'Jeg er alltid åpen for:',
        'contact-learning': 'Lære nye teknologier og metodologier',
        'contact-collaborating': 'Samarbeide om meningsfulle og innovative teknologiske initiativer',
        'contact-building': 'Bygge noe innflytelsesrikt som løser virkelige problemer',
        'contact-email-label': 'E-post',
        'contact-linkedin-label': 'LinkedIn',
        'contact-github-label': 'GitHub',
        
        // Project Descriptions
        'project-solar-description': 'Responsiv HTML-nettsted for romlæring med videobakgrunner og interaktive funksjoner.',
        'project-userprofile-description': 'Et omfattende brukerprofilstyringssystem med avanserte analyser og tilpasningsalternativer.',
        'project-norway-description': 'Et interaktivt kart som viser de beste turiststedene i Norge med dynamisk filtrering.',
        'project-bakery-description': 'Et nettbasert bakeribestillingssystem med sanntidslagerstyring og betalingsbehandling.',
        'project-luxury-description': 'En premium nettside som viser luksuseiendommer med avansert søk & virtuelle turer.',
        'project-gym-description': 'En responsiv nettside for et treningssenter med tidsplaner og klasseinformasjon.',
        'project-product-description': 'Et omfattende verktøy for å administrere produktlivssykluser, funksjoner og veikart med avanserte analyser.',
        'project-todo-description': 'En moderne to-do-listeapplikasjon bygget med React for effektiv oppgaveadministrasjon.',
        'project-bike-description': 'En responsiv nettside for et sykkelservice med booking, salg katalog og serviceinformasjon.',
        'project-ai-career-description': 'Et AI-drevet karriereveiledningssystem som hjelper utviklere å velge sin neste karrieresti.',
        'project-mindmapper-description': 'En skrivebordsapplikasjon for å lage og organisere tankekart med interaktive funksjoner.',
        'project-temptracker-description': 'En Java Swing-app for overvåking av sensordata med sanntidslogging og visualisering.',
        
        // Subscribe Section
        'subscribe-title': 'Abonner for',
        'subscribe-subtitle': 'Oppdateringer',
        'subscribe-description': 'Hold deg oppdatert med mine nyeste prosjekter, teknologiske innsikter og utviklingstips. Få varsling når jeg lanserer nye applikasjoner eller deler interessante funn.',
        'subscribe-email-label': 'E-postadresse',
        'subscribe-email-placeholder': 'din@email.com',
        'subscribe-name-label': 'Navn (Valgfritt)',
        'subscribe-name-placeholder': 'Ditt navn',
        'subscribe-button': 'Abonner for Oppdateringer',
    'subscribe-form-title': 'Bli med i mitt nyhetsbrev',
    'subscribe-form-subtitle': 'Få eksklusive innsikter og prosjekt-oppdateringer',
    'subscribe-privacy': '🔒 Din personvern er beskyttet. Ingen spam, aldri.',
        'subscribe-success': 'Takk! Du har blitt abonnert på oppdateringer.',
        'subscribe-error': 'Feil ved abonnement. Vennligst prøv igjen.',
        'subscribe-invalid-email': 'Vennligst skriv inn en gyldig e-postadresse.',
        
        // Elevator Pitch Section
        'elevator-title': 'Elevator',
        'elevator-subtitle': 'Pitch',
        'elevator-description': 'Se min elevator pitch for å lære mer om min bakgrunn, ferdigheter og hva som gjør meg unik som utvikler.',
    'elevator-form-title': 'Min historie på 1 minutt',
    'elevator-form-subtitle': 'Lær om min reise, ferdigheter og hva som driver meg',
    'elevator-views': 'HD Kvalitet',
    'elevator-time': '1 min',
        'elevator-video-error': 'Nettleseren din støtter ikke video-taggen.',
        'elevator-click-to-play': 'Klikk for å spille',
        'elevator-duration': 'Varighet: ~1 minutt',
        
        // About Section - missing translations
        'about-devops': 'Implementerer CI/CD-pipelines og skyinfrastruktur',
        
        // Skills Expand/Collapse buttons
        'expand': 'Utvid',
        'collapse': 'Kollaps',
        
        // Skills Expand/Collapse buttons
        'expand': 'Utvid',
        'collapse': 'Kollaps',
        
        // Skills Expand/Collapse buttons
        'expand': 'Expand',
        'collapse': 'Collapse'
    }
};



// Funkcja aktualizacji przycisków Expand/Collapse
function updateExpandCollapseButtons(lang) {
    const allExpandButtons = document.querySelectorAll('.expand-collapse-btn');
    allExpandButtons.forEach(button => {
        const btnText = button.querySelector('.btn-text');
        if (btnText) {
            // Sprawdź czy przycisk ma klasę expanded
            if (button.classList.contains('expanded')) {
                btnText.textContent = translations[lang]['collapse'];
            } else {
                btnText.textContent = translations[lang]['expand'];
            }
            
            // Dodatkowe zabezpieczenie - upewnij się, że tekst jest widoczny
            if (!btnText.textContent || btnText.textContent.trim() === '') {
                btnText.textContent = translations[lang]['expand'];
            }
        }
    });
}

// Funkcja zmiany języka
function changeLanguage(lang) {
    localStorage.setItem('language', lang);
    window.currentLanguage = lang; // Dodaj globalną zmienną
    
    // Aktualizuj wszystkie elementy z data-translate
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Aktualizuj teksty przycisków Expand/Collapse
    updateExpandCollapseButtons(lang);
    
    // Aktualizuj placeholder w formularzu
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    
    if (nameInput) nameInput.placeholder = translations[lang]['contact-name'];
    if (emailInput) emailInput.placeholder = translations[lang]['contact-email'];
    if (messageInput) messageInput.placeholder = translations[lang]['contact-message'];
    
    // Aktualizuj przycisk zmiany języka
    const langToggle = document.getElementById('language-toggle');
    const langToggleMobile = document.getElementById('language-toggle-mobile');
    if (langToggle) langToggle.innerHTML = lang === 'en' ? '<i class="fas fa-globe"></i> NO' : '<i class="fas fa-globe"></i> EN';
    if (langToggleMobile) langToggleMobile.innerHTML = lang === 'en' ? '<i class="fas fa-globe"></i> NO' : '<i class="fas fa-globe"></i> EN';
    
    // Wyślij event o zmianie języka
    window.dispatchEvent(new CustomEvent('languageChange', { detail: { language: lang } }));
}

// Inicjalizacja języka
// document.addEventListener('DOMContentLoaded', () => {
//     const savedLang = localStorage.getItem('language') || 'en';
//     window.currentLanguage = savedLang; // Inicjalizuj globalną zmienną
    
//     // Najpierw aktualizuj przyciski Expand/Collapse
//     updateExpandCollapseButtons(savedLang);
    
//     // Potem zmień język
//     changeLanguage(savedLang);
    
//     // Dodatkowe wywołanie z opóźnieniem, żeby upewnić się, że DOM jest w pełni załadowany
//     setTimeout(() => {
//         updateExpandCollapseButtons(savedLang);
//     }, 100);
    
//     // Event listeners dla przycisków zmiany języka
//     document.getElementById('language-toggle')?.addEventListener('click', () => {
//         const currentLang = localStorage.getItem('language') || 'en';
//         const newLang = currentLang === 'en' ? 'no' : 'en';
//         changeLanguage(newLang);
//     });
    
//     document.getElementById('language-toggle-mobile')?.addEventListener('click', () => {
//         const currentLang = localStorage.getItem('language') || 'en';
//         const newLang = currentLang === 'en' ? 'no' : 'en';
//         changeLanguage(newLang);
//     });
// });

// Intersection Observer dla animacji podczas przewijania
const isMobile = window.innerWidth <= 768;
const observerOptions = {
    threshold: isMobile ? 0.05 : 0.1,
    rootMargin: isMobile ? '0px 0px -20px 0px' : '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Na urządzeniach mobilnych dodaj animację natychmiast
            if (isMobile) {
                entry.target.style.transitionDelay = '0.05s';
            }
        }
    });
}, observerOptions);

// Obserwuj wszystkie elementy z klasami animacji (bez menu nawigacyjnego)
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.slide-in-from-top:not(.nav-link), .slide-in-from-left, .slide-in-from-right, .scale-in, .bounce-in');
    animatedElements.forEach(el => observer.observe(el));
    
    // Dodaj klasę animate do elementów, które są już w viewport na początku
    animatedElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add('animate');
        }
    });
    
    // Obserwuj ikony technologii dla animacji
    const techIcons = document.querySelectorAll('.tech-icon-container');
    techIcons.forEach(el => observer.observe(el));
    
    // Skills Expand functionality
    document.querySelectorAll('.expand-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const skillCategory = this.closest('.skill-category');
            const skillsHidden = skillCategory.querySelector('.skills-hidden');
            const expandText = this.querySelector('.expand-text');
            const icon = this.querySelector('i');
            
            if (skillsHidden.classList.contains('hidden')) {
                skillsHidden.classList.remove('hidden');
                expandText.textContent = 'Collapse';
                icon.style.transform = 'rotate(180deg)';
            } else {
                skillsHidden.classList.add('hidden');
                expandText.textContent = 'Expand';
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });
    
    // GIF Pause/Play functionality
    const gifImages = document.querySelectorAll('img[src*=".gif"]');
    gifImages.forEach(img => {
        const container = img.closest('.project-card') || img.parentElement;
        if (container) {
            container.classList.add('gif-container', 'paused');
            
            container.addEventListener('mouseenter', () => {
                container.classList.remove('paused');
                container.classList.add('playing');
            });
            
            container.addEventListener('mouseleave', () => {
                container.classList.remove('playing');
                container.classList.add('paused');
            });
        }
    });
});

document.querySelectorAll('.star-button').forEach(btn => {
    const project = btn.getAttribute('data-project');
    const icon = btn.querySelector('i');
    // Pobierz liczbę gwiazdek z localStorage lub ustaw 0
    let stars = parseInt(localStorage.getItem('stars-' + project) || '0');
    let voted = localStorage.getItem('voted-' + project) === 'true';

    // Dodaj licznik obok gwiazdki jeśli nie istnieje
    let counter = btn.querySelector('.star-counter');
    if (!counter) {
        counter = document.createElement('span');
        counter.className = 'star-counter ml-1 text-sm font-bold';
        btn.appendChild(counter);
    }
    counter.textContent = stars;

    // Ustaw ikonę na pełną jeśli już głosował
    if (voted) icon.classList.replace('far', 'fas');
    else icon.classList.replace('fas', 'far');

    btn.addEventListener('click', function () {
        if (!voted) {
            stars++;
            localStorage.setItem('stars-' + project, stars);
            localStorage.setItem('voted-' + project, 'true');
            icon.classList.replace('far', 'fas');
            counter.textContent = stars;
            voted = true;
        } else {
            // Pozwól na cofnięcie głosu
            stars = Math.max(0, stars - 1);
            localStorage.setItem('stars-' + project, stars);
            localStorage.setItem('voted-' + project, 'false');
            icon.classList.replace('fas', 'far');
            counter.textContent = stars;
            voted = false;
        }
    });
});

    // Navigation Dropdown functionality
    const dropdown = document.getElementById('navigation-dropdown');
    const goButton = document.getElementById('go-button');
    
    function navigateToSelection() {
const selectedValue = dropdown.value;
if (selectedValue) {
    if (selectedValue.startsWith('#')) {
        // Internal navigation
        const element = document.querySelector(selectedValue);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    } else {
        // External navigation
        window.location.href = selectedValue;
    }
    // Reset dropdown
    dropdown.value = '';
}
    }
    
    goButton.addEventListener('click', navigateToSelection);
    dropdown.addEventListener('change', navigateToSelection);
    
    // Memory Card Game
    const gameBoard = document.getElementById('game-board');
    const scoreElement = document.getElementById('score');
    const movesElement = document.getElementById('moves');
    const startButton = document.getElementById('start-game');
    
    if (gameBoard) {
        let score = 0;
        let moves = 0;
        let flippedCards = [];
        let matchedPairs = 0;
        let canFlip = true;
        let gameStarted = false;
        
        const emojis = ['🚀', '⚡', '🎯', '💎', '🌟', '🔥', '🎮', '🏆'];
        const cards = [...emojis, ...emojis]; // Duplicate for pairs
        
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }
        
        function createCard(emoji, index) {
            const card = document.createElement('div');
            card.className = 'w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg flex items-center justify-center text-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 border-2 border-blue-400/30 shadow-lg';
            card.dataset.emoji = emoji;
            card.dataset.index = index;
            card.innerHTML = '❓';
            
            card.addEventListener('click', () => flipCard(card));
            return card;
        }
        
        function flipCard(card) {
            if (!gameStarted || !canFlip || card.classList.contains('flipped') || card.classList.contains('matched')) {
                return;
            }
            
            card.classList.add('flipped');
            card.innerHTML = card.dataset.emoji;
            card.style.background = 'linear-gradient(135deg, #3b82f6, #8b5cf6)';
            card.style.borderColor = '#60a5fa';
            
            flippedCards.push(card);
            
            if (flippedCards.length === 2) {
                moves++;
                movesElement.textContent = moves;
                canFlip = false;
                
                setTimeout(() => {
                    checkMatch();
                }, 500);
            }
        }
        
        function checkMatch() {
            const [card1, card2] = flippedCards;
            
            if (card1.dataset.emoji === card2.dataset.emoji) {
                // Match found
                card1.classList.add('matched');
                card2.classList.add('matched');
                card1.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                card2.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                card1.style.borderColor = '#34d399';
                card2.style.borderColor = '#34d399';
                matchedPairs++;
                score += 10;
                scoreElement.textContent = score;
                
                if (matchedPairs === emojis.length) {
                    setTimeout(() => {
                        alert(`🎉 Congratulations! You won in ${moves} moves with a score of ${score}! 🎉`);
                        resetGame();
                    }, 300);
                }
            } else {
                // No match
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                card1.innerHTML = '❓';
                card2.innerHTML = '❓';
                card1.style.background = 'linear-gradient(135deg, #1e40af, #3730a3)';
                card2.style.background = 'linear-gradient(135deg, #1e40af, #3730a3)';
                card1.style.borderColor = '#3b82f6';
                card2.style.borderColor = '#3b82f6';
            }
            
            flippedCards = [];
            canFlip = true;
        }
        
        function startGame() {
            gameStarted = true;
            gameBoard.style.opacity = '1';
            startButton.textContent = 'Reset Game';
            startButton.className = 'px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 shadow-lg';
            
            // Create and shuffle cards for the new game
            gameBoard.innerHTML = '';
            const shuffledCards = shuffleArray([...cards]);
            shuffledCards.forEach((emoji, index) => {
                const card = createCard(emoji, index);
                gameBoard.appendChild(card);
            });
        }
        
        function resetGame() {
            gameBoard.innerHTML = '';
            score = 0;
            moves = 0;
            matchedPairs = 0;
            flippedCards = [];
            canFlip = true;
            gameStarted = false;
            
            scoreElement.textContent = score;
            movesElement.textContent = moves;
            
            // Create cards but don't make them clickable yet
            const shuffledCards = shuffleArray([...cards]);
            shuffledCards.forEach((emoji, index) => {
                const card = createCard(emoji, index);
                card.style.opacity = '0.5';
                gameBoard.appendChild(card);
            });
            
            // Reset button appearance
            startButton.textContent = 'Start Game';
            startButton.className = 'px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg transition-all duration-300 shadow-lg';
            gameBoard.style.opacity = '0.5';
        }
        
        // Initialize game (hidden state)
        resetGame();
        
        // Start button event listener
        startButton?.addEventListener('click', () => {
            if (gameStarted) {
                resetGame();
            } else {
                startGame();
            }
        });
    }