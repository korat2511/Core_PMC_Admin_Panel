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

/**
 * Initialize all dashboard charts
 */
function initializeCharts() {
    initializeSiteProgressChart();
    initializeTaskDistributionChart();
    initializeMonthlyProgressChart();
    initializeTeamPerformanceChart();
}

/**
 * Site Progress Doughnut Chart
 */
function initializeSiteProgressChart() {
    const ctx = document.getElementById('siteProgressChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Completed', 'In Progress', 'Pending', 'On Hold'],
            datasets: [{
                data: [156, 89, 23, 11],
                backgroundColor: [
                    '#10b981', // Green
                    '#3b82f6', // Blue
                    '#f59e0b', // Amber
                    '#ef4444'  // Red
                ],
                borderWidth: 0,
                cutout: '70%'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        font: {
                            size: 12,
                            family: 'Inter'
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

/**
 * Task Distribution Bar Chart
 */
function initializeTaskDistributionChart() {
    const ctx = document.getElementById('taskDistributionChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Pending', 'Active', 'Overdue', 'Completed'],
            datasets: [{
                label: 'Tasks',
                data: [623, 365, 47, 343],
                backgroundColor: [
                    '#f59e0b', // Amber
                    '#3b82f6', // Blue
                    '#ef4444', // Red
                    '#10b981'  // Green
                ],
                borderRadius: 8,
                borderSkipped: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    titleFont: {
                        family: 'Inter'
                    },
                    bodyFont: {
                        family: 'Inter'
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#f1f5f9'
                    },
                    ticks: {
                        font: {
                            family: 'Inter'
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            family: 'Inter'
                        }
                    }
                }
            }
        }
    });
}

/**
 * Monthly Progress Line Chart
 */
function initializeMonthlyProgressChart() {
    const ctx = document.getElementById('monthlyProgressChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [
                {
                    label: 'Completed Projects',
                    data: [12, 19, 15, 25, 22, 30],
                    borderColor: '#10b981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Active Projects',
                    data: [8, 12, 18, 15, 20, 25],
                    borderColor: '#3b82f6',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        font: {
                            family: 'Inter'
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#f1f5f9'
                    },
                    ticks: {
                        font: {
                            family: 'Inter'
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        font: {
                            family: 'Inter'
                        }
                    }
                }
            }
        }
    });
}

/**
 * Team Performance Radar Chart
 */
function initializeTeamPerformanceChart() {
    const ctx = document.getElementById('teamPerformanceChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: ['Quality', 'Speed', 'Communication', 'Innovation', 'Teamwork'],
            datasets: [{
                label: 'Team Average',
                data: [85, 92, 78, 88, 90],
                borderColor: '#667eea',
                backgroundColor: 'rgba(102, 126, 234, 0.2)',
                pointBackgroundColor: '#667eea',
                pointBorderColor: '#ffffff',
                pointRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        font: {
                            family: 'Inter'
                        }
                    }
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: '#f1f5f9'
                    },
                    pointLabels: {
                        font: {
                            family: 'Inter',
                            size: 11
                        }
                    },
                    ticks: {
                        display: false
                    }
                }
            }
        }
    });
}

// Export functions for global use
window.CorePMCDashboard = {
    initializeSidebar,
    initializeResponsiveFeatures,
    handleResponsiveLayout,
    initializeDashboard,
    showNotification,
    initializeCharts
};