const express = require('express');
const router = express.Router();
const db = require('../config/database');

// GET all recommendations (games + movies)
router.get('/', async (req, res) => {
    try {
        const result = await db.query(`
      SELECT 
        r.id,
        g.id as game_id, g.name as game_name, g.description as game_description, g.image_url as game_image,
        m.id as movie_id, m.name as movie_name, m.description as movie_description, m.image_url as movie_image
      FROM recommendations r
      JOIN games g ON r.game_id = g.id
      JOIN movies m ON r.movie_id = m.id
      ORDER BY r.created_at DESC
    `);

        const formatted = result.rows.map(row => ({
            id: row.id,
            juego: row.game_name,
            juegoImg: row.game_image,
            juegoDesc: row.game_description,
            pelicula: row.movie_name,
            peliculaImg: row.movie_image,
            peliculaDesc: row.movie_description
        }));

        res.json(formatted);
    } catch (err) {
        console.error('Error fetching recommendations:', err);
        res.status(500).json({ error: 'Failed to fetch recommendations' });
    }
});

// GET single recommendation
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query(`
      SELECT 
        r.id,
        g.id as game_id, g.name as game_name, g.description as game_description, g.image_url as game_image,
        m.id as movie_id, m.name as movie_name, m.description as movie_description, m.image_url as movie_image
      FROM recommendations r
      JOIN games g ON r.game_id = g.id
      JOIN movies m ON r.movie_id = m.id
      WHERE r.id = $1
    `, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Recommendation not found' });
        }

        const row = result.rows[0];
        res.json({
            id: row.id,
            juego: row.game_name,
            juegoImg: row.game_image,
            juegoDesc: row.game_description,
            pelicula: row.movie_name,
            peliculaImg: row.movie_image,
            peliculaDesc: row.movie_description
        });
    } catch (err) {
        console.error('Error fetching recommendation:', err);
        res.status(500).json({ error: 'Failed to fetch recommendation' });
    }
});

// POST create new recommendation
router.post('/', async (req, res) => {
    try {
        const { game_id, movie_id } = req.body;

        if (!game_id || !movie_id) {
            return res.status(400).json({ error: 'game_id and movie_id are required' });
        }

        const result = await db.query(
            'INSERT INTO recommendations (game_id, movie_id) VALUES ($1, $2) RETURNING *',
            [game_id, movie_id]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error creating recommendation:', err);
        res.status(500).json({ error: 'Failed to create recommendation' });
    }
});

// DELETE recommendation
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query('DELETE FROM recommendations WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Recommendation not found' });
        }

        res.json({ message: 'Recommendation deleted', deleted: result.rows[0] });
    } catch (err) {
        console.error('Error deleting recommendation:', err);
        res.status(500).json({ error: 'Failed to delete recommendation' });
    }
});

module.exports = router;
