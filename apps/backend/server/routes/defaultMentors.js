import express from 'express';
import DefaultMentor from '../models/DefaultMentor.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all default mentors
router.get('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const mentors = await DefaultMentor.find().sort({ name: 1 });
    res.json(mentors);
  } catch (error) {
    console.error('Get default mentors error:', error);
    res.status(500).json({ error: 'Failed to fetch default mentors' });
  }
});

// Get default mentor by ID
router.get('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const mentor = await DefaultMentor.findById(req.params.id);
    
    if (!mentor) {
      return res.status(404).json({ error: 'Default mentor not found' });
    }
    
    res.json(mentor);
  } catch (error) {
    console.error('Get default mentor error:', error);
    res.status(500).json({ error: 'Failed to fetch default mentor' });
  }
});

// Create new default mentor
router.post('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const { name, phone, email } = req.body;
    
    // Validate required fields
    if (!name || !phone || !email) {
      return res.status(400).json({ error: 'Name, phone, and email are required' });
    }
    
    // Check if mentor already exists
    const existingMentor = await DefaultMentor.findOne({ email: new RegExp(`^${email}$`, 'i') });
    if (existingMentor) {
      return res.status(409).json({ error: 'Default mentor with this email already exists' });
    }
    
    const newMentor = new DefaultMentor({ name, phone, email });
    await newMentor.save();
    
    res.status(201).json(newMentor);
  } catch (error) {
    console.error('Create default mentor error:', error);
    res.status(500).json({ error: 'Failed to create default mentor' });
  }
});

// Update default mentor
router.put('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const { name, phone, email } = req.body;
    
    const updateData = {};
    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    if (email) updateData.email = email;
    
    const mentor = await DefaultMentor.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!mentor) {
      return res.status(404).json({ error: 'Default mentor not found' });
    }
    
    res.json(mentor);
  } catch (error) {
    console.error('Update default mentor error:', error);
    res.status(500).json({ error: 'Failed to update default mentor' });
  }
});

// Delete default mentor
router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const mentor = await DefaultMentor.findByIdAndDelete(req.params.id);
    
    if (!mentor) {
      return res.status(404).json({ error: 'Default mentor not found' });
    }
    
    res.json({ message: 'Default mentor deleted successfully' });
  } catch (error) {
    console.error('Delete default mentor error:', error);
    res.status(500).json({ error: 'Failed to delete default mentor' });
  }
});

export default router;