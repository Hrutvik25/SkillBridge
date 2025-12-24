import express from 'express';
import MentorSchedule from '../models/MentorSchedule.js';
import Mentor from '../models/Mentor.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';
import sgMail from '@sendgrid/mail';

const router = express.Router();

// Configure SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Get all mentor schedules
router.get('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const schedules = await MentorSchedule.find()
      .populate('mentorId', 'name image_url')
      .sort({ lectureDate: 1, lectureTime: 1 });

    // Transform the data to match the frontend expectation
    const transformedSchedules = schedules.map(schedule => ({
      ...schedule.toObject(),
      mentor: {
        _id: schedule.mentorId._id,
        name: schedule.mentorId.name,
        image_url: schedule.mentorId.image_url
      }
    }));

    res.json(transformedSchedules);
  } catch (error) {
    console.error('Get schedules error:', error);
    res.status(500).json({ error: 'Failed to fetch schedules' });
  }
});

// Get mentor schedule by ID
router.get('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const schedule = await MentorSchedule.findById(req.params.id)
      .populate('mentorId', 'name image_url');

    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found' });
    }

    // Transform the data to match the frontend expectation
    const transformedSchedule = {
      ...schedule.toObject(),
      mentor: {
        _id: schedule.mentorId._id,
        name: schedule.mentorId.name,
        image_url: schedule.mentorId.image_url
      }
    };

    res.json(transformedSchedule);
  } catch (error) {
    console.error('Get schedule error:', error);
    res.status(500).json({ error: 'Failed to fetch schedule' });
  }
});

// Create new mentor schedule
router.post('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const {
      courseName,
      mentorId,
      courseLevel,
      lectureDate,
      lectureTime,
      mode,
      meetingLink,
      location,
      mentorEmail,
      mentorMobile
    } = req.body;

    // Validate required fields
    if (!courseName || !mentorId || !courseLevel || !lectureDate || !lectureTime || !mode) {
      return res.status(400).json({ error: 'All required fields must be provided' });
    }

    // Validate mentor exists
    const mentor = await Mentor.findById(mentorId);
    if (!mentor) {
      return res.status(404).json({ error: 'Mentor not found' });
    }

    // Validate course level
    const validLevels = ['Beginner', 'Advanced', 'Project Based', 'Hackathon'];
    if (!validLevels.includes(courseLevel)) {
      return res.status(400).json({ error: 'Invalid course level' });
    }

    // Validate mode
    const validModes = ['Online', 'Offline', 'Hybrid'];
    if (!validModes.includes(mode)) {
      return res.status(400).json({ error: 'Invalid mode' });
    }

    // Validate session status
    const validSessionStatuses = ['Scheduled', 'Completed', 'Cancelled', 'Rescheduled'];
    const sessionStatus = req.body.sessionStatus || 'Scheduled';
    if (!validSessionStatuses.includes(sessionStatus)) {
      return res.status(400).json({ error: 'Invalid session status' });
    }

    // Create new schedule
    const newSchedule = new MentorSchedule({
      courseName,
      mentorId,
      courseLevel,
      mentorAvailability: req.body.mentorAvailability || 'Available',
      confirmationStatus: req.body.confirmationStatus || 'Pending',
      courseContentReady: req.body.courseContentReady || 'No',
      lectureDate: new Date(lectureDate),
      lectureTime,
      mode,
      meetingLink: mode === 'Online' ? meetingLink : null,
      location: mode === 'Offline' ? location : null,
      mentorEmail,
      mentorMobile,
      sessionStatus,
      emailStatus: 'Not Sent'
    });

    await newSchedule.save();

    // Populate the mentor data and return transformed schedule
    const populatedSchedule = await MentorSchedule.findById(newSchedule._id)
      .populate('mentorId', 'name image_url');

    const transformedSchedule = {
      ...populatedSchedule.toObject(),
      mentor: {
        _id: populatedSchedule.mentorId._id,
        name: populatedSchedule.mentorId.name,
        image_url: populatedSchedule.mentorId.image_url
      }
    };

    res.status(201).json(transformedSchedule);
  } catch (error) {
    console.error('Create schedule error:', error);
    res.status(500).json({ error: 'Failed to create schedule' });
  }
});

// Update mentor schedule
router.put('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const {
      courseName,
      mentorId,
      courseLevel,
      mentorAvailability,
      confirmationStatus,
      courseContentReady,
      lectureDate,
      lectureTime,
      mode,
      meetingLink,
      location,
      mentorEmail,
      mentorMobile,
      sessionStatus,
      emailStatus
    } = req.body;

    const updateData = {};
    if (courseName) updateData.courseName = courseName;
    if (mentorId) updateData.mentorId = mentorId;
    if (courseLevel) updateData.courseLevel = courseLevel;
    if (mentorAvailability) updateData.mentorAvailability = mentorAvailability;
    if (confirmationStatus) updateData.confirmationStatus = confirmationStatus;
    if (courseContentReady) updateData.courseContentReady = courseContentReady;
    if (lectureDate) updateData.lectureDate = new Date(lectureDate);
    if (lectureTime) updateData.lectureTime = lectureTime;
    if (mode) updateData.mode = mode;
    if (meetingLink) updateData.meetingLink = mode === 'Online' ? meetingLink : null;
    if (location) updateData.location = mode === 'Offline' ? location : null;
    if (mentorEmail) updateData.mentorEmail = mentorEmail;
    if (mentorMobile) updateData.mentorMobile = mentorMobile;
    if (sessionStatus) updateData.sessionStatus = sessionStatus;
    if (emailStatus) updateData.emailStatus = emailStatus;

    const schedule = await MentorSchedule.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    ).populate('mentorId', 'name image_url');

    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found' });
    }

    // Transform the data to match the frontend expectation
    const transformedSchedule = {
      ...schedule.toObject(),
      mentor: {
        _id: schedule.mentorId._id,
        name: schedule.mentorId.name,
        image_url: schedule.mentorId.image_url
      }
    };

    res.json(transformedSchedule);
  } catch (error) {
    console.error('Update schedule error:', error);
    res.status(500).json({ error: 'Failed to update schedule' });
  }
});

