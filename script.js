/**
 * ELENA WHITMORE - STATIC SITE JAVASCRIPT
 * Vanilla JS - No Frameworks
 */

(function() {
    'use strict';

    // ========================================
    // NAVIGATION
    // ========================================
    
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    // Navbar scroll effect
    function handleNavbarScroll() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });

    // Mobile menu toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            const spans = mobileMenuBtn.querySelectorAll('span');
            if (mobileMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close mobile menu on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ========================================
    // SCROLL ANIMATIONS (Intersection Observer)
    // ========================================

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for fade-in
    document.querySelectorAll('.about-image-card, .about-text-card, .service-card, .book-card, .testimonial-card, .newsletter-card, .essays-card, .contact-left, .contact-card').forEach(el => {
        fadeInObserver.observe(el);
    });

    // Staggered animation for service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Staggered animation for book cards
    const bookCards = document.querySelectorAll('.book-card');
    bookCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // Staggered animation for testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // ========================================
    // PARALLAX EFFECTS
    // ========================================

    let ticking = false;

    function updateParallax() {
        const scrolled = window.scrollY;
        
        // Parallax for hero background
        const heroBg = document.querySelector('.hero-bg img');
        if (heroBg) {
            const heroSection = document.querySelector('.hero');
            const heroRect = heroSection.getBoundingClientRect();
            if (heroRect.bottom > 0) {
                heroBg.style.transform = `translateY(${scrolled * 0.3}px) scale(${1 + scrolled * 0.0002})`;
            }
        }

        // Parallax for process background
        const processBg = document.querySelector('.process-bg img');
        if (processBg) {
            const processSection = document.querySelector('.process');
            const processRect = processSection.getBoundingClientRect();
            if (processRect.top < window.innerHeight && processRect.bottom > 0) {
                const processOffset = scrolled - processSection.offsetTop;
                processBg.style.transform = `translateY(${processOffset * 0.2}px)`;
            }
        }

        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });

    // ========================================
    // NEWSLETTER FORM
    // ========================================

    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterSuccess = document.getElementById('newsletterSuccess');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                // Simulate form submission
                newsletterForm.style.display = 'none';
                newsletterSuccess.style.display = 'block';
                
                // Reset after 5 seconds (optional)
                setTimeout(() => {
                    newsletterForm.reset();
                    newsletterForm.style.display = 'block';
                    newsletterSuccess.style.display = 'none';
                }, 5000);
            }
        });
    }

    // ========================================
    // MODALS
    // ========================================

    const privacyBtn = document.getElementById('privacyBtn');
    const termsBtn = document.getElementById('termsBtn');
    const privacyModal = document.getElementById('privacyModal');
    const termsModal = document.getElementById('termsModal');
    const privacyClose = document.getElementById('privacyClose');
    const termsClose = document.getElementById('termsClose');

    function openModal(modal) {
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal(modal) {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    if (privacyBtn && privacyModal) {
        privacyBtn.addEventListener('click', () => openModal(privacyModal));
    }

    if (termsBtn && termsModal) {
        termsBtn.addEventListener('click', () => openModal(termsModal));
    }

    if (privacyClose && privacyModal) {
        privacyClose.addEventListener('click', () => closeModal(privacyModal));
    }

    if (termsClose && termsModal) {
        termsClose.addEventListener('click', () => closeModal(termsModal));
    }

    // Close modal on backdrop click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this);
            }
        });
    });

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.active').forEach(modal => {
                closeModal(modal);
            });
        }
    });

    // ========================================
    // HOVER EFFECTS
    // ========================================

    // Add hover class for touch devices
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    
    if (!isTouchDevice) {
        // Enhanced hover effects for desktop
        document.querySelectorAll('.book-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.zIndex = '10';
            });
            card.addEventListener('mouseleave', function() {
                this.style.zIndex = '';
            });
        });
    }

    // ========================================
    // REVEAL ON SCROLL (Additional)
    // ========================================

    // Reveal elements with data-reveal attribute
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.revealDelay || 0;
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delay);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // ========================================
    // PERFORMANCE: Lazy load images
    // ========================================

    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ========================================
    // INITIALIZE
    // ========================================

    // Trigger initial navbar check
    handleNavbarScroll();

    // Add loaded class to body for initial animations
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    console.log('Elena Whitmore - Static Site Loaded');

})();