import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
dotenv.config();

const initializeSendGrid = () => {
  if (!process.env.SENDGRID_API_KEY) {
    throw new Error('SENDGRID_API_KEY is not set');
  }
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
};

// Send Welcome Email
export const sendWelcomeEmail = async (user) => {
  try {
    initializeSendGrid();

    const msg = {
      to: user.email,
      from: {
        email: process.env.SENDGRID_SENDER_EMAIL,
        name: process.env.SENDGRID_SENDER_NAME,
      },
      subject: "Welcome to SkillBridge! 🎉",
      text: `Welcome ${user.full_name || 'there'}! Thank you for joining SkillBridge.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6;">Welcome to SkillBridge!</h2>
          <p>Hi ${user.full_name || 'there'},</p>
          <p>Thank you for registering with SkillBridge! We're excited to have you join our learning community.</p>
          <p>Start exploring our courses and begin your journey toward mastering new skills today.</p>
          <p>Best regards,<br/>The SkillBridge Team</p>
          
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
          <p style="font-size: 12px; color: #666;">This is an automated email. Please do not reply to this message.</p>
        </div>
      `,
    };

    const response = await sgMail.send(msg);
    console.log("Welcome Email sent successfully. Status code:", response[0].statusCode);
    return response[0].statusCode;

  } catch (err) {
    console.error("SENDGRID WELCOME EMAIL ERROR:", err.response?.body || err);
    throw err;
  }
};

// Enrollment Confirmation Email
export const sendEnrollmentConfirmationEmail = async (user, course) => {
  try {
    initializeSendGrid();

    const msg = {
      to: user.email,
      from: {
        email: process.env.SENDGRID_SENDER_EMAIL,
        name: process.env.SENDGRID_SENDER_NAME,
      },
      subject: "Enrollment Confirmed ✔",
      text: `You've been enrolled in ${course.title || course.course_name || 'a course'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #10b981;">Enrollment Confirmed!</h2>
          <p>Hi ${user.full_name || 'there'},</p>
          <p>Congratulations! You've been successfully enrolled in:</p>
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin: 0; color: #3b82f6;">${course.title || course.course_name || 'Course Title'}</h3>
            <p style="margin: 5px 0;">Course start date and further details will be shared soon.</p>
          </div>
          <p>We're excited to have you in this course. Begin your learning journey right away!</p>
          <p>Best regards,<br/>The SkillBridge Team</p>
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
          <p style="font-size: 12px; color: #666;">This is an automated email. Please do not reply to this message.</p>
        </div>
      `,
    };

    const response = await sgMail.send(msg);
    console.log("Enrollment Confirmation Email sent successfully. Status code:", response[0].statusCode);
    return response[0].statusCode;

  } catch (err) {
    console.error("SENDGRID ENROLLMENT EMAIL ERROR:", err.response?.body || err);
    throw err;
  }
};

// Password Reset Email
export const sendPasswordResetEmail = async (user, resetUrl) => {
  try {
    initializeSendGrid();

    const msg = {
      to: user.email,
      from: {
        email: process.env.SENDGRID_SENDER_EMAIL,
        name: process.env.SENDGRID_SENDER_NAME,
      },
      subject: "Password Reset Request",
      text: `You requested a password reset. Click here: ${resetUrl}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6;">Password Reset Request</h2>
          <p>Hi ${user.full_name || 'there'},</p>
          <p>You recently requested to reset your password for your SkillBridge account. Click the button below to reset it.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p><strong>Note:</strong> This link will expire in 1 hour.</p>
          <p>If you didn't request a password reset, please ignore this email or contact support if you have concerns.</p>
          <p>Best regards,<br/>The SkillBridge Team</p>
          
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
          <p style="font-size: 12px; color: #666;">This is an automated email. Please do not reply to this message.</p>
        </div>
      `,
    };

    const response = await sgMail.send(msg);
    console.log("Password Reset Email sent successfully. Status code:", response[0].statusCode);
    return response[0].statusCode;

  } catch (err) {
    console.error("SENDGRID PASSWORD RESET EMAIL ERROR:", err.response?.body || err);
    throw err;
  }
};

// Password Changed Confirmation Email
export const sendPasswordChangedEmail = async (user) => {
  try {
    initializeSendGrid();

    const msg = {
      to: user.email,
      from: {
        email: process.env.SENDGRID_SENDER_EMAIL,
        name: process.env.SENDGRID_SENDER_NAME,
      },
      subject: "Password Changed Successfully",
      text: "Your SkillBridge password has been changed successfully.",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #10b981;">Password Changed Successfully</h2>
          <p>Hi ${user.full_name || 'there'},</p>
          <p>This is a confirmation that your SkillBridge account password was changed successfully.</p>
          <p>If you did not make this change, please contact our support team immediately.</p>
          <p>Best regards,<br/>The SkillBridge Team</p>
          
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
          <p style="font-size: 12px; color: #666;">This is an automated email. Please do not reply to this message.</p>
        </div>
      `,
    };

    const response = await sgMail.send(msg);
    console.log("Password Changed Email sent successfully. Status code:", response[0].statusCode);
    return response[0].statusCode;

  } catch (err) {
    console.error("SENDGRID PASSWORD CHANGED EMAIL ERROR:", err.response?.body || err);
    throw err;
  }
};