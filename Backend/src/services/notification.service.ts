import { AppError } from "../utils/AppError";
import notificationRepository from "../repositories/notification.repository";

class NotificationService {
  async createNotification(
    userId: string,
    title: string,
    message: string
  ) {
    return notificationRepository.create({
      userId,
      title,
      message,
    });
  }

  async getMyNotifications(userId: string) {
    return notificationRepository.findAllByUser(userId);
  }

  async markAsRead(notificationId: string, userId: string) {
    const notification = await notificationRepository.findById(notificationId);

    if (!notification) {
      throw new AppError(404, "Notification not found.");
    }

    if (notification.userId !== userId) {
      throw new AppError(403, "You are not authorized.");
    }

    return notificationRepository.markAsRead(notificationId);
  }

  async markAllAsRead(userId: string) {
    return notificationRepository.markAllAsRead(userId);
  }

  async deleteNotification(notificationId: string, userId: string) {
    const notification = await notificationRepository.findById(notificationId);

    if (!notification) {
      throw new AppError(404, "Notification not found.");
    }

    if (notification.userId !== userId) {
      throw new AppError(403, "You are not authorized.");
    }

    await notificationRepository.delete(notificationId);

    return {
      message: "Notification deleted successfully.",
    };
  }
}

export default new NotificationService();