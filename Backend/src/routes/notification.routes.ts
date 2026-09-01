import { Router } from "express";
import notificationController from "../controllers/notification.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.get(
  "/my",
  protect,
  notificationController.getMyNotifications
);

router.patch(
  "/:notificationId/read",
  protect,
  notificationController.markAsRead
);

router.patch(
  "/read-all",
  protect,
  notificationController.markAllAsRead
);

router.delete(
  "/:notificationId",
  protect,
  notificationController.deleteNotification
);

export default router;