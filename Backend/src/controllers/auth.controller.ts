import {
  NextFunction,
  Request,
  Response,
} from "express";

import authService from "../services/auth.service";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result =
      await authService.register(
        req.body
      );

    res.status(201).json({
      success: true,
      message:
        "User registered successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result =
      await authService.login(
        req.body
      );

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } =
      req.body;

    const result =
      await authService.refreshAccessToken(
        refreshToken
      );

    res.status(200).json({
      success: true,
      message:
        "Access token refreshed successfully.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userId =
      (req as any).user!.id;

    const user =
      await authService.getMe(
        userId
      );

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error: any) {
    console.error(
      "Get Me Error:",
      error.message
    );

    res.status(404).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch user profile",
    });
  }
};