import express from 'express';
import College from '../models/College.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get all colleges
router.get('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const colleges = await College.find().sort({ name: 1 });
    res.json(colleges);
  } catch (error) {
    console.error('Get colleges error:', error);
    res.status(500).json({ error: 'Failed to fetch colleges' });
  }
});

// Get college by ID
router.get('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const college = await College.findById(req.params.id);
    
    if (!college) {
      return res.status(404).json({ error: 'College not found' });
    }
    
    res.json(college);
  } catch (error) {
    console.error('Get college error:', error);
    res.status(500).json({ error: 'Failed to fetch college' });
  }
});

// Create new college
router.post('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const { name, location } = req.body;
    
    // Validate required fields
    if (!name || !location) {
      return res.status(400).json({ error: 'Name and location are required' });
    }
    
    // Check if college already exists
    const existingCollege = await College.findOne({ name: new RegExp(`^${name}$`, 'i') });
    if (existingCollege) {
      return res.status(409).json({ error: 'College with this name already exists' });
    }
    
    const newCollege = new College({ name, location });
    await newCollege.save();
    
    res.status(201).json(newCollege);
  } catch (error) {
    console.error('Create college error:', error);
    res.status(500).json({ error: 'Failed to create college' });
  }
});

// Update college
router.put('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const { name, location } = req.body;
    
    const updateData = {};
    if (name) updateData.name = name;
    if (location) updateData.location = location;
    
    const college = await College.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!college) {
      return res.status(404).json({ error: 'College not found' });
    }
    
    res.json(college);
  } catch (error) {
    console.error('Update college error:', error);
    res.status(500).json({ error: 'Failed to update college' });
  }
});

// Delete college
router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const college = await College.findByIdAndDelete(req.params.id);
    
    if (!college) {
      return res.status(404).json({ error: 'College not found' });
    }
    
    res.json({ message: 'College deleted successfully' });
  } catch (error) {
    console.error('Delete college error:', error);
    res.status(500).json({ error: 'Failed to delete college' });
  }
});

export default router;