// Profile Section Functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Script loaded'); // Debug log

    const profileIcon = document.querySelector('a[href="#profile"]');
    const profileSection = document.querySelector('.profile-section');
    const closeProfileBtn = document.querySelector('.close-profile');

    console.log('Profile icon:', profileIcon); // Debug log
    console.log('Profile section:', profileSection); // Debug log

    // Function to load user data
    function loadUserProfile() {
        // Get user data from localStorage or your backend
        const userData = JSON.parse(localStorage.getItem('userData')) || {
            name: 'Guest User',
            title: 'Not Set',
            projects: 0,
            successStories: 0,
            experience: 0,
            bio: 'Please complete your profile.',
            profileImage: 'images/default-profile.jpg'
        };

        // Update profile content
        document.querySelector('.profile-name').textContent = userData.name;
        document.querySelector('.profile-title').textContent = userData.title;
        document.querySelector('.stat-value:nth-child(1)').textContent = userData.projects;
        document.querySelector('.stat-value:nth-child(2)').textContent = userData.successStories;
        document.querySelector('.stat-value:nth-child(3)').textContent = userData.experience;
        document.querySelector('.profile-bio').textContent = userData.bio;
        
        // Update profile image
        const profileImage = document.querySelector('.profile-avatar img');
        profileImage.src = userData.profileImage;
        profileImage.alt = `${userData.name}'s Profile Picture`;
    }

    // Function to save user data
    function saveUserProfile(userData) {
        localStorage.setItem('userData', JSON.stringify(userData));
        loadUserProfile(); // Reload the profile with new data
    }

    // Open profile section
    profileIcon.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default anchor behavior
        profileSection.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        loadUserProfile(); // Load the latest profile data when opening
    });

    // Close profile section
    closeProfileBtn.addEventListener('click', function() {
        profileSection.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    });

    // Close profile section when clicking outside
    profileSection.addEventListener('click', function(e) {
        if (e.target === profileSection) {
            profileSection.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Handle edit profile button
    const editProfileBtn = document.querySelector('.edit-profile');
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function() {
            const currentData = JSON.parse(localStorage.getItem('userData')) || {};
            
            // Create edit form
            const editForm = `
                <div class="edit-profile-form">
                    <h3>Edit Profile</h3>
                    <input type="text" id="editName" placeholder="Your Name" value="${currentData.name || ''}">
                    <input type="text" id="editTitle" placeholder="Your Title" value="${currentData.title || ''}">
                    <input type="number" id="editProjects" placeholder="Number of Projects" value="${currentData.projects || 0}">
                    <input type="number" id="editSuccess" placeholder="Success Stories" value="${currentData.successStories || 0}">
                    <input type="number" id="editExperience" placeholder="Years of Experience" value="${currentData.experience || 0}">
                    <textarea id="editBio" placeholder="Your Bio">${currentData.bio || ''}</textarea>
                    <input type="file" id="editImage" accept="image/*">
                    <div class="edit-form-buttons">
                        <button class="save-profile">Save Changes</button>
                        <button class="cancel-edit">Cancel</button>
                    </div>
                </div>
            `;

            // Replace profile content with edit form
            const profileContent = document.querySelector('.profile-content');
            profileContent.innerHTML = editForm;

            // Handle save button
            document.querySelector('.save-profile').addEventListener('click', function() {
                const newData = {
                    name: document.getElementById('editName').value,
                    title: document.getElementById('editTitle').value,
                    projects: parseInt(document.getElementById('editProjects').value),
                    successStories: parseInt(document.getElementById('editSuccess').value),
                    experience: parseInt(document.getElementById('editExperience').value),
                    bio: document.getElementById('editBio').value,
                    profileImage: currentData.profileImage // Keep existing image unless changed
                };

                // Handle image upload
                const imageFile = document.getElementById('editImage').files[0];
                if (imageFile) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        newData.profileImage = e.target.result;
                        saveUserProfile(newData);
                        location.reload(); // Reload to show updated profile
                    };
                    reader.readAsDataURL(imageFile);
                } else {
                    saveUserProfile(newData);
                    location.reload(); // Reload to show updated profile
                }
            });

            // Handle cancel button
            document.querySelector('.cancel-edit').addEventListener('click', function() {
                loadUserProfile(); // Reload original profile data
            });
        });
    }
});

