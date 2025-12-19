import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import authRoutes from './routes/auth.js';
import coursesRoutes from './routes/courses.js';
import mentorsRoutes from './routes/mentors.js';
import teamRoutes from './routes/team.js';
import enrollmentsRoutes from './routes/enrollments.js';
import profilesRoutes from './routes/profiles.js';
import contactRoutes from './routes/contact.js';
import adminRoutes from './routes/admin.js';
import galleryRoutes from './routes/gallery.js';

dotenv.config();

const app = express();

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Configure CORS
app.use(cors({
  origin: [
    'http://localhost:5173', 
    'http://localhost:8080', 
    'http://127.0.0.1:5173',

    /\.vercel\.app$/,  // Allow all Vercel deployments
    "https://lightgreen-mongoose-943742.hostingersite.com"  // Your specific frontend URL
  ].filter(Boolean),  // Remove any falsy values
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));

// Serve public static files (uploads, images, etc.)
app.use(express.static('public'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', coursesRoutes);
app.use('/api/mentors', mentorsRoutes);
app.use('/api/team', teamRoutes);
app.use('/api/enrollments', enrollmentsRoutes);
app.use('/api/profiles', profilesRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/gallery', galleryRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'SkillBridge API is running',
    timestamp: new Date().toISOString()
  });
});

// Root route for checking if server is running
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to SkillBridge API',
    version: '1.0.0',
    documentation: '/api/health for health check'
  });
});

// Handle undefined routes
app.use('*', (req, res) => {
  // If requesting API routes that don't exist, return JSON error
  if (req.originalUrl.startsWith('/api')) {
    return res.status(404).json({ 
      error: 'Route not found',
      message: 'The requested API endpoint does not exist'
    });
  }
  
  // For non-API routes, return a simple message
  res.status(404).json({ 
    error: 'Route not found',
    message: 'The requested endpoint does not exist'
  });
});

export async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.warn('MONGODB_URI not set; skipping DB connection');
    return;
  }

  try {
    // Check if already connected
    if (mongoose.connection.readyState === 1) {
      console.log('Already connected to MongoDB');
      return;
    }
    
    // For serverless environments, we want quick timeouts
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    throw err;
  }
}

// Graceful shutdown for non-serverless environments
if (process.env.NODE_ENV !== 'production') {
  process.on('SIGINT', async () => {
    try {
      await mongoose.connection.close();
      console.log('MongoDB connection closed through app termination');
      process.exit(0);
    } catch (err) {
      console.error('Error closing MongoDB connection:', err);
      process.exit(1);
    }
  });
}

export default app;