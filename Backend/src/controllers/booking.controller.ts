import { Request, Response, NextFunction } from "express";
import { Role } from "@prisma/client";

import bookingService from "../services/booking.service";

type AuthRequest = Request & {
  user?: {
    id: string;
    role: Role;
  };
};

// ==========================================
// CREATE BOOKING
// ==========================================

export const createBooking = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const booking =
      await bookingService.createBooking(
        req.user!.id,
        req.user!.role,
        req.body
      );

    res.status(201).json({
      success: true,
      message: "Booking created successfully.",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// ADMIN - GET ALL BOOKINGS
// ==========================================

export const getAllBookings = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookings =
      await bookingService.getAllBookings(
        req.user!.role
      );

    res.json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// GET BOOKING BY ID
// ==========================================

export const getBookingById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const booking =
      await bookingService.getBookingById(
        req.params.id,
        req.user!.id,
        req.user!.role
      );

    res.json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// STUDENT - MY BOOKINGS
// ==========================================

export const getMyBookings = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookings =
      await bookingService.getStudentBookings(
        req.user!.id
      );

    res.json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// OWNER - BOOKINGS
// ==========================================

export const getOwnerBookings = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const bookings =
      await bookingService.getOwnerBookings(
        req.user!.id
      );

    res.json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// OWNER - CONFIRM BOOKING
// ==========================================

export const confirmBooking = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const booking =
      await bookingService.confirmBooking(
        req.params.id,
        req.user!.id
      );

    res.json({
      success: true,
      message:
        "Booking confirmed successfully.",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// OWNER - VERIFY RENT (OFFLINE PAYMENT)
// ==========================================

export const verifyBookingRent = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const booking =
      await bookingService.verifyBookingRent(
        req.params.id,
        req.user!.id
      );

    res.json({
      success: true,
      message:
        "Rent verified successfully. Booking is now completed.",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// OWNER - REJECT BOOKING
// ==========================================

export const rejectBooking = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const booking =
      await bookingService.rejectBooking(
        req.params.id,
        req.user!.id
      );

    res.json({
      success: true,
      message:
        "Booking rejected successfully.",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

// ==========================================
// STUDENT - CANCEL BOOKING
// ==========================================

export const deleteBooking = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const result =
      await bookingService.cancelBooking(
        req.params.id,
        req.user!.id
      );

    res.json({
      success: true,
      message: result.message,
      data: result.booking,
    });
  } catch (error) {
    next(error);
  }
};