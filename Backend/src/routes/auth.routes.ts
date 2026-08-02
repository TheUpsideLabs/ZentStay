// backend/src/routes/auth.routes.ts
import { Router } from 'express';
import * as authController from '../controllers/auth.controller';

const router = Router();

// Registration Route
router.post('/register', authController.register);

// Login Route
router.post('/login', authController.login);

export default router;