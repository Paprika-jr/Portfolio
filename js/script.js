// ===== LOADING SCREEN =====
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1000);
    }
    // Initialize Lucide icons
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
    }
    // Initialize EmailJS
    if (window.emailjs && typeof window.emailjs.init === 'function') {
        window.emailjs.init('5qMk8E1EWHnM9UeUy');
    }
});

// ===== ENHANCED SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Staggered animation for project cards
            if (entry.target.classList.contains('project-card')) {
                const cards = document.querySelectorAll('.project-card');
                const index = Array.from(cards).indexOf(entry.target);
                entry.target.style.animationDelay = `${index * 0.2}s`;
            }
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in, .project-card').forEach(el => {
    observer.observe(el);
});

// Smooth scrolling for ALL internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            // Close mobile menu if open
            const hamburger = document.getElementById('hamburger');
            const navMenu = document.getElementById('navMenu');
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
            
            // Smooth scroll to target
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Generate floating musical notes
const musicNotes = document.getElementById('musicNotes');
const notes = ['♪', '♫', '♬', '♩', '𝄞'];

function createNote() {
    const note = document.createElement('div');
    note.className = 'note';
    note.textContent = notes[Math.floor(Math.random() * notes.length)];
    note.style.left = Math.random() * 100 + '%';
    note.style.animationDuration = (Math.random() * 10 + 10) + 's';
    note.style.animationDelay = Math.random() * 5 + 's';
    note.style.fontSize = (Math.random() * 20 + 20) + 'px';
    musicNotes.appendChild(note);

    // Remove note after animations
    setTimeout(() => {
        note.remove();
    }, 20000);
}

// Create initial notes
for (let i = 0; i < 15; i++) {
    createNote();
}

// Continuously add new notes
setInterval(createNote, 2000);

// ===== ENHANCED MICRO-INTERACTIONS =====
// Add ripple effect to buttons
document.querySelectorAll('.cv-btn, .secondary-btn, .contact-btn, .project-link').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .cv-btn, .secondary-btn, .contact-btn, .project-link {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Highlight active section in navigation
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Email copy to clipboard functionality
const emailBtn = document.querySelector('.email-btn');
const copyNotification = document.getElementById('copyNotification');

if (emailBtn) {
    emailBtn.addEventListener('click', function() {
        const email = this.getAttribute('data-email');
        
        // Copy to clipboard
        navigator.clipboard.writeText(email).then(() => {
            // Show notification
            copyNotification.classList.add('show');
            
            // Hide notification after 3 seconds
            setTimeout(() => {
                copyNotification.classList.remove('show');
            }, 3000);
        }).catch(err => {
            console.error('Failed to copy email: ', err);
            // Fallback: show email in alert
            alert('Email: ' + email);
        });
    });
}

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ===== ENHANCED INTERACTIVE FEATURES =====
// Add typing animation to profile name
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Add parallax effect to profile picture
window.addEventListener('scroll', () => {
    const profilePic = document.querySelector('.profile-pic');
    if (profilePic) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        profilePic.style.transform = `translateY(${rate}px)`;
    }
});

// Add floating animation to skill tags
document.querySelectorAll('.skill-tag').forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.1}s`;
    tag.addEventListener('mouseenter', function() {
        this.style.animationPlayState = 'paused';
    });
    tag.addEventListener('mouseleave', function() {
        this.style.animationPlayState = 'running';
    });
});

// Add enhanced hover effects to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02) rotateX(5deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1) rotateX(0deg)';
    });
});

// Add smooth reveal animation to sections
const sections = document.querySelectorAll('section');
const revealSection = function(entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    
    entry.target.classList.add('section-revealed');
    observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Add CSS for section reveal
const sectionStyle = document.createElement('style');
sectionStyle.textContent = `
    section {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s ease;
    }
    
    section.section-revealed {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(sectionStyle);

// ===== CURSOR TRAIL EFFECT =====
let mouseX = 0, mouseY = 0;
let trail = [];

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Create trail element
    const trailElement = document.createElement('div');
    trailElement.className = 'cursor-trail';
    trailElement.style.left = mouseX + 'px';
    trailElement.style.top = mouseY + 'px';
    document.body.appendChild(trailElement);
    
    // Remove after animation
    setTimeout(() => {
        trailElement.remove();
    }, 1000);
});

// Add CSS for cursor trail
const trailStyle = document.createElement('style');
trailStyle.textContent = `
    .cursor-trail {
        position: fixed;
        width: 4px;
        height: 4px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: trailFade 1s ease-out forwards;
    }
    
    @keyframes trailFade {
        0% {
            opacity: 1;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0);
        }
    }
`;
document.head.appendChild(trailStyle);

// ===== CONTACT FORM LOGIC =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const subject = document.getElementById('subject');
        const message = document.getElementById('message');
        const status = document.getElementById('formStatus');

        let valid = true;
        const setError = (field, msg) => {
            const small = contactForm.querySelector(`[data-error-for="${field.id}"]`);
            if (small) small.textContent = msg || '';
        };

        // Reset errors
        [name, email, subject, message].forEach(f => setError(f, ''));

        if (!name.value.trim()) { setError(name, 'Please enter your name'); valid = false; }
        if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            setError(email, 'Please enter a valid email'); valid = false;
        }
        if (!subject.value.trim()) { setError(subject, 'Please add a subject'); valid = false; }
        if (!message.value.trim() || message.value.trim().length < 10) {
            setError(message, 'Message should be at least 10 characters'); valid = false;
        }

        if (!valid) return;

        // Prefer EmailJS if available
        if (window.emailjs && typeof window.emailjs.send === 'function') {
            status.textContent = 'Sending...';
            window.emailjs.send('service_f9s3am7', 'template_g1qhmrh', {
                from_name: name.value,
                from_email: email.value,
                subject: subject.value,
                message: message.value,
                to_email: 'hlin14046@gmail.com'
            }).then(() => {
                status.textContent = 'Message sent! I’ll get back to you soon.';
                contactForm.reset();
            }).catch(() => {
                status.textContent = 'Sending failed. Opening your email client as a fallback...';
                const mailto = `mailto:hlin14046@gmail.com?subject=${encodeURIComponent(subject.value)}&body=${encodeURIComponent(`From: ${name.value} <${email.value}>\n\n${message.value}`)}`;
                window.location.href = mailto;
            });
        } else {
            const mailto = `mailto:hlin14046@gmail.com?subject=${encodeURIComponent(subject.value)}&body=${encodeURIComponent(`From: ${name.value} <${email.value}>\n\n${message.value}`)}`;
            status.textContent = 'Opening your email client...';
            window.location.href = mailto;
            setTimeout(() => { status.textContent = 'If nothing opened, your email client may be blocked by the browser.'; }, 1500);
        }
    });
}