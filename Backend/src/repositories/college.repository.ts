import prisma from "../config/prisma";

import {
  CreateCollegeDTO,
  UpdateCollegeDTO,
} from "../interfaces/college.interface";

class CollegeRepository {
  async create(data: CreateCollegeDTO) {
    return prisma.college.create({
      data,
    });
  }

  private calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Number((R * c).toFixed(1));
  }

  async findAll(filters: {
    search?: string;
    pincode?: string;
    state?: string;
    city?: string;
    lat?: number;
    lng?: number;
    radius?: number;
    popular?: boolean;
    page?: number;
    limit?: number;
  } = {}) {
    const {
      search,
      pincode,
      state,
      city,
      lat,
      lng,
      radius = 50,
      popular = false,
      page = 1,
      limit = 20,
    } = filters;

    // 1. GEOLOCATION / NEARBY SEARCH
    if (lat !== undefined && lng !== undefined && !isNaN(lat) && !isNaN(lng)) {
      const collegesWithCoords = await prisma.college.findMany({
        where: {
          isActive: true,
          latitude: { not: null },
          longitude: { not: null },
          ...(state ? { state: { equals: state, mode: "insensitive" } } : {}),
          ...(city ? { city: { equals: city, mode: "insensitive" } } : {}),
        },
        include: {
          _count: {
            select: {
              properties: true,
            },
          },
        },
      });

      const collegesWithDistance = collegesWithCoords
        .map((col) => {
          const distance = this.calculateDistance(
            lat,
            lng,
            col.latitude!,
            col.longitude!
          );
          return { ...col, distance };
        })
        .filter((col) => col.distance <= radius)
        .sort((a, b) => a.distance - b.distance);

      const total = collegesWithDistance.length;
      const skip = (page - 1) * limit;
      const paginated = collegesWithDistance.slice(skip, skip + limit);

      return {
        colleges: paginated,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit) || 1,
        },
      };
    }

    const where: any = {
      isActive: true,
    };

    // 2. POPULAR / CURATED COLLEGES (e.g. initial view)
    if (popular) {
      where.properties = {
        some: {},
      };
    }

    // 3. PINCODE FILTER
    if (pincode) {
      const cleanPincode = pincode.trim();
      where.OR = [
        {
          properties: {
            some: {
              pincode: cleanPincode,
            },
          },
        },
      ];
    }

    // 4. TEXT SEARCH (Name, ShortName, City, State)
    if (search) {
      const trimmedSearch = search.trim();
      const isSixDigitPincode = /^\d{6}$/.test(trimmedSearch);

      const searchConditions: any[] = [
        { name: { contains: trimmedSearch, mode: "insensitive" } },
        { shortName: { contains: trimmedSearch, mode: "insensitive" } },
        { city: { contains: trimmedSearch, mode: "insensitive" } },
        { state: { contains: trimmedSearch, mode: "insensitive" } },
      ];

      // If user typed a 6-digit pincode in the main search bar, also match properties with that pincode
      if (isSixDigitPincode) {
        searchConditions.push({
          properties: {
            some: {
              pincode: trimmedSearch,
            },
          },
        });
      }

      if (where.OR) {
        where.AND = [{ OR: where.OR }, { OR: searchConditions }];
        delete where.OR;
      } else {
        where.OR = searchConditions;
      }
    }

    if (state) {
      where.state = { equals: state, mode: "insensitive" };
    }

    if (city) {
      where.city = { equals: city, mode: "insensitive" };
    }

    const skip = (page - 1) * limit;

    const [colleges, total] = await Promise.all([
      prisma.college.findMany({
        where,
        skip,
        take: limit,
        include: {
          _count: {
            select: {
              properties: true,
            },
          },
        },
        orderBy: [
          {
            properties: {
              _count: "desc",
            },
          },
          {
            rating: "desc",
          },
          {
            name: "asc",
          },
        ],
      }),
      prisma.college.count({ where }),
    ]);

    return {
      colleges,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  }

  async findById(id: string) {
    return prisma.college.findUnique({
      where: {
        id,
      },

      include: {
        properties: {
          include: {
            images: true,
          },
        },
      },
    });
  }

  async findBySlug(slug: string) {
    return prisma.college.findUnique({
      where: {
        slug,
      },

      include: {
        properties: {
          include: {
            images: true,
          },
        },
      },
    });
  }

  async update(
    id: string,
    data: UpdateCollegeDTO
  ) {
    return prisma.college.update({
      where: {
        id,
      },

      data,
    });
  }

  async delete(id: string) {
    return prisma.college.delete({
      where: {
        id,
      },
    });
  }
}

export default new CollegeRepository();