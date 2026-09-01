export interface CreateNotificationDTO {
  userId: string;
  title: string;
  message: string;
}

export interface UpdateNotificationDTO {
  isRead?: boolean;
}