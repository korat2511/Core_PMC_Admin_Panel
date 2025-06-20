/**
 * CORE PMC Admin Panel JavaScript
 * Handles responsive interactions and UI enhancements
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('CORE PMC Admin Panel initialized');
    
    // Initialize sidebar functionality
    initializeSidebar();
    
    // Initialize responsive features
    initializeResponsiveFeatures();
    
    // Initialize tooltips
    initializeTooltips();
});

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

/**
 * Initialize Bootstrap tooltips
 */
function initializeTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

/**
 * Utility function to show loading state
 */
function showLoading(element) {
    if (element) {
        element.innerHTML = '<div class="text-center"><i class="fas fa-spinner fa-spin"></i> Loading...</div>';
    }
}

/**
 * Utility function to show error state
 */
function showError(element, message = 'An error occurred') {
    if (element) {
        element.innerHTML = `
            <div class="text-center text-danger">
                <i class="fas fa-exclamation-triangle"></i>
                <p class="mt-2">${message}</p>
            </div>
        `;
    }
}

/**
 * Utility function to show empty state
 */
function showEmptyState(element, title = 'No Data', message = 'No data available to display') {
    if (element) {
        element.innerHTML = `
            <div class="empty-state text-center">
                <i class="fas fa-inbox fa-3x text-muted mb-3"></i>
                <h5 class="text-muted">${title}</h5>
                <p class="text-muted">${message}</p>
            </div>
        `;
    }
}

/**
 * Smooth scroll to top function
 */
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

/**
 * Format number with commas
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Debounce function for search/filter inputs
 */
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Export functions for global use
window.CorePMCAdmin = {
    showLoading,
    showError,
    showEmptyState,
    scrollToTop,
    formatNumber,
    debounce
};
