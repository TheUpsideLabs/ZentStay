import { Router } from "express";
import { Role } from "@prisma/client";
import {
  createReview,
  getAllReviews,
  getPropertyReviews,
  getMyReviews,
  getOwnerReviews,
  updateReview,
  deleteReview,
} from "../controllers/review.controller";
import { protect, authorize } from "../middleware/auth.middleware";
import { validate } from "../middleware/validate.middleware";
import {
  createReviewSchema,
  updateReviewSchema,
} from "../validation/review.validator";

const router = Router();

// Public Routes
router.get("/property/:propertyId", getPropertyReviews);

// Student Routes
router.post(
  "/",
  protect,
  authorize(Role.STUDENT),
  validate(createReviewSchema),
  createReview
);
router.get("/my", protect, authorize(Role.STUDENT), getMyReviews);
router.put(
  "/:id",
  protect,
  authorize(Role.STUDENT),
  validate(updateReviewSchema),
  updateReview
);
router.delete("/:id", protect, authorize(Role.STUDENT, Role.ADMIN), deleteReview);

// Owner Routes
router.get("/owner", protect, authorize(Role.OWNER), getOwnerReviews);

// Admin Routes
router.get("/", protect, authorize(Role.ADMIN), getAllReviews);

export default router;