export interface CreateBookingDTO {
  propertyId: string;
  checkInDate: Date;
  expectedStayMonths: number;
}

export interface UpdateBookingDTO {
  status?:
    | "PENDING"
    | "CONFIRMED"
    | "REJECTED"
    | "CANCELLED"
    | "COMPLETED";

  checkInDate?: Date;
  expectedStayMonths?: number;
}