import { api } from "@/lib/api";

import {
  Notification,
  NotificationApiResponse,
  SingleNotificationApiResponse,
  NotificationActionResponse,
} from "@/types/api/notification";

class NotificationService {
  // =====================================
  // GET MY NOTIFICATIONS
  // =====================================

  async getMyNotifications(): Promise<Notification[]> {
    const response =
      await api.get<NotificationApiResponse>(
        "/notifications/my"
      );

    return response.data.data;
  }

  // =====================================
  // MARK ONE AS READ
  // =====================================

  async markAsRead(
    notificationId: string
  ): Promise<Notification> {
    const response =
      await api.patch<SingleNotificationApiResponse>(
        `/notifications/${notificationId}/read`
      );

    return response.data.data;
  }

  // =====================================
  // MARK ALL AS READ
  // =====================================

  async markAllAsRead(): Promise<void> {
    await api.patch<NotificationActionResponse>(
      "/notifications/read-all"
    );
  }

  // =====================================
  // DELETE NOTIFICATION
  // =====================================

  async deleteNotification(
    notificationId: string
  ): Promise<void> {
    await api.delete<NotificationActionResponse>(
      `/notifications/${notificationId}`
    );
  }
}

export default new NotificationService();