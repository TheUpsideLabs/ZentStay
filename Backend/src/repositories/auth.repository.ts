import prisma from "../config/prisma";
import { User, Role } from "@prisma/client";

class AuthRepository {
  async findUserByEmail(
    email: string
  ): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findUserByPhone(
    phone: string | null
  ): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        phone: phone ?? undefined,
      },
    });
  }

  async findUserById(
    id: string
  ): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findUserByRefreshToken(
    refreshToken: string
  ): Promise<User | null> {
    return prisma.user.findFirst({
      where: {
        refreshToken,
      },
    });
  }

  async createUser(data: {
    name: string;
    email: string;
    phone?: string | null;
    password: string;
    avatar?: string | null;
    role?: Role;
  }): Promise<User> {
    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone ?? undefined,
        password: data.password,
        avatar: data.avatar ?? undefined,
        role: data.role ?? Role.STUDENT,
      },
    });
  }

  async saveRefreshToken(
    userId: string,
    refreshToken: string
  ) {
    return prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken,
      },
    });
  }

  async clearRefreshToken(
    userId: string
  ) {
    return prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: null,
      },
    });
  }
}

export default new AuthRepository();