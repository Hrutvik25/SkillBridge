import { connectDB } from '../backend/server/app.js';

export default async function handler(request, response) {
  try {
    await connectDB();
    response.status(200).json({ 
      status: 'success',
      message: 'Database connection successful',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    response.status(500).json({ 
      status: 'error',
      message: 'Database connection failed',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
}