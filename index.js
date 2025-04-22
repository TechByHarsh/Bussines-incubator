// Toggle form overlay
function toggleForm() {
    const formOverlay = document.getElementById('formOverlay');
    formOverlay.style.display = formOverlay.style.display === 'flex' ? 'none' : 'flex';
    document.body.style.overflow = formOverlay.style.display === 'flex' ? 'hidden' : 'auto';
}

// Close form when clicking outside
document.addEventListener('DOMContentLoaded', function() {
    const formOverlay = document.getElementById('formOverlay');
    const closeBtn = document.querySelector('.close-btn');
    
    // Handle Join Journey button click
    const joinJourneyBtn = document.querySelector('.join-journey-btn');
    if (joinJourneyBtn) {
        joinJourneyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            toggleForm();
        });
    }

    // Handle Join the Community Now button click in Learn More section
    const joinCommunityBtn = document.querySelector('.join-community-btn');
    if (joinCommunityBtn) {
        joinCommunityBtn.addEventListener('click', function(e) {
            e.preventDefault();
            toggleForm();
        });
    }
    
    closeBtn.addEventListener('click', function() {
        toggleForm();
    });
    
    formOverlay.addEventListener('click', function(e) {
        if (e.target === formOverlay) {
            toggleForm();
        }
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

// Navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// Success Stories Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get modal elements
    const successStoriesModal = document.getElementById('successStoriesModal');
    const closeStoriesBtn = document.querySelector('.close-stories');
    const storiesContainer = document.querySelector('.stories-container');
    const storiesWrapper = document.querySelector('.stories-wrapper');
    const meetStartupsBtn = document.getElementById('meetStartupsBtn');
    const prevBtn = document.querySelector('.stories-nav .prev');
    const nextBtn = document.querySelector('.stories-nav .next');
    const storyCards = document.querySelectorAll('.story-card');

    // Open modal when clicking the button
    if (meetStartupsBtn) {
        meetStartupsBtn.addEventListener('click', function() {
            successStoriesModal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
            startAutoScroll();
        });
    }

    // Close modal when clicking the close button
    if (closeStoriesBtn) {
        closeStoriesBtn.addEventListener('click', function() {
            successStoriesModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore background scrolling
            stopAutoScroll();
        });
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === successStoriesModal) {
            successStoriesModal.style.display = 'none';
            document.body.style.overflow = 'auto';
            stopAutoScroll();
        }
    });

    // Auto-scroll the stories container
    let isAutoScrolling = false;

    function startAutoScroll() {
        if (isAutoScrolling) return;
        isAutoScrolling = true;
        
        // Reset animation
        storiesWrapper.style.animation = 'none';
        storiesWrapper.offsetHeight; // Trigger reflow
        storiesWrapper.style.animation = 'slideStories 60s linear infinite';
    }

    function stopAutoScroll() {
        isAutoScrolling = false;
        storiesWrapper.style.animation = 'none';
    }

    // Pause animation on hover for each card
    storyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (isAutoScrolling) {
                storiesWrapper.style.animationPlayState = 'paused';
            }
        });

        card.addEventListener('mouseleave', function() {
            if (isAutoScrolling) {
                storiesWrapper.style.animationPlayState = 'running';
            }
        });
    });

    // Manual navigation
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            stopAutoScroll();
            storiesWrapper.style.transform = `translateX(${parseInt(storiesWrapper.style.transform.replace('translateX(', '').replace('%)', '') || 0) + 20}%)`;
        });

        nextBtn.addEventListener('click', function() {
            stopAutoScroll();
            storiesWrapper.style.transform = `translateX(${parseInt(storiesWrapper.style.transform.replace('translateX(', '').replace('%)', '') || 0) - 20}%)`;
        });
    }
});

// Signup Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const signupBtn = document.querySelector('.signup-btn');
    const signupModal = document.getElementById('signupModal');
    const closeSignupBtn = document.querySelector('.close-signup');
    const switchToLoginBtn = document.querySelector('.switch-to-login');
    const loginModal = document.getElementById('loginModal');

    // Open signup modal
    signupBtn.addEventListener('click', function(e) {
        e.preventDefault();
        signupModal.style.display = 'flex';
        signupModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close signup modal
    closeSignupBtn.addEventListener('click', function() {
        signupModal.style.display = 'none';
        signupModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === signupModal) {
            signupModal.style.display = 'none';
            signupModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Switch to login modal
    if (switchToLoginBtn) {
        switchToLoginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            signupModal.style.display = 'none';
            signupModal.classList.remove('active');
            loginModal.style.display = 'flex';
        });
    }

    // Form submission
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your form submission logic here
            console.log('Form submitted');
            // You can add API calls or other functionality here
            
            // Optional: Close the modal after successful submission
            signupModal.style.display = 'none';
            signupModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    }
});

