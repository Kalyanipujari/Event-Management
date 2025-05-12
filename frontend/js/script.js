document.addEventListener('DOMContentLoaded', function() {
    // Back to Top Button
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            backToTopButton.style.display = window.pageYOffset > 300 ? 'block' : 'none';
        });
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    registerForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = {
        first_name: document.getElementById('registerFirstName').value,
        last_name: document.getElementById('registerLastName').value,
        email: document.getElementById('registerEmail').value,
        password: document.getElementById('registerPassword').value
    };

    // Email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Confirm password validation
    if (formData.password !== document.getElementById('registerConfirmPassword').value) {
        alert('Passwords do not match!');
        return;
    }

    // Terms agreement validation
    if (!document.getElementById('agreeTerms').checked) {
        alert('You must agree to the Terms of Service and Privacy Policy');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
            alert('Registration successful! Please login.');
            window.location.href = 'login.html';
        } else {
            alert(data.message || 'Registration failed');
        }
    } catch (error) {
        console.error('Registration error:', error);
        alert('An error occurred during registration');
    }
});

    // Toggle Password Visibility
    function setupPasswordToggle(toggleId, inputId) {
        const toggle = document.getElementById(toggleId);
        const input = document.getElementById(inputId);
        if (toggle && input) {
            toggle.addEventListener('click', function() {
                const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                input.setAttribute('type', type);
                const icon = this.querySelector('i');
                if (icon) {
                    icon.classList.toggle('fa-eye');
                    icon.classList.toggle('fa-eye-slash');
                }
            });
        }
    }
    setupPasswordToggle('togglePassword', 'loginPassword');
    setupPasswordToggle('toggleRegisterPassword', 'registerPassword');

    // Password Strength Indicator
    const registerPassword = document.getElementById('registerPassword');
    if (registerPassword) {
        registerPassword.addEventListener('input', function() {
            const strengthIndicator = document.querySelector('.password-strength .progress-bar');
            const strengthText = document.querySelector('.password-strength .fw-bold');
            if (!strengthIndicator || !strengthText) return;
            
            const password = this.value;
            let strength = 0;
            
            // Length check
            if (password.length >= 8) strength += 1;
            if (password.length >= 12) strength += 1;
            
            // Character type checks
            if (/[A-Z]/.test(password)) strength += 1;
            if (/[0-9]/.test(password)) strength += 1;
            if (/[^A-Za-z0-9]/.test(password)) strength += 1;
            
            // Update UI
            let width = 0;
            let color = 'bg-danger';
            let text = 'Weak';
            
            if (strength >= 4) {
                width = 100;
                color = 'bg-success';
                text = 'Strong';
            } else if (strength >= 2) {
                width = 66;
                color = 'bg-warning';
                text = 'Medium';
            } else if (password.length > 0) {
                width = 33;
            }
            
            strengthIndicator.style.width = `${width}%`;
            strengthIndicator.className = `progress-bar ${color}`;
            strengthText.textContent = text;
        });
    }

    // Form Validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!this.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            this.classList.add('was-validated');
        }, false);
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                window.scrollTo({
                    top: targetElement.offsetTop - navbarHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            navbar.classList.toggle('navbar-scrolled', window.pageYOffset > 50);
        });
    }

    // API Base URL
    const API_BASE_URL = 'http://localhost:5000/api/auth';

    // Handle Registration
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = {
                first_name: document.getElementById('registerFirstName').value,
                last_name: document.getElementById('registerLastName').value,
                email: document.getElementById('registerEmail').value,
                password: document.getElementById('registerPassword').value
            };

            // Confirm password validation
            if (formData.password !== document.getElementById('registerConfirmPassword').value) {
                alert('Passwords do not match!');
                return;
            }

            // Terms agreement validation
            if (!document.getElementById('agreeTerms').checked) {
                alert('You must agree to the Terms of Service and Privacy Policy');
                return;
            }

            try {
                const response = await fetch(`${API_BASE_URL}/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (response.ok) {
                    alert('Registration successful! Please login.');
                    window.location.href = 'login.html';
                } else {
                    alert(data.message || 'Registration failed');
                }
            } catch (error) {
                console.error('Registration error:', error);
                alert('An error occurred during registration');
            }
        });
    }

    // Handle Login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = {
                email: document.getElementById('loginEmail').value,
                password: document.getElementById('loginPassword').value
            };

            try {
                const response = await fetch(`${API_BASE_URL}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (response.ok) {
                    // Store authentication data
                    localStorage.setItem('authToken', data.token);
                    localStorage.setItem('user', JSON.stringify(data.user));
                    
                    // Redirect to homepage
                    window.location.href = 'index.html';
                } else {
                    alert(data.message || 'Login failed');
                }
            } catch (error) {
                console.error('Login error:', error);
                alert('An error occurred during login');
            }
        });
    }

    // Authentication Check
    function checkAuth() {
        const token = localStorage.getItem('authToken');
        const user = localStorage.getItem('user');
        const currentPage = window.location.pathname.split('/').pop();
        
        const authPages = ['login.html', 'register.html'];
        const isAuthPage = authPages.includes(currentPage);

        if (!token || !user) {
            // If not logged in and not on auth page, redirect to login
            if (!isAuthPage) {
                window.location.href = 'login.html';
            }
        } else {
            // If logged in but on auth page, redirect to home
            if (isAuthPage) {
                window.location.href = 'index.html';
            }
            
            // Display user info if available
            const userData = JSON.parse(user);
            const welcomeElement = document.getElementById('welcomeMessage');
            if (welcomeElement) {
                welcomeElement.textContent = `Welcome, ${userData.first_name}!`;
            }
        }
    }

    // Logout Functionality
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            window.location.href = 'login.html';
        });
    }

    // Run auth check on page load
    checkAuth();
});

//========================

document.addEventListener('DOMContentLoaded', function() {
    // ... (your existing code)

    // Logout Functionality
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor behavior
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            window.location.href = 'login.html';
        });
    }

    // Update your checkAuth function to handle logout button visibility
    function checkAuth() {
        const token = localStorage.getItem('authToken');
        const user = localStorage.getItem('user');
        const currentPage = window.location.pathname.split('/').pop();
        
        const authPages = ['login.html', 'register.html'];
        const isAuthPage = authPages.includes(currentPage);

        // Get navigation elements
        const logoutButtonContainer = document.getElementById('logoutButtonContainer');
        const loginButton = document.querySelector('a[href="login.html"]')?.parentElement;
        const registerButton = document.querySelector('a[href="register.html"]')?.parentElement;

        if (token && user) {
            // User is logged in
            if (logoutButtonContainer) logoutButtonContainer.style.display = 'block';
            if (loginButton) loginButton.style.display = 'none';
            if (registerButton) registerButton.style.display = 'none';
            
            // If on auth page, redirect to home
            if (isAuthPage) {
                window.location.href = 'index.html';
            }
        } else {
            // User is not logged in
            if (logoutButtonContainer) logoutButtonContainer.style.display = 'none';
            if (loginButton) loginButton.style.display = 'block';
            if (registerButton) registerButton.style.display = 'block';
            
            // If not on auth page, redirect to login
            if (!isAuthPage && currentPage !== 'index.html') {
                window.location.href = 'login.html';
            }
        }
        
        // Display user info if available
        if (token && user) {
            const userData = JSON.parse(user);
            const welcomeElement = document.getElementById('welcomeMessage');
            if (welcomeElement) {
                welcomeElement.textContent = `Welcome, ${userData.first_name}!`;
            }
        }
    }

    // Run auth check on page load
    checkAuth();
});