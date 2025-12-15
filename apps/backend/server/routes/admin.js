import express from 'express';
import User from '../models/User.js';
import Course from '../models/Course.js';
import Mentor from '../models/Mentor.js';
import TeamMember from '../models/TeamMember.js';
import Enrollment from '../models/Enrollment.js';
import ContactMessage from '../models/ContactMessage.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../public/uploads/courses');
    try {
      await fs.mkdir(uploadDir, { recursive: true });
    } catch (err) {
      console.error('Error creating upload directory:', err);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

const router = express.Router();

// Get admin stats
router.get('/stats', authenticate, requireAdmin, async (req, res) => {
  try {
    const [users, courses, mentors, teamMembers, enrollments, messages] = await Promise.all([
      User.countDocuments(),
      Course.find().sort({ created_at: -1 }),
      Mentor.find().sort({ name: 1 }),
      TeamMember.find().sort({ display_order: 1 }),
      Enrollment.countDocuments(),
      ContactMessage.countDocuments()
    ]);

    res.json({
      stats: {
        users,
        courses: courses.length,
        mentors: mentors.length,
        team: teamMembers.length,
        enrollments,
        messages
      },
      courses,
      mentors,
      teamMembers
    });
  } catch (error) {
    console.error('Get admin stats error:', error);
    res.status(500).json({ error: 'Failed to fetch admin stats' });
  }
});

// Upload image endpoint
router.post('/upload-image', authenticate, requireAdmin, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const imageUrl = `/uploads/courses/${req.file.filename}`;
    res.json({ url: imageUrl, success: true });
  } catch (error) {
    console.error('Upload image error:', error);
    res.status(500).json({ error: error.message || 'Failed to upload image' });
  }
});

// Gallery management (admin)
import GalleryImage from '../models/GalleryImage.js';

// Get all gallery images (admin view)
router.get('/gallery', authenticate, requireAdmin, async (req, res) => {
  try {
    const images = await GalleryImage.find().sort({ created_at: -1 });
    res.json(images);
  } catch (error) {
    console.error('Get admin gallery error:', error);
    res.status(500).json({ error: 'Failed to fetch gallery images' });
  }
});

// Add gallery image (body: image_url, title, hidden)
router.post('/gallery', authenticate, requireAdmin, async (req, res) => {
  try {
    const { image_url, title, hidden } = req.body;
    if (!image_url) return res.status(400).json({ error: 'image_url is required' });

    const img = new GalleryImage({ image_url, title: title || '', hidden: !!hidden });
    await img.save();
    res.status(201).json(img);
  } catch (error) {
    console.error('Add gallery image error:', error);
    res.status(500).json({ error: 'Failed to add gallery image' });
  }
});

// Update gallery image (hide/unhide or title)
router.put('/gallery/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const data = req.body;
    const img = await GalleryImage.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!img) return res.status(404).json({ error: 'Gallery image not found' });
    res.json(img);
  } catch (error) {
    console.error('Update gallery image error:', error);
    res.status(500).json({ error: 'Failed to update gallery image' });
  }
});

// Delete gallery image
router.delete('/gallery/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    await GalleryImage.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (error) {
    console.error('Delete gallery image error:', error);
    res.status(500).json({ error: 'Failed to delete gallery image' });
  }
});

// Add mentor
router.post('/mentors', authenticate, requireAdmin, async (req, res) => {
  try {
    const { name, title, bio, skills, active, image_url, linkedin, availability, display_order } = req.body;

    const mentor = new Mentor({
      name,
      title,
      bio,
      image_url: image_url || null,
      linkedin: linkedin || null,
      skills: skills || [],
      availability: availability || 'weekdays',
      active: active !== undefined ? active : true,
      display_order: display_order ?? 999
    });

    await mentor.save();

    res.status(201).json(mentor);
  } catch (error) {
    console.error('Add mentor error:', error);
    res.status(500).json({ error: 'Failed to add mentor' });
  }
});

