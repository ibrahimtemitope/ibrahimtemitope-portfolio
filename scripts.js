// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Typewriter Effect
const typewriterText = document.querySelector('.typewriter-text');
const typewriterCursor = document.querySelector('.typewriter-cursor');
const words = [
    'Senior Full-Stack Developer',
    'WordPress Expert',
    'Python/Django Specialist',
    'Performance Optimizer',
    'API Developer',
    'Problem Solver'
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeWriter() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typewriterText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typewriterText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 150;
    }
    
    if (!isDeleting && charIndex === currentWord.length) {
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 500;
    }
    
    setTimeout(typeWriter, typingSpeed);
}

// Start typewriter effect
typeWriter();

// Particle.js Configuration
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: ['#00ff88', '#ff0080', '#0088ff']
        },
        shape: {
            type: 'circle',
            stroke: {
                width: 0,
                color: '#000000'
            }
        },
        opacity: {
            value: 0.5,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#00ff88',
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 0.5
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// Scroll Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.about-content, .skill-category, .project-card, .contact-content');
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 255, 136, 0.1)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.9)';
        navbar.style.boxShadow = 'none';
    }
});

// Form handling - Updated with email integration
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    
    // Simple form validation
    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Send to Formspree or similar service
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Using Formspree for form submission
    fetch('https://formspree.io/f/mgvldjen', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            message: message,
            _subject: 'New Contact Form Submission - Ibrahim Portfolio'
        })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Form submission failed');
        }
    })
    .then(data => {
        alert('Message sent successfully! I\'ll get back to you soon.');
        this.reset();
    })
    .catch(error => {
        alert('Error sending message. Please try again or email me directly at hello@ibrahimtemitope.name.ng');
        console.error('Form submission error:', error);
    })
    .finally(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
});

// Skill items hover effect
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(2deg)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Project cards tilt effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
    
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
});

// Dynamic cursor effect
document.addEventListener('mousemove', (e) => {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    cursor.style.position = 'fixed';
    cursor.style.width = '4px';
    cursor.style.height = '4px';
    cursor.style.background = 'var(--accent-primary)';
    cursor.style.borderRadius = '50%';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '9999';
    cursor.style.opacity = '0.8';
    cursor.style.transition = 'all 0.5s ease';
    
    document.body.appendChild(cursor);
    
    setTimeout(() => {
        cursor.style.transform = 'scale(0)';
        cursor.style.opacity = '0';
    }, 100);
    
    setTimeout(() => {
        cursor.remove();
    }, 600);
});

// Easter egg: Konami Code
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg activated!
        document.body.style.animation = 'rainbow 2s infinite';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
        
        // Add rainbow animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        alert('🎉 Easter egg activated! ThePrimeagen would be proud!');
    }
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms - Optimized for performance!`);
    });
}

// Lazy loading for images (if any are added later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add some developer-style commands
const commands = {
    ':q': () => {
        if (confirm('Are you sure you want to quit?')) {
            window.close();
        }
    },
    ':help': () => {
        alert('Available commands:\n:q - Quit\n:help - Show this help\n:w - Save\n:e - Open GitHub\n:projects - View projects');
    },
    ':w': () => {
        alert('💾 "Portfolio saved" (for development purposes only!)');
    },
    ':e': () => {
        window.open('https://github.com/ibrahimtemitope', '_blank');
    },
    ':projects': () => {
        document.querySelector('#projects').scrollIntoView({behavior: 'smooth'});
    }
};

document.addEventListener('keydown', (e) => {
    if (e.key === ':' && e.ctrlKey === false && e.metaKey === false) {
        const command = prompt('Enter command:');
        if (command && commands[command]) {
            commands[command]();
        } else if (command) {
            alert(`Unknown command: ${command}\nType :help for available commands`);
        }
    }
});

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Ibrahim\'s portfolio loaded successfully!');
    console.log('💡 Try pressing ":" for some developer commands!');
    console.log('🎮 Hint: Try the Konami code (↑↑↓↓←→←→BA)...');
    
    // Add current year to footer (optional)
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('.footer-text p');
    if (yearElement) {
        yearElement.innerHTML = `&copy; ${currentYear} Ibrahim Temitope. Built with passion and precision.`;
    }
});

// Add smooth scrolling for all anchor links (including ones added later)
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add scroll to top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--accent-primary);
    color: var(--bg-primary);
    border: none;
    border-radius: 50%;
    font-size: 20px;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px var(--glow-primary);
`;
document.body.appendChild(scrollToTopBtn);

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollToTopBtn.style.display = 'flex';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

// Add animation to skills on hover
document.querySelectorAll('.skill-category').forEach(category => {
    category.addEventListener('mouseenter', function() {
        const items = this.querySelectorAll('.skill-item');
        items.forEach((item, index) => {
            item.style.transitionDelay = `${index * 50}ms`;
            item.style.transform = 'scale(1.05)';
        });
    });
    
    category.addEventListener('mouseleave', function() {
        const items = this.querySelectorAll('.skill-item');
        items.forEach(item => {
            item.style.transitionDelay = '0ms';
            item.style.transform = 'scale(1)';
        });
    });
});

// Add form field animations
document.querySelectorAll('.form-group input, .form-group textarea').forEach(field => {
    field.addEventListener('focus', function() {
        this.parentElement.style.transform = 'translateY(-5px)';
    });
    
    field.addEventListener('blur', function() {
        this.parentElement.style.transform = 'translateY(0)';
    });
});