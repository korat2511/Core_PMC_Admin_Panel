document.addEventListener('DOMContentLoaded', () => {
    // Note: In a real application, SITES_DATA would be loaded from a shared module or API

    function generateDynamicAttendance(siteId, siteLat, siteLon) {
        const attendance = [];
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
    
        for (let i = 1; i < today.getDate(); i++) { // Only generate for past days of the current month
            const currentDate = new Date(year, month, i);
    
            const dayOfWeek = currentDate.getDay();
            if (dayOfWeek === 0 || dayOfWeek === 6) continue; // Skip weekends
    
            // Randomly decide if the user was present
            if (Math.random() > 0.3) { // 70% chance of being present
                const onSite = Math.random() > 0.2; // 80% chance of being on site
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

    let currentPage = 1;
    const USERS_PER_PAGE = 10; // Adjust as needed

    function renderUsers() {
        const tableBody = document.getElementById('user-table-body');
        if (!tableBody) return;

        tableBody.innerHTML = '';

        // NOTE: In a real app with filtering, you'd filter USERS_DATA first
        const paginatedUsers = USERS_DATA.slice(
            (currentPage - 1) * USERS_PER_PAGE,
            currentPage * USERS_PER_PAGE
        );

        paginatedUsers.forEach(user => {
            const row = document.createElement('tr');

            const sitesHtml = user.assignedSites.map(siteId => {
                const site = SITES_DATA.find(s => s.id === siteId);
                return `<span class="site-badge">${site ? site.name : 'Unknown Site'}</span>`;
            }).join('');

            const statusClass = `status-${user.status.toLowerCase().replace(' ', '-')}`;

            row.innerHTML = `
                <td>
                    <div class="user-info-cell">
                        <img src="${user.avatar}" alt="${user.name}" class="user-avatar">
                        <div>
                            <div class="user-name">${user.name}</div>
                            <div class="user-email">${user.email}</div>
                        </div>
                    </div>
                </td>
                <td>${user.designation}</td>
                <td>${sitesHtml || 'N/A'}</td>
                <td><span class="status-badge ${statusClass}">${user.status}</span></td>
                <td>
                    <a href="user-profile.html?id=${user.id}" class="btn btn-sm btn-outline-secondary" title="View Profile"><i class="fas fa-user"></i></a>
                    <button class="btn btn-sm btn-outline-info view-attendance-btn" data-user-id="${user.id}" data-bs-toggle="modal" data-bs-target="#attendanceModal" title="View Attendance"><i class="fas fa-calendar-alt"></i></button>
                </td>
            `;
            tableBody.appendChild(row);
        });

        renderPagination();
    }

    function renderPagination() {
        const paginationInfo = document.getElementById('pagination-info');
        const prevPageBtn = document.getElementById('prev-page-btn');
        const nextPageBtn = document.getElementById('next-page-btn');

        const totalUsers = USERS_DATA.length;
        const startIndex = (currentPage - 1) * USERS_PER_PAGE;
        const endIndex = Math.min(startIndex + USERS_PER_PAGE, totalUsers);

        if (paginationInfo) {
            paginationInfo.textContent = `Showing ${startIndex + 1} - ${endIndex} of ${totalUsers} users`;
        }
        if (prevPageBtn) {
            prevPageBtn.disabled = currentPage === 1;
        }
        if (nextPageBtn) {
            nextPageBtn.disabled = endIndex >= totalUsers;
        }
    }

    function setupPaginationListeners() {
        const prevPageBtn = document.getElementById('prev-page-btn');
        const nextPageBtn = document.getElementById('next-page-btn');

        if (prevPageBtn) {
            prevPageBtn.addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    renderUsers();
                }
            });
        }

        if (nextPageBtn) {
            nextPageBtn.addEventListener('click', () => {
                if (currentPage * USERS_PER_PAGE < USERS_DATA.length) {
                    currentPage++;
                    renderUsers();
                }
            });
        }
    }

    // --- Attendance Modal Logic ---
    const attendanceModalEl = document.getElementById('attendanceModal');
    if(attendanceModalEl) {
        let currentUserId = null;
        let currentDate = new Date();
        let map = null;

        const calendarView = document.getElementById('calendar-view');
        const monthYearEl = document.getElementById('calendar-month-year');
        const prevMonthBtn = document.getElementById('prev-month-btn');
        const nextMonthBtn = document.getElementById('next-month-btn');
        const mapDetailsContainer = document.getElementById('map-details-container');

        function calculateDistance(lat1, lon1, lat2, lon2) {
            const R = 6371e3; // metres
            const φ1 = lat1 * Math.PI/180; // φ, λ in radians
            const φ2 = lat2 * Math.PI/180;
            const Δφ = (lat2-lat1) * Math.PI/180;
            const Δλ = (lon2-lon1) * Math.PI/180;

            const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                      Math.cos(φ1) * Math.cos(φ2) *
                      Math.sin(Δλ/2) * Math.sin(Δλ/2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

            return R * c; // in metres
        }
        
        function formatDistance(distanceMeters) {
            if (distanceMeters <= 100) {
                return 'At Site';
            } else if (distanceMeters < 1000) {
                return `${distanceMeters.toFixed(0)}m away from site`;
            } else {
                return `${(distanceMeters / 1000).toFixed(2)}km away from site`;
            }
        }
        
        function renderCalendar() {
            calendarView.innerHTML = '';
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            
            monthYearEl.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;
            
            const firstDayOfMonth = new Date(year, month, 1).getDay();
            const daysInMonth = new Date(year, month + 1, 0).getDate();

            // Day names header
            const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            dayNames.forEach(day => {
                const dayNameEl = document.createElement('div');
                dayNameEl.className = 'calendar-day-name';
                dayNameEl.textContent = day;
                calendarView.appendChild(dayNameEl);
            });

            // Blank days
            for (let i = 0; i < firstDayOfMonth; i++) {
                calendarView.innerHTML += `<div class="calendar-day not-in-month"></div>`;
            }

            const user = USERS_DATA.find(u => u.id === currentUserId);
            const userAttendance = user ? (user.attendance || []) : [];
            
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            // Month days
            for (let i = 1; i <= daysInMonth; i++) {
                const dayEl = document.createElement('div');
                dayEl.className = 'calendar-day';
                const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
                
                const dayHeader = document.createElement('div');
                dayHeader.className = 'day-header';
                dayHeader.textContent = i;
                dayEl.appendChild(dayHeader);

                const attendance = userAttendance.find(a => a.date === dateStr);
                const loopDate = new Date(year, month, i);
                const dayOfWeek = loopDate.getDay();
                
                if (attendance) {
                    dayEl.classList.add('clickable');
                    dayEl.dataset.date = dateStr;
                    const entryEl = document.createElement('div');
                    entryEl.className = 'attendance-entry';
                    entryEl.innerHTML = `
                        <div><span class="time-label check-in">In:</span> ${attendance.checkIn}</div>
                        <div><span class="time-label check-out">Out:</span> ${attendance.checkOut}</div>
                    `;
                    dayEl.appendChild(entryEl);
                } else if (dayOfWeek > 0 && dayOfWeek < 6 && loopDate < today) {
                    // It's a past weekday with no data
                    const absentLabel = document.createElement('div');
                    absentLabel.className = 'absent-label';
                    absentLabel.textContent = 'Absent';
                    dayEl.appendChild(absentLabel);
                }
                
                if (loopDate.getTime() === today.getTime()) {
                    dayEl.classList.add('is-today');
                }

                calendarView.appendChild(dayEl);
            }

             // Add click listeners
            calendarView.querySelectorAll('.clickable').forEach(day => {
                day.addEventListener('click', handleDayClick);
            });
        }

        function handleDayClick(event) {
            // Remove selected from others
            calendarView.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
            
            const dayEl = event.currentTarget;
            dayEl.classList.add('selected');

            const date = dayEl.dataset.date;
            const user = USERS_DATA.find(u => u.id === currentUserId);
            const attendanceData = user.attendance.find(a => a.date === date);

            renderMapAndDetails(attendanceData);
        }

        function renderMapAndDetails(attendance) {
            const mapContainer = document.getElementById('map-view');
            const locationInfo = document.getElementById('location-info');
            mapDetailsContainer.style.visibility = 'visible';

            if (map) {
                map.remove();
            }

            const site = SITES_DATA.find(s => s.id === attendance.siteId);
            if (!site) {
                locationInfo.innerHTML = '<p class="text-danger">Error: Site data not found.</p>';
                return;
            }

            const siteLocation = [site.latitude, site.longitude];
            map = L.map('map-view').setView(siteLocation, 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            // Site Marker and Radius
            L.marker(siteLocation).addTo(map).bindPopup(`<b>${site.name}</b><br>Official Site Location`).openPopup();
            L.circle(siteLocation, { radius: 100, color: 'blue',
            fillColor: '#30f',
            fillOpacity: 0.2 }).addTo(map);

            // Check-in
            const checkInLoc = [attendance.checkInLocation.lat, attendance.checkInLocation.lon];
            const distIn = calculateDistance(site.latitude, site.longitude, checkInLoc[0], checkInLoc[1]);
            const atSiteIn = distIn <= 100;
            L.marker(checkInLoc, {icon: L.icon({iconUrl:'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png', shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]})}).addTo(map).bindPopup('Check-in Location');
            
            // Check-out
            const checkOutLoc = [attendance.checkOutLocation.lat, attendance.checkOutLocation.lon];
            const distOut = calculateDistance(site.latitude, site.longitude, checkOutLoc[0], checkOutLoc[1]);
            const atSiteOut = distOut <= 100;
            L.marker(checkOutLoc, {icon: L.icon({iconUrl:'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png', shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]})}).addTo(map).bindPopup('Check-out Location');
            
            // Pan map to fit all markers
            const bounds = L.latLngBounds([siteLocation, checkInLoc, checkOutLoc]);
            map.fitBounds(bounds.pad(0.3));

            // Invalidate size to fix rendering in modal
            setTimeout(() => {
                if (map) map.invalidateSize();
            }, 200);

            // Display location info
            const distInFormatted = formatDistance(distIn);
            const distOutFormatted = formatDistance(distOut);

            locationInfo.innerHTML = `
                <div class="info-item ${atSiteIn ? 'at-site' : 'away-from-site'}">
                    <i class="fas fa-sign-in-alt me-2"></i> <strong>Check-in:</strong> ${distInFormatted}
                </div>
                 <div class="info-item ${atSiteOut ? 'at-site' : 'away-from-site'}">
                    <i class="fas fa-sign-out-alt me-2"></i> <strong>Check-out:</strong> ${distOutFormatted}
                </div>
            `;
        }


        attendanceModalEl.addEventListener('show.bs.modal', function (event) {
            currentUserId = event.relatedTarget.dataset.userId;
            const user = USERS_DATA.find(u => u.id === currentUserId);
            if (user) {
                document.getElementById('attendanceModalLabel').textContent = `${user.name}'s Attendance`;
                mapDetailsContainer.style.visibility = 'hidden';
                if(map) map.remove();
                renderCalendar();
            }
        });

        prevMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            mapDetailsContainer.style.visibility = 'hidden';
            if(map) map.remove();
            renderCalendar();
        });

        nextMonthBtn.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            mapDetailsContainer.style.visibility = 'hidden';
            if(map) map.remove();
            renderCalendar();
        });
    }

    renderUsers();
    setupPaginationListeners();
}); 