// Brand Identity Showcase - Main JavaScript
// Comprehensive functionality for enterprise-level interactions

class BrandShowcase {
    constructor() {
        this.isDarkTheme = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeAnimations();
        this.initializeHeroEffects();
        this.initializeColorSystem();
        this.initializeTypographySystem();
        this.initializeIconography();
        this.initializeComponentLibrary();
        this.initializeScrollAnimations();
        this.initializeNavigation();
    }

    setupEventListeners() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Theme toggle
        document.querySelectorAll('[data-theme]').forEach(button => {
            button.addEventListener('click', (e) => {
                this.toggleTheme(e.target.dataset.theme);
            });
        });

        // Window resize handler
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    initializeAnimations() {
        // Hero logo breathing animation
        anime({
            targets: '.hero-logo img',
            scale: [1, 1.05, 1],
            rotate: [-2, 2, -2, 0],
            duration: 4000,
            easing: 'easeInOutSine',
            loop: true
        });

        // Navigation entrance
        anime({
            targets: '#nav',
            opacity: [0, 1],
            translateY: [-100, 0],
            duration: 800,
            delay: 2000,
            easing: 'easeOutCubic'
        });

        // Hero content staggered animation
        anime.timeline({
            easing: 'easeOutCubic',
            duration: 1000
        })
        .add({
            targets: '.hero-logo',
            opacity: [0, 1],
            scale: [0.8, 1],
            duration: 1200,
            delay: 500
        })
        .add({
            targets: '.hero-title',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 800
        }, '-=600')
        .add({
            targets: '.hero-subtitle',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 800
        }, '-=400')
        .add({
            targets: '.hero-cta',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 800
        }, '-=400')
        .add({
            targets: '.scroll-indicator',
            opacity: [0, 1],
            duration: 600
        }, '-=200');
    }

    initializeHeroEffects() {
        // Initialize typed.js for hero title
        new Typed('.typed-text', {
            strings: [
                'Apex Systems',
                'Design Excellence',
                'Brand Identity'
            ],
            typeSpeed: 80,
            backSpeed: 40,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });

        // Hero background particles using p5.js
        if (typeof p5 !== 'undefined') {
            new p5((sketch) => {
                let particles = [];
                let numParticles = 50;

                sketch.setup = () => {
                    const canvas = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
                    canvas.parent('hero-bg');
                    canvas.style('position', 'absolute');
                    canvas.style('top', '0');
                    canvas.style('left', '0');
                    canvas.style('z-index', '1');

                    // Create particles
                    for (let i = 0; i < numParticles; i++) {
                        particles.push({
                            x: sketch.random(sketch.width),
                            y: sketch.random(sketch.height),
                            vx: sketch.random(-0.5, 0.5),
                            vy: sketch.random(-0.5, 0.5),
                            size: sketch.random(2, 6),
                            opacity: sketch.random(0.1, 0.3)
                        });
                    }
                };

                sketch.draw = () => {
                    sketch.clear();
                    
                    // Update and draw particles
                    particles.forEach(particle => {
                        particle.x += particle.vx;
                        particle.y += particle.vy;

                        // Wrap around edges
                        if (particle.x < 0) particle.x = sketch.width;
                        if (particle.x > sketch.width) particle.x = 0;
                        if (particle.y < 0) particle.y = sketch.height;
                        if (particle.y > sketch.height) particle.y = 0;

                        // Draw particle
                        sketch.fill(212, 175, 55, particle.opacity * 255);
                        sketch.noStroke();
                        sketch.circle(particle.x, particle.y, particle.size);
                    });
                };

                sketch.windowResized = () => {
                    sketch.resizeCanvas(sketch.windowWidth, sketch.windowHeight);
                };
            });
        }
    }

    initializeColorSystem() {
        // Color swatch interactions
        document.querySelectorAll('.color-swatch').forEach(swatch => {
            swatch.addEventListener('mouseenter', () => {
                anime({
                    targets: swatch,
                    scale: 1.05,
                    boxShadow: '0px 16px 32px rgba(0,0,0,0.15)',
                    duration: 300,
                    easing: 'easeOutCubic'
                });
            });

            swatch.addEventListener('mouseleave', () => {
                anime({
                    targets: swatch,
                    scale: 1,
                    boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
                    duration: 300,
                    easing: 'easeOutCubic'
                });
            });

            // Color preview animation
            const colorPreview = swatch.querySelector('.color-preview');
            if (colorPreview) {
                swatch.addEventListener('click', () => {
                    anime({
                        targets: colorPreview,
                        scale: [1, 1.2, 1],
                        duration: 600,
                        easing: 'easeOutElastic(1, .8)'
                    });
                });
            }
        });
    }

