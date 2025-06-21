/**
 * CORE PMC Dashboard JavaScript
 * Handles dashboard interactions and UI enhancements
 */

// Mock data for tasks
const MOCK_TASKS = [
    // Project Alpha: 100 tasks
    ...Array(70).fill({ site: 'Project Alpha', status: 'Active' }),
    ...Array(10).fill({ site: 'Project Alpha', status: 'Completed' }),
    ...Array(15).fill({ site: 'Project Alpha', status: 'Pending' }),
    ...Array(5).fill({ site: 'Project Alpha', status: 'Overdue' }),
    // Project Beta: 80 tasks
    ...Array(50).fill({ site: 'Project Beta', status: 'Active' }),
    ...Array(5).fill({ site: 'Project Beta', status: 'Completed' }),
    ...Array(20).fill({ site: 'Project Beta', status: 'Pending' }),
    ...Array(5).fill({ site: 'Project Beta', status: 'Overdue' }),
    // Project Gamma: 54 tasks
    ...Array(36).fill({ site: 'Project Gamma', status: 'Active' }),
    ...Array(6).fill({ site: 'Project Gamma', status: 'Completed' }),
    ...Array(10).fill({ site: 'Project Gamma', status: 'Pending' }),
    ...Array(2).fill({ site: 'Project Gamma', status: 'Overdue' }),
];

let taskDistributionChartInstance = null;

document.addEventListener('DOMContentLoaded', function() {
    console.log('CORE PMC Dashboard initialized');
    
    // Check authentication first
    checkAuthentication();
    
    // Initialize sidebar functionality
    initializeSidebar();
    
    // Initialize responsive features
    initializeResponsiveFeatures();
    
    // Initialize dashboard features
    initializeDashboard();
    
    // Initialize charts with mock data
    initializeCharts();
    
    // Initialize site filters
    initializeSiteFilters();
});

/**
 * Initialize dashboard specific features
 */
function initializeDashboard() {
    // Set current date
    setCurrentDate();
    
    // Initialize quick action buttons
    initializeQuickActions();
    
    // Populate dashboard with mock data
    populateDashboardData();
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
            day: 'numeric',
            weekday: 'long'
        };
        dateElement.textContent = now.toLocaleDateString('en-US', options);
    }
}

/**
 * Initialize quick action buttons
 */
function initializeQuickActions() {
    const quickActionButtons = document.querySelectorAll('.quick-actions .btn');
    
    quickActionButtons.forEach(button => {
        // Do not add the listener to the 'Create New Site' link
        if (button.textContent.trim() === 'Create New Site') {
            return;
        }

        button.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.textContent.trim();
            
            // Add loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Processing...';
            this.disabled = true;
            
            // Simulate action (replace with actual functionality)
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
                
                // Show success message
                showNotification(`${action} action initiated!`, 'success');
            }, 1500);
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
    
    // Handle logout
    initializeLogout();
}

/**
 * Initialize logout functionality
 */
function initializeLogout() {
    const logoutLinks = document.querySelectorAll('a[href="index.html"]');
    
    logoutLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Clear login state
            localStorage.removeItem('corepmc_logged_in');
            localStorage.removeItem('corepmc_user_email');
            localStorage.removeItem('corepmc_login_time');
            
            // Show logout message
            showNotification('Logging out...', 'info');
            
            // Redirect to login page
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        });
    });
}

/**
 * Check authentication status
 */
function checkAuthentication() {
    const isLoggedIn = localStorage.getItem('corepmc_logged_in');
    const userEmail = localStorage.getItem('corepmc_user_email');
    
    if (!isLoggedIn || !userEmail) {
        // User is not logged in, redirect to login page
        window.location.href = 'index.html';
        return;
    }
    
    // Update user display name
    updateUserDisplay(userEmail);
}

/**
 * Update user display in the header
 */
