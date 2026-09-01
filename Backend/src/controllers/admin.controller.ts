import { Request, Response, NextFunction } from "express";
import { Role } from "@prisma/client";
import adminService from "../services/admin.service";

interface AuthRequest extends Request {
  user?: {
    id: string;
    role: Role;
  };
}

export const getDashboard = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const dashboard = await adminService.getDashboard(
      req.user!.role
    );

    res.status(200).json({
      success: true,
      data: dashboard,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await adminService.getAllUsers(
      req.user!.role
    );

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};