// Make site data globally available for other pages like site-profile.html
const SITES_DATA = [
    {
        id: 'project-alpha',
        name: 'Project Alpha',
        imageUrl: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=3474&auto=format&fit=crop',
        imageUrls: [
            'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=3474&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=3540&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=3540&auto=format&fit=crop',
        ],
        startDate: '2023-01-15',
        endDate: '2024-06-30',
        status: 'Active',
        progress: 75,
        clientName: 'Innovate Corp.',
        architectName: 'Laura Wexler',
        address: '123 Innovation Drive, Tech Park, Metropolis',
        latitude: 34.0522,
        longitude: -118.2437,
        usersCount: 12,
        taskSummary: { active: 50, completed: 22, pending: 8, overdue: 4, siteSurvey: 6 },
        categoriesCount: 5,
        fileSystem: [
            { id: 'folder-1', name: '3D Images', type: 'folder', children: [
                { id: 'img-1-1', name: 'Rendering-1.jpg', type: 'image', url: 'https://i.imgur.com/vJ6QI6m.jpeg' },
                { id: 'folder-1-1', name: 'Interior Views', type: 'folder', children: [
                    { id: 'img-1-1-1', name: 'Living-Room.jpg', type: 'image', url: 'https://i.imgur.com/YvAlJ1C.jpeg' },
                ] }
            ]},
            { id: 'folder-2', name: 'Drawings', type: 'folder', children: [] },
            { id: 'folder-3', name: 'Site Marking Data', type: 'folder', children: [] },
            { id: 'folder-4', name: 'Quotation', type: 'folder', children: [
                 { id: 'img-4-1', name: 'Contractor-Quote.pdf', type: 'image', url: 'https://i.imgur.com/2zXEx8p.jpeg' },
            ]},
            { id: 'folder-5', name: 'Agreement', type: 'folder', children: [] }
        ]
    },
    {
        id: 'project-beta',
        name: 'Project Beta',
        imageUrl: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=3540&auto=format&fit=crop',
        imageUrls: [
            'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=3540&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=3540&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=3474&auto=format&fit=crop',
        ],
        startDate: '2022-08-20',
        endDate: '2023-12-10',
        status: 'Completed',
        progress: 100,
        clientName: 'Solutions Inc.',
        architectName: 'David Chen',
        address: '456 Solution Avenue, Business Bay, Zenith',
        latitude: 40.7128,
        longitude: -74.0060,
        usersCount: 8,
        taskSummary: { active: 0, completed: 60, pending: 0, overdue: 0, siteSurvey: 2 },
        categoriesCount: 4,
        fileSystem: [
            { id: 'folder-b-1', name: '3D Images', type: 'folder', children: [] },
            { id: 'folder-b-2', name: 'Drawings', type: 'folder', children: [] },
            { id: 'folder-b-3', name: 'Site Marking Data', type: 'folder', children: [] },
            { id: 'folder-b-4', name: 'Quotation', type: 'folder', children: [] },
            { id: 'folder-b-5', name: 'Agreement', type: 'folder', children: [] }
        ]
    },
    {
        id: 'project-gamma',
        name: 'Project Gamma',
        imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=3540&auto=format&fit=crop',
        imageUrls: [
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=3540&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=3474&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=3540&auto=format&fit=crop',
        ],
        startDate: '2024-03-01',
        endDate: '2025-01-20',
        status: 'Pending',
        progress: 10,
        clientName: 'Quantum Holdings',
        architectName: 'Maria Rodriguez',
        usersCount: 5,
        taskSummary: { active: 5, completed: 1, pending: 15, overdue: 1, siteSurvey: 3 },
        categoriesCount: 3,
        address: '789 Industrial Way, Factory Town, Vertex',
        latitude: 34.0522,
        longitude: -118.2437,
        fileSystem: [
            { id: 'folder-g-1', name: '3D Images', type: 'folder', children: [] },
            { id: 'folder-g-2', name: 'Drawings', type: 'folder', children: [] },
            { id: 'folder-g-3', name: 'Site Marking Data', type: 'folder', children: [] },
            { id: 'folder-g-4', name: 'Quotation', type: 'folder', children: [] },
            { id: 'folder-g-5', name: 'Agreement', type: 'folder', children: [] }
        ]
    },
    {
        id: 'project-delta',
        name: 'Project Delta',
        imageUrl: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=3540&auto=format&fit=crop',
        imageUrls: [
            'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=3540&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=3540&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=3540&auto=format&fit=crop',
        ],
        startDate: '2022-11-10',
        endDate: '2023-11-30',
        status: 'Overdue',
        progress: 90,
        clientName: 'Apex Constructors',
        architectName: 'John Smith',
        usersCount: 15,
        taskSummary: { active: 8, completed: 80, pending: 2, overdue: 12, siteSurvey: 8 },
        categoriesCount: 6,
        address: '101 Builder Street, Construction Zone, Pillar',
        latitude: 34.0522,
        longitude: -118.2437,
        fileSystem: [
            { id: 'folder-d-1', name: '3D Images', type: 'folder', children: [] },
            { id: 'folder-d-2', name: 'Drawings', type: 'folder', children: [] },
            { id: 'folder-d-3', name: 'Site Marking Data', type: 'folder', children: [] },
            { id: 'folder-d-4', name: 'Quotation', type: 'folder', children: [] },
            { id: 'folder-d-5', name: 'Agreement', type: 'folder', children: [] }
        ]
    }
];

