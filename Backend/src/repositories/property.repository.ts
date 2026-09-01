import { Prisma } from "@prisma/client";

import prisma from "../config/prisma";

import {
  CreatePropertyDTO,
  UpdatePropertyDTO,
} from "../interfaces/property.interface";

class PropertyRepository {
  // ==========================================
  // CREATE PROPERTY
  // ==========================================

  async create(
    ownerId: string,
    data: CreatePropertyDTO
  ) {
    return prisma.property.create({
      data: {
        ownerId,
        collegeId: data.collegeId,

        title: data.title,
        description: data.description,

        address: data.address,
        city: data.city,
        state: data.state,
        pincode: data.pincode,

        rent: data.rent,
        rentPeriod: data.rentPeriod,
        securityDeposit:
          data.securityDeposit,
        availableRooms:
          data.availableRooms,

        gender: data.gender,
        roomType: data.roomType,
        furnishing: data.furnishing,

        available: true,
      },

      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },

        college: true,

        images: true,
      },
    });
  }

  // ==========================================
  // GET ALL PROPERTIES
  // ==========================================

  async findAll(filters: {
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
    page?: number;
    limit?: number;
    sort?: string;
  }) {
    const {
      search,
      city,
      collegeId,
      pincode,
      gender,
      roomType,
      furnishing,
      rentPeriod,
      verified,
      availableOnly,
      minRent,
      maxRent,
      available,
      page = 1,
      limit = 10,
      sort,
    } = filters;

    const where: Prisma.PropertyWhereInput =
      {};

    if (collegeId) {
      where.collegeId = collegeId;
    }

    if (pincode) {
      where.pincode = pincode.trim();
    }

    if (rentPeriod) {
      where.rentPeriod = rentPeriod as any;
    }

    if (verified !== undefined) {
      where.verified = verified;
    }

    if (availableOnly) {
      where.available = true;
      where.availableRooms = {
        gt: 0,
      };
    } else if (available !== undefined) {
      where.available = available;
    }

    if (search) {
      const trimmedSearch = search.trim();
      where.OR = [
        {
          title: {
            contains: trimmedSearch,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: trimmedSearch,
            mode: "insensitive",
          },
        },
        {
          address: {
            contains: trimmedSearch,
            mode: "insensitive",
          },
        },
        {
          city: {
            contains: trimmedSearch,
            mode: "insensitive",
          },
        },
        {
          state: {
            contains: trimmedSearch,
            mode: "insensitive",
          },
        },
        {
          pincode: {
            contains: trimmedSearch,
            mode: "insensitive",
          },
        },
        {
          college: {
            name: {
              contains: trimmedSearch,
              mode: "insensitive",
            },
          },
        },
        {
          college: {
            shortName: {
              contains: trimmedSearch,
              mode: "insensitive",
            },
          },
        },
      ];
    }

    if (city) {
      where.city = city;
    }

    if (gender) {
      where.gender = gender as any;
    }

    if (roomType) {
      where.roomType = roomType as any;
    }

    if (furnishing) {
      where.furnishing =
        furnishing as any;
    }

    if (
      minRent !== undefined ||
      maxRent !== undefined
    ) {
      where.rent = {};

      if (minRent !== undefined) {
        where.rent.gte = minRent;
      }

      if (maxRent !== undefined) {
        where.rent.lte = maxRent;
      }
    }

    let orderBy: any = [
      { verified: "desc" },
      { available: "desc" },
      { availableRooms: "desc" },
      { createdAt: "desc" },
    ];

    switch (sort) {
      case "rent":
      case "rent_asc":
        orderBy = {
          rent: "asc",
        };
        break;

      case "-rent":
      case "rent_desc":
        orderBy = {
          rent: "desc",
        };
        break;

      case "createdAt":
      case "oldest":
        orderBy = {
          createdAt: "asc",
        };
        break;

      case "-createdAt":
      case "newest":
        orderBy = {
          createdAt: "desc",
        };
        break;
    }

    const [properties, total] =
      await Promise.all([
        prisma.property.findMany({
          where,

          include: {
            owner: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },

            college: true,

            images: true,
          },

          orderBy,

          skip:
            (page - 1) * limit,

          take: limit,
        }),

        prisma.property.count({
          where,
        }),
      ]);

    return {
      properties,
      total,
      page,
      limit,
      totalPages: Math.ceil(
        total / limit
      ),
    };
  }

  // ==========================================
  // GET PROPERTY BY ID
  // ==========================================

  async findById(id: string) {
    return prisma.property.findUnique({
      where: { id },
      include: {
        owner: { select: { id: true, name: true, email: true } },
        college: true,
        images: true,
        reviews: true,
      },
    });
  }

  async updateRating(propertyId: string, rating: number) {
    // Cast data to any to bypass TypeScript strictness if rating field is not recognized
    return prisma.property.update({
      where: { id: propertyId },
      data: { rating } as any,
    });
  }

  // ==========================================
  // GET OWNER PROPERTIES
  // ==========================================

  async findByOwner(
    ownerId: string
  ) {
    return prisma.property.findMany({
      where: {
        ownerId,
      },

      include: {
        college: true,

        images: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }

  // ==========================================
  // UPDATE PROPERTY
  // ==========================================

  async update(
    id: string,
    data: UpdatePropertyDTO
  ) {
    return prisma.property.update({
      where: {
        id,
      },

      data,

      include: {
        college: true,

        images: true,
      },
    });
  }

  // ==========================================
  // DELETE PROPERTY
  // ==========================================

  async delete(id: string) {
    return prisma.property.delete({
      where: {
        id,
      },
    });
  }
}

export default new PropertyRepository();