document.addEventListener('DOMContentLoaded', function () {
    const photoInput = document.getElementById('site-photos');
    const previewContainer = document.getElementById('photo-preview-container');
    let selectedFiles = [];

    photoInput.addEventListener('change', handleFiles);

    function handleFiles(event) {
        const files = Array.from(event.target.files);
        files.forEach(file => {
            if (!selectedFiles.some(f => f.name === file.name && f.size === file.size)) {
                selectedFiles.push(file);
            }
        });
        updatePreview();
        updateFileInput();
    }

    function updatePreview() {
        previewContainer.innerHTML = ''; // Clear existing previews
        if (selectedFiles.length > 0) {
            previewContainer.classList.add('has-files');
        } else {
            previewContainer.classList.remove('has-files');
        }

        selectedFiles.forEach((file, index) => {
            const reader = new FileReader();
            reader.onload = function (e) {
                const wrapper = document.createElement('div');
                wrapper.classList.add('preview-image-wrapper');

                const img = document.createElement('img');
                img.src = e.target.result;
                
                const removeBtn = document.createElement('div');
                removeBtn.classList.add('remove-btn');
                removeBtn.innerHTML = '&times;';
                removeBtn.addEventListener('click', () => {
                    selectedFiles.splice(index, 1);
                    updatePreview();
                    updateFileInput();
                });

                wrapper.appendChild(img);
                wrapper.appendChild(removeBtn);
                previewContainer.appendChild(wrapper);
            };
            reader.readAsDataURL(file);
        });
    }
    
    function updateFileInput() {
        // This is a workaround to update the FileList in the input
        const dataTransfer = new DataTransfer();
        selectedFiles.forEach(file => {
            dataTransfer.items.add(file);
        });
        photoInput.files = dataTransfer.files;
    }

    const form = document.getElementById('create-site-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        // Mock submission
        alert('Site creation submitted successfully (mock)!');
        console.log('Site Name:', document.getElementById('site-name').value);
        console.log('Client Name:', document.getElementById('client-name').value);
        console.log('Architect Name:', document.getElementById('architect-name').value);
        console.log('Start Date:', document.getElementById('start-date').value);
        console.log('End Date:', document.getElementById('end-date').value);
        console.log('Photos:', selectedFiles);
        
        // Here you would typically send the data to a server
        // For now, we'll just reset the form
        form.reset();
        selectedFiles = [];
        updatePreview();
    });
}); 