
document.addEventListener('DOMContentLoaded', function () {
    // Hide loading overlay after page load
    setTimeout(() => {
        const loadingOverlay = document.getElementById('loadingOverlay');
        loadingOverlay.classList.add('hidden');
    }, 1000);

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Add staggered animation delays for service cards
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
    });

    // Navbar transparency on scroll
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    });

    // Form input animations and validation
    const inputs = document.querySelectorAll('.form-control');

    inputs.forEach(input => {
        // Key-up animation
        input.addEventListener('keyup', function () {
            this.style.transform = 'scale(1.02)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });

        // Key-down animation
        input.addEventListener('keydown', function () {
            this.style.transform = 'scale(0.98)';
        });

        // Focus animations
        input.addEventListener('focus', function () {
            this.parentElement.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 0 20px rgba(74, 144, 226, 0.3)';
        });

        input.addEventListener('blur', function () {
            this.parentElement.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Contact form submission
    document.getElementById('contactForm').addEventListener('submit', function (e) {
        e.preventDefault();

        // Simulate form submission
        const button = this.querySelector('button[type="submit"]');
        const originalText = button.textContent;

        button.textContent = 'Sending...';
        button.disabled = true;

        setTimeout(() => {
            button.textContent = 'Message Sent!';
            button.style.background = '#50c878';

            setTimeout(() => {
                button.textContent = originalText;
                button.disabled = false;
                button.style.background = 'linear-gradient(45deg, #ff6b35, #f7931e)';
                this.reset();
            }, 2000);
        }, 1500);
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', function () {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-section');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add counter animation for stats (if needed)
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                counter.textContent = Math.floor(current);

                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(timer);
                }
            }, 20);
        });
    }

    // Initialize tooltips if needed
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Add typing effect for hero title (optional enhancement)
    function typeEffect(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';

        function typeWriter() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        }
        typeWriter();
    }

    // Add floating animation for service icons on hover
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('mouseenter', function () {
            const icon = this.querySelector('.service-icon');
            icon.style.animation = 'float 1s ease-in-out infinite';
        });

        card.addEventListener('mouseleave', function () {
            const icon = this.querySelector('.service-icon');
            icon.style.animation = 'none';
        });
    });

    // Add custom cursor effect for better UX
    document.addEventListener('mousemove', function (e) {
        const cursor = document.querySelector('.custom-cursor');
        if (cursor) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        }
    });

    // Preload critical images for better performance
    const criticalImages = [
        'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088',
        'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d'
    ];

    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });

    // Add scroll progress indicator
    const scrollProgress = document.createElement('div');
    scrollProgress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(45deg, #4a90e2, #50c878);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(scrollProgress);

    window.addEventListener('scroll', function () {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });

    // Add performance optimization for scroll events
    let ticking = false;

    function updateScrollEffects() {
        // Parallax and other scroll effects here
        ticking = false;
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });

    // Add accessibility enhancements
    document.addEventListener('keydown', function (e) {
        // Skip to main content with Tab key
        if (e.key === 'Tab' && !e.shiftKey) {
            const focusableElements = document.querySelectorAll(
                'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
            );

            if (document.activeElement === focusableElements[0]) {
                // Add skip link functionality if needed
            }
        }

        // Escape key to close modals or overlays
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.show');
            if (activeModal) {
                const modal = bootstrap.Modal.getInstance(activeModal);
                if (modal) modal.hide();
            }
        }
    });

    // Add error handling for form validation
    function validateForm(form) {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('is-invalid');
                isValid = false;
            } else {
                field.classList.remove('is-invalid');
                field.classList.add('is-valid');
            }
        });

        return isValid;
    }

    // Enhanced form validation with real-time feedback
    inputs.forEach(input => {
        input.addEventListener('input', function () {
            if (this.hasAttribute('required')) {
                if (this.value.trim()) {
                    this.classList.remove('is-invalid');
                    this.classList.add('is-valid');
                } else {
                    this.classList.remove('is-valid');
                }
            }

            // Email validation
            if (this.type === 'email' && this.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailRegex.test(this.value)) {
                    this.classList.remove('is-invalid');
                    this.classList.add('is-valid');
                } else {
                    this.classList.remove('is-valid');
                    this.classList.add('is-invalid');
                }
            }

            // Phone validation
            if (this.type === 'tel' && this.value) {
                const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
                if (phoneRegex.test(this.value.replace(/\s/g, ''))) {
                    this.classList.remove('is-invalid');
                    this.classList.add('is-valid');
                } else {
                    this.classList.remove('is-valid');
                    this.classList.add('is-invalid');
                }
            }
        });
    });

    // Add intersection observer for fade-in animations with better performance
    const fadeElements = document.querySelectorAll('.service-card, .about-content, .about-image, .contact-form');

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) translateX(0)';
                }, index * 100);
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    fadeElements.forEach(el => {
        fadeObserver.observe(el);
    });

    // Add lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Console welcome message
    console.log('%c🚀 QuickDeliver Landing Page Loaded Successfully!', 'color: #4a90e2; font-size: 16px; font-weight: bold;');
    console.log('%cDeveloped with ❤️ using HTML5, CSS3, Bootstrap & Vanilla JavaScript', 'color: #50c878; font-size: 12px;');
});

