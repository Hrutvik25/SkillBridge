import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema({
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

export default mongoose.model('TeamMember', teamMemberSchema);

