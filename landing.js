document.addEventListener('DOMContentLoaded', function() {
    // Modal elements
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const joinJourneyBtn = document.getElementById('joinJourneyBtn');
    const closeButtons = document.getElementsByClassName('close-modal');
    const switchToSignup = document.querySelector('.switch-to-signup');
    const switchToLogin = document.querySelector('.switch-to-login');
    
    // Form elements
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    // Open login modal
    loginBtn.onclick = function() {
        loginModal.classList.add('show');
    }
    
    // Open signup modal
    signupBtn.onclick = function() {
        signupModal.classList.add('show');
    }
    
    // Open signup modal from Join Journey button
    joinJourneyBtn.onclick = function() {
        signupModal.classList.add('show');
    }
    
    // Close modals
    Array.from(closeButtons).forEach(button => {
        button.onclick = function() {
            loginModal.classList.remove('show');
            signupModal.classList.remove('show');
        }
    });
    
    // Close modals when clicking outside
    window.onclick = function(event) {
        if (event.target == loginModal) {
            loginModal.classList.remove('show');
        }
        if (event.target == signupModal) {
            signupModal.classList.remove('show');
        }
    }
    
    // Switch between login and signup
    switchToSignup.onclick = function(e) {
        e.preventDefault();
        loginModal.classList.remove('show');
        signupModal.classList.add('show');
    }
    
    switchToLogin.onclick = function(e) {
        e.preventDefault();
        signupModal.classList.remove('show');
        loginModal.classList.add('show');
    }
    
    // Handle form submissions
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(loginForm);
        
        fetch('login.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message);
                window.location.href = 'index.html'; // Redirect to dashboard after successful login
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred during login');
        });
    });
    
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(signupForm);
        
        fetch('signup.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(data.message);
                window.location.href = 'index.html'; // Redirect to index.html after successful signup
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred during signup');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Skip if it's a modal trigger
            if (this.id === 'loginBtn' || this.id === 'signupBtn' || this.id === 'joinJourneyBtn') {
                return;
            }
            
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
}); 