export interface CreateVisitRequestDTO {
  propertyId: string;
  visitDate: string;
  message?: string;
}

export interface UpdateVisitRequestStatusDTO {
  status:
    | "PENDING"
    | "CONFIRMED"
    | "REJECTED"
    | "CANCELLED"
    | "COMPLETED";
}