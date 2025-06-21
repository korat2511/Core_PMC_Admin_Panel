document.addEventListener('DOMContentLoaded', () => {
    const siteProfileContainer = document.getElementById('site-profile-container');
    const loadingSpinner = document.getElementById('loading-spinner');

    // Get site ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const siteId = urlParams.get('site');

    if (!siteId || !SITES_DATA) {
        displayError('Site data not found or invalid site ID.');
        return;
    }

    // Find the site data
    const site = SITES_DATA.find(s => s.id === siteId);

    if (!site) {
        displayError(`No site found with ID: ${siteId}`);
        return;
    }

    // Render the profile page
    renderSiteProfile(site);
    initializeEditModal(site);

    function renderSiteProfile(site) {
        loadingSpinner.style.display = 'none';
        
        const totalTasks = Object.values(site.taskSummary).reduce((a, b) => a + b, 0);
        const calculatePercentage = (value) => (totalTasks > 0 ? ((value / totalTasks) * 100).toFixed(1) : 0);
        
        const profileHTML = `
            <!-- Profile Header -->
            <div class="d-flex justify-content-between align-items-center profile-header">
                <div>
                    <h1 class="mb-0">${site.name}</h1>
                    <p class="text-muted mb-0">Project Profile <span class="mx-2">|</span> <span class="status-badge status-${site.status}">${site.status}</span></p>
                </div>
                <div class="d-flex align-items-center">
                    <a href="sites.html" class="btn btn-sm btn-outline-secondary me-2">
                        <i class="fas fa-arrow-left me-1"></i>Back
                    </a>
                    <button class="btn btn-sm btn-primary"><i class="fas fa-edit me-1"></i>Edit Project</button>
                </div>
            </div>

            <div class="row">
                <!-- Main Column -->
                <div class="col-lg-8">
                    <!-- Site Gallery -->
                    <div class="card mb-4">
                         <div class="card-header"><h5 class="card-title mb-0"><i class="fas fa-images me-2"></i>Site Gallery</h5></div>
                         <div class="card-body p-2" style="height: 450px;">
                            <div class="swiper-container h-100">
                                <div class="swiper-wrapper">
                                    ${site.imageUrls.map(url => `<div class="swiper-slide"><img src="${url}" alt="${site.name}"></div>`).join('')}
                                </div>
                                <div class="swiper-button-next"></div>
                                <div class="swiper-button-prev"></div>
                            </div>
                        </div>
                    </div>

                    <!-- Task Breakdown -->
                    <div class="card mb-4">
                         <div class="card-header"><h5 class="card-title mb-0"><i class="fas fa-tasks me-2"></i>Task Breakdown (${totalTasks} Total)</h5></div>
                         <div class="card-body">
                            <ul class="list-group list-group-flush task-breakdown-list">
                                <li class="list-group-item">
                                    <div class="d-flex justify-content-between"><span>Active Tasks</span><span>${site.taskSummary.active}</span></div>
                                    <div class="progress mt-1"><div class="progress-bar bg-success" role="progressbar" style="width: ${calculatePercentage(site.taskSummary.active)}%"></div></div>
                                </li>
                               <li class="list-group-item">
                                    <div class="d-flex justify-content-between"><span>Completed Tasks</span><span>${site.taskSummary.completed}</span></div>
                                    <div class="progress mt-1"><div class="progress-bar bg-info" role="progressbar" style="width: ${calculatePercentage(site.taskSummary.completed)}%"></div></div>
                                </li>
                                <li class="list-group-item">
                                    <div class="d-flex justify-content-between"><span>Pending Tasks</span><span>${site.taskSummary.pending}</span></div>
                                    <div class="progress mt-1"><div class="progress-bar bg-warning" role="progressbar" style="width: ${calculatePercentage(site.taskSummary.pending)}%"></div></div>
                                </li>
                                <li class="list-group-item">
                                    <div class="d-flex justify-content-between"><span>Overdue</span><span>${site.taskSummary.overdue || 0}</span></div>
                                    <div class="progress mt-1"><div class="progress-bar bg-danger" role="progressbar" style="width: ${calculatePercentage(site.taskSummary.overdue || 0)}%"></div></div>
                                </li>
                                <li class="list-group-item">
                                    <div class="d-flex justify-content-between"><span>Site Survey</span><span>${site.taskSummary.siteSurvey || 0}</span></div>
                                    <div class="progress mt-1"><div class="progress-bar bg-secondary" role="progressbar" style="width: ${calculatePercentage(site.taskSummary.siteSurvey || 0)}%"></div></div>
                                </li>
                             </ul>
                         </div>
                    </div>

                    <!-- Reference Documents -->
                    <div class="card mb-4">
                        <div class="card-header d-flex justify-content-between align-items-center">
                            <h5 class="card-title mb-0"><i class="fas fa-folder-open me-2"></i>Reference Documents</h5>
                            <div class="breadcrumb-container"></div>
                        </div>
                        <div class="card-body">
                            <div id="file-manager-container"></div>
                        </div>
                    </div>
                </div>

                <!-- Right Sidebar Column -->
                <div class="col-lg-4">
                    <!-- Location and Details -->
                    <div class="card mb-4">
                        <div class="card-header"><h5 class="card-title mb-0"><i class="fas fa-map-marked-alt me-2"></i>Location & Details</h5></div>
                        <div class="card-body">
                            <div id="map"></div>
                            <div class="location-details mt-3">
                                <h6>Address</h6>
                                <p>${site.address}</p>
                                <h6>Coordinates</h6>
                                <p class="text-muted">${site.latitude}, ${site.longitude}</p>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Project Details -->
                    <div class="card mb-4">
                        <div class="card-header"><h5 class="card-title mb-0"><i class="fas fa-info-circle me-2"></i>Project Details</h5></div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item d-flex justify-content-between"><span>Client:</span> <strong>${site.clientName}</strong></li>
                            <li class="list-group-item d-flex justify-content-between"><span>Architect:</span> <strong>${site.architectName}</strong></li>
                            <li class="list-group-item d-flex justify-content-between"><span>Timeline:</span> <strong>${site.startDate} to ${site.endDate}</strong></li>
                            <li class="list-group-item d-flex justify-content-between"><span>Team Size:</span> <strong>${site.usersCount} Users</strong></li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
        siteProfileContainer.innerHTML = profileHTML;

        // Initialize Map
        const map = L.map('map').setView([site.latitude, site.longitude], 13);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        L.marker([site.latitude, site.longitude]).addTo(map)
            .bindPopup(`<b>${site.name}</b><br>${site.address}`).openPopup();

        // Initialize Swiper
        new Swiper('.swiper-container', {
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
        
        initializeFileManager(site);
    }

    function displayError(message) {
        loadingSpinner.style.display = 'none';
        siteProfileContainer.innerHTML = `<div class="alert alert-danger">${message}</div>`;
    }

    function initializeFileManager(site) {
        const container = document.getElementById('file-manager-container');
        const breadcrumbContainer = document.querySelector('.breadcrumb-container');
        let currentPath = [];
        let fileSystem = site.fileSystem;

        function findItemByPath(path) {
            let currentLevel = fileSystem;
            let item = { children: currentLevel };
            for (const id of path) {
                item = currentLevel.find(i => i.id === id);
                if (!item || item.type !== 'folder') return null;
                currentLevel = item.children;
            }
            return item;
        }

        function render() {
            if (!container) return; // Don't render if the container doesn't exist yet

            const currentFolder = findItemByPath(currentPath) || { name: 'Home', children: fileSystem };
            container.innerHTML = ''; // Clear current view

            // Render items
            (currentFolder.children || []).forEach(item => {
                const itemEl = document.createElement('div');
                itemEl.className = 'file-item';
                itemEl.dataset.id = item.id;
                itemEl.innerHTML = `
                    <div class="icon"><i class="fas ${item.type === 'folder' ? 'fa-folder' : 'fa-image'}"></i></div>
                    <div class="name">${item.name}</div>
                `;
                if (item.type === 'folder') {
                    itemEl.addEventListener('click', () => {
                        currentPath.push(item.id);
                        render();
                    });
                }
                container.appendChild(itemEl);
            });
            
            // 'Add Folder' button is always available
            const addFolderEl = createAddItem('folder');
            container.appendChild(addFolderEl);

            // 'Add Image' button is only available inside a folder
            if (currentPath.length > 0) {
                const addImageEl = createAddItem('image');
                container.appendChild(addImageEl);
            }

            // Render breadcrumbs
            renderBreadcrumbs();
        }

        function createAddItem(type) {
            const itemEl = document.createElement('div');
            itemEl.className = 'file-item file-item-add';
            itemEl.innerHTML = `
                <div class="icon"><i class="fas ${type === 'folder' ? 'fa-plus-circle' : 'fa-file-upload'}"></i></div>
                <div class="name">New ${type === 'folder' ? 'Folder' : 'Image'}</div>
            `;
            itemEl.addEventListener('click', () => {
                if (type === 'folder') {
                    const folderName = prompt('Enter new folder name:');
                    if (folderName) {
                        const newFolder = {
                            id: `folder-${Date.now()}`,
                            name: folderName,
                            type: 'folder',
                            children: []
                        };
                        const currentFolder = findItemByPath(currentPath) || { children: fileSystem };
                        currentFolder.children.push(newFolder);
                        render();
                    }
                } else {
                    // Trigger hidden file input
                    const fileInput = document.createElement('input');
                    fileInput.type = 'file';
                    fileInput.accept = 'image/*';
                    fileInput.style.display = 'none';
                    fileInput.addEventListener('change', (event) => {
                        const file = event.target.files[0];
                        if (file) {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                                const newImage = {
                                    id: `img-${Date.now()}`,
                                    name: file.name,
                                    type: 'image',
                                    url: e.target.result
                                };
                                const currentFolder = findItemByPath(currentPath) || { children: fileSystem };
                                currentFolder.children.push(newImage);
                                render();
                            };
                            reader.readAsDataURL(file);
                        }
                    });
                    document.body.appendChild(fileInput);
                    fileInput.click();
                    document.body.removeChild(fileInput);
                }
            });
            return itemEl;
        }

        function renderBreadcrumbs() {
            if (!breadcrumbContainer) return;
            breadcrumbContainer.innerHTML = `
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb file-manager-breadcrumb mb-0">
                        <li class="breadcrumb-item"><a href="#" data-path-index="-1">Home</a></li>
                        ${currentPath.map((id, index) => {
                            const folder = findItemByPath(currentPath.slice(0, index + 1));
                            return `<li class="breadcrumb-item"><a href="#" data-path-index="${index}">${folder.name}</a></li>`;
                        }).join('')}
                    </ol>
                </nav>
            `;
            
            breadcrumbContainer.querySelectorAll('a').forEach(el => {
                el.addEventListener('click', (e) => {
                    e.preventDefault();
                    const pathIndex = parseInt(e.target.dataset.pathIndex);
                    currentPath = currentPath.slice(0, pathIndex + 1);
                    render();
                });
            });
        }

        render();
    }

    function initializeEditModal(site) {
        const editModal = new bootstrap.Modal(document.getElementById('editSiteModal'));
        const editBtn = document.querySelector('.btn-primary');
        const saveChangesBtn = document.getElementById('saveSiteChanges');
        const galleryContainer = document.getElementById('editImageGallery');
        let newImages = [];

        editBtn.addEventListener('click', () => {
            // Populate form with current site data
            document.getElementById('editSiteName').value = site.name;
            document.getElementById('editClientName').value = site.clientName;
            document.getElementById('editArchitectName').value = site.architectName;
            document.getElementById('editAddress').value = site.address;
            document.getElementById('editStartDate').value = site.startDate;
            document.getElementById('editEndDate').value = site.endDate;
            document.getElementById('editLatitude').value = site.latitude;
            document.getElementById('editLongitude').value = site.longitude;

            // Populate image gallery
            galleryContainer.innerHTML = '';
            site.imageUrls.forEach((url, index) => {
                galleryContainer.appendChild(createImageThumbnail(url, index));
            });
            newImages = [];
            document.getElementById('addImageFiles').value = '';

            editModal.show();
        });

        document.getElementById('addImageFiles').addEventListener('change', function(event) {
            for (const file of event.target.files) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const url = e.target.result;
                    newImages.push(url);
                    const newThumbnail = createImageThumbnail(url, -1, true); // -1 indicates it's a new, unsaved image
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
                    <button type="button" class="remove-image-btn" data-index="${index}" data-url="${url}">&times;</button>
                </div>
            `;
            col.querySelector('.remove-image-btn').addEventListener('click', function() {
                col.remove();
            });
            return col;
        }

        saveChangesBtn.addEventListener('click', () => {
            // Find site in global data array
            const siteIndex = SITES_DATA.findIndex(s => s.id === site.id);
            if (siteIndex === -1) return;

            // Update text fields
            SITES_DATA[siteIndex].name = document.getElementById('editSiteName').value;
            SITES_DATA[siteIndex].clientName = document.getElementById('editClientName').value;
            // ... update all other fields
            SITES_DATA[siteIndex].architectName = document.getElementById('editArchitectName').value;
            SITES_DATA[siteIndex].address = document.getElementById('editAddress').value;
            SITES_DATA[siteIndex].startDate = document.getElementById('editStartDate').value;
            SITES_DATA[siteIndex].endDate = document.getElementById('editEndDate').value;
            SITES_DATA[siteIndex].latitude = parseFloat(document.getElementById('editLatitude').value);
            SITES_DATA[siteIndex].longitude = parseFloat(document.getElementById('editLongitude').value);

            // Update images
            const remainingImageUrls = [...galleryContainer.querySelectorAll('.remove-image-btn')]
                .map(btn => btn.dataset.url);

            SITES_DATA[siteIndex].imageUrls = remainingImageUrls;

            // Re-render profile with updated data
            renderSiteProfile(SITES_DATA[siteIndex]);
            editModal.hide();
        });
    }
}); 