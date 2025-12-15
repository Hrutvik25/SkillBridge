import serverless from 'serverless-http';
import app from '../app.js';

// Create the serverless handler with explicit configuration
const serverlessHandler = serverless(app, {
  basePath: '/api',
  express: true
});

// Direct Express handler for Render
const expressHandler = (req, res) => {
  console.log(`Direct Express handler called: ${req.method} ${req.url}`);
  console.log(`Original URL: ${req.originalUrl}`);
  console.log(`Base URL: ${req.baseUrl}`);
  console.log(`Path: ${req.path}`);
  
  // For Render, we might need to adjust the path
  // If the request is prefixed with /api, we need to make sure it matches our routes
  return app(req, res);
};

export default async function handler(req, res) {
  try {
    console.log(`API Handler called: ${req.method} ${req.url}`);
    
    // Check if we're running on Render
    if (process.env.RENDER) {
      console.log('Using direct Express handler for Render');
      return expressHandler(req, res);
    }
    
    // For Vercel, use serverless-http
    console.log('Using serverless-http handler for Vercel');
    return await serverlessHandler(req, res);
  } catch (error) {
    console.error('API Handler error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message
    });
  }
}