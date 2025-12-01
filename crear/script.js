// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Search button handler
document.getElementById('search-btn')?.addEventListener('click', e => {
    e.preventDefault();
    alert('Funcionalidad de búsqueda próximamente');
});

// Type button handlers
document.querySelectorAll('.type-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

// Tag remove handlers
document.querySelectorAll('.tag button').forEach(btn => {
    btn.addEventListener('click', function () {
        this.parentElement.remove();
    });
});

// Publish button handler
document.querySelector('.btn-primary')?.addEventListener('click', () => {
    alert('Publicación creada correctamente');
});
