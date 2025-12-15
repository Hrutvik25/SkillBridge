import serverless from 'serverless-http';
import app, { connectDB } from '../backend/server/app.js';

let connected = false;
const handler = serverless(app);

export default async function (req, res) {
  if (!connected) {
    try {
      await connectDB();
      connected = true;
    } catch (err) {
      console.error('Failed to connect to DB in serverless handler:', err);
      // allow handler to continue; routes may still work if DB not required for static endpoints
    }
  }

  return handler(req, res);
}
