import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Import routes
import authRoutes from './routes/auth.js';
import coursesRoutes from './routes/courses.js';
import mentorsRoutes from './routes/mentors.js';
import enrollmentsRoutes from './routes/enrollments.js';
import profilesRoutes from './routes/profiles.js';
import contactRoutes from './routes/contact.js';
import adminRoutes from './routes/admin.js';
import Mentor from './models/Mentor.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:8080', 'http://127.0.0.1:5173'],
    credentials: true
}));
app.use(express.json());

// Default mentors data
const defaultMentors = [
    {
        image_url: "/images/1.jpeg",
        name: "Rahul Bhide",
        title: "Founder and CEO",
        bio: "With 27 years of experience across Capital Markets and FinTech, Rahul specializes in reviving stalled initiatives, delivering multi-million-dollar transformations, and leading client services organizations at scale. Rahul has directed global delivery and support teams (up to 150 members) across trading, post-trade, lending, and compliance platforms, ensuring measurable improvements in client satisfaction, SLAs, and operational resilience.",
        skills: ["Capital Markets", "FinTech", "Transformation Leadership", "Client Services", "Global Delivery", "Trading Systems", "Post-Trade", "Compliance"],
        linkedin: "https://www.linkedin.com/in/rahul1bhide/",
        display_order: 1
    },
    {
        image_url: "/images/2.jpeg",
        name: "Swanand Kakade",
        title: "Co-Founder and COO",
        bio: "With 20+ years in capital markets and trading systems, Swanand's expertise spans Order Management Systems (OMS), Direct Market Access (DMA), Risk Gateways, Smart Algos, and Global market data platforms across the US, UK, and APAC regions. Combining deep domain knowledge with strong technical proficiency. Swanand also holds advanced expertise in technical analysis — including candlestick patterns, Point & Figure charts, and mutual fund strategies — making complex financial concepts clear, actionable, and practical for learners.",
        skills: ["Order Management Systems", "Direct Market Access", "Risk Gateways", "Smart Algos", "Market Data Platforms", "Python", "SQL", "Linux", "Automation", "Technical Analysis"],
        linkedin: "https://www.linkedin.com/in/swanand-kakade-912ba76/",
        display_order: 2
    },
    {
        image_url: "/images/3.jpeg",
        name: "Parag Patil",
        title: "Cyber Security Expert and Advisor",
        bio: "Information Security professional (CISSP) with 15+ years of experience across multiple domains of security. Specialized in operationalizing Security teams and functions from scratch to ensure security services are built-in and not bolted-on. Possesses techno-managerial skills with hands-on experience in security research, designing, and architecting security solutions/products, penetration testing, and ISMS. Author of the industry-wide used CIS security benchmarks for AWS, Azure, and GCP.",
        skills: ["Information Security", "CISSP", "Security Architecture", "Penetration Testing", "ISMS", "Cloud Security", "AWS", "Azure", "GCP"],
        linkedin: "https://www.linkedin.com/in/paragpatil2006/",
        display_order: 3
    },
    {
        image_url: "/images/4.jpeg",
        name: "Ajit Deshmukh",
        title: "Project, Program and Process Expert",
        bio: "Ajit is a results-driven global transformation leader with 25+ years of experience driving enterprise-wide change through Lean Six Sigma, Agile methodologies, and digital innovation. Ajit's journey has spanned across IT, telecom, finance, logistics, and manufacturing, where Ajit led high-impact initiatives that have enhanced efficiency, reduced costs, and delivered measurable business value for Fortune 500 clients.",
        skills: ["Lean Six Sigma", "Agile Methodologies", "Digital Innovation", "Transformation Leadership", "Process Improvement"],
        linkedin: "https://www.linkedin.com/in/ajit-deshmukh-b48b754/",
        display_order: 4
    },
    {
        image_url: "/images/5.jpeg",
        name: "Sonali Nibandhe",
        title: "Civil Engineering Expert",
        bio: "Strategic and results-driven EPC & OET professional with 30 years of global experience in civil, structural, and architectural engineering across Oil & Gas, Fertilizers, Industrial Gases, Green Hydrogen, Refineries, and Infrastructure sectors. Recognized for leading high-performing teams of 120+ engineers and managing projects of 1.5 lakh+ civil effort hours from FEED to commissioning.",
        skills: ["Civil Engineering", "Structural Engineering", "Architectural Engineering", "EPC", "OET", "Project Management", "Oil & Gas", "Green Hydrogen", "Infrastructure"],
        linkedin: "https://www.linkedin.com/in/sonali-nibandhe-78a16595/",
        display_order: 5
    },
    {
        image_url: "/images/6.jpeg",
        name: "Kedar Deo",
        title: "Green IT Expert and Advisor",
        bio: "With 30+ yrs in Green IT Transformation Practices, Kedar drives the GTM and Presales function to enable customers to leverage Green IT best practices to transform their organizations and build sustainable, unified customer experiences and operational solutions across marketing automation, digital transformation engagement, customer service, and the data/AI continuum. Kedar is responsible for enabling Green IT activities across global geographies by developing GTM strategies, solution POVs, accelerators and differentiators, and fostering skill & talent development.",
        skills: ["Green IT", "GTM Strategy", "Presales", "Digital Transformation", "Sustainability", "Marketing Automation", "AI", "Customer Experience"],
        linkedin: "https://www.linkedin.com/in/kedardeo75/",
        display_order: 6
    }
];

// Seed default mentors
const seedMentors = async () => {
    try {
        const count = await Mentor.countDocuments();
        if (count === 0) {
            await Mentor.insertMany(defaultMentors);
            console.log('Default mentors seeded successfully');
        }
    } catch (error) {
        console.error('Error seeding mentors:', error);
    }
};

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
        seedMentors();
    })
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/mentors', mentorsRoutes);
app.use('/api/enrollments', enrollmentsRoutes);
app.use('/api/profiles', profilesRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'SkillBridge API is running' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
