// backend/src/utils/jwt.ts
import jwt from 'jsonwebtoken';

console.log(process.env.JWT_ACCESS_SECRET);
console.log(process.env.JWT_REFRESH_SECRET);

interface TokenPayload {
  id: string;
  role: string;
}

export const generateToken = (userId: string, role: string): string => {
  const secret = process.env.JWT_ACCESS_SECRET;
  
  if (!secret) {
    throw new Error('JWT_ACCESS_SECRET environment variable is missing');
  }

  // Generates an access token valid for 15 minutes (best practice for security)
  return jwt.sign(
    { id: userId, role } as TokenPayload,
    secret,
    { expiresIn: '15m' }
  );
};

// We will need this later for refresh tokens
export const generateRefreshToken = (userId: string, role: string): string => {
  const secret = process.env.JWT_REFRESH_SECRET;
  
  if (!secret) {
    throw new Error('JWT_REFRESH_SECRET environment variable is missing');
  }

  return jwt.sign(
    { id: userId, role } as TokenPayload,
    secret,
    { expiresIn: '7d' } // Refresh tokens live longer
  );
};