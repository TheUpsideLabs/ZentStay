// backend/src/utils/password.ts
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12; // 12 is the current industry standard for security vs performance

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};