import express from 'express';
import User from '../models/User.js';
import Course from '../models/Course.js';
import Mentor from '../models/Mentor.js';
import Enrollment from '../models/Enrollment.js';
import ContactMessage from '../models/ContactMessage.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = express.Router();

// Get admin stats
router.get('/stats', authenticate, requireAdmin, async (req, res) => {
  try {
    const [users, courses, mentors, enrollments, messages] = await Promise.all([
      User.countDocuments(),
      Course.find().sort({ created_at: -1 }),
      Mentor.find().sort({ name: 1 }),
      Enrollment.countDocuments(),
      ContactMessage.countDocuments()
    ]);

    res.json({
      stats: {
        users,
        courses: courses.length,
        mentors: mentors.length,
        enrollments,
        messages
      },
      courses,
      mentors
    });
  } catch (error) {
    console.error('Get admin stats error:', error);
    res.status(500).json({ error: 'Failed to fetch admin stats' });
  }
});

// Add mentor
router.post('/mentors', authenticate, requireAdmin, async (req, res) => {
  try {
    const { name, title, bio, skills, active } = req.body;

    const mentor = new Mentor({
      name,
      title,
      bio,
      skills: skills || [],
      active: active !== undefined ? active : true
    });

    await mentor.save();

    res.status(201).json(mentor);
  } catch (error) {
    console.error('Add mentor error:', error);
    res.status(500).json({ error: 'Failed to add mentor' });
  }
});

// Delete mentor
router.delete('/mentors/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    await Mentor.findByIdAndDelete(req.params.id);
    res.json({ message: 'Mentor deleted' });
  } catch (error) {
    console.error('Delete mentor error:', error);
    res.status(500).json({ error: 'Failed to delete mentor' });
  }
});

// Add course
router.post('/courses', authenticate, requireAdmin, async (req, res) => {
  try {
    const { title, slug, short_description, full_description, price, duration_weeks, tags, published } = req.body;

    const course = new Course({
      title,
      slug: slug || title.toLowerCase().replace(/\s+/g, '-'),
      short_description,
      full_description,
      price: price || 0,
      duration_weeks,
      tags: tags || [],
      published: published !== undefined ? published : true
    });

    await course.save();

    res.status(201).json(course);
  } catch (error) {
    console.error('Add course error:', error);
    res.status(500).json({ error: 'Failed to add course' });
  }
});

// Delete course
router.delete('/courses/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted' });
  } catch (error) {
    console.error('Delete course error:', error);
    res.status(500).json({ error: 'Failed to delete course' });
  }
});

export default router;