// Additional utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Service Worker registration for better performance (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        // Uncomment below if you have a service worker file
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}
// Counter Animation for Statistics
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        const speed = 200;

        counters.forEach(counter => {
            const animate = () => {
                const value = +counter.getAttribute('data-target');
                const data = +counter.innerText;

                const time = value / speed;

                if (data < value) {
                    counter.innerText = Math.ceil(data + time);
                    setTimeout(animate, 1);
                } else {
                    counter.innerText = value.toLocaleString();
                }
            }

            animate();
        });
    }

    // Testimonial Carousel Functionality
    let currentTestimonialIndex = 0;
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');

    function showTestimonial(index) {
        // Hide all testimonial cards
        testimonialCards.forEach((card, i) => {
            if (i === index) {
                card.style.display = 'block';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            } else {
                card.style.opacity = '0.3';
            }
        });

        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    function changeTestimonial(direction) {
        currentTestimonialIndex += direction;

        if (currentTestimonialIndex >= testimonialCards.length) {
            currentTestimonialIndex = 0;
        } else if (currentTestimonialIndex < 0) {
            currentTestimonialIndex = testimonialCards.length - 1;
        }

        showTestimonial(currentTestimonialIndex);
    }

    function currentTestimonial(index) {
        currentTestimonialIndex = index - 1;
        showTestimonial(currentTestimonialIndex);
    }

    // Auto-rotate testimonials
    function autoRotateTestimonials() {
        setInterval(() => {
            changeTestimonial(1);
        }, 5000);
    }

    // Enhanced Intersection Observer for new sections
    document.addEventListener('DOMContentLoaded', function () {
        // Stats counter animation trigger
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            statsObserver.observe(statsSection);
        }

        // Testimonial cards staggered animation
        const testimonialObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 200);
                }
            });
        }, { threshold: 0.2 });

        document.querySelectorAll('.testimonial-card').forEach(card => {
            testimonialObserver.observe(card);
        });

        // Stat cards staggered animation
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 150);
                }
            });
        }, { threshold: 0.2 });

        document.querySelectorAll('.stat-card').forEach(card => {
            statObserver.observe(card);
        });

        // Initialize testimonial carousel
        autoRotateTestimonials();

        // Add smooth scroll behavior for new sections
        document.querySelectorAll('a[href^="#stats"], a[href^="#testimonials"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Add keyboard navigation for testimonials
        document.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowLeft') {
                changeTestimonial(-1);
            } else if (e.key === 'ArrowRight') {
                changeTestimonial(1);
            }
        });

        // Touch/swipe support for testimonials (basic)
        let touchStartX = 0;
        let touchEndX = 0;

        const testimonialSection = document.querySelector('.testimonials-section');
        if (testimonialSection) {
            testimonialSection.addEventListener('touchstart', function (e) {
                touchStartX = e.changedTouches[0].screenX;
            });

            testimonialSection.addEventListener('touchend', function (e) {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });
        }

        function handleSwipe() {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold) {
                changeTestimonial(1); // Swipe left, next testimonial
            }
            if (touchEndX > touchStartX + swipeThreshold) {
                changeTestimonial(-1); // Swipe right, previous testimonial
            }
        }

        // Add floating animation to testimonial cards on hover
        document.querySelectorAll('.testimonial-card').forEach(card => {
            card.addEventListener('mouseenter', function () {
                this.style.transform = 'translateY(-10px) rotateX(5deg)';
            });

            card.addEventListener('mouseleave', function () {
                this.style.transform = 'translateY(0) rotateX(0deg)';
            });
        });

        // Enhanced stats hover effects
        document.querySelectorAll('.stat-card').forEach(card => {
            card.addEventListener('mouseenter', function () {
                const icon = this.querySelector('.stat-icon');
                const number = this.querySelector('.stat-number');

                icon.style.transform = 'scale(1.3) rotate(360deg)';
                number.style.transform = 'scale(1.1)';
            });

            card.addEventListener('mouseleave', function () {
                const icon = this.querySelector('.stat-icon');
                const number = this.querySelector('.stat-number');

                icon.style.transform = 'scale(1) rotate(0deg)';
                number.style.transform = 'scale(1)';
            });
        });
    });

    // Utility function for number formatting in counters
    function formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(0) + 'K';
        }
        return num.toString();
    }

    // Enhanced counter animation with formatting
    function enhancedAnimateCounters() {
        const counters = document.querySelectorAll('.counter');

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const increment = target / 100;
            let current = 0;

            counter.classList.add('counting');

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                    counter.classList.remove('counting');
                }

                // Format large numbers
                if (target >= 1000) {
                    counter.textContent = formatNumber(Math.floor(current));
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, 20);
        });
    }