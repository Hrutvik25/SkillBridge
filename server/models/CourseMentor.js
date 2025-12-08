import mongoose from 'mongoose';

const courseMentorSchema = new mongoose.Schema({
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  mentor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mentor',
    required: true
  }
});

// Compound index to prevent duplicate assignments
courseMentorSchema.index({ course_id: 1, mentor_id: 1 }, { unique: true });

export default mongoose.model('CourseMentor', courseMentorSchema);
