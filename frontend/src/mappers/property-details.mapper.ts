import { ApiProperty } from "@/types/api/property";
import { PropertyDetails } from "@/types/property-details";

export function mapPropertyDetails(
  property: ApiProperty
): PropertyDetails {
  return property;
}