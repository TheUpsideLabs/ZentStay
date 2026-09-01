import { Request, Response, NextFunction } from "express";
import notificationService from "../services/notification.service";

class NotificationController {
  async getMyNotifications(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = (req as any).user.id;

      const notifications =
        await notificationService.getMyNotifications(userId);

      res.status(200).json({
        success: true,
        data: notifications,
      });
    } catch (error) {
      next(error);
    }
  }

  async markAsRead(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = (req as any).user.id;
      const { notificationId } = req.params;

      const notification =
        await notificationService.markAsRead(
          notificationId,
          userId
        );

      res.status(200).json({
        success: true,
        data: notification,
      });
    } catch (error) {
      next(error);
    }
  }

  async markAllAsRead(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = (req as any).user.id;

      await notificationService.markAllAsRead(userId);

      res.status(200).json({
        success: true,
        message: "All notifications marked as read.",
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteNotification(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = (req as any).user.id;
      const { notificationId } = req.params;

      const result =
        await notificationService.deleteNotification(
          notificationId,
          userId
        );

      res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new NotificationController();