import { Request, Response, NextFunction } from "express";
import { Role } from "@prisma/client";
import reviewService from "../services/review.service";

type AuthRequest = Request & {
  user?: {
    id: string;
    role: Role;
  };
};

export const createReview = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const review = await reviewService.createReview(
      req.user!.id,
      req.user!.role,
      req.body
    );

    res.status(201).json({
      success: true,
      message: "Review created successfully.",
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllReviews = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const reviews = await reviewService.getAllReviews(req.user!.role);

    res.json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

export const getPropertyReviews = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const reviews = await reviewService.getPropertyReviews(
      req.params.propertyId
    );

    res.json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyReviews = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const reviews = await reviewService.getMyReviews(req.user!.id);

    res.json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

export const getOwnerReviews = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const reviews = await reviewService.getOwnerReviews(req.user!.id);

    res.json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    next(error);
  }
};

export const updateReview = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const review = await reviewService.updateReview(
      req.params.id,
      req.user!.id,
      req.body
    );

    res.json({
      success: true,
      message: "Review updated successfully.",
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteReview = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    await reviewService.deleteReview(
      req.params.id,
      req.user!.id,
      req.user!.role
    );

    res.json({
      success: true,
      message: "Review deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};