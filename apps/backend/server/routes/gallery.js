import express from 'express';
import GalleryImage from '../models/GalleryImage.js';

const router = express.Router();

// Public: get visible gallery images
router.get('/', async (req, res) => {
  try {
    const images = await GalleryImage.find({ hidden: false }).sort({ created_at: -1 });
    res.json(images);
  } catch (error) {
    console.error('Get gallery error:', error);
    res.status(500).json({ error: 'Failed to fetch gallery images' });
  }
});

export default router;
