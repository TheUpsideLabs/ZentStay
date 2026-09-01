import { api } from "@/lib/api";

import {
  PropertyDetailsApiResponse,
} from "@/types/api/property";

import { mapPropertyDetails } from "@/mappers/property-details.mapper";

import {
  Property,
  RentPeriod,
} from "@/types/property";

import { mapProperty } from "@/mappers/property.mapper";

export interface PropertyQuery {
  page?: number;
  limit?: number;
  search?: string;
  city?: string;
  collegeId?: string;
  pincode?: string;
  gender?: string;
  roomType?: string;
  furnishing?: string;
  rentPeriod?: string;
  verified?: boolean;
  availableOnly?: boolean;
  minRent?: number;
  maxRent?: number;
  available?: boolean;
  sort?: string;
}

export interface PropertyListResponse {
  properties: Property[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type PropertyGender =
  | "BOYS"
  | "GIRLS"
  | "UNISEX";

export type PropertyRoomType =
  | "SINGLE"
  | "DOUBLE"
  | "TRIPLE";

export type PropertyFurnishing =
  | "FURNISHED"
  | "SEMI_FURNISHED"
  | "UNFURNISHED";
export interface CreatePropertyData {
  collegeId: string;

  title: string;
  description: string;

  address: string;
  city: string;
  state: string;
  pincode: string;

  rent: number;
  rentPeriod: "MONTHLY" | "YEARLY";
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

export type UpdatePropertyData =
  Partial<CreatePropertyData>;

export interface OwnerProperty {
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
  rentPeriod: "MONTHLY" | "YEARLY";
  securityDeposit: number;
  availableRooms: number;

  gender: "BOYS" | "GIRLS" | "UNISEX";
  roomType: "SINGLE" | "DOUBLE" | "TRIPLE";
  furnishing: "FURNISHED" | "SEMI_FURNISHED" | "UNFURNISHED";

  available: boolean;

  createdAt: string;
  updatedAt: string;

  college?: unknown;
  images?: unknown[];
}
class PropertyService {
  // ==========================================
  // PUBLIC PROPERTIES
  // ==========================================

  async getAllProperties(
    params: PropertyQuery = {}
  ): Promise<PropertyListResponse> {
    const response =
      await api.get("/properties", {
        params,
      });

    return {
      properties:
        response.data.data.map(
          mapProperty
        ),

      total: response.data.total,

      page: response.data.page,

      limit: response.data.limit,

      totalPages:
        response.data.totalPages,
    };
  }

  // ==========================================
  // OWNER PROPERTIES
  // ==========================================

  async getMyProperties(): Promise<
    OwnerProperty[]
  > {
    const response =
      await api.get("/properties/owner");

    return response.data.data;
  }

  // ==========================================
  // CREATE PROPERTY
  // ==========================================

  async createProperty(
    data: CreatePropertyData
  ): Promise<OwnerProperty> {
    const response =
      await api.post<{
        success: boolean;
        message: string;
        data: OwnerProperty;
      }>("/properties", data);

    return response.data.data;
  }

  // ==========================================
  // UPDATE PROPERTY
  // ==========================================

  async updateProperty(
    id: string,
    data: UpdatePropertyData
  ): Promise<OwnerProperty> {
    const response =
      await api.put<{
        success: boolean;
        message: string;
        data: OwnerProperty;
      }>(
        `/properties/${id}`,
        data
      );

    return response.data.data;
  }

  // ==========================================
  // DELETE PROPERTY
  // ==========================================

  async deleteProperty(
    id: string
  ): Promise<void> {
    await api.delete(
      `/properties/${id}`
    );
  }

  // ==========================================
  // PROPERTY DETAILS
  // ==========================================

  async getPropertyById(
    id: string
  ) {
    const response =
      await api.get(
        `/properties/${id}`
      );

    return {
      ...response.data,
      data: mapPropertyDetails(
        response.data.data
      ),
    };
  }
}

export default new PropertyService();