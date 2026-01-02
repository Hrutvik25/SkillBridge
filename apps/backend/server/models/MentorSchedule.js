import mongoose from 'mongoose';

const mentorScheduleSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
    trim: true
  },
  mentorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mentor',
    required: true
  },
  courseLevel: {
    type: String,
    enum: ['Beginner', 'Advanced', 'Project Based', 'Hackathon'],
    required: true
  },
  mentorAvailability: {
    type: String,
    enum: ['Available', 'Not Available'],
    default: 'Available'
  },
  confirmationStatus: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Rejected'],
    default: 'Pending'
  },
  courseContentReady: {
    type: String,
    enum: ['Yes', 'No'],
    default: 'No'
  },
  lectureDate: {
    type: Date,
    required: true
  },
  lectureTime: {
    type: String,
    required: true
  },
  mode: {
    type: String,
    enum: ['Online', 'Offline', 'Hybrid'],
    required: true
  },
  meetingLink: {
    type: String,
    default: null
  },
  location: {
    type: String,
    default: null
  },
  mentorEmail: {
    type: String,
    required: true
  },
  mentorMobile: {
    type: String,
    required: true
  },
  college: {
    type: String,
    required: true
  },
  sessionStatus: {
    type: String,
    enum: ['Scheduled', 'Completed', 'Cancelled', 'Rescheduled'],
    default: 'Scheduled'
  },
  emailStatus: {
    type: String,
    enum: ['Not Sent', 'Sent', 'Failed'],
    default: 'Not Sent'
  },
  confirmationToken: {
    type: String,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
mentorScheduleSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Generate a unique confirmation token before saving
mentorScheduleSchema.pre('save', function(next) {
  if (!this.confirmationToken) {
    // Generate a simple random token
    this.confirmationToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
  next();
});

export default mongoose.model('MentorSchedule', mentorScheduleSchema);