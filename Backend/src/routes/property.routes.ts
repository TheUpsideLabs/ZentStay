import { Router } from "express";
import { Role } from "@prisma/client";

import {
  createProperty,
  deleteProperty,
  getAllProperties,
  getMyProperties,
  getPropertyById,
  updateProperty,
} from "../controllers/property.controller";

import {
  protect,
  authorize,
} from "../middleware/auth.middleware";

import { validate } from "../middleware/validate.middleware";

import {
  createPropertySchema,
} from "../validation/property.validator";

const router = Router();

// ==========================================
// CREATE PROPERTY
// ==========================================

router.post(
  "/",
  protect,
  authorize(Role.OWNER, Role.ADMIN),
  validate(createPropertySchema),
  createProperty
);

// ==========================================
// IMPORTANT:
// Keep /owner BEFORE /:id
// ==========================================

router.get(
  "/owner",
  protect,
  authorize(Role.OWNER, Role.ADMIN),
  getMyProperties
);

// ==========================================
// PUBLIC PROPERTY LIST
// ==========================================

router.get(
  "/",
  getAllProperties
);

// ==========================================
// PROPERTY DETAILS
// ==========================================

router.get(
  "/:id",
  getPropertyById
);

// ==========================================
// UPDATE PROPERTY
// ==========================================

router.put(
  "/:id",
  protect,
  authorize(Role.OWNER, Role.ADMIN),
  validate(createPropertySchema.partial()),
  updateProperty
);

// ==========================================
// DELETE PROPERTY
// ==========================================

router.delete(
  "/:id",
  protect,
  authorize(Role.OWNER, Role.ADMIN),
  deleteProperty
);

export default router;