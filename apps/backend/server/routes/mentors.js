import express from 'express';
import Mentor from '../models/Mentor.js';

const router = express.Router();

// Get all active mentors
router.get('/', async (req, res) => {
    try {
        const mentors = await Mentor.find({ active: true })
            .sort({ display_order: 1 });

        res.json(mentors);
    } catch (error) {
        console.error('Get mentors error:', error);
        res.status(500).json({ error: 'Failed to fetch mentors' });
    }
});

// Get mentor by ID
router.get('/:id', async (req, res) => {
    try {
        const mentor = await Mentor.findOne({
            _id: req.params.id,
            active: true
        });

        if (!mentor) {
            return res.status(404).json({ error: 'Mentor not found' });
        }

        res.json(mentor);
    } catch (error) {
        console.error('Get mentor error:', error);
        res.status(500).json({ error: 'Failed to fetch mentor' });
    }
});

export default router;
