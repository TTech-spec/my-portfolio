document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category').includes(filterValue)) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // Navigation animation
    const nav = document.querySelector('nav');
    let hasAnimated = false;

    function handleNavScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 20 && !hasAnimated) {
            nav.classList.add('nav-scrolled');
            hasAnimated = true;

            setTimeout(() => {
                nav.classList.remove('nav-scrolled');
                nav.classList.add('nav-sticky');
            }, 500);
        }
        else if (scrollTop <= 5) {
            hasAnimated = false;
            nav.classList.remove('nav-sticky');
        }
    }

    window.addEventListener('scroll', handleNavScroll);


    const toggleButton = document.getElementById('toggleMode');
    const body = document.body;

    // Check for saved preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        body.classList.add('dark-mode');
        toggleButton.textContent = '☀️';
    } else {
        toggleButton.textContent = '🌙';
    }

    toggleButton.addEventListener('click', function() {
        // Toggle dark mode
        body.classList.toggle('dark-mode');


        toggleButton.classList.add('rotate');


        setTimeout(() => {
            toggleButton.classList.remove('rotate');
        }, 500);

        // Update button text and save preference
        if (body.classList.contains('dark-mode')) {
            toggleButton.textContent = '☀️';
            localStorage.setItem('darkMode', 'enabled');
        } else {
            toggleButton.textContent = '🌙';
            localStorage.setItem('darkMode', 'disabled');
        }
    });

    // Back to top button
    const backToTopButton = document.getElementById('backToTop');

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.style.opacity = '1';
        } else {
            backToTopButton.style.opacity = '0';
        }
    });

    // Responsive Navigation
    const navToggle = document.querySelector('.nav-toggle');
    const content = document.querySelector('.content');
    const overlay = document.querySelector('.overlay');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        content.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    overlay.addEventListener('click', () => {
        navToggle.classList.remove('active');
        content.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    });

    const navLinks = document.querySelectorAll('.content li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            content.classList.remove('active');
            overlay.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Navigation scroll events
    const serviceLink = document.querySelector('.content li:nth-child(1)');
    const worksLink = document.querySelector('.content li:nth-child(2)');
    const skillsLink = document.querySelector('.content li:nth-child(3)');
    const testimonialsLink = document.querySelector('.content li:nth-child(4)');
    const contactLink = document.querySelector('.content li:nth-child(5)');
    const hireButton = document.getElementById('hire');
    const downloadButton = document.getElementById('download'); // Get the download button

    serviceLink?.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' });
    });

    worksLink?.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('.Recent')?.scrollIntoView({ behavior: 'smooth' });
    });

    skillsLink?.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('.skills-section')?.scrollIntoView({ behavior: 'smooth' });
    });

    testimonialsLink?.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('.container .section-heading')?.scrollIntoView({ behavior: 'smooth' });
    });

    contactLink?.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
    });

    hireButton?.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
    });

    // Add event listener to the download button
    downloadButton?.addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
    });

    // Make all navigation items clickable
    const allNavItems = document.querySelectorAll('.content li');
    allNavItems.forEach(item => {
        item.style.cursor = 'pointer';
    });
});
function sendToWhatsApp() {
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const company = document.getElementById('company').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('contact').value;
    const message = document.getElementById('message').value;
    const phoneNumber = '08147061837'; // Replace with your actual WhatsApp number (including country code, without + or leading zeros)
  
    const whatsappMessage = `New Contact Form Submission:\n` +
      `First Name: ${firstname}\n` +
      `Last Name: ${lastname}\n` +
      `Company: ${company}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone}\n` +
      `Message: ${message}`;
  
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  
    window.open(whatsappURL, '_blank');
  }

// Add this at the top of your JS
const MIN_LOADER_DURATION = 3000; // 3 seconds (adjust as needed)
let loaderStartTime = Date.now();

window.addEventListener('load', function() {
  const loader = document.querySelector('.cyber-loader');
  const elapsed = Date.now() - loaderStartTime;
  const remainingTime = Math.max(MIN_LOADER_DURATION - elapsed, 0);

  // Wait for remaining time or immediate hide if already past duration
  setTimeout(() => {
    // Start fade-out animation
    loader.style.opacity = '0';
    
    // Remove loader after fade-out completes
    setTimeout(() => {
      loader.style.display = 'none';
      document.body.style.overflow = 'visible';
    }, 800);
  }, remainingTime);
});

// Your existing DOMContentLoaded code (should be separate)
document.addEventListener('DOMContentLoaded', function() {
  // ... keep all your existing code ...
});
