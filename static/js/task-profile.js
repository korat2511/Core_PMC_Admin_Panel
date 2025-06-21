document.addEventListener('DOMContentLoaded', function () {
    const ALL_USERS = [
        { id: 'user-1', name: 'Rutvik Korat', role: 'Site Supervisor', avatar: 'https://i.pravatar.cc/150?u=user-1' },
        { id: 'user-2', name: 'Jane Smith', role: 'Project Manager', avatar: 'https://i.pravatar.cc/150?u=user-2' },
        { id: 'user-3', name: 'Mike Johnson', role: 'Lead Engineer', avatar: 'https://i.pravatar.cc/150?u=user-3' },
        { id: 'user-4', name: 'Emily Davis', role: 'Architect', avatar: 'https://i.pravatar.cc/150?u=user-4' },
        { id: 'user-5', name: 'Chris Brown', role: 'Electrician', avatar: 'https://i.pravatar.cc/150?u=user-5' },
        { id: 'user-6', name: 'Sarah Wilson', role: 'Plumber', avatar: 'https://i.pravatar.cc/150?u=user-6' },
    ];

    // Mock Data for a single detailed task
    const taskData = {
        id: 'task-1',
        name: 'Finalize Foundation and Structural Beams',
        progress: 85,
        startDate: '2023-10-01',
        endDate: '2023-11-15',
        category: 'Structural',
        createdBy: {
            name: 'Rutvik Korat',
            avatar: 'https://i.pravatar.cc/150?u=user-1'
        },
        tag: 'Critical',
        price: '25000.00',
        unit: 'Cubic Meters',
        totalWork: '150',
        assignedUsers: [
            { id: 'user-2', name: 'Jane Smith', role: 'Project Manager', avatar: 'https://i.pravatar.cc/150?u=user-2' },
            { id: 'user-3', name: 'Mike Johnson', role: 'Lead Engineer', avatar: 'https://i.pravatar.cc/150?u=user-3' },
            { id: 'user-4', name: 'Emily Davis', role: 'Architect', avatar: 'https://i.pravatar.cc/150?u=user-4' }
        ],
        timeline: [
            { type: 'start', title: 'Task Created', time: '2023-10-01 09:00', color: 'primary' },
            { type: 'update', title: 'Initial Plans Approved', time: '2023-10-03 14:30', body: 'Blueprint version 1.2 was approved by the client.', color: 'success' },
            { type: 'update', title: 'Materials Ordered', time: '2023-10-05 11:00', body: 'Ordered 50 tons of concrete and 10 tons of steel rebar.', color: 'info' },
            { type: 'update', title: 'Foundation Pouring Began', time: '2023-10-15 08:00', color: 'warning' },
            { type: 'milestone', title: 'Foundation Cured', time: '2023-10-25 16:00', body: 'Foundation has successfully cured and passed initial stress tests.', color: 'success' },
            { type: 'update', title: 'Structural Beam Installation', time: '2023-11-01 10:00', color: 'primary' },
        ],
        images: [
            'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2070&auto=format&fit=crop',
        ],
        instructions: "1. Verify all rebar placements as per drawing A-102.\n2. Ensure concrete mix is of grade M25.\n3. Curing must be done for a minimum of 7 days.\n4. Post-curing strength test is mandatory.",
        remarks: "Client has requested a smoother finish on the north-facing wall. Please accommodate this request. Weather forecast predicts rain, take necessary precautions to cover fresh concrete.",
        comments: [
            {
                user: { name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?u=user-2' },
                time: '2023-11-02 10:15',
                text: "The team on site reports we are slightly ahead of schedule. Great work!"
            },
            {
                user: { name: 'Mike Johnson', avatar: 'https://i.pravatar.cc/150?u=user-3' },
                time: '2023-11-03 17:45',
                text: "We hit a patch of hard rock during excavation for the final beam support. It might cause a slight delay of a few hours tomorrow."
            }
        ],
        attachments: [
            { name: 'Foundation_Blueprint_v2.pdf', size: '2.5 MB', type: 'pdf' },
            { name: 'Site_Inspection_Photos.zip', size: '15.8 MB', type: 'zip' },
            { name: 'Material_Invoice_Q4.docx', size: '128 KB', type: 'doc' }
        ]
    };

    // --- RENDER FUNCTIONS ---

    function renderTaskDetails(task) {
        document.getElementById('task-name').textContent = task.name;
        
        // Progress Bar
        const progressBarContainer = document.getElementById('task-progress-bar');
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar bg-primary';
        progressBar.style.width = `${task.progress}%`;
        progressBar.setAttribute('aria-valuenow', task.progress);
        progressBar.setAttribute('aria-valuemin', '0');
        progressBar.setAttribute('aria-valuemax', '100');
        progressBar.textContent = `${task.progress}%`;
        progressBarContainer.appendChild(progressBar);

        document.getElementById('task-progress-text').textContent = `${task.progress}% Complete`;

        // Details
        document.getElementById('task-start-date').textContent = new Date(task.startDate).toLocaleDateString();
        document.getElementById('task-end-date').textContent = new Date(task.endDate).toLocaleDateString();
        document.getElementById('task-category').textContent = task.category;
        document.getElementById('task-created-by').textContent = task.createdBy.name;
        document.getElementById('task-tag').innerHTML = `<span class="badge bg-danger">${task.tag}</span>`;
        document.getElementById('task-price').textContent = `$${parseFloat(task.price).toLocaleString()}`;
        document.getElementById('task-unit').textContent = task.unit;
        document.getElementById('task-total-work').textContent = task.totalWork;
    }

    function renderAssignedUsers(users) {
        const container = document.getElementById('task-assigned-users');
        container.innerHTML = '';
        users.forEach(user => {
            const userHtml = `
                <div class="user-item">
                    <img src="${user.avatar}" alt="${user.name}" class="user-avatar">
                    <div class="user-info">
                        <div class="user-name">${user.name}</div>
                        <div class="user-role">${user.role}</div>
                    </div>
                </div>
            `;
            container.innerHTML += userHtml;
        });
    }

    function renderTimeline(timelineEvents) {
        const container = document.getElementById('task-timeline');
        container.innerHTML = '';
        timelineEvents.forEach(event => {
            const eventHtml = `
                <li class="timeline-item">
                    <div class="timeline-badge ${event.color}"></div>
                    <div class="timeline-panel">
                        <div class="timeline-heading d-flex justify-content-between">
                            <h4 class="timeline-title">${event.title}</h4>
                             <p class="text-muted"><small class="timeline-time">${new Date(event.time).toLocaleString()}</small></p>
                        </div>
                        ${event.body ? `<div class="timeline-body"><p>${event.body}</p></div>` : ''}
                    </div>
                </li>
            `;
            container.innerHTML += eventHtml;
        });
    }

    function renderImages(images) {
        const container = document.getElementById('task-images');
        container.innerHTML = '';
        images.forEach(imageUrl => {
            const imageHtml = `
                <div class="swiper-slide">
                    <img src="${imageUrl}" alt="Task Image">
                </div>
            `;
            container.innerHTML += imageHtml;
        });
    }

    function renderInstructions(instructions) {
        document.getElementById('task-instructions').innerText = instructions;
    }

    function renderRemarks(remarks) {
        document.getElementById('task-remarks').innerText = remarks;
    }

    function renderComments(comments) {
        const container = document.getElementById('task-comments');
        container.innerHTML = '';
        comments.forEach(comment => {
            const commentHtml = `
                <div class="comment-item">
                    <img src="${comment.user.avatar}" alt="${comment.user.name}" class="comment-avatar">
                    <div class="comment-content">
                        <div class="comment-header">
                            <strong>${comment.user.name}</strong> &middot; <span class="text-muted">${new Date(comment.time).toLocaleString()}</span>
                        </div>
                        <div class="comment-body">
                            ${comment.text}
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += commentHtml;
        });
    }

    function renderAttachments(attachments) {
        const container = document.getElementById('task-attachments');
        container.innerHTML = '';
        const iconMap = {
            pdf: 'fa-file-pdf',
            zip: 'fa-file-archive',
            doc: 'fa-file-word',
            docx: 'fa-file-word',
            png: 'fa-file-image',
            jpg: 'fa-file-image',
        };
        attachments.forEach(file => {
            const iconClass = iconMap[file.type] || 'fa-file';
            const attachmentHtml = `
                <div class="attachment-item">
                    <div class="attachment-icon"><i class="fas ${iconClass}"></i></div>
                    <div class="attachment-details">
                        <div class="attachment-name">${file.name}</div>
                        <div class="attachment-info">${file.size}</div>
                    </div>
                    <a href="#" class="btn btn-sm btn-outline-secondary ms-auto"><i class="fas fa-download"></i></a>
                </div>
            `;
            container.innerHTML += attachmentHtml;
        });
    }

    // --- MODAL LOGIC ---
    const manageUsersModalEl = document.getElementById('manageUsersModal');
    const modalBody = document.getElementById('manage-users-modal-body');
    const saveUsersBtn = document.getElementById('save-user-changes');

    function populateUsersModal() {
        modalBody.innerHTML = '';
        const assignedUserIds = new Set(taskData.assignedUsers.map(u => u.id));

        ALL_USERS.forEach(user => {
            const isChecked = assignedUserIds.has(user.id);
            const userHtml = `
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="${user.id}" id="user-check-${user.id}" ${isChecked ? 'checked' : ''}>
                    <label class="form-check-label d-flex align-items-center" for="user-check-${user.id}">
                        <img src="${user.avatar}" class="rounded-circle me-2" width="30" height="30" alt="${user.name}">
                        <div>
                            <strong>${user.name}</strong>
                            <div class="text-muted small">${user.role}</div>
                        </div>
                    </label>
                </div>
            `;
            modalBody.innerHTML += userHtml;
        });
    }

    function handleSaveUserChanges() {
        const selectedUserIds = new Set(
            [...modalBody.querySelectorAll('input[type="checkbox"]:checked')].map(input => input.value)
        );

        taskData.assignedUsers = ALL_USERS.filter(user => selectedUserIds.has(user.id));
        
        renderAssignedUsers(taskData.assignedUsers);
        
        const modalInstance = bootstrap.Modal.getInstance(manageUsersModalEl);
        modalInstance.hide();
    }
    
    // --- Edit Task Modal ---
    const editTaskModalEl = document.getElementById('editTaskModal');
    if (editTaskModalEl) {
        const editTaskForm = document.getElementById('edit-task-form');

        editTaskModalEl.addEventListener('show.bs.modal', () => {
            // Populate modal with current data
            document.getElementById('edit-task-name').value = taskData.name;
            document.getElementById('edit-start-date').value = taskData.startDate;
            document.getElementById('edit-end-date').value = taskData.endDate;
            document.getElementById('edit-price').value = parseFloat(taskData.price);
            document.getElementById('edit-tag').value = Array.isArray(taskData.tag) ? taskData.tag.join(', ') : taskData.tag;
            document.getElementById('edit-unit').value = taskData.unit;
            document.getElementById('edit-total-work').value = taskData.totalWork;

            // Handle restricted fields
            const canEditRestricted = taskData.progress === 0;
            document.getElementById('edit-unit').disabled = !canEditRestricted;
            document.getElementById('edit-total-work').disabled = !canEditRestricted;
        });

        document.getElementById('save-task-changes-btn').addEventListener('click', () => {
             if (!editTaskForm.checkValidity()) {
                editTaskForm.reportValidity();
                return;
            }

            // Update taskData object
            taskData.name = document.getElementById('edit-task-name').value;
            taskData.startDate = document.getElementById('edit-start-date').value;
            taskData.endDate = document.getElementById('edit-end-date').value;
            taskData.price = document.getElementById('edit-price').value;
            taskData.tag = document.getElementById('edit-tag').value.split(',').map(tag => tag.trim());

            if (taskData.progress === 0) {
                taskData.unit = document.getElementById('edit-unit').value;
                taskData.totalWork = document.getElementById('edit-total-work').value;
            }

            // Re-render details and close modal
            renderTaskDetails(taskData);
            const modalInstance = bootstrap.Modal.getInstance(editTaskModalEl);
            modalInstance.hide();
        });
    }

    // --- INITIALIZATION & EVENT LISTENERS ---

    renderTaskDetails(taskData);
    renderAssignedUsers(taskData.assignedUsers);
    renderTimeline(taskData.timeline);
    renderImages(taskData.images);
    renderInstructions(taskData.instructions);
    renderRemarks(taskData.remarks);
    renderComments(taskData.comments);
    renderAttachments(taskData.attachments);

    // Initialize Swiper
    new Swiper('.image-swiper', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    manageUsersModalEl.addEventListener('show.bs.modal', function (event) {
        populateUsersModal();
    });

    saveUsersBtn.addEventListener('click', handleSaveUserChanges);
}); 