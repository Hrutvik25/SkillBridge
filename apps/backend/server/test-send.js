import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';

// Load environment variables
dotenv.config();

// Check if API key is set
if (!process.env.SENDGRID_API_KEY) {
  console.error('ERROR: SENDGRID_API_KEY is not set in .env file');
  process.exit(1);
}

if (!process.env.SENDGRID_SENDER_EMAIL) {
  console.error('ERROR: SENDGRID_SENDER_EMAIL is not set in .env file');
  process.exit(1);
}

// Set API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Test email configuration
const msg = {
  to: 'your-email@gmail.com', // Replace with your actual email
  from: {
    email: process.env.SENDGRID_SENDER_EMAIL,
    name: process.env.SENDGRID_SENDER_NAME || 'SKILLBRIDGE'
  },
  subject: 'Test Email from SkillBridge',
  text: 'This is a test email from SkillBridge to confirm SendGrid is working correctly.',
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #3b82f6;">SendGrid Test Successful!</h2>
      <p>If you received this email, it means your SendGrid integration is working correctly.</p>
      <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <h3>Configuration Details:</h3>
        <ul>
          <li><strong>API Key:</strong> ${process.env.SENDGRID_API_KEY.substring(0, 10)}... (masked for security)</li>
          <li><strong>Sender Email:</strong> ${process.env.SENDGRID_SENDER_EMAIL}</li>
          <li><strong>Sender Name:</strong> ${process.env.SENDGRID_SENDER_NAME || 'Not set'}</li>
        </ul>
      </div>
      <p>Proceed with integrating email services into your application.</p>
      <p>Best regards,<br/>SkillBridge Development Team</p>
    </div>
  `,
};

// Send test email
console.log('Testing SendGrid API key...');
sgMail.send(msg)
  .then(response => {
    console.log('✅ API key works!');
    console.log('📧 Test email sent successfully');
    console.log('📊 Status code:', response[0].statusCode);
    console.log('📝 Headers:', Object.keys(response[0].headers));
  })
  .catch(error => {
    console.error('❌ SendGrid API test failed:');
    if (error.response) {
      console.error('Status code:', error.response.statusCode);
      console.error('Error body:', JSON.stringify(error.response.body, null, 2));
    } else {
      console.error('Error:', error.message);
    }
    process.exit(1);
  });