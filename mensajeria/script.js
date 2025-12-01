document.getElementById('year').textContent = new Date().getFullYear();

document.getElementById('search-btn')?.addEventListener('click', function (e) {
    e.preventDefault();
    alert('Funcionalidad de búsqueda próximamente');
});

document.querySelectorAll('.conversation-item').forEach(item => {
    item.addEventListener('click', function () {
        document.querySelectorAll('.conversation-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
    });
});
