// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Scroll Progress & Navbar
const progressBar = document.querySelector('.scroll-progress');
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = docH > 0 ? (scrollTop / docH) * 100 : 0;
    if (progressBar) progressBar.style.width = scrolled + '%';
    if (navbar) {
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
            navbar.style.background = 'rgba(10,10,10,0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0,255,136,0.08)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.background = 'rgba(10,10,10,0.85)';
            navbar.style.boxShadow = 'none';
        }
    }
});

// Typewriter Effect - Honest & Modern
const typewriterText = document.querySelector('.typewriter-text');
const words = [
    'Founder & Full-Stack Engineer',
    'AI Security Researcher',
    'Builder of Tasknory LTD',
    'Rust & Decentralized Systems',
    'Python • Django • Supabase',
    'Available for your team'
];
let wordIndex = 0, charIndex = 0, isDeleting = false, typingSpeed = 110;
function typeWriter() {
    if (!typewriterText) return;
    const currentWord = words[wordIndex];
    if (isDeleting) {
        typewriterText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--; typingSpeed = 45;
    } else {
        typewriterText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++; typingSpeed = 120;
    }
    if (!isDeleting && charIndex === currentWord.length) {
        typingSpeed = 2000; isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false; wordIndex = (wordIndex + 1) % words.length; typingSpeed = 500;
    }
    setTimeout(typeWriter, typingSpeed);
}
typeWriter();

// Particles
if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
        particles: {
            number: { value: 70, density: { enable: true, value_area: 900 } },
            color: { value: ['#00ff88', '#ff0080', '#0088ff'] },
            shape: { type: 'circle' },
            opacity: { value: 0.35, random: true, anim: { enable: true, speed: 0.8, opacity_min: 0.1, sync: false } },
            size: { value: 2.5, random: true, anim: { enable: true, speed: 1.5, size_min: 0.1, sync: false } },
            line_linked: { enable: true, distance: 140, color: '#00ff88', opacity: 0.15, width: 1 },
            move: { enable: true, speed: 1.4, direction: 'none', out_mode: 'out' }
        },
        interactivity: {
            detect_on: 'canvas',
            events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' }, resize: true },
            modes: { grab: { distance: 140, line_linked: { opacity: 0.4 } }, push: { particles_nb: 3 } }
        },
        retina_detect: true
    });
}

// Scroll Animation
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, observerOptions);
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.about-content, .skill-category, .project-card, .contact-content, .press-card');
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    // Count animation for stats
    document.querySelectorAll('.stat-number[data-count]').forEach(el => {
        const target = parseInt(el.getAttribute('data-count'));
        let cur = 0;
        const inc = Math.max(1, Math.floor(target / 20));
        const int = setInterval(() => {
            cur += inc;
            if (cur >= target) { el.textContent = target; clearInterval(int); }
            else el.textContent = cur;
        }, 80);
    });
});

// Form handling - enabled, sends to Formspree, fallback to mailto
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const name = (formData.get('name')||'').toString().trim();
        const email = (formData.get('email')||'').toString().trim();
        const message = (formData.get('message')||'').toString().trim();
        if (!name || !email || !message) { alert('Please fill in all fields'); return; }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) { alert('Please enter a valid email'); return; }
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        fetch('https://formspree.io/f/mgvldjen', {
            method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ name, email, message, _subject: 'Portfolio Contact — Ibrahim Temitope' })
        })
        .then(response => {
            if (response.ok) return response.json();
            throw new Error('Failed');
        })
        .then(() => {
            alert('Message sent! I’ll reply within hours at ibrosok123@gmail.com');
            contactForm.reset();
        })
        .catch(() => {
            // fallback to mailto
            window.location.href = `mailto:ibrosok123@gmail.com?subject=Portfolio Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent(message + "\n\nFrom: " + name + " <" + email + ">")}`;
            alert('Opening your email app — or email me directly at ibrosok123@gmail.com');
        })
        .finally(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
    });
}

// Skill hover
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', function(){ this.style.transform = 'scale(1.08) rotate(1deg)'; });
    item.addEventListener('mouseleave', function(){ this.style.transform = 'scale(1) rotate(0deg)'; });
});

