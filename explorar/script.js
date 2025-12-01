// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Search button handler - this will be common across all pages
document.getElementById('search-btn')?.addEventListener('click', function (e) {
    e.preventDefault();
    // TODO: Implement search overlay
    alert('Funcionalidad de búsqueda próximamente');
});

// Add click handlers to explore cards
document.querySelectorAll('.explore-card').forEach(card => {
    card.addEventListener('click', function () {
        const title = this.querySelector('h3').textContent;
        console.log('Clicked:', title);
        // TODO: Implement navigation to filtered content
    });
});
