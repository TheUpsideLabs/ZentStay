import { BookingStatus, Role, RentPeriod } from "@prisma/client";

import bookingRepository from "../repositories/booking.repository";
import propertyRepository from "../repositories/property.repository";
import notificationService from "./notification.service";

import { CreateBookingDTO } from "../interfaces/booking.interface";
import { AppError } from "../utils/AppError";

class BookingService {
  async createBooking(studentId: string, role: Role, data: CreateBookingDTO) {
    if (role !== Role.STUDENT) {
      throw new AppError(403, "Only students can create bookings.");
    }

    const property = await propertyRepository.findById(data.propertyId);
    if (!property) throw new AppError(404, "Property not found.");
    if (!property.available) throw new AppError(400, "Property is not available.");
    if (property.availableRooms <= 0) throw new AppError(400, "No rooms are currently available.");
    if (property.ownerId === studentId) throw new AppError(400, "You cannot book your own property.");

    const existingBooking = await bookingRepository.findActiveByStudentAndProperty(studentId, data.propertyId);
    if (existingBooking) {
      throw new AppError(409, "You already have an active booking for this property.");
    }

    let calculatedRent = 0;
    if (property.rentPeriod === RentPeriod.YEARLY) {
      calculatedRent = property.rent * (data.expectedStayMonths / 12);
    } else {
      calculatedRent = property.rent * data.expectedStayMonths;
    }

    const totalAmount = calculatedRent + property.securityDeposit;

    const booking = await bookingRepository.create({
      studentId,
      propertyId: data.propertyId,
      checkInDate: data.checkInDate,
      expectedStayMonths: data.expectedStayMonths,
      rentAtBooking: property.rent,
      securityDeposit: property.securityDeposit,
      totalAmount,
    });

    try {
      await notificationService.createNotification(
        property.ownerId,
        "New Booking Request",
        "You have a new booking request for \\\."
      );
    } catch (err) {}

    return booking;
  }

  async getAllBookings(role: Role) {
    if (role !== Role.ADMIN) throw new AppError(403, "Access denied.");
    return bookingRepository.findAll();
  }

  async getBookingById(id: string, userId: string, role: Role) {
    const booking = await bookingRepository.findById(id);
    if (!booking) throw new AppError(404, "Booking not found.");

    if (role === Role.STUDENT && booking.studentId !== userId) {
      throw new AppError(403, "Access denied.");
    }
    if (role === Role.OWNER && booking.property.ownerId !== userId) {
      throw new AppError(403, "Access denied.");
    }

    return booking;
  }

  async getStudentBookings(studentId: string) {
    return bookingRepository.findStudentBookings(studentId);
  }

  async getOwnerBookings(ownerId: string) {
    return bookingRepository.findBookingsOfOwner(ownerId);
  }

  async confirmBooking(bookingId: string, ownerId: string) {
    const booking = await bookingRepository.findByOwner(ownerId, bookingId);
    if (!booking) throw new AppError(404, "Booking not found or access denied.");

    if (booking.status !== BookingStatus.PENDING) {
      throw new AppError(400, "Only PENDING bookings can be confirmed.");
    }
    if (booking.property.availableRooms <= 0) {
      throw new AppError(400, "No available rooms for this property.");
    }

    await bookingRepository.confirmAndReserveRoom(bookingId, ownerId);

    try {
      await notificationService.createNotification(
        booking.studentId,
        "Booking Confirmed",
        "Your booking for \\\ has been confirmed!"
      );
    } catch (err) {}

    return booking;
  }

  async verifyBookingRent(bookingId: string, ownerId: string) {
    const booking = await bookingRepository.findByOwner(ownerId, bookingId);
    if (!booking) throw new AppError(404, "Booking not found or access denied.");

    if (booking.status !== BookingStatus.CONFIRMED) {
      throw new AppError(400, "Only CONFIRMED bookings can be rent-verified.");
    }

    const verifiedBooking = await bookingRepository.verifyBookingRent(bookingId, ownerId);
    if (!verifiedBooking) {
      throw new AppError(400, "Failed to verify rent payment.");
    }

    try {
      await notificationService.createNotification(
        booking.studentId,
        "Rent Payment Verified",
        `Your offline rent payment for ${booking.property.title} has been verified by the owner. Booking complete!`
      );
    } catch (err) {}

    return verifiedBooking;
  }

  async rejectBooking(bookingId: string, ownerId: string) {
    const booking = await bookingRepository.findByOwner(ownerId, bookingId);
    if (!booking) throw new AppError(404, "Booking not found or access denied.");

    if (booking.status !== BookingStatus.PENDING) {
      throw new AppError(400, "Only PENDING bookings can be rejected.");
    }

    await bookingRepository.rejectBooking(bookingId, ownerId);

    try {
      await notificationService.createNotification(
        booking.studentId,
        "Booking Rejected",
        "Your booking for \\\ was rejected."
      );
    } catch (err) {}

    return booking;
  }

  async cancelBooking(bookingId: string, studentId: string) {
    const booking = await bookingRepository.findByStudent(studentId, bookingId);
    if (!booking) throw new AppError(404, "Booking not found or access denied.");

    if (booking.status !== BookingStatus.PENDING && booking.status !== BookingStatus.CONFIRMED) {
      throw new AppError(400, "Cannot cancel this booking.");
    }

    const cancelledBooking = await bookingRepository.cancelBooking(bookingId, studentId);

    try {
      await notificationService.createNotification(
        booking.property.ownerId,
        "Booking Cancelled",
        "A booking for \\\ was cancelled by the student."
      );
    } catch (err) {}

    return { message: "Booking cancelled successfully.", booking: cancelledBooking };
  }
}

export default new BookingService();
