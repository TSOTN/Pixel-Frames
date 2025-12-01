document.getElementById('year').textContent = new Date().getFullYear();

// Data will be loaded from API
let data = [];
const resultsContainer = document.getElementById('results');

// Loading state
function showLoading() {
  resultsContainer.innerHTML = `
    <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
      <div style="font-size: 3rem; margin-bottom: 20px;">⏳</div>
      <p style="color: var(--muted); font-size: 1.2rem;">Cargando recomendaciones...</p>
    </div>
  `;
}

// Error state
function showError(message) {
  resultsContainer.innerHTML = `
    <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
      <div style="font-size: 3rem; margin-bottom: 20px;">❌</div>
      <p style="color: var(--accent2); font-size: 1.2rem; margin-bottom: 10px;">Error al cargar</p>
      <p style="color: var(--muted);">${message}</p>
    </div>
  `;
}

// Load data from API
async function loadRecommendations() {
  showLoading();

  try {
    data = await api.getRecommendations();
    renderCards(data);
  } catch (error) {
    console.error('Error loading recommendations:', error);
    showError('No se pudo conectar con el servidor. Usando datos de ejemplo.');

    // Fallback to static data for development
    data = [
      { juego: 'GTA VI', juegoImg: 'https://img.youtube.com/vi/QdBZY2fkU-0/maxresdefault.jpg', juegoDesc: 'Acción en mundo abierto, crimen organizado y persecuciones intensas en Vice City.', pelicula: 'Heat', peliculaImg: 'https://img.youtube.com/vi/2Gfetl9o2V8/maxresdefault.jpg', peliculaDesc: 'Clásico del cine criminal (1995) con Al Pacino y Robert De Niro.' },
      { juego: 'Cyberpunk 2077', juegoImg: 'https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg', juegoDesc: 'RPG de mundo abierto en Night City.', pelicula: 'Blade Runner 2049', peliculaImg: 'https://img.youtube.com/vi/gCcx85zbxz4/maxresdefault.jpg', peliculaDesc: 'Secuela del clásico sci-fi.' }
    ];
    renderCards(data);
  }
}

function renderCards(items) {
  resultsContainer.innerHTML = '';
  items.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'card-container';
    card.innerHTML = `
      <div class="card" data-index="${index}">
        <div class="card-front">
          <img src="${item.juegoImg}" alt="${item.juego}" onerror="this.src='https://via.placeholder.com/300x200/111122/00ffff?text=${encodeURIComponent(item.juego)}'" />
          <h3>🎮 ${item.juego}</h3>
          <p class="relation">${item.juegoDesc}</p>
          <button class="flip-card-btn" onclick="flipCard(${index})">Ver película recomendada ➜</button>
        </div>
        <div class="card-back">
          <img src="${item.peliculaImg}" alt="${item.pelicula}" onerror="this.src='https://via.placeholder.com/300x200/111122/ff00c8?text=${encodeURIComponent(item.pelicula)}'" />
          <h3>🎬 ${item.pelicula}</h3>
          <p class="relation">${item.peliculaDesc}</p>
          <button class="flip-card-btn" onclick="flipCard(${index})">← Ver videojuego</button>
        </div>
      </div>
    `;
    resultsContainer.appendChild(card);
  });
}

function flipCard(index) {
  const card = document.querySelector(`.card[data-index="${index}"]`);
  card.classList.toggle('flipped');
}

function flipAll() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => card.classList.toggle('flipped'));
}

function showGames() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => card.classList.remove('flipped'));
}

function showMovies() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => card.classList.add('flipped'));
}

function filterContent() {
  const term = document.getElementById('search').value.toLowerCase();
  const filtered = data.filter(d =>
    d.juego.toLowerCase().includes(term) || d.pelicula.toLowerCase().includes(term)
  );
  renderCards(filtered.length ? filtered : data);
}

document.getElementById('search-btn')?.addEventListener('click', function (e) {
  e.preventDefault();
  document.getElementById('search').focus();
});

// Initialize - load data from API
loadRecommendations();