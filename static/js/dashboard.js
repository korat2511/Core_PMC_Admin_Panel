/**
 * CORE PMC Dashboard JavaScript
 * Handles dashboard interactions and UI enhancements
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('CORE PMC Dashboard initialized');
    
    // Initialize sidebar functionality
    initializeSidebar();
    
    // Initialize responsive features
    initializeResponsiveFeatures();
    
    // Initialize dashboard features
    initializeDashboard();
});

/**
 * Initialize dashboard specific features
 */
function initializeDashboard() {
    // Set current date
    setCurrentDate();
    
    // Initialize quick action buttons
    initializeQuickActions();
}

/**
 * Set current date in header
 */
function setCurrentDate() {
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        const now = new Date();
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric'
        };
        dateElement.textContent = now.toLocaleDateString('en-US', options);
    }
}

/**
 * Initialize quick action buttons
 */
function initializeQuickActions() {
    const quickActionButtons = document.querySelectorAll('.quick-action-card .btn');
    
    quickActionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.textContent.trim();
            
            // Add loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>Loading...';
            this.disabled = true;
            
            // Simulate action (replace with actual functionality)
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
                
                // Show success message (you can customize this)
                showNotification(`${action} clicked!`, 'info');
            }, 1000);
        });
    });
}

/**
 * Show notification (simple implementation)
 */
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 80px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (notification && notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

/**
 * Initialize sidebar navigation functionality
 */
function initializeSidebar() {
    // Handle active navigation states
    const navLinks = document.querySelectorAll('.sidebar .nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Don't prevent default for links with data-bs-toggle
            if (!this.hasAttribute('data-bs-toggle')) {
                // Remove active class from all nav links
                navLinks.forEach(nav => nav.classList.remove('active'));
                
                // Add active class to clicked link
                this.classList.add('active');
            }
        });
    });
    
    // Handle submenu toggle
    const submenuToggles = document.querySelectorAll('[data-bs-toggle="collapse"]');
    submenuToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const icon = this.querySelector('.fa-chevron-down');
            if (icon) {
                // Toggle the rotation of the chevron icon
                setTimeout(() => {
                    const targetId = this.getAttribute('data-bs-target');
                    const target = document.querySelector(targetId);
                    if (target && target.classList.contains('show')) {
                        icon.style.transform = 'rotate(180deg)';
                    } else {
                        icon.style.transform = 'rotate(0deg)';
                    }
                }, 50);
            }
        });
    });
}

/**
 * Initialize responsive features
 */
function initializeResponsiveFeatures() {
    // Handle window resize
    window.addEventListener('resize', function() {
        handleResponsiveLayout();
    });
    
    // Initial layout check
    handleResponsiveLayout();
    
    // Close offcanvas sidebar when clicking on main content on mobile
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.addEventListener('click', function() {
            if (window.innerWidth < 992) {
                const sidebar = document.querySelector('#sidebar');
                if (sidebar) {
                    const offcanvas = bootstrap.Offcanvas.getInstance(sidebar);
                    if (offcanvas) {
                        offcanvas.hide();
                    }
                }
            }
        });
    }
}

/**
 * Handle responsive layout adjustments
 */
function handleResponsiveLayout() {
    const sidebar = document.querySelector('#sidebar');
    
    if (window.innerWidth >= 992) {
        // Desktop: ensure sidebar is always visible
        if (sidebar) {
            const offcanvas = bootstrap.Offcanvas.getInstance(sidebar);
            if (offcanvas) {
                offcanvas.hide();
            }
        }
    }
}

// Export functions for global use
window.CorePMCDashboard = {
    initializeSidebar,
    initializeResponsiveFeatures,
    handleResponsiveLayout,
    initializeDashboard,
    showNotification
};