export type RentPeriod =
  | "MONTHLY"
  | "YEARLY";

export interface Property {
  id: string;

  name: string;

  location: string;

  distance: string;

  price: number;

  rentPeriod?: RentPeriod;

  rating: number;

  views: number;

  image: string;

  verified: boolean;

  amenities: string[];

  description: string;

  collegeSlug: string;
}