/**
 * CORE PMC Login Page JavaScript
 * Handles login form interactions and validation
 */

// Demo credentials for testing
const DEMO_CREDENTIALS = {
    'admin@corepmc.com': 'admin123'
};

document.addEventListener('DOMContentLoaded', function() {
    console.log('CORE PMC Login Page initialized');
    
    // Initialize login form
    initializeLoginForm();
    
    // Initialize password toggle
    initializePasswordToggle();
    
    // Check if user is already logged in
    checkLoginStatus();
});

/**
 * Check if user is already logged in
 */
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('corepmc_logged_in');
    const userEmail = localStorage.getItem('corepmc_user_email');
    
    if (isLoggedIn && userEmail) {
        // User is already logged in, redirect to dashboard
        window.location.href = 'dashboard.html';
    }
}

/**
 * Initialize login form functionality
 */
function initializeLoginForm() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const submitButton = loginForm.querySelector('button[type="submit"]');
    
    // Form submission handler
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset previous validation states
        clearValidationStates();
        
        // Get form data
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        
        // Validate inputs
        if (!validateEmail(email)) {
            showFieldError(emailInput, 'Please enter a valid email address');
            return;
        }
        
        if (!validatePassword(password)) {
            showFieldError(passwordInput, 'Password is required');
            return;
        }
        
        // Show loading state
        showLoadingState(submitButton);
        
        // Simulate login process
        setTimeout(() => {
            hideLoadingState(submitButton);
            
            // Check demo credentials
            if (authenticateUser(email, password)) {
                // Store login state
                localStorage.setItem('corepmc_logged_in', 'true');
                localStorage.setItem('corepmc_user_email', email);
                localStorage.setItem('corepmc_login_time', new Date().toISOString());
                
            showSuccess('Login successful! Redirecting...');
            
            // Redirect to dashboard after successful login
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
            } else {
                showError('Invalid email or password. Please try again.');
                
                // Show demo credentials hint
                showDemoCredentialsHint();
            }
        }, 1500);
    });
    
    // Real-time validation
    emailInput.addEventListener('blur', function() {
        const email = this.value.trim();
        if (email && !validateEmail(email)) {
            showFieldError(this, 'Please enter a valid email address');
        } else {
            clearFieldError(this);
        }
    });
    
    passwordInput.addEventListener('blur', function() {
        const password = this.value;
        if (!password) {
            showFieldError(passwordInput, 'Password is required');
        } else {
            clearFieldError(passwordInput);
        }
    });
    
    // Clear errors on input
    emailInput.addEventListener('input', function() {
        clearFieldError(this);
    });
    
    passwordInput.addEventListener('input', function() {
        clearFieldError(this);
    });
}

/**
 * Authenticate user with demo credentials
 */
function authenticateUser(email, password) {
    return DEMO_CREDENTIALS[email] === password;
}

/**
 * Show demo credentials hint
 */
function showDemoCredentialsHint() {
    const hintHtml = `
        <div class="alert alert-info mt-3">
            <h6><i class="fas fa-info-circle me-2"></i>Demo Credentials:</h6>
            <small>
                <strong>Admin:</strong> admin@corepmc.com / admin123
            </small>
        </div>
    `;
    
    const loginCard = document.querySelector('.login-card');
    const existingHint = loginCard.querySelector('.alert-info');
    
    if (!existingHint) {
        loginCard.insertAdjacentHTML('beforeend', hintHtml);
    }
}

/**
 * Initialize password toggle functionality
 */
function initializePasswordToggle() {
    const toggleButton = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');
    
    toggleButton.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        const icon = this.querySelector('i');
        if (type === 'password') {
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        } else {
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        }
    });
}

/**
 * Validate email format
 */
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate password
 */
function validatePassword(password) {
    return password && password.length > 0;
}

/**
 * Show field error
 */
function showFieldError(field, message) {
    field.classList.add('is-invalid');
    field.classList.remove('is-valid');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.invalid-feedback');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

/**
 * Clear field error
 */
function clearFieldError(field) {
    field.classList.remove('is-invalid');
    const errorDiv = field.parentNode.querySelector('.invalid-feedback');
    if (errorDiv) {
        errorDiv.remove();
    }
}

/**
 * Clear all validation states
 */
function clearValidationStates() {
    const fields = document.querySelectorAll('.form-control');
    fields.forEach(field => {
        field.classList.remove('is-invalid', 'is-valid');
    });
    
    const errorMessages = document.querySelectorAll('.invalid-feedback');
    errorMessages.forEach(msg => msg.remove());
}

/**
 * Show loading state on button
 */
function showLoadingState(button) {
    button.disabled = true;
    button.classList.add('btn-loading');
    button.setAttribute('data-original-text', button.innerHTML);
}

/**
 * Hide loading state on button
 */
function hideLoadingState(button) {
    button.disabled = false;
    button.classList.remove('btn-loading');
    const originalText = button.getAttribute('data-original-text');
    if (originalText) {
        button.innerHTML = originalText;
        button.removeAttribute('data-original-text');
    }
}

/**
 * Show success message
 */
function showSuccess(message) {
    // Create and show success alert
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success alert-dismissible fade show';
    alertDiv.innerHTML = `
        <i class="fas fa-check-circle me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const loginCard = document.querySelector('.login-card');
    loginCard.insertBefore(alertDiv, loginCard.firstChild);
    
    // Auto dismiss after 3 seconds
    setTimeout(() => {
        if (alertDiv && alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 3000);
}

/**
 * Show error message
 */
function showError(message) {
    // Create and show error alert
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-danger alert-dismissible fade show';
    alertDiv.innerHTML = `
        <i class="fas fa-exclamation-triangle me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const loginCard = document.querySelector('.login-card');
    loginCard.insertBefore(alertDiv, loginCard.firstChild);
    
    // Auto dismiss after 5 seconds
    setTimeout(() => {
        if (alertDiv && alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// Export functions for global use
window.CorePMCLogin = {
    validateEmail,
    validatePassword,
    showSuccess,
    showError,
    showLoadingState,
    hideLoadingState
};