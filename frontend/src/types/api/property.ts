export type RentPeriod =
  | "MONTHLY"
  | "YEARLY";

export interface ApiPropertyReview {
  id: string;
  rating: number;
  comment: string;
  userId: string;
  propertyId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiProperty {
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

  available: boolean;
  verified?: boolean;
  rating?: number;

  owner: {
    id: string;
    name: string;
    email: string;
  };

  college: {
    id: string;
    name: string;
    shortName: string;
    slug: string;
    city: string;
    state: string;
    logo: string;
    banner: string;
    latitude: number;
    longitude: number;
    rating: number;
  };

  images: {
    id: string;
    imageUrl: string;
    publicId: string;
  }[];

  reviews: ApiPropertyReview[];

  createdAt: string;
  updatedAt: string;
}

export interface PropertyApiResponse {
  success: boolean;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  count: number;
  data: ApiProperty[];
}

export interface PropertyDetailsApiResponse {
  success: boolean;
  data: ApiProperty;
}