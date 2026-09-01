import { ApiProperty } from "@/types/api/property";
import { Property, RentPeriod } from "@/types/property";

export function mapProperty(
  property: ApiProperty
): Property {
  return {
    id: property.id,

    name: property.title,

    location: property.city || property.college?.shortName || "Prime Location",

    collegeSlug: property.college?.slug || "",

    distance: property.college?.shortName ? `Near ${property.college.shortName}` : "Prime Location",

    image:
      property.images && property.images.length > 0
        ? property.images[0].imageUrl
        : "/images/properties/property-1.jpeg",

    price: property.rent,

    rentPeriod: (property.rentPeriod as RentPeriod) || "MONTHLY",

    rating: property.rating || 0,

    views: 0,

    verified: property.verified ?? true,

    amenities: [
      property.roomType,
      property.furnishing,
    ],

    description: property.description,
  };
}