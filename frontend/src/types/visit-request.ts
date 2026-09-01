export type VisitRequestStatus =
  | "PENDING"
  | "CONFIRMED"
  | "REJECTED"
  | "CANCELLED"
  | "COMPLETED";

export interface VisitRequest {
  id: string;
  studentId: string;
  propertyId: string;
  visitDate: string;
  message?: string | null;
  status: VisitRequestStatus;
  createdAt: string;
  updatedAt: string;

  property?: {
    id: string;
    title: string;
    rent: number;
    address: string;
    city: string;
  };
}

export interface CreateVisitRequestDTO {
  propertyId: string;
  visitDate: string;
  message?: string;
}

export interface VisitRequestResponse {
  success: boolean;
  message?: string;
  data: VisitRequest;
}

export interface VisitRequestListResponse {
  success: boolean;
  data: VisitRequest[];
}