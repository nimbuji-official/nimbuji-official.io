// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Auto-update copyright year
    const currentYear = new Date().getFullYear();
    const copyrightElements = document.querySelectorAll('.footer-bottom-left p, .footer-bottom p');
    copyrightElements.forEach(element => {
        if (element.textContent.includes('Nimbuji. All rights reserved.')) {
            element.innerHTML = `&copy; ${currentYear} Nimbuji. All rights reserved.`;
        }
    });

    // Hamburger Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const orderBtn = document.querySelector('.order-btn');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Hide/show order button when menu is toggled
            if (orderBtn) {
                if (navMenu.classList.contains('active')) {
                    orderBtn.classList.add('hidden');
                } else {
                    orderBtn.classList.remove('hidden');
                }
            }
        });

        // Close menu when clicking on nav links
        document.querySelectorAll('.nav-menu li a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                
                // Show order button when menu is closed
                if (orderBtn) {
                    orderBtn.classList.remove('hidden');
                }
            });
        });

        // Close menu when clicking on mobile order button
        const mobileOrderBtn = document.querySelector('.mobile-menu-order');
        if (mobileOrderBtn) {
            mobileOrderBtn.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                
                if (orderBtn) {
                    orderBtn.classList.remove('hidden');
                }
            });
        }

        // Close menu when clicking on mobile close button
        const mobileCloseBtn = document.querySelector('.mobile-menu-close');
        if (mobileCloseBtn) {
            mobileCloseBtn.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                
                if (orderBtn) {
                    orderBtn.classList.remove('hidden');
                }
            });
        }

        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                
                // Show order button when menu is closed
                if (orderBtn) {
                    orderBtn.classList.remove('hidden');
                }
            }
        });
    }

    // Contact Form Handling (Original)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const subject = formData.get('subject');
            const message = formData.get('message');

            // Basic validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all required fields.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }

            // Simulate form submission
            showNotification('Thank you for your message! We will get back to you soon.', 'success');
            contactForm.reset();
        });
    }

    // New Contact Form Handling
    const contactFormNew = document.getElementById('contactFormNew');
    if (contactFormNew) {
        contactFormNew.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactFormNew);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }

            if (!isValidEmail(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Show success alert
            alert('Thanks! We will contact you soon.');
            contactFormNew.reset();
        });
    }

    // Product Order Buttons (both old and new)
    const orderButtons = document.querySelectorAll('.product-card .btn-primary, .product-order-btn');
    orderButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card') || this.closest('.product-card-home');
            const productName = productCard.querySelector('h3').textContent;
            
            // Create WhatsApp message
            const message = `Hi! I'm interested in ordering ${productName}. Could you please provide more details about availability and delivery?`;
            const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
            
            window.open(whatsappUrl, '_blank');
        });
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Add scroll effect to header
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (header && scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.classList.add('header-compact');
        } else if (header) {
            // Scrolling up or at top
            header.classList.remove('header-compact');
        }
        
        lastScrollTop = scrollTop;
    });
});

// Testimonials Pagination - Global functions
let currentTestimonialIndex = 0;

function showTestimonial(index) {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    // Check if elements exist
    if (!testimonialCards.length || !dots.length) return;
    
    // Validate index
    if (index < 0 || index >= testimonialCards.length) return;
    
    // Hide all testimonials
    testimonialCards.forEach(card => card.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current testimonial
    if (testimonialCards[index] && dots[index]) {
        testimonialCards[index].classList.add('active');
        dots[index].classList.add('active');
    }
    
    // Update button states immediately
    if (prevBtn) {
        prevBtn.disabled = (index === 0);
        if (index === 0) {
            prevBtn.style.pointerEvents = 'none';
        } else {
            prevBtn.style.pointerEvents = 'auto';
        }
    }
    
    if (nextBtn) {
        nextBtn.disabled = (index === testimonialCards.length - 1);
        if (index === testimonialCards.length - 1) {
            nextBtn.style.pointerEvents = 'none';
        } else {
            nextBtn.style.pointerEvents = 'auto';
        }
    }
}

function changeTestimonial(direction) {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    // Check if elements exist
    if (!testimonialCards.length) return;
    
    const newIndex = currentTestimonialIndex + direction;
    
    // Don't allow navigation beyond bounds
    if (newIndex < 0 || newIndex >= testimonialCards.length) {
        return;
    }
    
    currentTestimonialIndex = newIndex;
    showTestimonial(currentTestimonialIndex);
}

function currentTestimonial(index) {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    // Check if elements exist
    if (!testimonialCards.length) return;
    
    // Validate index bounds
    const newIndex = index - 1;
    if (newIndex < 0 || newIndex >= testimonialCards.length) return;
    
    currentTestimonialIndex = newIndex;
    showTestimonial(currentTestimonialIndex);
}

// Initialize testimonials on page load
document.addEventListener('DOMContentLoaded', function() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    if (testimonialCards.length > 0) {
        currentTestimonialIndex = 0;
        showTestimonial(0);
    }
});

// Add animation on scroll for cards
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe cards for animation
    const cards = document.querySelectorAll('.feature-card, .product-card, .value-card, .team-member, .info-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// Utility Functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
        color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460'};
        border: 1px solid ${type === 'success' ? '#c3e6cb' : type === 'error' ? '#f5c6cb' : '#bee5eb'};
        border-radius: 5px;
        padding: 15px 20px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;

    // Add animation keyframes
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 10px;
            }
            .notification-close {
                background: none;
                border: none;
                font-size: 18px;
                cursor: pointer;
                padding: 0;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', function() {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Loading Animation for Page Transitions
function showLoading() {
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <p>Loading...</p>
        </div>
    `;
    
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    `;

    const style = document.createElement('style');
    style.textContent = `
        .loader-content {
            text-align: center;
        }
        .loader-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #d35400;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    document.body.appendChild(loader);

    return loader;
}

function hideLoading() {
    const loader = document.getElementById('page-loader');
    if (loader) {
        loader.remove();
    }
}

// Initialize page loading effect
window.addEventListener('beforeunload', function() {
    showLoading();
});

window.addEventListener('load', function() {
    hideLoading();
});

// Back to Top Button
function createBackToTopButton() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.className = 'back-to-top';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #d35400;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transition: all 0.3s ease;
        z-index: 1000;
    `;

    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    backToTop.addEventListener('mouseenter', function() {
        this.style.background = '#e67e22';
        this.style.transform = 'translateY(-2px)';
    });

    backToTop.addEventListener('mouseleave', function() {
        this.style.background = '#d35400';
        this.style.transform = 'translateY(0)';
    });

    document.body.appendChild(backToTop);

    // Show/hide based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });
}

// Initialize back to top button
document.addEventListener('DOMContentLoaded', createBackToTopButton);
