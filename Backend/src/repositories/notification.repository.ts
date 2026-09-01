import prisma from "../config/prisma";
import {
  CreateNotificationDTO,
} from "../interfaces/notification.interface";

class NotificationRepository {
  async create(data: CreateNotificationDTO) {
    return prisma.notification.create({
      data,
    });
  }

  async findAllByUser(userId: string) {
    return prisma.notification.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: string) {
    return prisma.notification.findUnique({
      where: {
        id,
      },
    });
  }

  async markAsRead(id: string) {
    return prisma.notification.update({
      where: {
        id,
      },
      data: {
        isRead: true,
      },
    });
  }

  async delete(id: string) {
    return prisma.notification.delete({
      where: {
        id,
      },
    });
  }

  async markAllAsRead(userId: string) {
    return prisma.notification.updateMany({
      where: {
        userId,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });
  }
}

export default new NotificationRepository();