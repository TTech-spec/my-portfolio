document.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.cyber-loader');
    const backToTopBtn = document.querySelector('.back-to-top');
    const navToggle = document.querySelector('.nav-toggle');
    const navContent = document.querySelector('.content');
    const overlay = document.querySelector('.overlay');
    const toggleMode = document.querySelector('#toggleMode');
    const body = document.body;
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const navLinks = document.querySelectorAll('nav a');

    if (loader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 800);
            }, 5000);
        });

        setTimeout(() => {
            if (loader.style.opacity !== '0') {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 800);
            }
        }, 6000);
    }

    // Back to Top Button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Mobile Navigation
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navContent.classList.toggle('active');
        overlay.classList.toggle('active');
        body.classList.toggle('no-scroll');
    });

    overlay.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navContent.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('no-scroll');
    });

    // Theme Toggle
    toggleMode.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        toggleMode.classList.toggle('rotate');
        localStorage.setItem('theme', body.classList.contains('light-mode') ? 'light' : 'dark');
    });

    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
        toggleMode.classList.add('rotate');
    }

    // Filter Portfolio Items
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(filter)) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // Contact Form Submission
    const contactForm = document.querySelector('#contact-form');
    const submitBtn = document.querySelector('#submit-btn');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        submitBtn.disabled = true;

        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data,
                    access_key: 'YOUR_ACCESS_KEY_HERE',
                }),
            });

            const result = await response.json();
            if (result.success) {
                alert('Message sent successfully!');
                contactForm.reset();
            } else {
                alert('Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please check the console.');
        } finally {
            submitBtn.disabled = false;
        }
    });

    // WhatsApp Button
    document.querySelector('#hire').addEventListener('click', () => {
        const phoneNumber = '+234 8147061837';
        const message = encodeURIComponent('Hello, I’d like to hire you!');
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    });

    // Download CV
    document.querySelector('#download').addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = './cv/timothy_cv.pdf';
        link.download = 'Timothy_CV.pdf';
        link.click();
    });

    // Smooth Scroll with Animation for Navbar Links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.style.transition = 'transform 0.8s ease, box-shadow 0.8s ease';
                targetSection.style.transform = 'scale(1.1)';
                targetSection.style.boxShadow = '0 0 30px var(--glow-color)';
                
                setTimeout(() => {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                    setTimeout(() => {
                        targetSection.style.transform = 'scale(1)';
                        targetSection.style.boxShadow = 'var(--shadow)';
                    }, 300);
                }, 100);
            }

            // Close mobile menu if open
            if (navContent.classList.contains('active')) {
                navToggle.classList.remove('active');
                navContent.classList.remove('active');
                overlay.classList.remove('active');
                body.classList.remove('no-scroll');
            }
        });
    });

    // Scroll Animations with Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply animations to sections and their children
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        // Add fade-in to section headings
        const heading = section.querySelector('h2, h1');
        if (heading) {
            heading.classList.add('fade-in');
            observer.observe(heading);
        }

        // Add fade-in to section paragraphs
        const paragraph = section.querySelector('p:not(.web-innertext):not(.skill-name)');
        if (paragraph) {
            paragraph.classList.add('fade-in');
            observer.observe(paragraph);
        }

        // Add staggered animations to child elements
        if (section.id === 'first-section') {
            const firstText = section.querySelector('.first-text');
            const tim = section.querySelector('.tim');
            if (firstText) {
                firstText.classList.add('fade-in-left');
                observer.observe(firstText);
            }
            if (tim) {
                tim.classList.add('fade-in-right');
                observer.observe(tim);
            }
        }

        if (section.id === 'second') {
            const items = section.querySelectorAll('.web');
            items.forEach((item, index) => {
                item.classList.add('fade-in');
                item.style.transitionDelay = `${index * 0.2}s`;
                observer.observe(item);
            });
        }

        if (section.id === 'works') {
            const items = section.querySelectorAll('.portfolio-item');
            items.forEach((item, index) => {
                item.classList.add('fade-in');
                item.style.transitionDelay = `${index * 0.2}s`;
                observer.observe(item);
            });
        }

        if (section.id === 'skills') {
            const items = section.querySelectorAll('.skill-box');
            items.forEach((item, index) => {
                item.classList.add('scale-in');
                item.style.transitionDelay = `${index * 0.2}s`;
                observer.observe(item);
            });
        }

        if (section.id === 'testimonials') {
            const items = section.querySelectorAll('.testimonial-card');
            items.forEach((item, index) => {
                item.classList.add('fade-in');
                item.style.transitionDelay = `${index * 0.2}s`;
                observer.observe(item);
            });
        }

        if (section.id === 'contact-form-section') {
            const contactInfo = section.querySelector('.contact-info');
            const form = section.querySelector('#contact-form');
            const cards = section.querySelectorAll('.contact-card');
            const socialLinks = section.querySelector('.social-links');

            if (contactInfo) {
                contactInfo.classList.add('fade-in-left');
                observer.observe(contactInfo);
            }
            if (form) {
                form.classList.add('fade-in-right');
                observer.observe(form);
            }
            cards.forEach((card, index) => {
                card.classList.add('fade-in');
                card.style.transitionDelay = `${index * 0.2}s`;
                observer.observe(card);
            });
            if (socialLinks) {
                socialLinks.classList.add('fade-in');
                socialLinks.style.transitionDelay = '0.7s';
                observer.observe(socialLinks);
            }
        }
    });

    // Apply animation to footer
    const footer = document.querySelector('.footer');
    if (footer) {
        const footerSections = footer.querySelectorAll('.footer-section');
        footerSections.forEach((section, index) => {
            section.classList.add('fade-in');
            section.style.transitionDelay = `${index * 0.2}s`;
            observer.observe(section);
        });
    }
});