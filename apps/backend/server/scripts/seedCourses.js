import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Course from '../models/Course.js';

dotenv.config();

const seedCourses = [
  {
    course_name: "1 Month Program (Students)",
    slug: "1-month-program-students",
    image: "/images/1.jpeg",
    image_url: "/images/1.jpeg",
    date: "January 2026",
    duration: "1 Month / 12 Sessions",
    description: "Domain + 2 Tech + 2 Softskills. Online or Offline batches. Classes 3 days a week (6–8 PM).",
    price: null,
    mode: ["online", "offline"],
    published: true
  },
  {
    course_name: "Career Acceleration Program (Working Professionals)",
    slug: "career-acceleration-program-professionals",
    image: "/images/2.jpeg",
    image_url: "/images/2.jpeg",
    date: "January 2026",
    duration: "12 Hours (Weekend Batches)",
    description: "Weekend Online or Offline sessions focusing on Domain + Softskills.",
    price: null,
    mode: ["online", "offline"],
    published: true
  },
  {
    course_name: "Customized College Training Program",
    slug: "customized-college-training-program",
    image: "/images/3.jpeg",
    image_url: "/images/3.jpeg",
    date: "Flexible",
    duration: "Custom Duration",
    description: "Curriculum customization, flexible timings, and bulk training options designed for colleges and institutions to enhance placement outcomes.",
    price: null,
    mode: ["online", "offline"],
    published: true
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/skillbridge';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Check if courses already exist
    const existingCount = await Course.countDocuments();
    if (existingCount > 0) {
      console.log(`Database already has ${existingCount} courses. Clearing existing courses...`);
      await Course.deleteMany({});
    }

    // Insert seed courses
    const result = await Course.insertMany(seedCourses);
    console.log(`✓ Successfully seeded ${result.length} courses`);
    
    result.forEach((course) => {
      console.log(`  - ${course.course_name}`);
    });

    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
