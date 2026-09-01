export type RentPeriod =
  | "MONTHLY"
  | "YEARLY";

export interface CreatePropertyDTO {
  collegeId: string;

  title: string;
  description: string;

  address: string;
  city: string;
  state: string;
  pincode: string;

  rent: number;
  rentPeriod: RentPeriod;
  securityDeposit: number;
  availableRooms: number;

  gender:
    | "BOYS"
    | "GIRLS"
    | "UNISEX";

  roomType:
    | "SINGLE"
    | "DOUBLE"
    | "TRIPLE";

  furnishing:
    | "FURNISHED"
    | "SEMI_FURNISHED"
    | "UNFURNISHED";
}

export interface UpdatePropertyDTO
  extends Partial<CreatePropertyDTO> {}