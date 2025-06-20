# CORE PMC Admin Panel

## Overview

CORE PMC is a Flask-based web application designed as an administrative panel. The application follows a simple server-side rendered architecture using Flask with Bootstrap 5 for the frontend. It's currently in early development stage with basic routing and template structure in place.

## System Architecture

### Backend Architecture
- **Framework**: Flask 3.1.1 with Python 3.11
- **Server**: Gunicorn for production deployment
- **Database**: Prepared for PostgreSQL integration (psycopg2-binary included)
- **ORM**: Flask-SQLAlchemy ready for database operations
- **Validation**: Email validation capabilities built-in

### Frontend Architecture
- **Template Engine**: Jinja2 (Flask's default)
- **CSS Framework**: Bootstrap 5.3.2 via CDN
- **Icons**: Font Awesome 6.5.1
- **JavaScript**: Vanilla JavaScript for admin panel interactions
- **Styling**: Custom CSS with CSS variables for theming

### Project Structure
```
├── app.py              # Main Flask application
├── main.py             # Entry point for Gunicorn
├── templates/          # HTML templates
│   └── index.html      # Main dashboard template
├── static/             # Static assets
│   ├── css/
│   │   └── admin.css   # Custom styling
│   └── js/
│       └── admin.js    # Frontend interactions
└── pyproject.toml      # Python dependencies
```

## Key Components

### Application Layer
- **Flask App**: Core application with session management and routing
- **Routes**: Basic dashboard and index routes implemented
- **Templates**: Responsive admin panel template with sidebar navigation
- **Static Assets**: Custom CSS and JavaScript for enhanced UI/UX

### Security Features
- Session secret key configuration via environment variables
- Development fallback for session management

### UI Components
- **Navigation**: Fixed top navbar with user dropdown
- **Sidebar**: Collapsible navigation with submenu support
- **Responsive Design**: Mobile-first approach with Bootstrap grid
- **Branding**: CORE PMC logo with custom styling and tagline

## Data Flow

Currently, the application follows a simple request-response pattern:
1. User requests a route (/ or /dashboard)
2. Flask processes the request through the routing system
3. Template is rendered with Jinja2
4. Static assets (CSS/JS) are served for frontend functionality
5. Response is returned to the user

Note: Database integration is prepared but not yet implemented.

## External Dependencies

### Production Dependencies
- **Flask**: Web framework and templating
- **Flask-SQLAlchemy**: Database ORM (ready for integration)
- **Gunicorn**: WSGI HTTP Server for production
- **psycopg2-binary**: PostgreSQL adapter
- **email-validator**: Email validation utilities

### CDN Dependencies
- **Bootstrap 5.3.2**: CSS framework for responsive design
- **Font Awesome 6.5.1**: Icon library for UI elements

### System Dependencies
- **PostgreSQL**: Database server (configured in Nix)
- **OpenSSL**: Security library

## Deployment Strategy

### Development Environment
- **Runtime**: Python 3.11 via Nix modules
- **Channels**: Stable Nix channel (24_05)
- **Development Server**: Flask development server with debug mode
- **Hot Reload**: Enabled for development workflow

### Production Environment
- **Deployment Target**: Autoscale deployment on Replit
- **Server**: Gunicorn with multiple worker processes
- **Binding**: 0.0.0.0:5000 for external access
- **Process Management**: Reuse port and reload capabilities

### Workflow Configuration
- **Run Button**: Configured to start the full application
- **Development Mode**: Parallel workflow execution
- **Port Management**: Automatic port waiting (5000)

## Changelog

```
Changelog:
- June 20, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```