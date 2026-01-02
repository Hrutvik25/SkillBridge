import mongoose from 'mongoose';
import dotenv from 'dotenv';
import College from '../models/College.js';
import DefaultMentor from '../models/DefaultMentor.js';

dotenv.config();

const seedColleges = [
  {
    "name": "College of Engineering Pune (COEP Technological University)",
    "location": "Wellesley Road, Shivajinagar, Pune, Maharashtra, India"
  },
  {
    "name": "MIT World Peace University",
    "location": "Paud Road, Kothrud, Pune, Maharashtra, India"
  },
  {
    "name": "MIT Academy of Engineering, Alandi",
    "location": "Alandi-Dehu Road, Alandi, Pune, Maharashtra, India"
  },
  {
    "name": "Vishwakarma Institute of Technology (VIT)",
    "location": "Upper Indiranagar, Bibwewadi, Pune, Maharashtra, India"
  },
  {
    "name": "Vishwakarma Institute of Information Technology (VIIT)",
    "location": "Upper Indiranagar, Kondhwa, Pune, Maharashtra, India"
  },
  {
    "name": "Pimpri Chinchwad College of Engineering (PCCOE)",
    "location": "Sector 26, Pradhikaran, Nigdi, Pune, Maharashtra, India"
  },
  {
    "name": "D.Y. Patil College of Engineering, Akurdi",
    "location": "Akurdi, Pimpri-Chinchwad, Pune, Maharashtra, India"
  },
  {
    "name": "D.Y. Patil School of Engineering, Lohegaon",
    "location": "Charholi Road, Lohegaon, Pune, Maharashtra, India"
  },
  {
    "name": "DY Patil Institute of Technology, Pimpri",
    "location": "Sant Tukaram Nagar, Pimpri, Pune, Maharashtra, India"
  },
  {
    "name": "Bharati Vidyapeeth College of Engineering, Pune",
    "location": "Dhankawadi, Pune, Maharashtra, India"
  },
  {
    "name": "Sinhgad College of Engineering, Vadgaon",
    "location": "Vadgaon Budruk, Pune, Maharashtra, India"
  },
  {
    "name": "Smt. Kashibai Navale College of Engineering, Vadgaon",
    "location": "Vadgaon Budruk, Pune, Maharashtra, India"
  },
  {
    "name": "RMD Sinhgad School of Engineering, Warje",
    "location": "Warje Malwadi, Pune, Maharashtra, India"
  },
  {
    "name": "Modern Education Society's College of Engineering (MESCOE)",
    "location": "Wadia College Campus, Shivajinagar, Pune, Maharashtra, India"
  },
  {
    "name": "Cusrow Wadia Institute of Technology",
    "location": "Bund Garden Road, Pune, Maharashtra, India"
  },
  {
    "name": "AISSMS College of Engineering",
    "location": "Kennedy Road, Near RTO, Pune, Maharashtra, India"
  },
  {
    "name": "PES Modern College of Engineering, Shivajinagar",
    "location": "Shivajinagar, Pune, Maharashtra, India"
  },
  {
    "name": "PVPIT College of Engineering, Bavdhan",
    "location": "Bavdhan, Pune, Maharashtra, India"
  },
  {
    "name": "Jayawantrao Sawant College of Engineering, Hadapsar",
    "location": "Hadapsar, Pune, Maharashtra, India"
  },
  {
    "name": "Indira College of Engineering & Management, Parandwadi",
    "location": "Parandwadi, Maval, Pune, Maharashtra, India"
  },
  {
    "name": "Trinity College of Engineering and Research, Kondhwa",
    "location": "Kondhwa-Saswad Road, Pune, Maharashtra, India"
  },
  {
    "name": "Zeal College of Engineering & Research, Narhe",
    "location": "Narhe, Pune, Maharashtra, India"
  },
  {
    "name": "Pune Vidyarthi Griha's College of Engineering & Technology (PVGCOET)",
    "location": "Bibwewadi, Pune, Maharashtra, India"
  },
  {
    "name": "International Institute of Information Technology (I²IT), Hinjawadi",
    "location": "Hinjawadi Phase 1, Pune, Maharashtra, India"
  },
  {
    "name": "Genba Sopanrao Moze College of Engineering, Balewadi",
    "location": "Balewadi, Pune, Maharashtra, India"
  },
  {
    "name": "Marathwada Mitra Mandal's College of Engineering (MMCOE)",
    "location": "Karvenagar, Pune, Maharashtra, India"
  },
  {
    "name": "Rajiv Gandhi Institute of Technology (RGIT), Pune",
    "location": "Andheri East Campus Extension, Pune, Maharashtra, India"
  },
  {
    "name": "SKN Sinhgad Institute of Technology & Science, Lonavala",
    "location": "Kusgaon, Lonavala, Pune, Maharashtra, India"
  },
  {
    "name": "Alard College of Engineering & Management, Marunje",
    "location": "Marunje, Hinjawadi, Pune, Maharashtra, India"
  },
  {
    "name": "Dr. D.Y. Patil Institute of Technology, Ambi Talegaon",
    "location": "Ambi, Talegaon Dabhade, Pune, Maharashtra, India"
  },
  {
    "name": "Rajarshi Shahu College of Engineering, Tathawade",
    "location": "Tathawade, Pune, Maharashtra, India"
  },
  {
    "name": "Cummins College of Engineering For Women",
    "location": "Karvenagar, Pune, Maharashtra, India"
  },
  {
    "name": "Symbiosis Institute of Technology | SIT Pune",
    "location": "Lavale, Mulshi, Pune, Maharashtra, India"
  }
];

const seedDefaultMentors = [
  {
    name: "Rahul Bhide",
    phone: "9890799553",
    email: "rahul1bhide@gmail.com"
  },
  {
    name: "Swanand Kakade",
    phone: "9822858061",
    email: "swanand.kakade@gmail.com"
  },
  {
    name: "Girish Karhadkar",
    phone: "9822049984",
    email: "girish_karhadkar@yahoo.in"
  },
  {
    name: "Parag Patil",
    phone: "9404962090",
    email: "paragpatil2006@gmail.com"
  },
  {
    name: "Ajit Deshmukh",
    phone: "9850976460",
    email: "adeshmukh17741@rediffmail.com"
  },
  {
    name: "Kedar Deo",
    phone: "9422512782",
    email: "devkedar@yahoo.com"
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/skillbridge';
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // Check if colleges already exist
    const existingCollegeCount = await College.countDocuments();
    if (existingCollegeCount > 0) {
      console.log(`Database already has ${existingCollegeCount} colleges. Clearing existing colleges...`);
      await College.deleteMany({});
    }

    // Insert seed colleges
    const collegeResult = await College.insertMany(seedColleges);
    console.log(`✓ Successfully seeded ${collegeResult.length} colleges`);
    
    collegeResult.forEach((college) => {
      console.log(`  - ${college.name}`);
    });

    // Check if default mentors already exist
    const existingMentorCount = await DefaultMentor.countDocuments();
    if (existingMentorCount > 0) {
      console.log(`Database already has ${existingMentorCount} default mentors. Clearing existing mentors...`);
      await DefaultMentor.deleteMany({});
    }

    // Insert seed default mentors
    const mentorResult = await DefaultMentor.insertMany(seedDefaultMentors);
    console.log(`✓ Successfully seeded ${mentorResult.length} default mentors`);
    
    mentorResult.forEach((mentor) => {
      console.log(`  - ${mentor.name}`);
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