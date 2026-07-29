// backend/src/controllers/auth.controller.ts
import { Request, Response } from 'express';
import authService from '../services/auth.service';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract data from the request body
    const { name, email, password } = req.body;

    // Validate input (We will add strict Zod validation in a later step)
    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: 'Name, email, and password are required',
      });
      return;
    }

    // Call the service layer
    const result = await authService.register({ name, email, password });

    // Send successful response
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: result,
    });
  } catch (error: any) {
    // Catch the error thrown by the Service layer
    console.error('Registration Error:', error.message);

    // Return a clean JSON response instead of crashing
    res.status(400).json({
      success: false,
      message: error.message || 'An error occurred during registration',
    });
  }
};