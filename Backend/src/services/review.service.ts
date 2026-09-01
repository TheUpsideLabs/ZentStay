import { Role } from "@prisma/client";
import reviewRepository from "../repositories/review.repository";
import propertyRepository from "../repositories/property.repository";
import bookingRepository from "../repositories/booking.repository";
import {
  CreateReviewDTO,
  UpdateReviewDTO,
} from "../interfaces/review.interface";
import { AppError } from "../utils/AppError";

class ReviewService {
  async createReview(
    studentId: string,
    role: Role,
    data: CreateReviewDTO
  ) {
    if (role !== Role.STUDENT) {
      throw new AppError(403, "Only students can create reviews.");
    }

    const property = await propertyRepository.findById(data.propertyId);

    if (!property) {
      throw new AppError(404, "Property not found.");
    }
    if (property.owner.id === studentId) {
      throw new AppError(403, "Owners cannot review their own property.");
    }

    // Student must have booked this property
    const bookings = await bookingRepository.findStudentBookings(studentId);

    const completedBooking = bookings.find(
      (booking) =>
        booking.propertyId === data.propertyId &&
        booking.status === "COMPLETED"
    );

    if (!completedBooking) {
      throw new AppError(
        403,
        "You can review a property only after completing your stay."
      );
    }

    const existingReview =
      await reviewRepository.findStudentReview(
        studentId,
        data.propertyId
      );

    if (existingReview) {
      throw new AppError(
        400,
        "You have already reviewed this property."
      );
    }

    const newReview = await reviewRepository.create({
      studentId,
      propertyId: data.propertyId,
      rating: data.rating,
      comment: data.comment,
    });
    // Recalculate and persist property rating
    await this.updatePropertyRating(data.propertyId);
    return newReview;
  }

  async getAllReviews(role: Role) {
    if (role !== Role.ADMIN) {
      throw new AppError(
        403,
        "Only admins can view all reviews."
      );
    }

    return reviewRepository.findAll();
  }

  async getPropertyReviews(propertyId: string) {
    return reviewRepository.findByProperty(propertyId);
  }

  async getMyReviews(studentId: string) {
    return reviewRepository.findByStudent(studentId);
  }

  async getOwnerReviews(ownerId: string) {
    return reviewRepository.findOwnerReviews(ownerId);
  }

  async updateReview(
    reviewId: string,
    studentId: string,
    data: UpdateReviewDTO
  ) {
    const review = await reviewRepository.findById(reviewId);

    if (!review) {
      throw new AppError(404, "Review not found.");
    }

    if (review.studentId !== studentId) {
      throw new AppError(403, "You can only update your own review.");
    }

    const updated = await reviewRepository.update(reviewId, data);
    // Recalculate rating after update
    await this.updatePropertyRating(updated.propertyId);
    return updated;
  }

  // Updated deleteReview to refresh rating
  async deleteReview(
    reviewId: string,
    studentId: string,
    role: Role
  ) {
    const review = await reviewRepository.findById(reviewId);
    if (!review) {
      throw new AppError(404, "Review not found.");
    }
    if (role !== Role.ADMIN && review.studentId !== studentId) {
      throw new AppError(403, "You are not allowed to delete this review.");
    }
    await reviewRepository.delete(reviewId);
    // Recalculate rating after deletion
    await this.updatePropertyRating(review.propertyId);
  }
  private async updatePropertyRating(propertyId: string) {
    const reviews = await reviewRepository.findByProperty(propertyId);
    const average = reviews.length === 0 ? 0 : reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    await propertyRepository.updateRating(propertyId, average);
  }

}

export default new ReviewService();