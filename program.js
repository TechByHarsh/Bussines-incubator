// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation to program cards on hover
const programCards = document.querySelectorAll('.program-card');
programCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Button click animations
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
});

// Learn More button functionality
document.querySelectorAll('.learn-more').forEach(button => {
    button.addEventListener('click', function() {
        // Remove the alert message
        // Just scroll to the programs section
        const programsSection = document.getElementById('programs');
        if (programsSection) {
            programsSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Apply Now button functionality
document.querySelector('.apply-now').addEventListener('click', function() {
    // Open the modal directly instead of showing an alert
    const modal = document.getElementById('applicationModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
});

// Add scroll-based header transparency
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(45, 55, 72, 0.9)';
    } else {
        header.style.backgroundColor = 'var(--secondary-color)';
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
});

// Application Form Modal Functionality
const modal = document.getElementById('applicationModal');
const applyNowBtn = document.querySelector('.apply-now');
const closeModalBtn = document.querySelector('.close-modal');
const cancelBtn = document.querySelector('.cancel-btn');
const applicationForm = document.getElementById('applicationForm');

// Open modal when Apply Now button is clicked
applyNowBtn.addEventListener('click', () => {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
});

// Close modal functions
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

closeModalBtn.addEventListener('click', closeModal);
cancelBtn.addEventListener('click', closeModal);

// Close modal when clicking outside the modal content
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Handle form submission
applicationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(applicationForm);
    const formValues = Object.fromEntries(formData.entries());
    
    // Here you would typically send the data to your server
    console.log('Form submitted with values:', formValues);
    
    // Show success message
    alert('Thank you for your application! We will review it and get back to you soon.');
    
    // Reset form and close modal
    applicationForm.reset();
    closeModal();
});

// Add input validation
const inputs = applicationForm.querySelectorAll('input, select, textarea');
inputs.forEach(input => {
    input.addEventListener('invalid', (e) => {
        e.preventDefault();
        input.classList.add('invalid');
    });
    
    input.addEventListener('input', () => {
        if (input.validity.valid) {
            input.classList.remove('invalid');
        }
    });
}); 