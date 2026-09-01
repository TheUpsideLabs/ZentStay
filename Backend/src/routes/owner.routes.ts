import { Router } from "express";
import { Role } from "@prisma/client";
import { getOwnerAnalytics } from "../controllers/owner.controller";
import { protect, authorize } from "../middleware/auth.middleware";

const router = Router();

router.get(
  "/analytics",
  protect,
  authorize(Role.OWNER, Role.ADMIN),
  getOwnerAnalytics
);

export default router;
