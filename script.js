/* ========================================
   DIVYA VARMA CHIKITSAI MAIYAM - SCRIPT
   Premium Healthcare / Ayurvedic Clinic
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ==================== PRELOADER ====================
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = '';
        }, 1200);
    });

    // Fallback: hide preloader after 4 seconds max
    setTimeout(() => {
        if (preloader && !preloader.classList.contains('hidden')) {
            preloader.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }, 4000);

    // ==================== AOS INITIALIZATION ====================
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 60,
            delay: 0,
        });
    }

    // ==================== NAVBAR & MOBILE MENU ====================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Create backdrop overlay for mobile menu
    let navBackdrop = document.createElement('div');
    navBackdrop.className = 'nav-backdrop';
    document.body.appendChild(navBackdrop);

    // Sticky navbar on scroll
    function handleNavScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', handleNavScroll);
    handleNavScroll();

    function openMobileMenu() {
        navToggle.classList.add('active');
        navMenu.classList.add('active');
        navBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navBackdrop.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            if (navMenu.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    if (navBackdrop) {
        navBackdrop.addEventListener('click', closeMobileMenu);
    }

    // Close menu on nav link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    function highlightNav() {
        const scrollPos = window.scrollY + 120;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.nav-link[href="#${id}"]`);
            if (link && !link.classList.contains('btn-appointment')) {
                if (scrollPos >= top && scrollPos < top + height) {
                    navLinks.forEach(l => {
                        if (!l.classList.contains('btn-appointment')) l.classList.remove('active');
                    });
                    link.classList.add('active');
                }
            }
        });
    }
    window.addEventListener('scroll', highlightNav);

    // ==================== PARALLAX EFFECT ====================
    const parallaxBg = document.getElementById('parallaxBg');
    let ticking = false;

    function updateParallax() {
        if (parallaxBg) {
            const scrolled = window.scrollY;
            const heroHeight = document.querySelector('.hero-section').offsetHeight;
            if (scrolled < heroHeight) {
                parallaxBg.style.transform = `translateY(${scrolled * 0.4}px)`;
            }
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // ==================== HERO PARTICLES ====================
    const particlesContainer = document.getElementById('heroParticles');
    if (particlesContainer) {
        const particleCount = window.innerWidth > 768 ? 30 : 15;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('hero-particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.width = (Math.random() * 4 + 2) + 'px';
            particle.style.height = particle.style.width;
            particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
            particle.style.animationDelay = (Math.random() * 10) + 's';
            particle.style.opacity = Math.random() * 0.3 + 0.05;
            particlesContainer.appendChild(particle);
        }
    }

    // ==================== COUNTER ANIMATION ====================
    const counters = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;

        const heroStats = document.querySelector('.hero-stats');
        if (!heroStats) return;

        const rect = heroStats.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            countersAnimated = true;
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000;
                const start = 0;
                const startTime = performance.now();

                function updateCounter(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    // Ease out cubic
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.round(start + (target - start) * eased);

                    counter.textContent = current.toLocaleString();

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    }
                }
                requestAnimationFrame(updateCounter);
            });
        }
    }

    window.addEventListener('scroll', animateCounters);
    animateCounters(); // Check on load too

    // ==================== GALLERY TABS ====================
    const galleryTabs = document.querySelectorAll('.gallery-tab');
    const galleryContents = document.querySelectorAll('.gallery-content');

    galleryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');

            galleryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            galleryContents.forEach(content => {
                content.classList.remove('active');
            });

            const targetContent = document.getElementById(`gallery-${tabName}`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // ==================== LIGHTBOX ====================
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');

    let galleryImages = [];
    let currentImageIndex = 0;

    function collectGalleryImages() {
        galleryImages = [];
        const items = document.querySelectorAll('#gallery-photos .gallery-item img');
        items.forEach(img => galleryImages.push(img.src));
    }

    function openLightbox(index) {
        collectGalleryImages();
        currentImageIndex = index;
        lightboxImg.src = galleryImages[currentImageIndex];
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        lightboxImg.src = galleryImages[currentImageIndex];
    }

    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        lightboxImg.src = galleryImages[currentImageIndex];
    }

    // Attach click events to gallery photos
    document.querySelectorAll('#gallery-photos .gallery-item').forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', prevImage);
    if (lightboxNext) lightboxNext.addEventListener('click', nextImage);

    // Close on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
    });

    // Close on overlay click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // ==================== TESTIMONIALS SLIDER ====================
    const track = document.getElementById('testimonialTrack');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    const dotsContainer = document.getElementById('testimonialDots');

    if (track) {
        const cards = track.querySelectorAll('.testimonial-card');
        let currentSlide = 0;
        let slidesPerView = 3;
        let autoSlideInterval;

        function getSlidesPerView() {
            if (window.innerWidth <= 768) return 1;
            if (window.innerWidth <= 1024) return 2;
            return 3;
        }

        function getTotalSlides() {
            return Math.max(1, cards.length - slidesPerView + 1);
        }

        function createDots() {
            if (!dotsContainer) return;
            dotsContainer.innerHTML = '';
            const total = getTotalSlides();
            for (let i = 0; i < total; i++) {
                const dot = document.createElement('div');
                dot.classList.add('testimonial-dot');
                if (i === 0) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
            }
        }

        function updateSlider() {
            if (!cards.length) return;
            const gap = 24;
            const cardWidth = cards[0].offsetWidth + gap;
            track.style.transform = `translateX(-${currentSlide * cardWidth}px)`;

            // Update dots
            const dots = dotsContainer.querySelectorAll('.testimonial-dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        }

        function goToSlide(index) {
            const maxSlide = getTotalSlides() - 1;
            currentSlide = Math.max(0, Math.min(index, maxSlide));
            updateSlider();
        }

        function nextSlide() {
            const maxSlide = getTotalSlides() - 1;
            currentSlide = currentSlide >= maxSlide ? 0 : currentSlide + 1;
            updateSlider();
        }

        function prevSlide() {
            const maxSlide = getTotalSlides() - 1;
            currentSlide = currentSlide <= 0 ? maxSlide : currentSlide - 1;
            updateSlider();
        }

        function startAutoSlide() {
            autoSlideInterval = setInterval(nextSlide, 5000);
        }

        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }

        // Initialize
        function initSlider() {
            slidesPerView = getSlidesPerView();
            currentSlide = 0;
            createDots();
            updateSlider();
        }

        initSlider();
        startAutoSlide();

        if (prevBtn) prevBtn.addEventListener('click', () => { stopAutoSlide(); prevSlide(); startAutoSlide(); });
        if (nextBtn) nextBtn.addEventListener('click', () => { stopAutoSlide(); nextSlide(); startAutoSlide(); });

        // Touch/Swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        track.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoSlide();
        }, { passive: true });

        track.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) nextSlide();
                else prevSlide();
            }
            startAutoSlide();
        }, { passive: true });

        // Resize handler
        window.addEventListener('resize', () => {
            slidesPerView = getSlidesPerView();
            createDots();
            goToSlide(Math.min(currentSlide, getTotalSlides() - 1));
        });
    }

    // ==================== CONTACT FORM (Firestore + Email Notification) ====================
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    // EmailJS Configuration
    // Target Receiver: divyavarmacentre@gmail.com
    const EMAILJS_PUBLIC_KEY = "YOUR_EMAILJS_PUBLIC_KEY";   // Replace with your EmailJS Public Key
    const EMAILJS_SERVICE_ID = "YOUR_EMAILJS_SERVICE_ID";   // Replace with your EmailJS Service ID
    const EMAILJS_TEMPLATE_ID = "YOUR_EMAILJS_TEMPLATE_ID"; // Replace with your EmailJS Template ID

    if (typeof emailjs !== 'undefined' && EMAILJS_PUBLIC_KEY !== "YOUR_EMAILJS_PUBLIC_KEY") {
        emailjs.init(EMAILJS_PUBLIC_KEY);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('formName').value.trim();
            const phone = document.getElementById('formPhone').value.trim();
            const email = document.getElementById('formEmail').value.trim();
            const message = document.getElementById('formMessage').value.trim();

            // Validation
            if (!name || !phone || !message) {
                alert('Please fill in all required fields.');
                return;
            }

            // Show loading state
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            try {
                // 1. Save to Firebase Firestore
                if (typeof db !== 'undefined') {
                    await db.collection('appointments').add({
                        name: name,
                        phone: phone,
                        email: email || 'Not provided',
                        message: message,
                        target_email: 'divyavarmacentre@gmail.com',
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                        status: 'new',
                        read: false,
                        source: 'website_contact_form'
                    });
                    console.log('✅ Appointment saved to Firestore!');
                }

                // 2. Send Email Notification directly to divyavarmacentre@gmail.com via FormSubmit AJAX service
                try {
                    const formSubmitResponse = await fetch("https://formsubmit.co/ajax/divyavarmacentre@gmail.com", {
                        method: "POST",
                        headers: { 
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        },
                        body: JSON.stringify({
                            _subject: `📌 New Appointment Request from ${name}`,
                            "Patient Name": name,
                            "Phone Number": phone,
                            "Email Address": email || 'Not provided',
                            "Appointment / Health Query": message,
                            "_template": "table",
                            "_captcha": "false"
                        })
                    });
                    const formSubmitData = await formSubmitResponse.json();
                    console.log('✉️ Email Notification sent via FormSubmit:', formSubmitData);
                } catch (fsErr) {
                    console.warn('FormSubmit Notification notice:', fsErr);
                }

                // 3. Direct Gmail SMTP backup (SmtpJS)
                if (typeof Email !== 'undefined') {
                    try {
                        const emailResult = await Email.send({
                            Host: "smtp.gmail.com",
                            Username: "divyavarmacentre@gmail.com",
                            Password: "akacjukodribfdf",
                            To: "divyavarmacentre@gmail.com",
                            From: "divyavarmacentre@gmail.com",
                            Subject: `📌 New Appointment Request: ${name}`,
                            Body: `
                                <div style="font-family: Arial, sans-serif; padding: 20px; color: #2c3e50; border: 2px solid #0d7c66; border-radius: 12px; max-width: 600px;">
                                    <h2 style="color: #0d7c66; margin-bottom: 4px;">Divya Varma Chikitsai Maiyam</h2>
                                    <h4 style="color: #c9a54e; margin-top: 0;">New Patient Appointment Notification</h4>
                                    <hr style="border: 0; border-top: 1px solid #e0ebe7; margin: 15px 0;">
                                    <p style="font-size: 1rem;"><strong>Patient Name:</strong> ${name}</p>
                                    <p style="font-size: 1rem;"><strong>Phone Number:</strong> <a href="tel:${phone}" style="color: #0d7c66; font-weight: bold;">${phone}</a></p>
                                    <p style="font-size: 1rem;"><strong>Email:</strong> ${email || 'Not provided'}</p>
                                    <p style="font-size: 1rem;"><strong>Message / Condition:</strong></p>
                                    <div style="background: #f0f7f4; padding: 14px; border-radius: 8px; font-size: 0.95rem; border-left: 4px solid #0d7c66;">
                                        ${message}
                                    </div>
                                    <hr style="border: 0; border-top: 1px solid #e0ebe7; margin: 15px 0;">
                                    <p style="font-size: 0.8rem; color: #7f8c8d;">Submitted on: ${new Date().toLocaleString()}</p>
                                </div>
                            `
                        });
                        console.log('✉️ SMTP Email Notification Sent:', emailResult);
                    } catch (smtpErr) {
                        console.warn('SMTP Notification:', smtpErr);
                    }
                }

                // Show success message
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';
                formSuccess.style.animation = 'fadeInUp 0.5s ease';

                // Reset form after 5 seconds
                setTimeout(() => {
                    contactForm.reset();
                    contactForm.style.display = 'block';
                    formSuccess.style.display = 'none';
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                }, 5000);

            } catch (error) {
                console.error('❌ Error processing appointment:', error);
                alert('Something went wrong. Please try again or contact us directly via Phone / WhatsApp.');
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

    // ==================== BACK TO TOP ====================
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ==================== LAZY LOADING IMAGES ====================
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        }, { rootMargin: '50px' });

        lazyImages.forEach(img => {
            img.addEventListener('load', () => img.classList.add('loaded'));
            imageObserver.observe(img);
        });
    } else {
        // Fallback: show all images
        lazyImages.forEach(img => img.classList.add('loaded'));
    }

    // ==================== SMOOTH SCROLL FOR ALL ANCHOR LINKS ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                
                // Get accurate navbar height
                const navHeader = document.getElementById('navbar');
                const navHeight = navHeader ? navHeader.offsetHeight : 70;
                
                // For Home section, scroll to absolute top
                if (targetId === '#home') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    return;
                }
                
                // For all other sections, position with 20px extra breathing space below sticky nav
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight - 20;
                
                window.scrollTo({
                    top: Math.max(0, offsetPosition),
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==================== PARALLAX ON MOUSE MOVE (Desktop) ====================
    if (window.innerWidth > 1024) {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            document.querySelector('.hero-section').addEventListener('mousemove', (e) => {
                const x = (e.clientX / window.innerWidth - 0.5) * 10;
                const y = (e.clientY / window.innerHeight - 0.5) * 10;

                const logo = heroContent.querySelector('.hero-logo-wrap');
                if (logo) {
                    logo.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
                }
            });
        }
    }

});
