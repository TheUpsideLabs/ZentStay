import {
  Request,
  Response,
  NextFunction,
} from "express";

import collegeService from "../services/college.service";

export const createCollege = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const college =
      await collegeService.createCollege(
        req.body
      );

    res.status(201).json({
      success: true,
      message:
        "College created successfully.",
      data: college,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllColleges = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { search, pincode, state, city, lat, lng, radius, popular, page, limit } = req.query;
    
    const filters = {
      search: search as string,
      pincode: pincode as string,
      state: state as string,
      city: city as string,
      lat: lat ? parseFloat(lat as string) : undefined,
      lng: lng ? parseFloat(lng as string) : undefined,
      radius: radius ? parseFloat(radius as string) : undefined,
      popular: popular === "true" || popular === "1",
      page: page ? parseInt(page as string, 10) : undefined,
      limit: limit ? parseInt(limit as string, 10) : undefined,
    };

    const result = await collegeService.getAllColleges(filters);

    res.status(200).json({
      success: true,
      count: result.colleges.length,
      data: result.colleges,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

export const getCollegeById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const college =
      await collegeService.getCollegeById(
        req.params.id
      );

    res.status(200).json({
      success: true,
      data: college,
    });
  } catch (error) {
    next(error);
  }
};

export const getCollegeBySlug = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const college =
      await collegeService.getCollegeBySlug(
        req.params.slug
      );

    res.status(200).json({
      success: true,
      data: college,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCollege = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const college =
      await collegeService.updateCollege(
        req.params.id,
        req.body
      );

    res.status(200).json({
      success: true,
      message:
        "College updated successfully.",
      data: college,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCollege = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await collegeService.deleteCollege(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message:
        "College deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};