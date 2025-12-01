const express = require('express');
const router = express.Router();
const db = require('../config/database');

// GET all games
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM games ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching games:', err);
        res.status(500).json({ error: 'Failed to fetch games' });
    }
});

// GET single game
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query('SELECT * FROM games WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Game not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching game:', err);
        res.status(500).json({ error: 'Failed to fetch game' });
    }
});

// POST create game
router.post('/', async (req, res) => {
    try {
        const { name, description, image_url } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }

        const result = await db.query(
            'INSERT INTO games (name, description, image_url) VALUES ($1, $2, $3) RETURNING *',
            [name, description, image_url]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error creating game:', err);
        res.status(500).json({ error: 'Failed to create game' });
    }
});

// PUT update game
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, image_url } = req.body;

        const result = await db.query(
            'UPDATE games SET name = COALESCE($1, name), description = COALESCE($2, description), image_url = COALESCE($3, image_url) WHERE id = $4 RETURNING *',
            [name, description, image_url, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Game not found' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error updating game:', err);
        res.status(500).json({ error: 'Failed to update game' });
    }
});

// DELETE game
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await db.query('DELETE FROM games WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Game not found' });
        }

        res.json({ message: 'Game deleted', deleted: result.rows[0] });
    } catch (err) {
        console.error('Error deleting game:', err);
        res.status(500).json({ error: 'Failed to delete game' });
    }
});

module.exports = router;
