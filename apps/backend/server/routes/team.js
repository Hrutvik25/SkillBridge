import express from 'express';
import TeamMember from '../models/TeamMember.js';

const router = express.Router();

// Get all visible team members
router.get('/', async (_req, res) => {
  try {
    const team = await TeamMember.find({ active: true }).sort({ display_order: 1, created_at: -1 });
    res.json(team);
  } catch (error) {
    console.error('Get team error:', error);
    res.status(500).json({ error: 'Failed to fetch team members' });
  }
});

export default router;

