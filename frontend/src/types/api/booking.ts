export type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "REJECTED"
  | "CANCELLED"
  | "COMPLETED";

export interface BookingStudent {
  id: string;
  name: string;
  email: string;
}

export interface BookingProperty {
  id: string;
  ownerId: string;
  collegeId: string;

  title: string;
  description: string;

  address: string;
  city: string;
  state: string;
  pincode: string;

  rent: number;
  securityDeposit: number;
  availableRooms: number;

  gender: string;
  roomType: string;
  furnishing: string;

  available: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;

  studentId: string;
  propertyId: string;

  checkInDate: string;
  expectedStayMonths: number;

  rentAtBooking: number;
  securityDeposit: number;
  totalAmount: number;

  status: BookingStatus;

  createdAt: string;
  updatedAt: string;

  student?: BookingStudent;
  property?: BookingProperty;
}

export interface OwnerBooking
  extends Booking {
  student: BookingStudent;
  property: BookingProperty;
}

export interface CreateBookingDTO {
  propertyId: string;
  checkInDate: string;
  expectedStayMonths: number;
}

export interface BookingApiResponse {
  success: boolean;
  data: Booking[];
}

export interface SingleBookingApiResponse {
  success: boolean;
  data: Booking;
}

export interface BookingActionResponse {
  success: boolean;
  message: string;
  data: Booking;
}

export interface OwnerBookingApiResponse {
  success: boolean;
  data: OwnerBooking[];
}