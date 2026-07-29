// backend/src/services/auth.service.ts
import authRepository from '../repositories/auth.repository';
import { hashPassword } from '../utils/password';
import { generateToken } from '../utils/jwt';
import { Prisma } from '@prisma/client';

export class AuthService {
  async register(data: Prisma.UserCreateInput) {
    // Check if user already exists
    const existingUser = await authRepository.findUserByEmail(data.email);

    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await hashPassword(data.password);

    // Create user
    const user = await authRepository.createUser({
      ...data,
      password: hashedPassword,
    });

    // Generate JWT
    const token = generateToken(user.id, user.role);

    // Remove password before returning
    const { password, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
    };
  }
}

export default new AuthService();