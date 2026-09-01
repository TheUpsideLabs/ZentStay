import { Request, Response, NextFunction } from "express";
import { Role } from "@prisma/client";
import paymentService from "../services/payment.service";

export type AuthRequest = Request & {
  user?: {
    id: string;
    role: Role;
  };
};

export const createOrder = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const studentId = req.user!.id;
    const { bookingId } = req.body;

    const result = await paymentService.createOrder(bookingId, studentId);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const verifyPayment = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const studentId = req.user!.id;
    const {
      bookingId,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    } = req.body;

    const result = await paymentService.verifyPayment(
      bookingId,
      studentId,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature
    );

    res.status(200).json({
      success: true,
      message: "Payment verified and booking confirmed successfully.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
