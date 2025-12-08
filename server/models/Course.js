import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: {
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
  short_description: {
    type: String,
    default: null
  },
  full_description: {
    type: String,
    default: null
  },
  image_url: {
    type: String,
    default: null
  },
  price: {
    type: Number,
    default: 0
  },
  duration_weeks: {
    type: Number,
    default: null
  },
  tags: [{
    type: String
  }],
  published: {
    type: Boolean,
    default: false
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