function updateUserDisplay(email) {
    const userDisplay = document.querySelector('.navbar-nav .nav-link');
    if (userDisplay) {
        const displayName = email.split('@')[0];
        userDisplay.innerHTML = `<i class="fas fa-user-circle me-1"></i> ${displayName.charAt(0).toUpperCase() + displayName.slice(1)}`;
    }
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
    taskDistributionChartInstance = initializeTaskDistributionChart(); // Store instance
    initializeMonthlyProgressChart();
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
            labels: ['Active Sites', 'Completed', 'Pending', 'Overdue'],
            datasets: [{
                data: [32, 8, 3, 2],
                backgroundColor: [
                    '#28a745',
                    '#17a2b8',
                    '#ffc107',
                    '#dc3545'
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
                            size: 11
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
 * Task Distribution Chart
 */
function initializeTaskDistributionChart(data = null) {
    const ctx = document.getElementById('taskDistributionChart');
    if (!ctx) return null;

    const taskData = data || getTaskCounts('all');

    const chartConfig = {
        type: 'bar',
        data: {
            labels: ['Active', 'Completed', 'Pending', 'Overdue'],
            datasets: [{
                label: 'Tasks',
                data: [taskData.active, taskData.completed, taskData.pending, taskData.overdue],
                backgroundColor: [
                    'rgba(40, 167, 69, 0.8)',
                    'rgba(23, 162, 184, 0.8)',
                    'rgba(255, 193, 7, 0.8)',
                    'rgba(220, 53, 69, 0.8)'
                ],
                borderColor: [
                    'rgba(40, 167, 69, 1)',
                    'rgba(23, 162, 184, 1)',
                    'rgba(255, 193, 7, 1)',
                    'rgba(220, 53, 69, 1)'
                ],
                borderWidth: 1,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#f1f5f9'
                    },
                    ticks: {
                        stepSize: 50
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
                    },
            plugins: {
                legend: {
                    display: false
                        }
                    }
                }
    };
    
    if (taskDistributionChartInstance) {
        taskDistributionChartInstance.data.datasets[0].data = [taskData.active, taskData.completed, taskData.pending, taskData.overdue];
        taskDistributionChartInstance.update();
        return taskDistributionChartInstance;
    } else {
        return new Chart(ctx, chartConfig);
    }
}

/**
 * Monthly Progress Chart
 */
function initializeMonthlyProgressChart() {
    const ctx = document.getElementById('monthlyProgressChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Project Progress',
                data: [15, 25, 35, 45, 60, 75],
                borderColor: 'rgba(30, 90, 168, 1)',
                backgroundColor: 'rgba(30, 90, 168, 0.1)',
                borderWidth: 3,
                    fill: true,
                tension: 0.4,
                pointBackgroundColor: 'rgba(30, 90, 168, 1)',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: '#f1f5f9'
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

/**
 * Populate dashboard with mock data
 */
function populateDashboardData() {
    // Populate project statistics
    populateProjectStats();
    
    // Populate recent activities
    populateRecentActivities();
    
    // Populate notifications
    populateNotifications();
}

/**
 * Populate project statistics
 */
function populateProjectStats() {
    const stats = {
        totalProjects: 24,
        activeProjects: 18,
        materialUsage: '75%',
        teamMembers: 45
    };

    updateTaskStatistics(getTaskCounts('all'));
    
    // Update stats in the DOM
    const elements = {
        'totalProjects': document.getElementById('totalProjects'),
        'activeProjects': document.getElementById('activeProjects'),
        'materialUsage': document.getElementById('materialUsage'),
        'teamMembers': document.getElementById('teamMembers'),
    };
    
    Object.keys(elements).forEach(key => {
        if (elements[key] && stats[key]) {
            elements[key].textContent = stats[key];
        }
    });
}

/**
 * Populate recent activities
 */
function populateRecentActivities() {
    const activities = [
        {
            type: 'task',
            message: 'Site inspection completed for Project Alpha',
            time: '2 hours ago',
            icon: 'fas fa-clipboard-check',
            color: 'success'
        },
        {
            type: 'material',
            message: 'New material request approved',
            time: '4 hours ago',
            icon: 'fas fa-cubes',
            color: 'info'
        },
        {
            type: 'user',
            message: 'New team member added to Project Beta',
            time: '6 hours ago',
            icon: 'fas fa-user-plus',
            color: 'primary'
        },
        {
            type: 'report',
            message: 'Weekly progress report generated',
            time: '1 day ago',
            icon: 'fas fa-file-alt',
            color: 'warning'
        },
        {
            type: 'budget',
            message: 'Budget update for Project Gamma',
            time: '2 days ago',
            icon: 'fas fa-dollar-sign',
            color: 'success'
        }
    ];
    
    const activitiesContainer = document.getElementById('recentActivities');
    if (activitiesContainer) {
        activitiesContainer.innerHTML = activities.map(activity => `
            <div class="activity-item">
                <div class="activity-icon bg-${activity.color}">
                    <i class="${activity.icon}"></i>
                </div>
                <div class="activity-content">
                    <div class="activity-message">${activity.message}</div>
                    <div class="activity-time">${activity.time}</div>
                </div>
            </div>
        `).join('');
    }
}

/**
 * Populate notifications
 */
function populateNotifications() {
    const notifications = [
        {
            type: 'warning',
            message: 'Site safety inspection due tomorrow for Project Alpha',
            time: '1 hour ago'
        },
        {
            type: 'info',
            message: 'New material delivery scheduled for Project Beta',
            time: '3 hours ago'
        },
        {
            type: 'success',
            message: 'Project Gamma milestone achieved - Phase 1 completed',
            time: '5 hours ago'
        }
    ];
    
    const notificationsContainer = document.getElementById('notifications');
    if (notificationsContainer) {
        notificationsContainer.innerHTML = notifications.map(notification => `
            <div class="alert alert-${notification.type} alert-dismissible fade show">
                ${notification.message}
                <small class="text-muted d-block mt-1">${notification.time}</small>
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `).join('');
    }
}

function initializeSiteFilters() {
    // --- Task Distribution Chart Filter ---
    const distCard = document.getElementById('task-distribution-card');
    if (distCard) {
        const distDropdownButton = distCard.querySelector('.site-filter-dropdown');
        const distFilterItems = distCard.querySelectorAll('.site-filter-item');

        distFilterItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                distDropdownButton.textContent = this.textContent;
                distFilterItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');
                
                const selectedSite = this.dataset.site;
                const counts = getTaskCounts(selectedSite);
                initializeTaskDistributionChart(counts);
            });
        });
    }

    // --- Task Statistics Filter ---
    const statsCard = document.getElementById('task-statistics-card');
    if (statsCard) {
        const statsDropdownButton = statsCard.querySelector('.site-filter-dropdown');
        const statsFilterItems = statsCard.querySelectorAll('.site-filter-item');

        statsFilterItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                statsDropdownButton.textContent = this.textContent;
                statsFilterItems.forEach(i => i.classList.remove('active'));
                this.classList.add('active');

                const selectedSite = this.dataset.site;
                const counts = getTaskCounts(selectedSite);
                updateTaskStatistics(counts);
            });
        });
    }
}

