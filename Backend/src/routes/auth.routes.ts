import { Router } from "express";

import * as authController
  from "../controllers/auth.controller";

import { protect } from "../middleware/auth.middleware";

import { validate } from "../middleware/validate.middleware";

import {
  registerSchema,
  loginSchema,
} from "../validation/auth.validator";

const router = Router();

router.post(
  "/register",
  validate(registerSchema),
  authController.register
);

router.post(
  "/login",
  validate(loginSchema),
  authController.login
);

// Refresh access token.
// This endpoint does NOT use protect,
// because the access token may already be expired.
router.post(
  "/refresh",
  authController.refresh
);

router.get(
  "/me",
  protect,
  authController.getMe
);

export default router;