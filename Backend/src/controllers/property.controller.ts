import {
  NextFunction,
  Request,
  Response,
} from "express";

// Extend Request locally to include user
// injected by auth middleware.
interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

import propertyService from "../services/property.service";

export const createProperty = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, role } = req.user!;

    const property =
      await propertyService.createProperty(
        id,
        role as any,
        req.body
      );

    res.status(201).json({
      success: true,
      message:
        "Property created successfully.",
      data: property,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// GET ALL PROPERTIES
// ==========================================

export const getAllProperties = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result =
      await propertyService.getAllProperties(
        req.query
      );

    res.status(200).json({
      success: true,
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalPages: result.totalPages,
      count: result.properties.length,
      data: result.properties,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// GET MY PROPERTIES
// ==========================================

export const getMyProperties = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, role } = req.user!;

    const properties =
      await propertyService.getMyProperties(
        id,
        role as any
      );

    res.status(200).json({
      success: true,
      count: properties.length,
      data: properties,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// GET PROPERTY BY ID
// ==========================================

export const getPropertyById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const property =
      await propertyService.getPropertyById(
        req.params.id
      );

    res.status(200).json({
      success: true,
      data: property,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// UPDATE PROPERTY
// ==========================================

export const updateProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const property =
      await propertyService.updateProperty(
        req.params.id,
        req.body
      );

    res.status(200).json({
      success: true,
      message:
        "Property updated successfully.",
      data: property,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// DELETE PROPERTY
// ==========================================

export const deleteProperty = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await propertyService.deleteProperty(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message:
        "Property deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};