document.addEventListener('DOMContentLoaded', () => {

    if (document.getElementById('siteContainer')) {
        // This code only runs on sites.html
        initializeSitesPage();
    }

    function initializeSitesPage() {
        const siteContainer = document.getElementById('siteContainer');
        const searchInput = document.getElementById('siteSearch');
        const statusFilterItems = document.querySelectorAll('.status-filter-item');
        const statusFilterBtn = document.getElementById('statusFilter');
        const gridViewBtn = document.getElementById('gridViewBtn');
        const listViewBtn = document.getElementById('listViewBtn');
        const listViewHeader = document.getElementById('listViewHeader');
        const startDateFromInput = document.getElementById('startDateFrom');
        const startDateToInput = document.getElementById('startDateTo');

        let currentView = 'grid';
        let currentSearchTerm = '';
        let currentStatus = 'all';
        let currentStartDateFrom = '';
        let currentStartDateTo = '';

        // Pagination elements
        const paginationInfo = document.getElementById('pagination-info');
        const prevPageBtn = document.getElementById('prev-page-btn');
        const nextPageBtn = document.getElementById('next-page-btn');

        let currentPage = 1;
        const SITES_PER_PAGE = 8; // Adjust as needed

        let currentFilters = {
            searchTerm: '',
            status: 'all',
            view: 'list' // or 'grid'
        };

        function renderSites() {
            siteContainer.innerHTML = '';
            const filteredSites = applyFilters();

            // Pagination logic
            const startIndex = (currentPage - 1) * SITES_PER_PAGE;
            const endIndex = startIndex + SITES_PER_PAGE;
            const paginatedSites = filteredSites.slice(startIndex, endIndex);

            if (paginatedSites.length === 0) {
                siteContainer.innerHTML = '<p class="text-center text-muted">No sites found.</p>';
                return;
            }

            paginatedSites.forEach(site => {
                const siteElement = currentView === 'grid' ? createSiteCard(site) : createSiteRow(site);
                siteContainer.appendChild(siteElement);
            });

            renderPagination(filteredSites.length, startIndex, endIndex);
        }

        function createSiteCard(site) {
            const card = document.createElement('div');
            card.className = 'col-xl-4 col-md-6 mb-4';
            card.innerHTML = `
                <div class="card site-card">
                    <img src="${site.imageUrl}" class="card-img-top site-card-img-top" alt="${site.name}">
                    <div class="card-body">
                        <div>
                            <div class="d-flex justify-content-between align-items-start">
                                <h5 class="card-title site-card-title">${site.name}</h5>
                                <span class="status-badge status-${site.status}">${site.status}</span>
                            </div>
                            <p class="card-text site-card-dates">
                                <i class="fas fa-calendar-alt me-2"></i>${site.startDate} to ${site.endDate}
                            </p>
                        </div>
                        <div class="site-card-progress">
                            <div class="d-flex justify-content-end mb-1">
                                <span class="small fw-bold">${site.progress}%</span>
                            </div>
                            <div class="progress">
                                <div class="progress-bar bg-primary" role="progressbar" style="width: ${site.progress}%" aria-valuenow="${site.progress}" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                        <div class="site-card-actions">
                            <a href="site-profile.html?site=${site.id}" class="btn btn-sm btn-outline-primary"><i class="fas fa-eye me-1"></i>View</a>
                            <button class="btn btn-sm btn-outline-secondary edit-site-btn" data-id="${site.id}"><i class="fas fa-edit me-1"></i>Edit</button>
                        </div>
                    </div>
                </div>
            `;
            return card;
        }

        function createSiteRow(site) {
            const rowWrapper = document.createElement('div');
            rowWrapper.className = 'site-row-wrapper';

            rowWrapper.innerHTML = `
                <div class="card site-row">
                    <div class="row gx-4 w-100">
                        <div class="col-lg-4">
                            <div class="d-flex align-items-center">
                                <img src="${site.imageUrl}" class="site-row-img" alt="${site.name}">
                                <span class="site-name">${site.name}</span>
                            </div>
                        </div>
                        <div class="col-lg-2">
                            <span class="status-badge status-${site.status}">${site.status}</span>
                        </div>
                        <div class="col-lg-3 timeline">
                            ${site.startDate} &rarr; ${site.endDate}
                        </div>
                        <div class="col-lg-2">
                            <div class="progress" title="${site.progress}%">
                                <div class="progress-bar bg-primary" role="progressbar" style="width: ${site.progress}%" aria-valuenow="${site.progress}" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                        <div class="col-lg-1 d-flex actions">
                            <a href="site-profile.html?site=${site.id}" class="btn btn-sm btn-outline-primary" title="View"><i class="fas fa-eye"></i></a>
                            <button class="btn btn-sm btn-outline-secondary edit-site-btn" title="Edit" data-id="${site.id}"><i class="fas fa-edit"></i></button>
                        </div>
                    </div>
                </div>
            `;
            return rowWrapper;
        }

        function renderPagination(totalSites, startIndex, endIndex) {
            if (totalSites === 0) {
                if(paginationInfo) paginationInfo.textContent = '';
                if(prevPageBtn) prevPageBtn.disabled = true;
                if(nextPageBtn) nextPageBtn.disabled = true;
                return;
            }

            const startSite = startIndex + 1;
            const endSite = Math.min(endIndex, totalSites);
            if(paginationInfo) paginationInfo.textContent = `Showing ${startSite} - ${endSite} of ${totalSites} sites`;
            
            if(prevPageBtn) prevPageBtn.disabled = currentPage === 1;
            if(nextPageBtn) nextPageBtn.disabled = endIndex >= totalSites;
        }

        function applyFilters() {
            const filteredSites = SITES_DATA.filter(site => {
                const matchesSearch = site.name.toLowerCase().includes(currentFilters.searchTerm.toLowerCase());
                const matchesStatus = currentFilters.status === 'all' || site.status === currentFilters.status;
                
                const siteStartDate = new Date(site.startDate);
                const fromDate = currentStartDateFrom ? new Date(currentStartDateFrom) : null;
                const toDate = currentStartDateTo ? new Date(currentStartDateTo) : null;

                const matchesDate = (!fromDate || siteStartDate >= fromDate) && (!toDate || siteStartDate <= toDate);

                return matchesSearch && matchesStatus && matchesDate;
            });
            return filteredSites;
        }

        function handleFilterChange() {
            currentPage = 1;
            renderSites();
        }

        // Event Listeners
        searchInput.addEventListener('input', (e) => {
            currentFilters.searchTerm = e.target.value;
            handleFilterChange();
        });

        startDateFromInput.addEventListener('change', (e) => {
            currentStartDateFrom = e.target.value;
            handleFilterChange();
        });

        startDateToInput.addEventListener('change', (e) => {
            currentStartDateTo = e.target.value;
            handleFilterChange();
        });

        statusFilterItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                currentFilters.status = e.currentTarget.dataset.status;
                handleFilterChange();
            });
        });

        gridViewBtn.addEventListener('click', () => {
            currentFilters.view = 'grid';
            currentView = 'grid';
            siteContainer.className = 'row grid-view';
            listViewHeader.classList.add('d-none');
            gridViewBtn.classList.add('active');
            listViewBtn.classList.remove('active');
            handleFilterChange();
        });

        listViewBtn.addEventListener('click', () => {
            currentFilters.view = 'list';
            currentView = 'list';
            siteContainer.className = 'list-view';
            listViewHeader.classList.remove('d-none');
            listViewBtn.classList.add('active');
            gridViewBtn.classList.remove('active');
            handleFilterChange();
        });

        if (prevPageBtn) {
            prevPageBtn.addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    handleFilterChange();
                }
            });
        }

        if (nextPageBtn) {
            nextPageBtn.addEventListener('click', () => {
                const totalSites = applyFilters().length;
                if (currentPage * SITES_PER_PAGE < totalSites) {
                    currentPage++;
                    handleFilterChange();
                }
            });
        }

        function applyUrlParameters() {
            const urlParams = new URLSearchParams(window.location.search);
            const status = urlParams.get('status');
            if (status) {
                currentFilters.status = status;
                // Update active button
                statusFilterItems.forEach(item => {
                    if (item.dataset.status === status) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                });
            }
        }

        renderSites();
        applyUrlParameters();

        initializeEditModal();
    }

    function initializeEditModal() {
        const editModal = new bootstrap.Modal(document.getElementById('editSiteModal'));
        const modalElement = document.getElementById('editSiteModal');
        const saveChangesBtn = document.getElementById('saveSiteChanges');
        const galleryContainer = document.getElementById('editImageGallery');

        document.getElementById('siteContainer').addEventListener('click', function(e) {
            const editBtn = e.target.closest('.edit-site-btn');
            if (editBtn) {
                const siteId = editBtn.dataset.id;
                const site = SITES_DATA.find(s => s.id === siteId);
                if (!site) return;

                modalElement.dataset.editingSiteId = siteId;

                // Populate form
                document.getElementById('editSiteName').value = site.name;
                document.getElementById('editClientName').value = site.clientName;
                document.getElementById('editArchitectName').value = site.architectName;
                document.getElementById('editAddress').value = site.address;
                document.getElementById('editStartDate').value = site.startDate;
                document.getElementById('editEndDate').value = site.endDate;
                document.getElementById('editLatitude').value = site.latitude;
                document.getElementById('editLongitude').value = site.longitude;

                // Populate images
                galleryContainer.innerHTML = '';
                site.imageUrls.forEach((url, index) => {
                    galleryContainer.appendChild(createImageThumbnail(url, index));
                });
                document.getElementById('addImageFiles').value = '';

                editModal.show();
            }
        });

        document.getElementById('addImageFiles').addEventListener('change', function(event) {
            for (const file of event.target.files) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const url = e.target.result;
                    const newThumbnail = createImageThumbnail(url, -1, true);
                    galleryContainer.appendChild(newThumbnail);
                };
                reader.readAsDataURL(file);
            }
        });

        function createImageThumbnail(url, index, isNew = false) {
            const col = document.createElement('div');
            col.className = 'col-3';
            col.innerHTML = `
                <div class="image-thumbnail-container">
                    <img src="${url}" class="image-thumbnail" alt="Site Image">
                    <button type="button" class="remove-image-btn" data-url="${url}">&times;</button>
                </div>
            `;
            col.querySelector('.remove-image-btn').addEventListener('click', function() {
                col.remove();
            });
            return col;
        }

        saveChangesBtn.addEventListener('click', () => {
            const siteId = modalElement.dataset.editingSiteId;
            const siteIndex = SITES_DATA.findIndex(s => s.id === siteId);
            if (siteIndex === -1) return;

            // Save all fields
            SITES_DATA[siteIndex].name = document.getElementById('editSiteName').value;
            SITES_DATA[siteIndex].clientName = document.getElementById('editClientName').value;
            SITES_DATA[siteIndex].architectName = document.getElementById('editArchitectName').value;
            SITES_DATA[siteIndex].address = document.getElementById('editAddress').value;
            SITES_DATA[siteIndex].startDate = document.getElementById('editStartDate').value;
            SITES_DATA[siteIndex].endDate = document.getElementById('editEndDate').value;
            SITES_DATA[siteIndex].latitude = parseFloat(document.getElementById('editLatitude').value);
            SITES_DATA[siteIndex].longitude = parseFloat(document.getElementById('editLongitude').value);

            // Update images - including newly added ones
            const remainingImageUrls = [...galleryContainer.querySelectorAll('.remove-image-btn')]
                .map(btn => btn.dataset.url);

            SITES_DATA[siteIndex].imageUrls = remainingImageUrls;
            
            renderSites();
            editModal.hide();
        });
    }
}); 