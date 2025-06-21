# CORE PMC - Project Management System

A modern, responsive project management system built with HTML, CSS, and JavaScript. This is a frontend-only application designed for construction and project management companies.

## 🚀 Features

- **Modern UI/UX**: Clean, professional design with Bootstrap 5
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Interactive Dashboard**: Real-time charts and statistics
- **User Authentication**: Demo login system with localStorage
- **Project Management**: Comprehensive project tracking interface
- **Material Management**: Track materials and inventory
- **Team Management**: User and team coordination tools
- **Reporting**: Built-in reporting and analytics

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **UI Framework**: Bootstrap 5
- **Icons**: Font Awesome 6
- **Charts**: Chart.js
- **Fonts**: Google Fonts (Inter)

## 📋 Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Node.js (optional, for development server)
- Git (for cloning the repository)

## 🚀 Quick Start

### Option 1: Simple HTTP Server (Recommended)

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd CorePanelManager
   ```

2. **Install dependencies** (if using Node.js)
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Option 2: Python HTTP Server

If you have Python installed:

```bash
# Python 3
python -m http.server 3000

# Python 2
python -m SimpleHTTPServer 3000
```

Then open `http://localhost:3000` in your browser.

### Option 3: Direct File Opening

Simply open `index.html` in your web browser. However, some features may not work due to CORS restrictions.

## 🔐 Demo Credentials

Use these credentials to test the application:

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@corepmc.com` | `admin123` |

## 📱 Application Structure

```
CorePanelManager/
├── index.html              # Login page
├── dashboard.html          # Main dashboard
├── static/
│   ├── css/
│   │   ├── login.css       # Login page styles
│   │   ├── dashboard.css   # Dashboard styles
│   │   └── admin.css       # Admin styles
│   └── js/
│       ├── login.js        # Login functionality
│       ├── dashboard.js    # Dashboard functionality
│       └── admin.js        # Admin functionality
├── attached_assets/        # Images and assets
├── package.json           # Node.js dependencies
└── README.md             # This file
```

## 🎯 Key Features

### Dashboard
- **Project Overview**: Real-time project statistics
- **Interactive Charts**: Progress tracking and analytics
- **Quick Actions**: Fast access to common tasks
- **Recent Activities**: Latest project updates
- **Notifications**: Important alerts and reminders

### Navigation
- **Responsive Sidebar**: Collapsible navigation menu
- **Breadcrumb Navigation**: Easy page navigation
- **Search Functionality**: Quick project and task search

### User Management
- **Session Management**: Persistent login state
- **User Profiles**: Individual user settings
- **Role-based Access**: Different permission levels

## 🔧 Customization

### Adding New Pages
1. Create a new HTML file in the root directory
2. Add corresponding CSS in `static/css/`
3. Add JavaScript functionality in `static/js/`
4. Update navigation links in the sidebar

### Styling
- Main color scheme is defined in CSS variables
- Bootstrap 5 classes are used for layout and components
- Custom styles are in the respective CSS files

### Data
- Currently uses mock data for demonstration
- Can be easily connected to a backend API
- localStorage is used for session management

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support or questions, please contact the development team.

---

**CORE PMC** - Integrity | Transparency | Honesty 