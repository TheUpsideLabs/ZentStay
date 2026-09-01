import { Router } from "express";
import { Role } from "@prisma/client";
import {
  createBooking,
  getAllBookings,
  getBookingById,
  getMyBookings,
  getOwnerBookings,
  confirmBooking,
  verifyBookingRent,
  rejectBooking,
  deleteBooking,
} from "../controllers/booking.controller";
import { protect, authorize } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import { createBookingSchema } from "../validation/booking.validator";

const router = Router();

// Student
router.post(
  "/",
  protect,
  authorize(Role.STUDENT),
  validate(createBookingSchema),
  createBooking
);
router.get("/my", protect, authorize(Role.STUDENT), getMyBookings);
router.delete("/:id", protect, authorize(Role.STUDENT), deleteBooking);

// Owner
router.get("/owner", protect, authorize(Role.OWNER), getOwnerBookings);
router.patch(
  "/:id/confirm",
  protect,
  authorize(Role.OWNER),
  confirmBooking
);
router.patch(
  "/:id/verify-rent",
  protect,
  authorize(Role.OWNER),
  verifyBookingRent
);
router.patch(
  "/:id/reject",
  protect,
  authorize(Role.OWNER),
  rejectBooking
);

// Shared
router.get(
  "/:id",
  protect,
  authorize(Role.ADMIN, Role.OWNER, Role.STUDENT),
  getBookingById
);

// Admin
router.get("/", protect, authorize(Role.ADMIN), getAllBookings);

export default router;