import { api } from "@/lib/api";

import {
  Booking,
  OwnerBooking,
  CreateBookingDTO,
  BookingApiResponse,
  SingleBookingApiResponse,
  BookingActionResponse,
  OwnerBookingApiResponse,
} from "@/types/api/booking";

class BookingService {
  // =====================================
  // STUDENT
  // =====================================

  async createBooking(
    data: CreateBookingDTO
  ): Promise<Booking> {
    const response =
      await api.post<{
        success: boolean;
        message: string;
        data: Booking;
      }>("/bookings", data);

    return response.data.data;
  }

  async getMyBookings(): Promise<Booking[]> {
    const response =
      await api.get<BookingApiResponse>(
        "/bookings/my"
      );

    return response.data.data;
  }

  async getBookingById(
    id: string
  ): Promise<Booking> {
    const response =
      await api.get<SingleBookingApiResponse>(
        `/bookings/${id}`
      );

    return response.data.data;
  }

  async deleteBooking(
    id: string
  ): Promise<void> {
    await api.delete(`/bookings/${id}`);
  }

  // =====================================
  // OWNER
  // =====================================

  async getOwnerBookings(): Promise<
    OwnerBooking[]
  > {
    const response =
      await api.get<OwnerBookingApiResponse>(
        "/bookings/owner"
      );

    return response.data.data;
  }

  async confirmBooking(
    id: string
  ): Promise<Booking> {
    const response =
      await api.patch<BookingActionResponse>(
        `/bookings/${id}/confirm`
      );

    return response.data.data;
  }

  async verifyBookingRent(
    id: string
  ): Promise<Booking> {
    const response =
      await api.patch<BookingActionResponse>(
        `/bookings/${id}/verify-rent`
      );

    return response.data.data;
  }

  async rejectBooking(
    id: string
  ): Promise<Booking> {
    const response =
      await api.patch<BookingActionResponse>(
        `/bookings/${id}/reject`
      );

    return response.data.data;
  }
}

export default new BookingService();