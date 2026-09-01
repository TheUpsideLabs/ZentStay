import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Role } from "@prisma/client";
import { AppError } from "../utils/AppError";

interface JwtPayload {
  id: string;
  role: Role;
}

export const protect = (
  req: Request & { user?: JwtPayload },
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError(401, "Access token is missing.");
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET!
    ) as JwtPayload;

    req.user = decoded;

    next();
  } catch {
    next(new AppError(401, "Invalid or expired token."));
  }
};

export const authorize = (...roles: Role[]) => {
  return (
    req: Request & { user?: JwtPayload },
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      return next(new AppError(401, "Unauthorized"));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError(403, "Forbidden"));
    }

    next();
  };
};