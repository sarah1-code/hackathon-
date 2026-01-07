// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeMenu.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (mobileMenu.classList.contains('active') && 
        !mobileMenu.contains(e.target) && 
        e.target !== menuToggle) {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Tab functionality
const tabs = document.querySelectorAll('.tab');
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Here you would typically filter products based on the tab
        // For now, we'll just show a console message
        console.log(`Showing ${tab.textContent} products`);
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Close mobile menu if open
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Calculate position (account for fixed header)
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header shadow on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// Animate elements on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements to animate
document.querySelectorAll('.product-card, .feature-item, .stat, .step').forEach(el => {
    observer.observe(el);
});

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    .product-card,
    .feature-item,
    .stat,
    .step {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .product-card.animate-in,
    .feature-item.animate-in,
    .stat.animate-in,
    .step.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .product-card:nth-child(1).animate-in { transition-delay: 0.1s; }
    .product-card:nth-child(2).animate-in { transition-delay: 0.2s; }
    .product-card:nth-child(3).animate-in { transition-delay: 0.3s; }
    .feature-item:nth-child(1).animate-in { transition-delay: 0.1s; }
    .feature-item:nth-child(2).animate-in { transition-delay: 0.2s; }
    .feature-item:nth-child(3).animate-in { transition-delay: 0.3s; }
    .feature-item:nth-child(4).animate-in { transition-delay: 0.4s; }
`;
document.head.appendChild(style);

// Form validation for sign in (placeholder)
const signInForm = document.querySelector('#signin form');
if (signInForm) {
    signInForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = signInForm.querySelector('input[type="email"]');
        const password = signInForm.querySelector('input[type="password"]');
        
        if (!email.value || !password.value) {
            alert('Please fill in all fields');
            return;
        }
        
        // Here you would typically make an API call
        console.log('Sign in attempt:', email.value);
        alert('Sign in functionality would be implemented here');
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Add any initialization code here
    console.log('Entrepedia website loaded');
    
    // Auto-hide mobile menu on resize to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992 && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});