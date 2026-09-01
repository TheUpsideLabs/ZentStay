import { Request, Response, NextFunction } from "express";
import wishlistService from "../services/wishlist.service";
import { Role } from "@prisma/client";

interface AuthRequest extends Request {
  user?: {
    id: string;
    role: Role;
  };
}

export const addToWishlist = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const wishlist = await wishlistService.addToWishlist(
      req.user!.id,
      req.user!.role,
      req.params.propertyId
    );

    res.status(201).json({
      success: true,
      message: "Property added to wishlist.",
      data: wishlist,
    });
  } catch (error) {
    next(error);
  }
};

export const getWishlist = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const wishlist = await wishlistService.getWishlist(req.user!.id);

    res.status(200).json({
      success: true,
      count: wishlist.length,
      data: wishlist,
    });
  } catch (error) {
    next(error);
  }
};

export const removeFromWishlist = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await wishlistService.removeFromWishlist(
      req.user!.id,
      req.params.propertyId
    );

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};