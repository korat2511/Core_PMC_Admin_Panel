document.addEventListener('DOMContentLoaded', function() {
    const durationButtons = document.querySelectorAll('.duration-btn');
    const fromDateInput = document.getElementById('from-date');
    const toDateInput = document.getElementById('to-date');
    const selectAllPartsCheckbox = document.getElementById('select-all-parts');
    const partCheckboxes = document.querySelectorAll('.list-group-item .form-check-input');

    // --- Helper function to format dates ---
    function getFormattedDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    
    // --- Initialize default date range (Today) ---
    function setDateRange(duration) {
        const today = new Date();
        let fromDate = new Date();
        
        switch(duration) {
            case 'today':
                break;
            case 'yesterday':
                fromDate.setDate(today.getDate() - 1);
                break;
            case '7days':
                fromDate.setDate(today.getDate() - 6);
                break;
            case '15days':
                fromDate.setDate(today.getDate() - 14);
                break;
            default:
                fromDateInput.value = '';
                toDateInput.value = '';
                return;
        }
        
        fromDateInput.value = getFormattedDate(fromDate);
        toDateInput.value = getFormattedDate(today);
    }
    
    // Set initial state
    setDateRange('today');

    // --- Duration Button Logic ---
    durationButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button style
            durationButtons.forEach(btn => {
                btn.classList.remove('btn-primary');
                btn.classList.add('btn-outline-secondary');
            });
            this.classList.add('btn-primary');
            this.classList.remove('btn-outline-secondary');

            const duration = this.dataset.duration;
            
            // Enable/disable date inputs
            if (duration === 'specific') {
                fromDateInput.disabled = false;
                toDateInput.disabled = false;
                fromDateInput.value = '';
                toDateInput.value = '';
            } else {
                fromDateInput.disabled = true;
                toDateInput.disabled = true;
                setDateRange(duration);
            }
        });
    });

    // --- "Select All" Checkbox Logic ---
    selectAllPartsCheckbox.addEventListener('change', function() {
        partCheckboxes.forEach(checkbox => {
            checkbox.checked = this.checked;
        });
    });

    // --- Individual Checkbox Logic ---
    partCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (!this.checked) {
                selectAllPartsCheckbox.checked = false;
            } else {
                const allChecked = Array.from(partCheckboxes).every(cb => cb.checked);
                if (allChecked) {
                    selectAllPartsCheckbox.checked = true;
                }
            }
        });
    });

    // --- Form Submission Logic ---
    const reportForm = document.getElementById('site-report-form');
    reportForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const selectedParts = Array.from(partCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);
            
        const reportData = {
            site: document.getElementById('site-select').value,
            fromDate: fromDateInput.value,
            toDate: toDateInput.value,
            parts: selectedParts
        };
        
        alert('Report Generated! Check the console for details.');
        console.log('Report Parameters:', reportData);
    });

    const selectAllCheckbox = document.getElementById('select-all-parts');
    const allParentCheckboxes = document.querySelectorAll('#report-parts-list > .list-group-item .form-check-input:not(.sub-options-list .form-check-input)');

    // Function to update the main "Select All" checkbox state
    function updateSelectAllCheckbox() {
        const allChecked = Array.from(allParentCheckboxes).every(cb => cb.checked);
        const someChecked = Array.from(allParentCheckboxes).some(cb => cb.checked || cb.indeterminate);
        
        selectAllCheckbox.checked = allChecked;
        if (!allChecked && someChecked) {
            selectAllCheckbox.indeterminate = true;
        } else {
            selectAllCheckbox.indeterminate = false;
        }
    }

    // Handle "Select All" checkbox changes
    selectAllCheckbox.addEventListener('change', (e) => {
        allParentCheckboxes.forEach(checkbox => {
            checkbox.checked = e.target.checked;
            checkbox.indeterminate = false;
            // Trigger change event to update sub-checkboxes if any
            checkbox.dispatchEvent(new Event('change'));
        });
    });

    // Handle parent and child checkbox relationships
    document.querySelectorAll('#report-parts-list .list-group-item').forEach(item => {
        const parentCheckbox = item.querySelector('.form-check-input[data-bs-target]');
        const subListId = parentCheckbox?.dataset.bsTarget;

        if (subListId) {
            const subList = document.querySelector(subListId);
            const childCheckboxes = subList.querySelectorAll('.form-check-input');

            // 1. Parent controls children
            parentCheckbox.addEventListener('change', (e) => {
                if (!e.target.indeterminate) {
                    childCheckboxes.forEach(child => {
                        child.checked = e.target.checked;
                    });
                }
                 updateSelectAllCheckbox();
            });

            // 2. Children control parent
            childCheckboxes.forEach(child => {
                child.addEventListener('change', () => {
                    const allChecked = Array.from(childCheckboxes).every(c => c.checked);
                    const someChecked = Array.from(childCheckboxes).some(c => c.checked);

                    parentCheckbox.checked = allChecked;
                    parentCheckbox.indeterminate = someChecked && !allChecked;
                    updateSelectAllCheckbox();
                });
            });
        } else {
             const regularCheckbox = item.querySelector('.form-check-input');
             if(regularCheckbox) {
                regularCheckbox.addEventListener('change', updateSelectAllCheckbox);
             }
        }
    });

    // Initial state setup
    updateSelectAllCheckbox();
}); 