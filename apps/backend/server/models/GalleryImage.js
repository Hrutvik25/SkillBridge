import mongoose from 'mongoose';

const GalleryImageSchema = new mongoose.Schema({
  image_url: { type: String, required: true },
  title: { type: String, default: '' },
  hidden: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model('GalleryImage', GalleryImageSchema);
