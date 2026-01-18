// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.about-card, .project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s, transform 0.5s';
    observer.observe(card);
});

// Update status randomly (for demo effect)
function updateStatus() {
    const statuses = document.querySelectorAll('.status');
    statuses.forEach(status => {
        if(Math.random() > 0.7) {
            const states = ['active', 'building', 'pending'];
            const current = status.classList[1];
            let newState;
            do {
                newState = states[Math.floor(Math.random() * states.length)];
            } while(newState === current);
            
            status.className = 'status ' + newState;
            status.textContent = newState.charAt(0).toUpperCase() + newState.slice(1);
        }
    });
}

// Update every 5 seconds
setInterval(updateStatus, 5000);

// Display current time in footer
function updateDateTime() {
    const now = new Date();
    const dateTimeStr = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    const timeElement = document.querySelector('.footer-time');
    if(timeElement) {
        timeElement.textContent = `Last updated: ${dateTimeStr}`;
    }
}

// Add time element to footer if it doesn't exist
if(!document.querySelector('.footer-time')) {
    const footer = document.querySelector('footer .container');
    const timeElement = document.createElement('p');
    timeElement.className = 'footer-time';
    footer.appendChild(timeElement);
    updateDateTime();
    setInterval(updateDateTime, 60000);
}

console.log('Portfolio website loaded successfully! 🚀');