// Update mentor
router.put('/mentors/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const { name, title, bio, skills, active, image_url, linkedin, availability, display_order } = req.body;
    
    const mentor = await Mentor.findByIdAndUpdate(
      req.params.id,
      {
        name,
        title,
        bio,
        skills: skills || [],
        active: active !== undefined ? active : true,
        image_url: image_url ?? null,
        linkedin: linkedin ?? null,
        availability: availability || 'weekdays',
        display_order: display_order ?? 999
      },
      { new: true, runValidators: true }
    );

    if (!mentor) {
      return res.status(404).json({ error: 'Mentor not found' });
    }

    res.json(mentor);
  } catch (error) {
    console.error('Update mentor error:', error);
    res.status(500).json({ error: 'Failed to update mentor' });
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

// Team management
router.post('/team', authenticate, requireAdmin, async (req, res) => {
  try {
    const { name, title, bio, skills, active, image_url, linkedin, display_order } = req.body;

    const member = new TeamMember({
      name,
      title,
      bio,
      skills: skills || [],
      active: active !== undefined ? active : true,
      image_url: image_url || null,
      linkedin: linkedin || null,
      display_order: display_order ?? 999
    });

    await member.save();

    res.status(201).json(member);
  } catch (error) {
    console.error('Add team member error:', error);
    res.status(500).json({ error: 'Failed to add team member' });
  }
});

router.put('/team/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const { name, title, bio, skills, active, image_url, linkedin, display_order } = req.body;

    const member = await TeamMember.findByIdAndUpdate(
      req.params.id,
      {
        name,
        title,
        bio,
        skills: skills || [],
        active: active !== undefined ? active : true,
        image_url: image_url ?? null,
        linkedin: linkedin ?? null,
        display_order: display_order ?? 999
      },
      { new: true, runValidators: true }
    );

    if (!member) {
      return res.status(404).json({ error: 'Team member not found' });
    }

    res.json(member);
  } catch (error) {
    console.error('Update team member error:', error);
    res.status(500).json({ error: 'Failed to update team member' });
  }
});

router.delete('/team/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    await TeamMember.findByIdAndDelete(req.params.id);
    res.json({ message: 'Team member deleted' });
  } catch (error) {
    console.error('Delete team member error:', error);
    res.status(500).json({ error: 'Failed to delete team member' });
  }
});

// Add course
router.post('/courses', authenticate, requireAdmin, async (req, res) => {
  try {
    const { 
      course_name, 
      title,
      slug, 
      description,
      short_description, 
      full_description,
      image,
      image_url, 
      price, 
      date,
      duration,
      duration_weeks, 
      tags, 
      published,
      mode
    } = req.body;

    const courseTitle = course_name || title;
    if (!courseTitle) {
      return res.status(400).json({ error: 'Course name is required' });
    }

    const course = new Course({
      course_name: courseTitle,
      slug: slug || courseTitle.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      description: description || short_description,
      short_description: description || short_description,
      full_description,
      image: image || image_url,
      image_url: image || image_url,
      price: price !== undefined ? price : null,
      date: date || 'Flexible',
      duration: duration || '',
      duration_weeks,
      mode: mode && Array.isArray(mode) ? mode : ['online', 'offline'],
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

// Update course
router.put('/courses/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const {
      course_name,
      title,
      slug,
      description,
      short_description,
      full_description,
      image,
      image_url,
      price,
      date,
      duration,
      duration_weeks,
      tags,
      published,
      mode
    } = req.body;

    const courseTitle = course_name || title;
    if (!courseTitle) {
      return res.status(400).json({ error: 'Course name is required' });
    }

    const course = await Course.findByIdAndUpdate(
      req.params.id,
      {
        course_name: courseTitle,
        slug: slug || courseTitle.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        description: description || short_description,
        short_description: description || short_description,
        full_description,
        image: image || image_url,
        image_url: image || image_url,
        price: price !== undefined ? price : null,
        date: date || 'Flexible',
        duration: duration || '',
        duration_weeks,
        mode: mode && Array.isArray(mode) ? mode : ['online', 'offline'],
        tags: tags || [],
        published: published !== undefined ? published : true
      },
      { new: true, runValidators: true }
    );

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    console.error('Update course error:', error);
    res.status(500).json({ error: 'Failed to update course' });
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

// Get enrolled users with course details
router.get('/enrollments', authenticate, requireAdmin, async (req, res) => {
  try {
    // Get all enrollments with populated user and course details
    const enrollments = await Enrollment.find()
      .populate({
        path: 'user_id',
        select: 'full_name email created_at'
      })
      .populate({
        path: 'course_id',
        select: 'course_name slug'
      })
      .sort({ enrolled_at: -1 });

    // Format the response with proper error handling
    const formattedEnrollments = enrollments.map(enrollment => {
      // Handle case where user or course might not be found
      const user = enrollment.user_id || {};
      const course = enrollment.course_id || {};
      
      return {
        id: enrollment._id,
        enrolled_at: enrollment.enrolled_at,
        user: {
          id: user._id || null,
          full_name: user.full_name || null,
          email: user.email || null,
          created_at: user.created_at || null
        },
        course: {
          id: course._id || null,
          course_name: course.course_name || "Unknown Course",
          slug: course.slug || null
        }
      };
    }).filter(enrollment => 
      // Filter out enrollments where both user and course are missing
      enrollment.user.id !== null || enrollment.course.id !== null
    );

    res.json(formattedEnrollments);
  } catch (error) {
    console.error('Get enrollments error:', error);
    res.status(500).json({ error: 'Failed to fetch enrollments' });
  }
});

export default router;
