import { Router } from "express";
import { Role } from "@prisma/client";

import {
  createCollege,
  deleteCollege,
  getAllColleges,
  getCollegeById,
  getCollegeBySlug,
  updateCollege,
} from "../controllers/college.controller";

import {
  protect,
  authorize,
} from "../middleware/auth.middleware";

import { validate } from "../middleware/validate.middleware";

import { createCollegeSchema } from "../validation/college.validator";

const router = Router();

router.get("/", getAllColleges);

router.get("/slug/:slug", getCollegeBySlug);

router.get("/:id", getCollegeById);

router.post(
  "/",
  protect,
  authorize(Role.ADMIN),
  validate(createCollegeSchema),
  createCollege
);

router.put(
  "/:id",
  protect,
  authorize(Role.ADMIN),
  validate(createCollegeSchema.partial()),
  updateCollege
);

router.delete(
  "/:id",
  protect,
  authorize(Role.ADMIN),
  deleteCollege
);

export default router;