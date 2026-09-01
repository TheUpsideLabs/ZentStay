export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationApiResponse {
  success: boolean;
  data: Notification[];
}

export interface SingleNotificationApiResponse {
  success: boolean;
  data: Notification;
}

export interface NotificationActionResponse {
  success: boolean;
  message: string;
}