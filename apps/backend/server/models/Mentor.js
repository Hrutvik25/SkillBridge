import mongoose from 'mongoose';

const mentorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    default: null
  },
  bio: {
    type: String,
    default: null
  },
  image_url: {
    type: String,
    default: null
  },
  skills: [{
    type: String
  }],
  linkedin: {
    type: String,
    default: null
  },
  twitter: {
    type: String,
    default: null
  },
  availability: {
    type: String,
    enum: ['weekdays', 'weekends', 'on-demand'],
    default: 'weekdays'
  },
  active: {
    type: Boolean,
    default: true
  },
  display_order: {
    type: Number,
    default: 999
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Mentor', mentorSchema);