// Project tilt + spotlight
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', function(e){
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left; const y = e.clientY - rect.top;
        const cx = rect.width/2, cy = rect.height/2;
        const rx = (y - cy)/12, ry = (cx - x)/12;
        this.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', function(){ this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)'; });
});

// Magnetic buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e)=>{
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width/2;
        const y = e.clientY - r.top - r.height/2;
        btn.style.transform = `translate(${x*0.15}px, ${y*0.25}px) translateY(-1px)`;
    });
    btn.addEventListener('mouseleave', ()=>{ btn.style.transform = ''; });
});

// Cursor trail - subtle
let lastTrail = 0;
document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastTrail < 40) return; lastTrail = now;
    const c = document.createElement('div');
    c.style.cssText = `position:fixed; left:${e.clientX}px; top:${e.clientY}px; width:5px; height:5px; background: #00ff88; border-radius:50%; pointer-events:none; z-index:9999; opacity:0.7; transition: all 0.5s ease;`;
    document.body.appendChild(c);
    requestAnimationFrame(()=>{ c.style.transform='scale(0)'; c.style.opacity='0'; });
    setTimeout(()=>c.remove(), 600);
});

// Scroll to top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `position:fixed; bottom:24px; right:24px; width:44px; height:44px; background: var(--accent-primary); color:#000; border:none; border-radius:50%; font-size:16px; cursor:pointer; display:none; align-items:center; justify-content:center; z-index:1000; box-shadow:0 6px 20px rgba(0,255,136,0.3);`;
document.body.appendChild(scrollToTopBtn);
scrollToTopBtn.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));
window.addEventListener('scroll', ()=>{ scrollToTopBtn.style.display = window.scrollY > 500 ? 'flex' : 'none'; });

// Keyboard: Esc closes menu, : for easter egg
document.addEventListener('keydown', (e)=>{
    if(e.key==='Escape' && navMenu.classList.contains('active')){ hamburger.classList.remove('active'); navMenu.classList.remove('active'); }
});

// Easter egg & dev commands
let konami = []; const seq=[38,38,40,40,37,39,37,39,66,65];
document.addEventListener('keydown', (e)=>{
    konami.push(e.keyCode); if(konami.length>seq.length) konami.shift();
    if(konami.join(',')===seq.join(',')){
        document.body.style.animation='rainbow 2s infinite';
        const s=document.createElement('style'); s.textContent='@keyframes rainbow{0%{filter:hue-rotate(0deg)}100%{filter:hue-rotate(360deg)}}';
        document.head.appendChild(s);
        setTimeout(()=>document.body.style.animation='',5000);
        alert('🎉 Konami! Tasknory founder knows easter eggs too!');
    }
});
const commands={ ':q':()=>confirm('Quit portfolio?')&&window.close(), ':help':()=>alert('Commands: :q quit, :help, :w save, :e github, :projects'), ':w':()=>alert('💾 Portfolio saved!'), ':e':()=>window.open('https://github.com/ibrahimtemitope','_blank'), ':projects':()=>document.querySelector('#projects').scrollIntoView({behavior:'smooth'}) };
document.addEventListener('keydown', (e)=>{
    if(e.key===':' && !e.ctrlKey && !e.metaKey){
        const cmd=prompt('Command:'); if(cmd && commands[cmd]) commands[cmd](); else if(cmd) alert(`Unknown: ${cmd} — :help`);
    }
});

// Init
document.addEventListener('DOMContentLoaded', ()=>{
    console.log('%c🚀 Ibrahim Temitope (Kolade) — Founder, Tasknory LTD', 'color:#00ff88; font-weight:bold; font-size:14px');
    console.log('AKHI • GhostGrid 155k Rust • Predator • Tasknory LTD — Featured in Techpoint Africa');
    console.log('Contact: ibrosok123@gmail.com • +2348167470605 • x.com/IbrahimKol');
    const y = document.querySelector('.footer-text p');
    if(y) y.innerHTML = `© ${new Date().getFullYear()} Ibrahim Temitope (Kolade). Built with passion in Abeokuta. <span class="footer-brag">Tasknory LTD • AKHI • GhostGrid • Predator</span>`;
});
