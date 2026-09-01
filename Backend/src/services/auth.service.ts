import { Prisma, Role } from "@prisma/client";

import authRepository from "../repositories/auth.repository";

import {
  comparePassword,
  hashPassword,
} from "../utils/password";

import {
  generateRefreshToken,
  generateToken,
  verifyRefreshToken,
} from "../utils/jwt";

import { AppError } from "../utils/AppError";

class AuthService {
  async register(
    data: Prisma.UserCreateInput
  ) {
    const existingEmail =
      await authRepository.findUserByEmail(
        data.email
      );

    if (existingEmail) {
      throw new AppError(
        409,
        "Email already exists."
      );
    }

    if (data.phone) {
      const existingPhone =
        await authRepository.findUserByPhone(
          data.phone
        );

      if (existingPhone) {
        throw new AppError(
          409,
          "Phone number already exists."
        );
      }
    }

    const hashedPassword =
      await hashPassword(data.password);

    const user =
      await authRepository.createUser({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: hashedPassword,
        avatar: data.avatar,
        role:
          data.role ??
          Role.STUDENT,
      });

    const accessToken =
      generateToken(
        user.id,
        user.role
      );

    const refreshToken =
      generateRefreshToken(
        user.id,
        user.role
      );

    await authRepository.saveRefreshToken(
      user.id,
      refreshToken
    );

    const {
      password,
      refreshToken: _,
      ...safeUser
    } = user;

    return {
      user: safeUser,
      accessToken,
      refreshToken,
    };
  }

  async login(data: {
    email: string;
    password: string;
  }) {
    const user =
      await authRepository.findUserByEmail(
        data.email
      );

    if (!user) {
      throw new AppError(
        401,
        "Invalid email or password."
      );
    }

    const valid =
      await comparePassword(
        data.password,
        user.password
      );

    if (!valid) {
      throw new AppError(
        401,
        "Invalid email or password."
      );
    }

    const accessToken =
      generateToken(
        user.id,
        user.role
      );

    const refreshToken =
      generateRefreshToken(
        user.id,
        user.role
      );

    await authRepository.saveRefreshToken(
      user.id,
      refreshToken
    );

    const {
      password,
      refreshToken: _,
      ...safeUser
    } = user;

    return {
      user: safeUser,
      accessToken,
      refreshToken,
    };
  }

  async refreshAccessToken(
    refreshToken: string
  ) {
    if (!refreshToken) {
      throw new AppError(
        401,
        "Refresh token is missing."
      );
    }

    let decoded;

    try {
      decoded =
        verifyRefreshToken(
          refreshToken
        );
    } catch {
      throw new AppError(
        401,
        "Invalid or expired refresh token."
      );
    }

    const user =
      await authRepository.findUserByRefreshToken(
        refreshToken
      );

    if (!user) {
      throw new AppError(
        401,
        "Invalid or expired refresh token."
      );
    }

    // Make sure the token belongs to
    // the same user stored in its payload.
    if (decoded.id !== user.id) {
      throw new AppError(
        401,
        "Invalid refresh token."
      );
    }

    const accessToken =
      generateToken(
        user.id,
        user.role
      );

    return {
      accessToken,
    };
  }

  async getMe(
    userId: string
  ) {
    const user =
      await authRepository.findUserById(
        userId
      );

    if (!user) {
      throw new AppError(
        404,
        "User not found."
      );
    }

    const {
      password,
      refreshToken,
      ...safeUser
    } = user;

    return safeUser;
  }
}

export default new AuthService();