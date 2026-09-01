import { Router } from "express";
import { Role } from "@prisma/client";

import { getDashboard, getAllUsers } from "../controllers/admin.controller";

import {
  protect,
  authorize,
} from "../middleware/auth.middleware";

const router = Router();

router.get(
  "/dashboard",
  protect,
  authorize(Role.ADMIN),
  getDashboard
);

router.get(
  "/users",
  protect,
  authorize(Role.ADMIN),
  getAllUsers
);

export default router;