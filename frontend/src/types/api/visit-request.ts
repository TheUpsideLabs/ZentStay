export type VisitStatus =
  | "PENDING"
  | "CONFIRMED"
  | "REJECTED"
  | "CANCELLED"
  | "COMPLETED";

export interface VisitRequestProperty {
  id: string;
  title: string;
  description: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  rent: number;
  securityDeposit: number;
  availableRooms: number;
  gender: "BOYS" | "GIRLS" | "UNISEX";
  roomType: "SINGLE" | "DOUBLE" | "TRIPLE";
  furnishing:
    | "FURNISHED"
    | "SEMI_FURNISHED"
    | "UNFURNISHED";
  available: boolean;
}

export interface VisitRequestStudent {
  id: string;
  name: string;
  email: string;
}

export interface ApiVisitRequest {
  id: string;
  studentId: string;
  propertyId: string;
  visitDate: string;
  message: string | null;
  status: VisitStatus;
  createdAt: string;
  updatedAt: string;

  property: VisitRequestProperty;

  student?: VisitRequestStudent;
}

export interface VisitRequestApiResponse {
  success: boolean;
  data: ApiVisitRequest[];
}

export interface SingleVisitRequestApiResponse {
  success: boolean;
  data: ApiVisitRequest;
}

export interface CreateVisitRequestDTO {
  propertyId: string;
  visitDate: string;
  message?: string;
}

export interface OwnerVisitRequest
  extends ApiVisitRequest {
  student: VisitRequestStudent;
}

export interface OwnerVisitRequestApiResponse {
  success: boolean;
  data: OwnerVisitRequest[];
}

export interface VisitActionResponse {
  success: boolean;
  message: string;
  data: OwnerVisitRequest;
}