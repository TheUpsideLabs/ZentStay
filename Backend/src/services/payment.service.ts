import Razorpay from "razorpay";
import crypto from "crypto";
import prisma from "../config/prisma";
import { AppError } from "../utils/AppError";
import { BookingStatus, PaymentStatus } from "@prisma/client";
import notificationService from "./notification.service";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "mock_key_id",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "mock_key_secret",
});

class PaymentService {
  async createOrder(bookingId: string, studentId: string) {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { property: true },
    });

    if (!booking) {
      throw new AppError(404, "Booking not found.");
    }

    if (booking.studentId !== studentId) {
      throw new AppError(403, "You can only pay for your own bookings.");
    }

    if (booking.status !== BookingStatus.PENDING) {
      throw new AppError(400, "You can only pay for PENDING bookings.");
    }

    const amountInPaise = booking.totalAmount * 100;

    try {
      const order = await razorpay.orders.create({
        amount: amountInPaise,
        currency: "INR",
        receipt: "receipt_" + bookingId,
      });

      const payment = await prisma.payment.create({
        data: {
          bookingId,
          studentId,
          providerOrderId: order.id,
          amount: booking.totalAmount,
          currency: "INR",
          status: PaymentStatus.PENDING,
        },
      });

      return {
        payment,
        order,
      };
    } catch (error: any) {
      console.error("Razorpay order creation failed:", error);
      throw new AppError(500, "Failed to initialize payment gateway.");
    }
  }

  async verifyPayment(
    bookingId: string,
    studentId: string,
    razorpayOrderId: string,
    razorpayPaymentId: string,
    razorpaySignature: string
  ) {
    const payment = await prisma.payment.findUnique({
      where: { providerOrderId: razorpayOrderId },
      include: { booking: { include: { property: true } } },
    });

    if (!payment) {
      throw new AppError(404, "Payment record not found.");
    }

    if (payment.studentId !== studentId || payment.bookingId !== bookingId) {
      throw new AppError(403, "Invalid payment verification parameters.");
    }

    if (payment.status === PaymentStatus.PAID) {
      throw new AppError(400, "Payment is already verified and paid.");
    }

    const secret = process.env.RAZORPAY_KEY_SECRET || "mock_key_secret";
    const generatedSignature = crypto
      .createHmac("sha256", secret)
      .update(razorpayOrderId + "|" + razorpayPaymentId)
      .digest("hex");

    if (generatedSignature !== razorpaySignature) {
      await prisma.payment.update({
        where: { id: payment.id },
        data: { status: PaymentStatus.FAILED },
      });
      throw new AppError(400, "Invalid payment signature.");
    }

    const result = await prisma.$transaction(async (tx) => {
      const updatedPayment = await tx.payment.update({
        where: { id: payment.id },
        data: {
          providerPaymentId: razorpayPaymentId,
          providerSignature: razorpaySignature,
          status: PaymentStatus.PAID,
        },
      });

      const updatedBooking = await tx.booking.update({
        where: { id: payment.bookingId },
        data: {
          status: BookingStatus.CONFIRMED,
        },
      });

      await tx.property.update({
        where: { id: payment.booking.propertyId },
        data: {
          availableRooms: {
            decrement: 1,
          },
        },
      });

      return { updatedPayment, updatedBooking };
    });

    try {
      await notificationService.createNotification(
        payment.booking.property.ownerId,
        "Booking Paid & Confirmed",
        "A student successfully paid for " + payment.booking.property.title,
      );

      await notificationService.createNotification(
        studentId,
        "Payment Successful",
        "Your payment was successful. Booking confirmed!",
      );
    } catch (err) {
      console.error("Failed to send notification:", err);
    }

    return result;
  }
}

export default new PaymentService();
