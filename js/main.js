// Navbar Scroll Effect
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-sm');
            navbar.style.padding = '10px 0';
        } else {
            navbar.classList.remove('shadow-sm');
            navbar.style.padding = '15px 0';
        }
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                        toggle: true
                    });
                }

                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Intersection Observer for Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('animate-active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Initial setup for animated elements
    const animatedElements = document.querySelectorAll('.fade-in-up, .metric-card, .feature-card');

    animatedElements.forEach((el, index) => {
        // If it's a card in a grid, add staggered delay
        if (el.classList.contains('metric-card') || el.classList.contains('feature-card')) {
            el.style.opacity = '0';
            el.classList.add('fade-in-up');
            el.style.animationDelay = (index % 3) * 0.1 + 's';
        }
        observer.observe(el);
    });

    // Mobile Menu Close on Click
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    document.addEventListener('click', (e) => {
        if (!navbarCollapse.contains(e.target) && !navbarToggler.contains(e.target) && navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                toggle: true
            });
        }
    });

    // Scroll Triggered Popup
    const popup = document.getElementById('contactPopup');
    const closeBtn = document.getElementById('closePopup');
    let popupShown = false;

    if (popup && closeBtn) {
        window.addEventListener('scroll', () => {
            if (popupShown) return;

            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;

            if (scrollPercent > 40) {
                popup.classList.add('active');
                popupShown = true;
            }
        });

        closeBtn.addEventListener('click', () => {
            popup.classList.remove('active');
        });

        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.classList.remove('active');
            }
        });
    }
});