    initializeTypographySystem() {
        // Font weight selector
        document.querySelectorAll('.font-weight').forEach(weight => {
            weight.addEventListener('click', () => {
                // Update active state
                document.querySelectorAll('.font-weight').forEach(w => w.classList.remove('active'));
                weight.classList.add('active');

                // Update font weight
                const fontWeight = weight.dataset.weight;
                const specimen = document.querySelector('.font-specimen h3');
                if (specimen) {
                    anime({
                        targets: specimen,
                        fontWeight: fontWeight,
                        duration: 300,
                        easing: 'easeOutCubic'
                    });
                }
            });
        });

        // Live text editor
        const editorInput = document.getElementById('editor-input');
        const editorPreview = document.getElementById('editor-preview');

        if (editorInput && editorPreview) {
            editorInput.addEventListener('input', (e) => {
                editorPreview.textContent = e.target.value || 'Type something...';
                
                // Animate text change
                anime({
                    targets: editorPreview,
                    scale: [0.98, 1],
                    opacity: [0.8, 1],
                    duration: 200,
                    easing: 'easeOutCubic'
                });
            });

            // Focus animation
            editorInput.addEventListener('focus', () => {
                anime({
                    targets: editorInput,
                    borderColor: '#d4af37',
                    duration: 300,
                    easing: 'easeOutCubic'
                });
            });

            editorInput.addEventListener('blur', () => {
                anime({
                    targets: editorInput,
                    borderColor: '#bdc3c7',
                    duration: 300,
                    easing: 'easeOutCubic'
                });
            });
        }
    }