// Program Detail Modals Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all program cards
    const programCards = document.querySelectorAll('.program-card');
    
    // Add click event to each "Learn More" link
    programCards.forEach(card => {
        const learnMoreLink = card.querySelector('.learn-more');
        if (learnMoreLink) {
            learnMoreLink.addEventListener('click', function(e) {
                e.preventDefault();
                const programType = card.querySelector('h3').textContent.toLowerCase();
                const modal = document.getElementById(`${programType}Modal`);
                if (modal) {
                    modal.style.display = 'flex';
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        }
    });

    // Close program modals
    const closeButtons = document.querySelectorAll('.close-program');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.program-modal');
            modal.style.display = 'none';
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('program-modal')) {
            e.target.style.display = 'none';
            e.target.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Handle Apply Now buttons
    const applyButtons = document.querySelectorAll('.apply-now-btn');
    applyButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Close the program modal
            const programModal = this.closest('.program-modal');
            programModal.style.display = 'none';
            programModal.classList.remove('active');
            
            // Show the Join Journey form
            toggleForm();
        });
    });
});

// Handle form submission
const applicationForm = document.querySelector('#application-form');
if (applicationForm) {
    applicationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        emailjs.sendForm('service_guigx4e', 'template_ej87zmm', this)
            .then(function(response) {
                alert("Application submitted successfully!");
                applicationForm.reset();
                toggleForm(); // Close the form after successful submission
            }, function(error) {
                alert("Failed to submit application: " + JSON.stringify(error));
            });
    });
}

// Program detail modals
const programCards = document.querySelectorAll('.program-card');
const programModals = document.querySelectorAll('.program-modal');
const closeModalBtns = document.querySelectorAll('.close-modal');

programCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        programModals[index].style.display = 'flex';
    });
});

closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('.program-modal').style.display = 'none';
    });
});

// Handle Apply Now button clicks in modals
const applyNowBtns = document.querySelectorAll('.apply-now-btn');
applyNowBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        // Close the program modal
        this.closest('.program-modal').style.display = 'none';
        // Show the Join Journey form
        toggleForm();
    });
});

// Remove the Profile Section Functionality
document.addEventListener('DOMContentLoaded', function() {
    const profileBtn = document.querySelector('.profile-btn');
    const profileOverlay = document.querySelector('.profile-overlay');
    const closeProfileBtn = document.querySelector('.close-profile-btn');
    const photoUpload = document.querySelector('.photo-upload input[type="file"]');
    const profilePhoto = document.querySelector('.photo-upload img');
    const progressTracker = document.querySelector('.progress-tracker');
    const milestones = document.querySelectorAll('.milestone');

    // Open profile section
    function openProfile() {
        profileOverlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Close profile section
    function closeProfile() {
        profileOverlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Handle photo upload
    function handlePhotoUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profilePhoto.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }

    // Update progress tracker
    function updateProgress() {
        const stages = document.querySelectorAll('.stage');
        let activeStage = 0;

        stages.forEach((stage, index) => {
            const stageNumber = stage.querySelector('.stage-number');
            if (stageNumber.textContent <= activeStage) {
                stage.classList.add('active');
            } else {
                stage.classList.remove('active');
            }
        });
    }

    // Toggle milestone completion
    function toggleMilestone(milestone) {
        milestone.classList.toggle('completed');
        const status = milestone.querySelector('.milestone-status');
        status.textContent = milestone.classList.contains('completed') ? 'Completed' : 'In Progress';
    }

    // Event Listeners
    document.querySelector('.profile-btn').addEventListener('click', openProfile);
    closeProfileBtn.addEventListener('click', closeProfile);
    photoUpload.addEventListener('change', handlePhotoUpload);

    milestones.forEach(milestone => {
        milestone.addEventListener('click', () => toggleMilestone(milestone));
    });

    // Close profile when clicking outside
    profileOverlay.addEventListener('click', (e) => {
        if (e.target === profileOverlay) {
            closeProfile();
        }
    });

    // Initialize progress
    updateProgress();
});

// Handle file uploads
const fileInputs = document.querySelectorAll('input[type="file"]');
fileInputs.forEach(input => {
  input.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      const preview = input.closest('.photo-upload').querySelector('img');
      
      reader.onload = (e) => {
        preview.src = e.target.result;
      };
      
      reader.readAsDataURL(file);
    }
  });
});

// Handle form submissions
const settingsForms = document.querySelectorAll('.settings-form');
settingsForms.forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your form submission logic here
    alert('Settings updated successfully!');
  });
});

// Handle milestone toggles
const milestoneToggles = document.querySelectorAll('.milestone');
milestoneToggles.forEach(toggle => {
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('completed');
  });
});

// Handle stage changes
const stages = document.querySelectorAll('.stage');
stages.forEach(stage => {
  stage.addEventListener('click', () => {
    stages.forEach(s => s.classList.remove('active'));
    stage.classList.add('active');
  });
});