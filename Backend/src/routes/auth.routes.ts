// backend/src/routes/auth.routes.ts
import { Router } from 'express';
// Use the wildcard import to group all named exports into 'authController'
import * as authController from '../controllers/auth.controller';

const router = Router();

// Registration Route
router.post('/register', authController.register);

// We will add login and other routes here in the next sprint
// router.post('/login', authController.login);

export default router;