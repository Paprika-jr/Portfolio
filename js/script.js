// Smooth scrolling for navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

// Add intersection observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
        }
    });
}, observerOptions);

document.querySelectorAll('.container').forEach(el => observer.observe(el));

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