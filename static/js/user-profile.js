document.addEventListener('DOMContentLoaded', () => {

    // NOTE: In a real application, this data would be fetched from an API
    // or loaded from a shared JavaScript module. For this static prototype,
    // we are including it directly. This is a temporary solution.
    const SITES_DATA = [
        { id: 'project-alpha', name: 'Project Alpha', latitude: 34.0522, longitude: -118.2437 },
        { id: 'project-beta', name: 'Project Beta', latitude: 40.7128, longitude: -74.0060 },
        { id: 'project-gamma', name: 'Project Gamma', latitude: 34.0522, longitude: -118.2437 },
        { id: 'project-delta', name: 'Project Delta', latitude: 34.0522, longitude: -118.2437 }
    ];

    function generateDynamicAttendance(siteId, siteLat, siteLon) {
        const attendance = [];
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();

        for (let i = 1; i < today.getDate(); i++) {
            const currentDate = new Date(year, month, i);
            const dayOfWeek = currentDate.getDay();
            if (dayOfWeek === 0 || dayOfWeek === 6) continue;

            if (Math.random() > 0.3) {
                const onSite = Math.random() > 0.2;
                const checkInLat = onSite ? siteLat : siteLat + (Math.random() - 0.5) * 0.1;
                const checkInLon = onSite ? siteLon : siteLon + (Math.random() - 0.5) * 0.1;
                const checkOutLat = onSite ? siteLat : siteLat + (Math.random() - 0.5) * 0.1;
                const checkOutLon = onSite ? siteLon : siteLon + (Math.random() - 0.5) * 0.1;

                attendance.push({
                    date: `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`,
                    siteId: siteId,
                    checkIn: `0${Math.floor(Math.random() * 2) + 8}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
                    checkOut: `${Math.floor(Math.random() * 2) + 17}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
                    checkInLocation: { lat: checkInLat, lon: checkInLon },
                    checkOutLocation: { lat: checkOutLat, lon: checkOutLon },
                });
            }
        }
        return attendance;
    }

    const USERS_DATA = [
        {
            id: 'user-1',
            name: 'Rutvik Korat',
            email: 'rutvik.korat@example.com',
            avatar: 'https://i.pravatar.cc/150?u=user-1',
            designation: 'Site Supervisor',
            status: 'Active',
            assignedSites: ['project-alpha', 'project-gamma'],
            attendance: generateDynamicAttendance('project-alpha', 34.0522, -118.2437),
            mobile: '+1-202-555-0104',
            city: 'Los Angeles',
            lastAccess: '2024-07-26T10:00:00Z',
            salary: 85000
        },
        {
            id: 'user-2',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            avatar: 'https://i.pravatar.cc/150?u=user-2',
            designation: 'Project Manager',
            status: 'Active',
            assignedSites: ['project-alpha', 'project-beta', 'project-delta'],
            attendance: generateDynamicAttendance('project-beta', 40.7128, -74.0060),
            mobile: '+1-202-555-0162',
            city: 'New York',
            lastAccess: '2024-07-26T11:30:00Z',
            salary: 105000
        },
        {
            id: 'user-3',
            name: 'Mike Johnson',
            email: 'mike.johnson@example.com',
            avatar: 'https://i.pravatar.cc/150?u=user-3',
            designation: 'Lead Engineer',
            status: 'Active',
            assignedSites: ['project-beta'],
            attendance: generateDynamicAttendance('project-beta', 40.7128, -74.0060),
            mobile: '+1-202-555-0188',
            city: 'New York',
            lastAccess: '2024-07-25T15:00:00Z',
            salary: 98000
        },
        {
            id: 'user-4',
            name: 'Emily Davis',
            email: 'emily.davis@example.com',
            avatar: 'https://i.pravatar.cc/150?u=user-4',
            designation: 'Architect',
            status: 'Inactive',
            assignedSites: [],
            attendance: [],
            mobile: '+1-202-555-0199',
            city: 'Chicago',
            lastAccess: '2024-06-15T09:00:00Z',
            salary: 92000
        },
        {
            id: 'user-5',
            name: 'Chris Brown',
            email: 'chris.brown@example.com',
            avatar: 'https://i.pravatar.cc/150?u=user-5',
            designation: 'Electrician',
            status: 'Inactive',
            assignedSites: ['project-gamma'],
            attendance: [],
            mobile: '+1-202-555-0143',
            city: 'Los Angeles',
            lastAccess: '2024-07-20T18:00:00Z',
            salary: 75000
        },
        {
            id: 'user-6',
            name: 'Sarah Wilson',
            email: 'sarah.wilson@example.com',
            avatar: 'https://i.pravatar.cc/150?u=user-6',
            designation: 'Plumber',
            status: 'Active',
            assignedSites: ['project-delta'],
            attendance: generateDynamicAttendance('project-delta', 34.0522, -118.2437),
            mobile: '+1-202-555-0121',
            city: 'Los Angeles',
            lastAccess: '2024-07-26T09:15:00Z',
            salary: 78000
        }
    ];

    function renderUserProfile() {
        const urlParams = new URLSearchParams(window.location.search);
        const userId = urlParams.get('id');

        const user = USERS_DATA.find(u => u.id === userId);

        if (!user) {
            document.querySelector('.main-content').innerHTML = `
                <div class="alert alert-danger" role="alert">
                    User not found. Please return to the <a href="users.html" class="alert-link">users list</a>.
                </div>
            `;
            return;
        }

        // --- Populate User Card ---
        document.getElementById('user-avatar').src = user.avatar;
        document.getElementById('user-name').textContent = user.name;
        document.getElementById('user-designation').textContent = user.designation;
        
        const statusEl = document.getElementById('user-status');
        statusEl.textContent = user.status;
        statusEl.classList.add(user.status === 'Active' ? 'bg-success' : 'bg-danger');


        // --- Populate Info Card ---
        document.getElementById('info-full-name').textContent = user.name;
        document.getElementById('info-email').textContent = user.email;
        document.getElementById('info-mobile').textContent = user.mobile || 'N/A';
        document.getElementById('info-city').textContent = user.city || 'N/A';
        document.getElementById('info-designation').textContent = user.designation;
        
        // Format Last Access Date
        const lastAccessDate = new Date(user.lastAccess);
        document.getElementById('info-last-access').textContent = lastAccessDate.toLocaleString('en-US', { 
            year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' 
        });

        // Format Salary
        const formattedSalary = new Intl.NumberFormat('en-US', { 
            style: 'currency', 
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0 
        }).format(user.salary);
        document.getElementById('info-salary').textContent = formattedSalary;
    }

    function setupEventListeners() {
        const editProfileBtn = document.getElementById('edit-profile-btn');
        const saveChangesBtn = document.getElementById('save-user-changes-btn');
        const editUserModalEl = document.getElementById('editUserModal');
        const editUserForm = document.getElementById('edit-user-form');
        const urlParams = new URLSearchParams(window.location.search);
        const userId = urlParams.get('id');

        // Logic to open modal and pre-fill data
        editProfileBtn.addEventListener('click', () => {
            const user = USERS_DATA.find(u => u.id === userId);
            if (user) {
                document.getElementById('edit-full-name').value = user.name;
                document.getElementById('edit-email').value = user.email;
                document.getElementById('edit-mobile').value = user.mobile;
                document.getElementById('edit-city').value = user.city;
                document.getElementById('edit-designation').value = user.designation;
                document.getElementById('edit-status').value = user.status;
                document.getElementById('edit-salary').value = user.salary;
            }
        });

        // Logic to save changes
        saveChangesBtn.addEventListener('click', () => {
            if (!editUserForm.checkValidity()) {
                editUserForm.reportValidity();
                return;
            }

            const userIndex = USERS_DATA.findIndex(u => u.id === userId);
            if (userIndex > -1) {
                USERS_DATA[userIndex].name = document.getElementById('edit-full-name').value;
                USERS_DATA[userIndex].email = document.getElementById('edit-email').value;
                USERS_DATA[userIndex].mobile = document.getElementById('edit-mobile').value;
                USERS_DATA[userIndex].city = document.getElementById('edit-city').value;
                USERS_DATA[userIndex].designation = document.getElementById('edit-designation').value;
                USERS_DATA[userIndex].status = document.getElementById('edit-status').value;
                USERS_DATA[userIndex].salary = parseInt(document.getElementById('edit-salary').value, 10);
                
                // Re-render the profile page with the new data
                renderUserProfile();

                // Close the modal
                const modal = bootstrap.Modal.getInstance(editUserModalEl);
                modal.hide();
            }
        });
    }

    renderUserProfile();
    setupEventListeners();
}); 