function updateTaskStatistics(counts) {
    document.getElementById('total-tasks').textContent = counts.total;
    document.getElementById('active-tasks').textContent = counts.active;
    document.getElementById('pending-tasks').textContent = counts.pending;
    document.getElementById('overdue-tasks').textContent = counts.overdue;

    // Update links
    const statsCard = document.getElementById('task-statistics-card');
    const siteFilter = statsCard.querySelector('.site-filter-item.active').dataset.site;
    const siteParam = siteFilter === 'all' ? '' : `&site=${encodeURIComponent(siteFilter)}`;

    document.getElementById('total-tasks-link').href = `tasks.html?status=all${siteParam}`;
    document.getElementById('active-tasks-link').href = `tasks.html?status=Active${siteParam}`;
    document.getElementById('pending-tasks-link').href = `tasks.html?status=Pending${siteParam}`;
    document.getElementById('overdue-tasks-link').href = `tasks.html?status=Overdue${siteParam}`;
}

function getTaskCounts(site) {
    const filteredTasks = site === 'all' ? MOCK_TASKS : MOCK_TASKS.filter(t => t.site === site);
    return {
        total: filteredTasks.length,
        active: filteredTasks.filter(t => t.status === 'Active').length,
        pending: filteredTasks.filter(t => t.status === 'Pending').length,
        overdue: filteredTasks.filter(t => t.status === 'Overdue').length,
        completed: filteredTasks.filter(t => t.status === 'Completed').length,
    };
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