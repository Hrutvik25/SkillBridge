import crypto from 'crypto';

/**
 * Creates a secure reset token
 * @returns {Object} { rawToken, hashedToken }
 */
export const createResetToken = () => {
  // Generate a random token
  const rawToken = crypto.randomBytes(32).toString('hex');
  
  // Hash the token using SHA256
  const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');
  
  return { rawToken, hashedToken };
};