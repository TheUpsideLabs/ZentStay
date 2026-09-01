import {
  Request,
  Response,
  NextFunction,
} from "express";

import {
  Role,
  VisitStatus,
} from "@prisma/client";

import visitRequestService from "../services/visit-request.service";

type AuthRequest = Request & {
  user?: {
    id: string;
    role: Role;
  };
};

export const createVisitRequest = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const request =
      await visitRequestService.createVisitRequest(
        req.user!.id,
        req.user!.role,
        req.body
      );

    res.status(201).json({
      success: true,
      message:
        "Visit request created successfully.",
      data: request,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllVisitRequests = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const requests =
      await visitRequestService.getAllVisitRequests(
        req.user!.role
      );

    res.json({
      success: true,
      data: requests,
    });
  } catch (error) {
    next(error);
  }
};

export const getVisitRequestById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const request =
      await visitRequestService.getVisitRequestById(
        req.params.id,
        req.user!.id,
        req.user!.role
      );

    res.json({
      success: true,
      data: request,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyVisitRequests = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const requests =
      await visitRequestService.getStudentVisitRequests(
        req.user!.id
      );

    res.json({
      success: true,
      data: requests,
    });
  } catch (error) {
    next(error);
  }
};

export const getOwnerVisitRequests = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const requests =
      await visitRequestService.getOwnerVisitRequests(
        req.user!.id
      );

    res.json({
      success: true,
      data: requests,
    });
  } catch (error) {
    next(error);
  }
};

export const confirmVisitRequest = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const request =
      await visitRequestService.updateVisitRequestStatus(
        req.params.id,
        req.user!.id,
        VisitStatus.CONFIRMED
      );

    res.json({
      success: true,
      message:
        "Visit request confirmed successfully.",
      data: request,
    });
  } catch (error) {
    next(error);
  }
};

export const rejectVisitRequest = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const request =
      await visitRequestService.updateVisitRequestStatus(
        req.params.id,
        req.user!.id,
        VisitStatus.REJECTED
      );

    res.json({
      success: true,
      message:
        "Visit request rejected successfully.",
      data: request,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteVisitRequest = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    await visitRequestService.deleteVisitRequest(
      req.params.id,
      req.user!.id
    );

    res.json({
      success: true,
      message:
        "Visit request cancelled successfully.",
    });
  } catch (error) {
    next(error);
  }
};