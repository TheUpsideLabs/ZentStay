import { Role } from "@prisma/client";

import {
  CreatePropertyDTO,
  UpdatePropertyDTO,
} from "../interfaces/property.interface";

import propertyRepository from "../repositories/property.repository";
import { AppError } from "../utils/AppError";

class PropertyService {
  async createProperty(
    ownerId: string,
    role: Role,
    data: CreatePropertyDTO
  ) {
    // Only OWNER or ADMIN can create properties
    if (
      role !== Role.OWNER &&
      role !== Role.ADMIN
    ) {
      throw new AppError(
        403,
        "Only property owners or admins can create properties."
      );
    }

    return propertyRepository.create(
      ownerId,
      data
    );
  }

  async getAllProperties(query: any) {
    return propertyRepository.findAll({
      search: query.search,
      city: query.city,
      collegeId: query.collegeId,
      pincode: query.pincode,
      gender: query.gender,
      roomType: query.roomType,
      furnishing: query.furnishing,
      rentPeriod: query.rentPeriod,
      verified:
        query.verified !== undefined
          ? query.verified === "true" || query.verified === true
          : undefined,
      availableOnly:
        query.availableOnly !== undefined
          ? query.availableOnly === "true" || query.availableOnly === true
          : undefined,

      minRent: query.minRent
        ? Number(query.minRent)
        : undefined,

      maxRent: query.maxRent
        ? Number(query.maxRent)
        : undefined,

      available:
        query.available !== undefined
          ? query.available === "true"
          : undefined,

      page: query.page
        ? Number(query.page)
        : 1,

      limit: query.limit
        ? Number(query.limit)
        : 10,

      sort: query.sort,
    });
  }

  // ==========================================
  // OWNER PROPERTIES
  // ==========================================

  async getMyProperties(
    ownerId: string,
    role: Role
  ) {
    if (
      role !== Role.OWNER &&
      role !== Role.ADMIN
    ) {
      throw new AppError(
        403,
        "Only property owners or admins can access owner properties."
      );
    }

    return propertyRepository.findByOwner(
      ownerId
    );
  }

  async getPropertyById(id: string) {
    const property =
      await propertyRepository.findById(id);

    if (!property) {
      throw new AppError(
        404,
        "Property not found."
      );
    }

    return property;
  }

  async updateProperty(
    id: string,
    data: UpdatePropertyDTO
  ) {
    await this.getPropertyById(id);

    return propertyRepository.update(
      id,
      data
    );
  }

  async deleteProperty(id: string) {
    await this.getPropertyById(id);

    return propertyRepository.delete(id);
  }
}

export default new PropertyService();