    initializeIconography() {
        const iconGrid = document.querySelector('.icon-grid');
        if (!iconGrid) return;

        // Icon definitions
        const icons = [
            { name: 'Home', path: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' },
            { name: 'Search', path: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
            { name: 'Settings', path: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
            { name: 'User', path: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
            { name: 'Menu', path: 'M4 6h16M4 12h16M4 18h16' },
            { name: 'Close', path: 'M6 18L18 6M6 6l12 12' },
            { name: 'Arrow Right', path: 'M9 5l7 7-7 7' },
            { name: 'Download', path: 'M12 10v10m0-10l-4 4m4-4l4 4M3 17V7a2 2 0 012-2h6' },
            { name: 'Edit', path: 'M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7' },
            { name: 'Delete', path: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' },
            { name: 'Plus', path: 'M12 4v16m8-8H4' },
            { name: 'Minus', path: 'M4 12h16' },
            { name: 'Heart', path: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
            { name: 'Star', path: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
            { name: 'Bell', path: 'M15 17h5l-5 5v-5zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' },
            { name: 'Calendar', path: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
            { name: 'Clock', path: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
            { name: 'Location', path: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM12 12a2 2 0 100-4 2 2 0 000 4z' },
            { name: 'Phone', path: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' },
            { name: 'Email', path: 'M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' }
        ];

        // Generate icon grid
        icons.forEach((icon, index) => {
            const iconElement = document.createElement('div');
            iconElement.className = 'icon-item fade-in';
            iconElement.innerHTML = `
                <svg viewBox="0 0 24 24">
                    <path d="${icon.path}" />
                </svg>
            `;
            
            // Add hover animation
            iconElement.addEventListener('mouseenter', () => {
                anime({
                    targets: iconElement.querySelector('svg'),
                    rotate: 5,
                    scale: 1.1,
                    duration: 300,
                    easing: 'easeOutCubic'
                });
            });

            iconElement.addEventListener('mouseleave', () => {
                anime({
                    targets: iconElement.querySelector('svg'),
                    rotate: 0,
                    scale: 1,
                    duration: 300,
                    easing: 'easeOutCubic'
                });
            });

            iconGrid.appendChild(iconElement);
        });
    }

    initializeComponentLibrary() {
        // Button hover effects
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('mouseenter', () => {
                anime({
                    targets: button,
                    scale: 1.05,
                    duration: 200,
                    easing: 'easeOutCubic'
                });
            });

            button.addEventListener('mouseleave', () => {
                anime({
                    targets: button,
                    scale: 1,
                    duration: 200,
                    easing: 'easeOutCubic'
                });
            });
        });

        // Form input animations
        document.querySelectorAll('.form-input').forEach(input => {
            input.addEventListener('focus', () => {
                anime({
                    targets: input,
                    borderColor: '#d4af37',
                    duration: 300,
                    easing: 'easeOutCubic'
                });
            });

            input.addEventListener('blur', () => {
                anime({
                    targets: input,
                    borderColor: '#bdc3c7',
                    duration: 300,
                    easing: 'easeOutCubic'
                });
            });
        });

        // Card hover effects
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                anime({
                    targets: card,
                    translateY: -8,
                    boxShadow: '0px 16px 32px rgba(0,0,0,0.15)',
                    duration: 300,
                    easing: 'easeOutCubic'
                });
            });

            card.addEventListener('mouseleave', () => {
                anime({
                    targets: card,
                    translateY: 0,
                    boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
                    duration: 300,
                    easing: 'easeOutCubic'
                });
            });
        });
    }

    toggleTheme(theme) {
        this.isDarkTheme = theme === 'dark';
        document.body.classList.toggle('dark-theme', this.isDarkTheme);

        // Update active button
        document.querySelectorAll('[data-theme]').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === theme);
        });

        // Animate theme transition
        anime({
            targets: '.component-category',
            scale: [0.98, 1],
            duration: 300,
            easing: 'easeOutCubic'
        });
    }

    initializeScrollAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    if (element.classList.contains('fade-in')) {
                        anime({
                            targets: element,
                            opacity: [0, 1],
                            translateY: [30, 0],
                            duration: 800,
                            easing: 'easeOutCubic'
                        });
                    }

                    if (element.classList.contains('scale-in')) {
                        anime({
                            targets: element,
                            opacity: [0, 1],
                            scale: [0.8, 1],
                            duration: 800,
                            easing: 'easeOutCubic'
                        });
                    }

                    // Add staggered animation for grids
                    if (element.classList.contains('color-grid') || 
                        element.classList.contains('icon-grid')) {
                        anime({
                            targets: element.children,
                            opacity: [0, 1],
                            translateY: [20, 0],
                            duration: 600,
                            delay: anime.stagger(100),
                            easing: 'easeOutCubic'
                        });
                    }
                }
            });
        }, observerOptions);

        // Observe all animated elements
        document.querySelectorAll('.fade-in, .scale-in, .color-grid, .icon-grid').forEach(el => {
            observer.observe(el);
        });
    }

    initializeNavigation() {
        // Navigation background on scroll
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const nav = document.getElementById('nav');
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                nav.style.background = this.isDarkTheme ? 
                    'rgba(26, 26, 26, 0.98)' : 
                    'rgba(255, 255, 255, 0.98)';
            } else {
                nav.style.background = this.isDarkTheme ? 
                    'rgba(26, 26, 26, 0.95)' : 
                    'rgba(255, 255, 255, 0.95)';
            }

            // Hide/show navigation on scroll
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                anime({
                    targets: nav,
                    translateY: -100,
                    duration: 300,
                    easing: 'easeOutCubic'
                });
            } else {
                anime({
                    targets: nav,
                    translateY: 0,
                    duration: 300,
                    easing: 'easeOutCubic'
                });
            }

            lastScrollY = currentScrollY;
        });
    }

    handleResize() {
        // Handle responsive adjustments
        const isMobile = window.innerWidth < 768;
        
        if (isMobile) {
            // Reduce particle count on mobile
            const heroBg = document.getElementById('hero-bg');
            if (heroBg && heroBg.querySelector('canvas')) {
                // Mobile-specific optimizations would go here
            }
        }
    }
}

// Initialize the showcase when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BrandShowcase();
});

// Performance optimization: Preload critical images
function preloadImages() {
    const criticalImages = [
        'resources/hero-logo.png'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

preloadImages();