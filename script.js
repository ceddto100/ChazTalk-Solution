/**
 * ChazTalk AI Website JavaScript
 * Handles all interactive elements and functionality
 */

// Form Submission Handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const company = document.getElementById('company').value;
        const message = document.getElementById('message').value;
        
        // Validate form
        if (!name || !email || !message) {
            alert('Please fill out all required fields.');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            submitBtn.textContent = 'Request Sent!';
            submitBtn.style.backgroundColor = 'var(--success)';
            
            // Reset form
            contactForm.reset();
            
            // Display success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you for your interest! Our team will contact you shortly.';
            contactForm.appendChild(successMessage);
            
            // Reset button after delay
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.backgroundColor = '';
            }, 3000);
        }, 1500);
    });
}

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const nav = document.getElementById('nav');

mobileMenuBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// Sticky Header
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('nav a, .hero-buttons a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        }
    });
});

// Testimonial Slider
const testimonialTrack = document.querySelector('.testimonial-track');
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const prevBtn = document.getElementById('testimonial-prev');
const nextBtn = document.getElementById('testimonial-next');
let currentSlide = 0;
const slideCount = testimonialSlides.length;

function goToSlide(index) {
    if (index < 0) index = slideCount - 1;
    if (index >= slideCount) index = 0;
    
    testimonialTrack.style.transform = `translateX(-${index * 100}%)`;
    currentSlide = index;
}

prevBtn.addEventListener('click', () => {
    goToSlide(currentSlide - 1);
});

nextBtn.addEventListener('click', () => {
    goToSlide(currentSlide + 1);
});

// Auto-advance testimonials
let autoSlideInterval = setInterval(() => {
    goToSlide(currentSlide + 1);
}, 6000);

// Pause auto-advancement when user interacts with slider
document.querySelector('.testimonial-slider').addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

document.querySelector('.testimonial-slider').addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
    }, 6000);
});

// Initialize slider
goToSlide(0);

// Pricing Calculator
const calculateBtn = document.getElementById('calculate-btn');
const estimatedMinutes = document.getElementById('estimated-minutes');
const planSelect = document.getElementById('plan');
const costResult = document.getElementById('cost-result');

function calculateCost() {
    if (!estimatedMinutes || !planSelect || !costResult) return;
    
    const minutes = parseFloat(estimatedMinutes.value) || 0;
    const ratePerMinute = parseFloat(planSelect.value) || 0;
    
    if (minutes <= 0) {
        alert('Please enter a valid number of minutes.');
        return;
    }
    
    const monthlyCost = minutes * ratePerMinute;
    costResult.textContent = `$${monthlyCost.toFixed(2)}`;
    
    // Add animation to highlight the result
    const resultContainer = document.getElementById('calculator-result');
    resultContainer.style.animation = 'none';
    setTimeout(() => {
        resultContainer.style.animation = 'pulse 0.5s';
    }, 10);
}

// Add keypress event for Enter key
if (estimatedMinutes) {
    estimatedMinutes.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            calculateCost();
        }
    });
}

// Calculate button click event
if (calculateBtn) {
    calculateBtn.addEventListener('click', calculateCost);
}

// Auto-calculate on plan change
if (planSelect) {
    planSelect.addEventListener('change', calculateCost);
}

// Calculate initial value
document.addEventListener('DOMContentLoaded', function() {
    calculateCost();
});

// Add scroll reveal animation
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

function revealOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .pricing-card, .journey-step, .testimonial-card');
    
    elements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            el.classList.add('revealed');
        }
    });
}

// Add CSS for animation
const style = document.createElement('style');
style.innerHTML = `
.feature-card, .pricing-card, .journey-step, .testimonial-card {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}
.feature-card.revealed, .pricing-card.revealed, .journey-step.revealed, .testimonial-card.revealed {
    opacity: 1;
    transform: translateY(0);
}
`;
document.head.appendChild(style);

function calculateROI() {
  const X = parseInt(document.getElementById('calls').value, 10) || 0;
  const M = parseFloat(document.getElementById('minutes').value) || 0;
  const R = parseFloat(document.getElementById('revenue').value) || 0;
  const plan = document.getElementById('plan').value;

  const TotalMinutes = X * M;
  let Cost = 0;
  if (plan === 'hourly') {
    Cost = TotalMinutes * 0.65;
  } else {
    if (TotalMinutes <= 300) {
      Cost = 150;
    } else {
      Cost = 150 + (TotalMinutes - 300) * 0.20;
    }
  }
  const Revenue = X * R;
  const ROI = Cost === 0 ? 0 : ((Revenue - Cost) / Cost) * 100;

  // Results display
  document.getElementById('result-minutes').textContent = TotalMinutes.toLocaleString();
  document.getElementById('result-cost').textContent = '$' + Cost.toFixed(2);
  document.getElementById('result-revenue').textContent = '$' + Revenue.toFixed(2);
  const roiElem = document.getElementById('result-roi');
  roiElem.textContent = ROI.toFixed(1) + '%';
  roiElem.style.color = ROI >= 0 ? 'green' : 'red';

  // ROI bar
  const roiBar = document.getElementById('roi-bar');
  let roiPercent = Math.max(-100, Math.min(ROI, 100)); // Clamp for visual
  roiBar.style.width = Math.abs(roiPercent) + '%';
  roiBar.style.background = ROI >= 0 ? 'linear-gradient(90deg, #00c853 0%, #009624 100%)' : 'linear-gradient(90deg, #d50000 0%, #b71c1c 100%)';

  document.getElementById('roiResults').style.display = 'block';
}

// Optional: Update on input change for live update
['calls', 'minutes', 'revenue', 'plan'].forEach(id => {
  document.getElementById(id).addEventListener('input', calculateROI);
});
