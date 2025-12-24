import express from 'express';
import MentorSchedule from '../models/MentorSchedule.js';

const router = express.Router();

// Handle mentor confirmation
router.get('/confirm/:token', async (req, res) => {
  try {
    const { token } = req.params;

    // Find the schedule by confirmation token
    const schedule = await MentorSchedule.findOne({ confirmationToken: token });

    if (!schedule) {
      return res.status(404).send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Invalid Link</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background-color: #f9f9f9; }
            .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
            .error { color: #ef4444; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1 class="error">✗ Invalid Link</h1>
            <p>The confirmation link you used is invalid or has expired.</p>
            <p>Please contact the admin team for assistance.</p>
          </div>
        </body>
        </html>
      `);
    }

    // Update the confirmation status to 'Confirmed'
    schedule.confirmationStatus = 'Confirmed';
    await schedule.save();

    // Return a success page
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Confirmation Received</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background-color: #f9f9f9; }
          .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
          .success { color: #22c55e; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1 class="success">✓ Confirmation Received!</h1>
          <p>Your availability for the lecture has been confirmed.</p>
          <p>Course: <strong>${schedule.courseName}</strong></p>
          <p>Date: <strong>${new Date(schedule.lectureDate).toLocaleDateString()}</strong></p>
          <p>Time: <strong>${schedule.lectureTime}</strong></p>
          <p>We'll notify the admin team of your confirmation.</p>
        </div>
      </body>
      </html>
    `);
  } catch (error) {
    console.error('Confirmation error:', error);
    res.status(500).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Error</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background-color: #f9f9f9; }
          .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
          .error { color: #ef4444; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1 class="error">✗ Error Processing Confirmation</h1>
          <p>There was an error processing your confirmation. Please try again later.</p>
        </div>
      </body>
      </html>
    `);
  }
});

// Handle mentor rejection
router.get('/reject/:token', async (req, res) => {
  try {
    const { token } = req.params;

    // Find the schedule by confirmation token
    const schedule = await MentorSchedule.findOne({ confirmationToken: token });

    if (!schedule) {
      return res.status(404).send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Invalid Link</title>
          <style>
            body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background-color: #f9f9f9; }
            .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
            .error { color: #ef4444; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1 class="error">✗ Invalid Link</h1>
            <p>The rejection link you used is invalid or has expired.</p>
            <p>Please contact the admin team for assistance.</p>
          </div>
        </body>
        </html>
      `);
    }

    // Update the confirmation status to 'Rejected'
    schedule.confirmationStatus = 'Rejected';
    await schedule.save();

    // Return a rejection page
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Rejection Received</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background-color: #f9f9f9; }
          .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
          .rejected { color: #ef4444; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1 class="rejected">✗ Rejection Received</h1>
          <p>Your unavailability for the lecture has been recorded.</p>
          <p>Course: <strong>${schedule.courseName}</strong></p>
          <p>Date: <strong>${new Date(schedule.lectureDate).toLocaleDateString()}</strong></p>
          <p>Time: <strong>${schedule.lectureTime}</strong></p>
          <p>We'll look for an alternative mentor for this session.</p>
        </div>
      </body>
      </html>
    `);
  } catch (error) {
    console.error('Rejection error:', error);
    res.status(500).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Error</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background-color: #f9f9f9; }
          .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
          .error { color: #ef4444; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1 class="error">✗ Error Processing Rejection</h1>
          <p>There was an error processing your rejection. Please try again later.</p>
        </div>
      </body>
      </html>
    `);
  }
});

export default router;