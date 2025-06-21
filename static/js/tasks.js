document.addEventListener('DOMContentLoaded', () => {
    const ALL_USERS = [
        { id: 'user-1', name: 'Rutvik Korat', avatar: 'https://i.pravatar.cc/150?u=user-1' },
        { id: 'user-2', name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?u=user-2' },
        { id: 'user-3', name: 'Mike Johnson', avatar: 'https://i.pravatar.cc/150?u=user-3' },
        { id: 'user-4', name: 'Emily Davis', avatar: 'https://i.pravatar.cc/150?u=user-4' },
        { id: 'user-5', name: 'Chris Brown', avatar: 'https://i.pravatar.cc/150?u=user-5' },
    ];

    const TASK_CATEGORIES = ['Excavation', 'Concrete', 'Masonry', 'Framing', 'Plumbing', 'Electrical', 'Finishing'];
    const TASK_STATUSES = ['Active', 'Completed', 'Pending', 'Overdue'];
    const TASK_VERBS = ['Install', 'Review', 'Finalize', 'Construct', 'Survey', 'Inspect', 'Approve', 'Repair'];
    const TASK_NOUNS = ['Foundation', 'Electrical Wiring', 'Plumbing System', 'Structural Beams', 'Roofing', 'HVAC Unit', 'Window Frames'];

    // --- Data Generation ---
    function generateDummyTasks(count) {
        const tasks = [];
        for (let i = 1; i <= count; i++) {
            const startDate = new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
            const endDate = new Date(startDate.getTime() + (Math.floor(Math.random() * 30) + 1) * 24 * 60 * 60 * 1000);
            const status = TASK_STATUSES[Math.floor(Math.random() * TASK_STATUSES.length)];
            const progress = status === 'Completed' ? 100 : (status === 'Pending' ? 0 : Math.floor(Math.random() * 90) + 10);
            
            const assignedUsers = [...ALL_USERS].sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1);

            tasks.push({
                id: `task-${i}`,
                name: `${TASK_VERBS[Math.floor(Math.random() * TASK_VERBS.length)]} ${TASK_NOUNS[Math.floor(Math.random() * TASK_NOUNS.length)]}`,
                site: SITES_DATA[Math.floor(Math.random() * SITES_DATA.length)],
                category: TASK_CATEGORIES[Math.floor(Math.random() * TASK_CATEGORIES.length)],
                startDate: startDate.toISOString().split('T')[0],
                endDate: endDate.toISOString().split('T')[0],
                assignedUsers: assignedUsers,
                progress: progress,
                status: status,
            });
        }
        return tasks;
    }
    
    const TASKS_DATA = generateDummyTasks(50);
    let dataTable;

    // --- DOM Elements ---
    const searchInput = document.getElementById('search-name');
    const resetBtn = document.getElementById('reset-filters');
    
    // Filter menus
    const siteMenu = document.getElementById('filter-site-menu');
    const categoryMenu = document.getElementById('filter-category-menu');
    const statusMenu = document.getElementById('filter-status-menu');
    const userMenu = document.getElementById('filter-user-menu');
    
    // Filter buttons
    const siteBtn = document.getElementById('filter-site-btn');
    const categoryBtn = document.getElementById('filter-category-btn');
    const statusBtn = document.getElementById('filter-status-btn');
    const userBtn = document.getElementById('filter-user-btn');

    const startDateFromInput = document.getElementById('startDateFrom');
    const startDateToInput = document.getElementById('startDateTo');
    
    let currentFilters = {
        name: '',
        siteIds: [],
        categories: [],
        statuses: [],
        userIds: [],
        startDateFrom: '',
        startDateTo: ''
    };

    // --- DataTable Initialization ---
    function initializeDataTable() {
        dataTable = $('#task-list-table').DataTable({
            data: TASKS_DATA,
            columns: [
                { data: 'name', title: 'Task Name' },
                { data: 'category', title: 'Category' },
                { data: 'site.name', title: 'Site' },
                { 
                    data: 'startDate', 
                    title: 'Start Date',
                    render: function(data) {
                        if (!data) return '';
                        const date = new Date(data);
                        const day = String(date.getDate()).padStart(2, '0');
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const year = date.getFullYear();
                        return `${day}/${month}/${year}`;
                    }
                },
                { 
                    data: 'endDate', 
                    title: 'End Date',
                    render: function(data) {
                        if (!data) return '';
                        const date = new Date(data);
                        const day = String(date.getDate()).padStart(2, '0');
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const year = date.getFullYear();
                        return `${day}/${month}/${year}`;
                    }
                },
                { 
                    data: 'assignedUsers',
                    title: 'Assigned Users',
                    render: function (data) {
                        return `<div class="user-avatar-stack">${data.map(user => `<img src="${user.avatar}" alt="${user.name}" class="user-avatar" title="${user.name}">`).join('')}</div>`;
                    },
                    orderable: false
                },
                { 
                    data: 'progress',
                    title: 'Progress',
                    className: 'progress-column',
                    render: function (data) {
                        return `<div class="progress"><div class="progress-bar" role="progressbar" style="width: ${data}%" aria-valuenow="${data}"></div></div>`;
                    }
                },
                { 
                    data: 'status',
                    title: 'Status',
                    render: function (data) {
                        return `<span class="status-badge status-${data.toLowerCase()}">${data}</span>`;
                    }
                },
                {
                    data: null,
                    title: 'Actions',
                    orderable: false,
                    render: function () {
                        return `<a href="task-profile.html" class="btn btn-sm btn-outline-primary" title="View"><i class="fas fa-eye"></i></a>
                                <button class="btn btn-sm btn-primary" title="Update"><i class="fas fa-edit"></i></button>`;
                    }
                }
            ],
            paging: true,
            pagingType: 'simple',
            lengthChange: false,
            pageLength: 10,
            searching: false, // We use a custom search box
            info: true,
            dom: '<"row"<"col-sm-12"t>><"row"<"col-sm-12 col-md-5"i><"col-sm-12 col-md-7"p>>',
            language: {
                paginate: {
                    previous: '<i class="fas fa-chevron-left"></i> Previous',
                    next:     'Next <i class="fas fa-chevron-right"></i>'
                }
            }
        });
    }

    // --- Custom Filtering Logic ---
    $.fn.dataTable.ext.search.push(
        function(settings, data, dataIndex) {
            const task = TASKS_DATA[dataIndex];
            const nameMatch = task.name.toLowerCase().includes(currentFilters.name.toLowerCase());
            const siteMatch = currentFilters.siteIds.length === 0 || currentFilters.siteIds.includes(task.site.id);
            const categoryMatch = currentFilters.categories.length === 0 || currentFilters.categories.includes(task.category);
            const statusMatch = currentFilters.statuses.length === 0 || currentFilters.statuses.includes(task.status);
            const userMatch = currentFilters.userIds.length === 0 || task.assignedUsers.some(user => currentFilters.userIds.includes(user.id));
            
            const taskStartDate = new Date(task.startDate);
            const fromDate = currentFilters.startDateFrom ? new Date(currentFilters.startDateFrom) : null;
            const toDate = currentFilters.startDateTo ? new Date(currentFilters.startDateTo) : null;
            const dateMatch = (!fromDate || taskStartDate >= fromDate) && (!toDate || taskStartDate <= toDate);

            return nameMatch && siteMatch && categoryMatch && statusMatch && userMatch && dateMatch;
        }
    );

    // --- Populate Filters ---
    function populateFilters() {
        populateCheckboxFilter(siteMenu, SITES_DATA, 'site');
        populateCheckboxFilter(categoryMenu, TASK_CATEGORIES, 'category');
        populateCheckboxFilter(statusMenu, TASK_STATUSES, 'status');
        populateCheckboxFilter(userMenu, ALL_USERS, 'user');
    }

    function populateCheckboxFilter(menu, items, type) {
        menu.innerHTML = '';
        items.forEach((item, index) => {
            const id = type === 'site' ? item.id : (type === 'user' ? item.id : item);
            const name = type === 'site' ? item.name : (type === 'user' ? item.name : item);
            const domId = `${type}-${String(id).replace(/\s+/g, '-')}-${index}`;

            const listItem = document.createElement('div');
            listItem.className = 'form-check ms-1';
            listItem.innerHTML = `
                <input class="form-check-input" type="checkbox" value="${id}" id="${domId}">
                <label class="form-check-label" for="${domId}">${name}</label>
            `;
            menu.appendChild(listItem);
        });
    }
    
    function updateButtonText(button, count, label, defaultText) {
        if (count === 0) {
            button.textContent = defaultText || `All ${label}`;
        } else {
            button.textContent = `${label} (${count} selected)`;
        }
    }

    // --- Event Listeners ---
    function setupEventListeners() {
        searchInput.addEventListener('input', e => {
            currentFilters.name = e.target.value;
            dataTable.draw();
        });

        siteMenu.addEventListener('change', e => {
            if (e.target.type === 'checkbox') {
                currentFilters.siteIds = [...siteMenu.querySelectorAll('input:checked')].map(el => el.value);
                updateButtonText(siteBtn, currentFilters.siteIds.length, 'Sites', 'All Sites');
                dataTable.draw();
            }
        });

        categoryMenu.addEventListener('change', e => {
            if (e.target.type === 'checkbox') {
                currentFilters.categories = [...categoryMenu.querySelectorAll('input:checked')].map(el => el.value);
                updateButtonText(categoryBtn, currentFilters.categories.length, 'Categories', 'All Categories');
                dataTable.draw();
            }
        });

        statusMenu.addEventListener('change', e => {
            if (e.target.type === 'checkbox') {
                currentFilters.statuses = [...statusMenu.querySelectorAll('input:checked')].map(el => el.value);
                updateButtonText(statusBtn, currentFilters.statuses.length, 'Status', 'Status: All');
                dataTable.draw();
            }
        });
        
        userMenu.addEventListener('change', e => {
            if (e.target.type === 'checkbox') {
                currentFilters.userIds = [...userMenu.querySelectorAll('input:checked')].map(el => el.value);
                updateButtonText(userBtn, currentFilters.userIds.length, 'Users', 'All Users');
                dataTable.draw();
            }
        });

        startDateFromInput.addEventListener('change', e => {
            currentFilters.startDateFrom = e.target.value;
            dataTable.draw();
        });

        startDateToInput.addEventListener('change', e => {
            currentFilters.startDateTo = e.target.value;
            dataTable.draw();
        });

        resetBtn.addEventListener('click', () => {
            currentFilters = { name: '', siteIds: [], categories: [], statuses: [], userIds: [], startDateFrom: '', startDateTo: '' };
            searchInput.value = '';
            document.querySelectorAll('.dropdown-menu input[type="checkbox"]').forEach(cb => cb.checked = false);
            updateButtonText(siteBtn, 0, 'Sites', 'All Sites');
            updateButtonText(categoryBtn, 0, 'Categories', 'All Categories');
            updateButtonText(statusBtn, 0, 'Status', 'Status: All');
            updateButtonText(userBtn, 0, 'Users', 'All Users');
            dataTable.draw();
        });
    }

    function applyUrlParameters() {
        const urlParams = new URLSearchParams(window.location.search);
        const status = urlParams.get('status');
        const site = urlParams.get('site');

        if (status && status !== 'all') {
            currentFilters.statuses = [status];
            const statusCheckbox = statusMenu.querySelector(`input[value="${status}"]`);
            if (statusCheckbox) {
                statusCheckbox.checked = true;
            }
            updateButtonText(statusBtn, 1, 'Status', 'Status: All');
        }

        if (site) {
            currentFilters.siteIds = [site];
             const siteCheckbox = siteMenu.querySelector(`input[value="${site}"]`);
            if (siteCheckbox) {
                siteCheckbox.checked = true;
            }
            updateButtonText(siteBtn, 1, 'Sites', 'All Sites');
        }
    }

    // --- Initial Load ---
    populateFilters();
    initializeDataTable();
    applyUrlParameters();
    dataTable.draw();
    setupEventListeners();
}); 