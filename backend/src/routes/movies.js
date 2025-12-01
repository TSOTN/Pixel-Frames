const express = require('express');
const router = express.Router();
const db = require('../config/database');

// GET all movies
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM movies ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching movies:', err);
        res.status(500).json({ error: 'Failed to fetch movies' });
    }
});

// GET single movie
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query('SELECT * FROM movies WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching movie:', err);
        res.status(500).json({ error: 'Failed to fetch movie' });
    }
});

// POST create movie
router.post('/', async (req, res) => {
    try {
        const { name, description, image_url } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }

        const result = await db.query(
            'INSERT INTO movies (name, description, image_url) VALUES ($1, $2, $3) RETURNING *',
            [name, description, image_url]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error creating movie:', err);
        res.status(500).json({ error: 'Failed to create movie' });
    }
});

// PUT update movie
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, image_url } = req.body;

        const result = await db.query(
            'UPDATE movies SET name = COALESCE($1, name), description = COALESCE($2, description), image_url = COALESCE($3, image_url) WHERE id = $4 RETURNING *',
            [name, description, image_url, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error updating movie:', err);
        res.status(500).json({ error: 'Failed to update movie' });
    }
});

// DELETE movie
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query('DELETE FROM movies WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        res.json({ message: 'Movie deleted', deleted: result.rows[0] });
    } catch (err) {
        console.error('Error deleting movie:', err);
        res.status(500).json({ error: 'Failed to delete movie' });
    }
});

module.exports = router;
