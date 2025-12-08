import express from 'express';
import ContactMessage from '../models/ContactMessage.js';

const router = express.Router();

// Submit contact message
router.post('/', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        const contactMessage = new ContactMessage({
            name,
            email,
            message
        });

        await contactMessage.save();

        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        console.error('Contact message error:', error);
        res.status(500).json({ error: 'Failed to send message' });
    }
});

export default router;
