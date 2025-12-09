import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  course_name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    default: null
  },
  short_description: {
    type: String,
    default: null
  },
  full_description: {
    type: String,
    default: null
  },
  image: {
    type: String,
    default: null
  },
  image_url: {
    type: String,
    default: null
  },
  price: {
    type: Number,
    default: null
  },
  date: {
    type: String,
    required: true,
    default: "Flexible"
  },
  duration: {
    type: String,
    required: true,
    trim: true
  },
  duration_weeks: {
    type: Number,
    default: null
  },
  mode: [{
    type: String,
    enum: ['online', 'offline'],
    required: true
  }],
  tags: [{
    type: String
  }],
  published: {
    type: Boolean,
    default: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Generate slug from title if not provided
courseSchema.pre('save', function(next) {
  if (!this.slug && this.title) {
    this.slug = this.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  }
  next();
});

export default mongoose.model('Course', courseSchema);
