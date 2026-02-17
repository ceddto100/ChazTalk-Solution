/**
 * ChazTalk - Conversational AI for Everyone
 * Handles all interactive elements and functionality
 */

// ============================================
// Hero Wave Canvas Animation
// ============================================
(function initHeroWaves() {
    const canvas = document.getElementById('hero-wave-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    function resize() {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
    }

    function drawWave(yBase, amplitude, frequency, speed, color) {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);

        for (let x = 0; x <= canvas.width; x += 2) {
            const y = yBase +
                Math.sin((x * frequency) + (time * speed)) * amplitude +
                Math.sin((x * frequency * 0.5) + (time * speed * 0.7)) * (amplitude * 0.5);
            ctx.lineTo(x, y);
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        time += 0.008;

        const baseY = canvas.height * 0.55;

        // Layer 1 - deepest, slowest
        drawWave(baseY + 40, 25, 0.003, 0.6, 'rgba(37, 99, 235, 0.04)');
        // Layer 2
        drawWave(baseY + 20, 20, 0.004, 0.8, 'rgba(14, 165, 233, 0.03)');
        // Layer 3
        drawWave(baseY, 15, 0.005, 1.0, 'rgba(59, 130, 246, 0.03)');
        // Layer 4 - foreground, fastest
        drawWave(baseY - 10, 12, 0.006, 1.2, 'rgba(37, 99, 235, 0.02)');

        animationId = requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    resize();
    animate();

    // Cleanup on page unload
    window.addEventListener('beforeunload', function() {
        cancelAnimationFrame(animationId);
    });
})();

// ============================================
// Mobile Menu Toggle
// ============================================
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const nav = document.getElementById('nav');

if (mobileMenuBtn && nav) {
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
}

// ============================================
// Sticky Header
// ============================================
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (header) {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// ============================================
// Smooth Scrolling for Navigation Links
// ============================================
document.querySelectorAll('nav a, .hero-buttons a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (!targetId || !targetId.startsWith('#')) return;

        e.preventDefault();
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (nav && nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        }
    });
});

// ============================================
// Testimonial Slider
// ============================================
const testimonialTrack = document.querySelector('.testimonial-track');
const testimonialSlides = document.querySelectorAll('.testimonial-slide');
const prevBtn = document.getElementById('testimonial-prev');
const nextBtn = document.getElementById('testimonial-next');
let currentSlide = 0;
const slideCount = testimonialSlides.length;

function goToSlide(index) {
    if (index < 0) index = slideCount - 1;
    if (index >= slideCount) index = 0;

    if (testimonialTrack) {
        testimonialTrack.style.transform = `translateX(-${index * 100}%)`;
    }
    currentSlide = index;
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        goToSlide(currentSlide - 1);
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        goToSlide(currentSlide + 1);
    });
}

// Auto-advance testimonials
let autoSlideInterval = setInterval(() => {
    goToSlide(currentSlide + 1);
}, 6000);

const sliderEl = document.querySelector('.testimonial-slider');
if (sliderEl) {
    sliderEl.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    sliderEl.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(() => {
            goToSlide(currentSlide + 1);
        }, 6000);
    });
}

// Initialize slider
goToSlide(0);

// ============================================
// Scroll Reveal Animation
// ============================================
function revealOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .pricing-card, .card, .testimonial-card');

    elements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            el.classList.add('revealed');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Add CSS for scroll reveal animation
const style = document.createElement('style');
style.innerHTML = `
.feature-card, .pricing-card, .card, .testimonial-card {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}
.feature-card.revealed, .pricing-card.revealed, .card.revealed, .testimonial-card.revealed {
    opacity: 1;
    transform: translateY(0);
}
`;
document.head.appendChild(style);

// ============================================
// ROI Calculator
// ============================================
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
    roiElem.style.color = ROI >= 0 ? '#10b981' : '#ef4444';

    // ROI bar
    const roiBar = document.getElementById('roi-bar');
    if (roiBar) {
        let roiPercent = Math.max(-100, Math.min(ROI, 100));
        roiBar.style.width = Math.abs(roiPercent) + '%';
        roiBar.style.background = ROI >= 0
            ? 'linear-gradient(90deg, #10b981 0%, #059669 100%)'
            : 'linear-gradient(90deg, #ef4444 0%, #dc2626 100%)';
    }

    document.getElementById('roiResults').style.display = 'block';
}

// Calculate button click handler
const calculateBtn = document.getElementById('calculateBtn');
if (calculateBtn) {
    calculateBtn.addEventListener('click', calculateROI);
}

// Live update on input change
['calls', 'minutes', 'revenue', 'plan'].forEach(id => {
    const elem = document.getElementById(id);
    if (elem) {
        elem.addEventListener('input', calculateROI);
    }
});

// Show example ROI results on load
document.addEventListener('DOMContentLoaded', function() {
    const roiResults = document.getElementById('roiResults');
    if (roiResults) {
        roiResults.style.display = 'block';
        document.getElementById('result-minutes').textContent = '500';
        document.getElementById('result-cost').textContent = '$260.00';
        document.getElementById('result-revenue').textContent = '$585.00';
        var roiElem = document.getElementById('result-roi');
        roiElem.textContent = '125.0%';
        roiElem.style.color = '#10b981';
        var roiBar = document.getElementById('roi-bar');
        if (roiBar) {
            roiBar.style.width = '100%';
            roiBar.style.background = 'linear-gradient(90deg, #10b981 0%, #059669 100%)';
        }
    }
});