// Delete mentor schedule
router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const schedule = await MentorSchedule.findByIdAndDelete(req.params.id);

    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found' });
    }

    res.json({ message: 'Schedule deleted successfully' });
  } catch (error) {
    console.error('Delete schedule error:', error);
    res.status(500).json({ error: 'Failed to delete schedule' });
  }
});

// Send confirmation email to mentor
router.post('/:id/send-email', authenticate, requireAdmin, async (req, res) => {
  try {
    const schedule = await MentorSchedule.findById(req.params.id)
      .populate('mentorId', 'name');

    if (!schedule) {
      return res.status(404).json({ error: 'Schedule not found' });
    }

    const mentor = await Mentor.findById(schedule.mentorId);

    if (!mentor) {
      return res.status(404).json({ error: 'Mentor not found' });
    }

    // Generate confirmation and rejection URLs - use the backend server URL
    const baseUrl = process.env.BACKEND_URL || `${req.protocol}://${req.get('host')}`;
    const confirmUrl = `${baseUrl}/mentor-confirmation/confirm/${schedule.confirmationToken}`;
    const rejectUrl = `${baseUrl}/mentor-confirmation/reject/${schedule.confirmationToken}`;

    const emailContent = {
      to: schedule.mentorEmail,
      from: process.env.SENDGRID_SENDER_EMAIL || 'noreply@skillbridge.com',
      subject: `Lecture Schedule Confirmation - ${schedule.courseName}`,
      text: `
        Dear ${mentor.name},

        Your lecture has been scheduled with the following details:

        Course: ${schedule.courseName}
        Date: ${new Date(schedule.lectureDate).toLocaleDateString()}
        Time: ${schedule.lectureTime}
        Mode: ${schedule.mode}
        ${schedule.mode === 'Online' ? `Meeting Link: ${schedule.meetingLink || 'Not provided'}` : `Location: ${schedule.location || 'Not provided'}`}

        Please confirm or reject your availability for this session using the links below:
        
        Confirm: ${confirmUrl}
        Reject: ${rejectUrl}

        Best regards,
        SKILLBRIDGE Team
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0b4a9e;">Lecture Schedule Confirmation</h2>
          <p>Dear ${mentor.name},</p>
          
          <p>Your lecture has been scheduled with the following details:</p>
          
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; margin: 15px 0;">
            <p><strong>Course:</strong> ${schedule.courseName}</p>
            <p><strong>Date:</strong> ${new Date(schedule.lectureDate).toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${schedule.lectureTime}</p>
            <p><strong>Mode:</strong> ${schedule.mode}</p>
            ${schedule.mode === 'Online' 
              ? `<p><strong>Meeting Link:</strong> <a href="${schedule.meetingLink || '#'}">${schedule.meetingLink || 'Not provided'}</a></p>` 
              : `<p><strong>Location:</strong> ${schedule.location || 'Not provided'}</p>`}
          </div>
          
          <p>Please confirm or reject your availability for this session:</p>
          
          <div style="margin: 20px 0;">
            <a href="${confirmUrl}" style="background-color: #22c55e; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; margin-right: 10px; display: inline-block;">Confirm Availability</a>
            <a href="${rejectUrl}" style="background-color: #ef4444; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Reject</a>
          </div>
          
          <p>Best regards,<br/>
          SKILLBRIDGE Team</p>
        </div>
      `
    };

    try {
      await sgMail.send(emailContent);
      
      // Update email status to 'Sent'
      await MentorSchedule.findByIdAndUpdate(req.params.id, { 
        emailStatus: 'Sent' 
      });

      // Return updated schedule with transformed data
      const updatedSchedule = await MentorSchedule.findById(req.params.id)
        .populate('mentorId', 'name image_url');

      const transformedSchedule = {
        ...updatedSchedule.toObject(),
        mentor: {
          _id: updatedSchedule.mentorId._id,
          name: updatedSchedule.mentorId.name,
          image_url: updatedSchedule.mentorId.image_url
        }
      };

      res.json({ message: 'Email sent successfully', schedule: transformedSchedule });
    } catch (emailError) {
      console.error('Send email error:', emailError);
      
      // Update email status to 'Failed'
      await MentorSchedule.findByIdAndUpdate(req.params.id, { 
        emailStatus: 'Failed' 
      });

      res.status(500).json({ error: 'Failed to send email' });
    }
  } catch (error) {
    console.error('Send email error:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

export default router;