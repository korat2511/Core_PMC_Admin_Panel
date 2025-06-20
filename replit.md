# CORE PMC Frontend

## Overview

CORE PMC is a pure frontend project for a construction project management administrative panel. The application is built with HTML5, CSS3, and JavaScript using Bootstrap 5 for responsive design. Inspired by Powerplay construction management software, it features construction-specific modules for project management, task tracking, material management, labor attendance, and reporting. Currently includes a login page and dashboard with CORE PMC branding and blue color scheme. 

**IMPORTANT: This is frontend-only with no backend functionality - uses simple static file server for development.**

## System Architecture

### Frontend Architecture
- **HTML**: HTML5 semantic structure
- **CSS Framework**: Bootstrap 5.3.2 via CDN
- **Icons**: Font Awesome 6.5.1
- **JavaScript**: Vanilla JavaScript for interactions
- **Styling**: Custom CSS with CSS variables for theming

### Project Structure
```
├── index.html          # Login page
├── static/             # Static assets
│   ├── css/
│   │   └── login.css   # Custom login styling
│   └── js/
│       └── login.js    # Login interactions
└── attached_assets/    # Logo and assets
    └── pmc_logo_*.png  # CORE PMC logo
```

## Key Components

### UI Components
- **Login Page**: Clean, centered login form with email and password fields
- **Dashboard**: Construction project management overview with stats and quick actions
- **Sidebar Navigation**: Modern design with construction-specific modules and notification badges
- **Branding**: CORE PMC logo with blue color scheme matching provided logo
- **Responsive Design**: Mobile-first approach with Bootstrap grid
- **Form Validation**: Client-side validation with visual feedback
- **Interactive Elements**: Password visibility toggle, form animations, hover effects

### Construction Management Features
- **Project Dashboard**: Overview of active projects, pending tasks, workers, and material orders
- **Site Management**: Track multiple construction sites and their progress
- **Task Management**: Assign and monitor construction tasks with status tracking
- **Labor & Attendance**: Digital attendance tracking for construction workers
- **Material Management**: Track material consumption, requests, and deliveries
- **Bills & Purchase Orders**: Manage vendor bills, purchase orders, and GRNs
- **Reports**: Generate daily project reports and labor reports
- **Team Management**: Manage project team members and roles

### Technical Features
- **Email Validation**: Real-time email format validation
- **Password Toggle**: Show/hide password functionality
- **Form Feedback**: Loading states, success/error messages
- **Responsive Layout**: Works on desktop, tablet, and mobile devices
- **Accessibility**: Proper labels, focus states, and keyboard navigation
- **Modern Sidebar**: Gradient backgrounds, smooth animations, and notification badges

## External Dependencies

### CDN Dependencies
- **Bootstrap 5.3.2**: CSS framework for responsive design
- **Font Awesome 6.5.1**: Icon library for UI elements

## Deployment Strategy

### Static Hosting
- **Files**: Pure HTML, CSS, and JavaScript files
- **No Server Required**: Can be hosted on any static hosting service
- **Assets**: All dependencies loaded via CDN for fast loading

## Changelog

```
Changelog:
- June 20, 2025: Initial setup with login page
- June 20, 2025: Added dashboard with construction-themed sidebar design
- June 20, 2025: Fixed tagline from "HONEST" to "HONESTY"
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```