import express from 'express';
import Enrollment from '../models/Enrollment.js';
import Course from '../models/Course.js';
import User from '../models/User.js';
import { authenticate } from '../middleware/auth.js';
import { sendEnrollmentConfirmationEmail } from '../services/emailService.js';

const router = express.Router();

// Get user's enrollments
router.get('/', authenticate, async (req, res) => {
    try {
        const enrollments = await Enrollment.find({ user_id: req.user._id })
            .sort({ enrolled_at: -1 });

        // Get course details for each enrollment
        const enrollmentsWithCourses = await Promise.all(
            enrollments.map(async (enrollment) => {
                const course = await Course.findById(enrollment.course_id);
                return {
                    id: enrollment._id,
                    enrolled_at: enrollment.enrolled_at,
                    course: course ? {
                        id: course._id,
                        title: course.title,
                        slug: course.slug,
                        image_url: course.image_url,
                        short_description: course.short_description
                    } : null
                };
            })
        );

        // Filter out enrollments with null courses
        const validEnrollments = enrollmentsWithCourses.filter(e => e.course !== null);

        res.json(validEnrollments);
    } catch (error) {
        console.error('Get enrollments error:', error);
        res.status(500).json({ error: 'Failed to fetch enrollments' });
    }
});

// Enroll in a course
router.post('/', authenticate, async (req, res) => {
    try {
        const { course_id } = req.body;

        // Check if already enrolled
        const existingEnrollment = await Enrollment.findOne({
            user_id: req.user._id,
            course_id
        });

        if (existingEnrollment) {
            return res.status(400).json({ error: 'Already enrolled in this course' });
        }

        // Check if course exists
        const course = await Course.findById(course_id);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }

        // Create enrollment
        const enrollment = new Enrollment({
            user_id: req.user._id,
            course_id
        });

        await enrollment.save();

        // Get user details for email
        const user = await User.findById(req.user._id);
        
        // Send enrollment confirmation email
        try {
            await sendEnrollmentConfirmationEmail(user, course);
        } catch (emailError) {
            console.error('Failed to send enrollment confirmation email:', emailError);
            // Don't fail the enrollment if email sending fails
        }

        res.status(201).json({
            id: enrollment._id,
            enrolled_at: enrollment.enrolled_at,
            course: {
                id: course._id,
                title: course.title,
                slug: course.slug
            }
        });
    } catch (error) {
        console.error('Enroll error:', error);
        res.status(500).json({ error: 'Failed to enroll' });
    }
});

export default router;