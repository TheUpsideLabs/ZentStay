import { Router } from "express";
import { Role } from "@prisma/client";
import {
  createOrder,
  verifyPayment,
} from "../controllers/payment.controller";
import { protect, authorize } from "../middleware/auth.middleware";

const router = Router();

// Only students can create and verify payments
router.use(protect);
router.use(authorize(Role.STUDENT));

router.post("/create-order", createOrder);
router.post("/verify", verifyPayment);

export default router;
