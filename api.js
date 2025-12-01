// API Configuration
const API_CONFIG = {
    // Change this to your Railway URL when deployed
    baseURL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:3000/api'
        : 'https://your-railway-app.railway.app/api'
};

// API Client
class ApiClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;

        try {
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers
                },
                ...options
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`API request failed: ${endpoint}`, error);
            throw error;
        }
    }

    // Recommendations
    async getRecommendations() {
        return this.request('/recommendations');
    }

    async getRecommendation(id) {
        return this.request(`/recommendations/${id}`);
    }

    async createRecommendation(data) {
        return this.request('/recommendations', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    async deleteRecommendation(id) {
        return this.request(`/recommendations/${id}`, {
            method: 'DELETE'
        });
    }

    // Games
    async getGames() {
        return this.request('/games');
    }

    async getGame(id) {
        return this.request(`/games/${id}`);
    }

    async createGame(data) {
        return this.request('/games', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    async updateGame(id, data) {
        return this.request(`/games/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    async deleteGame(id) {
        return this.request(`/games/${id}`, {
            method: 'DELETE'
        });
    }

    // Movies
    async getMovies() {
        return this.request('/movies');
    }

    async getMovie(id) {
        return this.request(`/movies/${id}`);
    }

    async createMovie(data) {
        return this.request('/movies', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    async updateMovie(id, data) {
        return this.request(`/movies/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    async deleteMovie(id) {
        return this.request(`/movies/${id}`, {
            method: 'DELETE'
        });
    }
}

// Export singleton instance
const api = new ApiClient(API_CONFIG.baseURL);
