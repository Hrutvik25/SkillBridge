import express from 'express';
import Course from '../models/Course.js';
import CourseMentor from '../models/CourseMentor.js';
import Mentor from '../models/Mentor.js';
import Enrollment from '../models/Enrollment.js';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Get all published courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find({ published: true })
      .sort({ created_at: -1 });
    
    res.json(courses);
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// Get course by slug
router.get('/:slug', optionalAuth, async (req, res) => {
  try {
    const course = await Course.findOne({ 
      slug: req.params.slug,
      published: true 
    });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Get mentors for this course
    const courseMentors = await CourseMentor.find({ course_id: course._id });
    const mentorIds = courseMentors.map(cm => cm.mentor_id);
    const mentors = await Mentor.find({ 
      _id: { $in: mentorIds },
      active: true 
    });

    // Check if user is enrolled
    let isEnrolled = false;
    if (req.user) {
      const enrollment = await Enrollment.findOne({
        user_id: req.user._id,
        course_id: course._id
      });
      isEnrolled = !!enrollment;
    }

    res.json({
      course,
      mentors,
      isEnrolled
    });
  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({ error: 'Failed to fetch course' });
  }
});

export default router;
