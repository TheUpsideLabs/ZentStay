import { Router } from "express";

import { Role } from "@prisma/client";

import {
  createVisitRequest,
  getAllVisitRequests,
  getVisitRequestById,
  getMyVisitRequests,
  getOwnerVisitRequests,
  confirmVisitRequest,
  rejectVisitRequest,
  deleteVisitRequest,
} from "../controllers/visit-request.controller";

import {
  protect,
  authorize,
} from "../middleware/auth.middleware";

import { validate } from "../middleware/validate.middleware";

import {
  createVisitRequestSchema,
} from "../validation/visit-request.validator";

const router = Router();

// Student
router.post(
  "/",
  protect,
  authorize(Role.STUDENT),
  validate(createVisitRequestSchema),
  createVisitRequest
);

router.get(
  "/my",
  protect,
  authorize(Role.STUDENT),
  getMyVisitRequests
);

router.delete(
  "/:id",
  protect,
  authorize(Role.STUDENT),
  deleteVisitRequest
);

// Owner
router.get(
  "/owner",
  protect,
  authorize(Role.OWNER),
  getOwnerVisitRequests
);

router.patch(
  "/:id/confirm",
  protect,
  authorize(Role.OWNER),
  confirmVisitRequest
);

router.patch(
  "/:id/reject",
  protect,
  authorize(Role.OWNER),
  rejectVisitRequest
);

// Shared
router.get(
  "/:id",
  protect,
  authorize(
    Role.ADMIN,
    Role.OWNER,
    Role.STUDENT
  ),
  getVisitRequestById
);

// Admin
router.get(
  "/",
  protect,
  authorize(Role.ADMIN),
  getAllVisitRequests
);

export default router;