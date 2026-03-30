// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');

if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        const icon = this.querySelector('i');
        if (mainNav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// Close mobile menu when clicking links
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        if (mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// Header aur Canada Banner Scroll Effect
const header = document.getElementById('mainHeader');
const canadaBanner = document.querySelector('.canada-banner');
const scrollToTopBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    
    // Canada Banner: Jab scroll karen to hide ho jaye
    if (scrollPosition > 100) {
        canadaBanner.classList.add('hidden');
        header.classList.add('scrolled');
    } else {
        canadaBanner.classList.remove('hidden');
        header.classList.remove('scrolled');
    }
    
    // Scroll to top button
    if (scrollPosition > 500) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            
            // Calculate header height for offset
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission with Formspree
const estimateForm = document.getElementById('estimateForm');
if (estimateForm) {
    estimateForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validation
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const service = document.getElementById('service').value;
        const city = document.getElementById('city').value;
        if (!name || !phone || !service || !city) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Send to Formspree
        const formData = new FormData(estimateForm);
        try {
            const response = await fetch('https://formspree.io/f/xwvwlkvz', {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });
            if (response.ok) {
                alert('Thank you! Your request has been sent. We will contact you soon.');
                estimateForm.reset();
            } else {
                const errorData = await response.json();
                alert('Oops! Something went wrong: ' + (errorData.error || 'Please try again later.'));
            }
        } catch (error) {
            alert('Network error. Please check your connection.');
        }
    });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', function() {
    console.log('GreenTech Kitchen & Bath website loaded successfully!');
});