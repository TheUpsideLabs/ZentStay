// backend/src/services/auth.service.ts
import authRepository from '../repositories/auth.repository';
import { hashPassword, comparePassword } from '../utils/password';
import { generateToken, generateRefreshToken } from '../utils/jwt';
import { Prisma } from '@prisma/client';
import { AppError } from "../utils/apperror";

export class AuthService {
  async register(data: Prisma.UserCreateInput) {
    // ... existing register code ...
    const existingUser = await authRepository.findUserByEmail(data.email);

    if (existingUser) {
      throw new AppError(
        409,
        "User already exists"
      );
    }

    const hashedPassword = await hashPassword(data.password);

    const user = await authRepository.createUser({
      ...data,
      password: hashedPassword,
    });

    const accessToken = generateToken(user.id, user.role);
    const refreshToken = generateRefreshToken(user.id, user.role);

    const { password, ...userWithoutPassword } = user;


    return {
      user: userWithoutPassword,
      accessToken,
      refreshToken,
    };
  }

  async login(data: Pick<Prisma.UserCreateInput, 'email' | 'password'>) {
      // 1. Find user by email
      const user = await authRepository.findUserByEmail(data.email);

      // 2. If user doesn't exist, throw a generic error
      if (!user) {
        throw new AppError(
          401,
          "Invalid email or password"
        );
      }

      // 3. Compare provided password with stored hash
      const isPasswordValid = await comparePassword(data.password, user.password);

      if (!isPasswordValid) {
        throw new AppError(
          401,
          "Invalid email or password"
        );
      }

      // 4. Generate Access and Refresh Tokens
      const accessToken = generateToken(user.id, user.role);
      const refreshToken = generateRefreshToken(user.id, user.role);

      // 5. Remove password from the user object before returning
      const { password, ...userWithoutPassword } = user;

      return {
        user: userWithoutPassword,
        accessToken,
        refreshToken,
      };
    }
  }

export default new AuthService();

