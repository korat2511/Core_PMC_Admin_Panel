# Core Panel Manager - Admin Frontend

This repository contains the frontend for Core Panel Manager, a modern and responsive web application for managing construction projects. It is built with HTML, CSS, and JavaScript, utilizing the Bootstrap 5 framework for a clean and professional user interface.

This is a **frontend-only prototype** and uses mock data for demonstration purposes. It is not connected to a live backend.

## ✨ Features

*   **Authentication**: Simple email/password login screen (mock authentication).
*   **Interactive Dashboard**: A central hub with KPI cards, site progress charts, and statistics that can be filtered by a specific site.
*   **Quick Actions**: Easily accessible buttons on the dashboard to create new sites or tasks.
*   **Site Management**:
    *   A dedicated "Sites" page to view all projects.
    *   Search and filter functionality by status and date.
    *   Grid and list view toggles.
    *   Simple pagination for browsing sites.
*   **Task Management**:
    *   A comprehensive "Tasks" page with a powerful, searchable, and sortable table powered by **DataTables.js**.
    *   Filtering by task status.
    *   Links from dashboard statistics to pre-filtered task lists.
*   **Task Profile**: A detailed view for each task, including progress bars, user assignments, a project timeline, and an image gallery.
*   **User Management**:
    *   A "Users" page to view all team members with pagination.
    *   An attendance calendar modal to view user check-in/out data.
    *   An interactive map (Leaflet.js) to show check-in locations relative to the site.
*   **User Profile**: A detailed user profile page with an "Edit Profile" modal.
*   **Create Site Page**: A dedicated form to create a new project site with details like name, client, dates, and multiple photo uploads with previews.
*   **Responsive Design**: The entire application is built to be responsive and works across desktop, tablet, and mobile devices.

## 🛠️ Tech Stack

*   **HTML5**
*   **CSS3**
*   **JavaScript (ES6+)**
*   **Bootstrap 5**: Core UI framework.
*   **Chart.js**: For interactive charts on the dashboard.
*   **DataTables.js**: For advanced table features on the Tasks page.
*   **Swiper.js**: For the image gallery on the Task Profile page.
*   **Leaflet.js**: For the interactive map on the Users page.
*   **Font Awesome**: For icons.

## 🚀 Getting Started

To run this project locally, you need a simple HTTP server to avoid CORS errors when loading local files.

### Prerequisites

*   [Node.js](https://nodejs.org/) and npm (for the local server).

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/korat2511/Cpre_PMC_Admin_Panel.git
    cd Cpre_PMC_Admin_Panel
    ```

2.  **Install `http-server` globally** (if you don't have it):
    ```bash
    npm install -g http-server
    ```

3.  **Start the server:**
    ```bash
    http-server
    ```

4.  **Open your browser** and navigate to `http://127.0.0.1:8080` (or the URL provided by `http-server`).

### Demo Login

*   **Email**: `admin@corepmc.com`
*   **Password**: `admin123`

## 📂 Project Structure

```
CorePanelManager/
├── index.html              # Login page
├── dashboard.html          # Main dashboard
├── sites.html              # All sites page
├── create-site.html        # Create new site page
├── tasks.html              # All tasks page
├── task-profile.html       # Single task details page
├── users.html              # All users page
├── user-profile.html       # Single user details page
├── static/
│   ├── css/                # All custom CSS files
│   └── js/                 # All custom JavaScript files
├── package.json            # Project dependencies
└── README.md               # This file
```


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
