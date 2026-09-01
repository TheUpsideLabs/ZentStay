import prisma from "../config/prisma";

class WishlistRepository {
  async add(userId: string, propertyId: string) {
    return prisma.wishlist.create({
      data: {
        userId,
        propertyId,
      },
    });
  }

  async find(userId: string, propertyId: string) {
    return prisma.wishlist.findUnique({
      where: {
        userId_propertyId: {
          userId,
          propertyId,
        },
      },
    });
  }

  async findAll(userId: string) {
    return prisma.wishlist.findMany({
      where: {
        userId,
      },
      include: {
        property: {
          include: {
            owner: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
            images: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async remove(userId: string, propertyId: string) {
    return prisma.wishlist.delete({
      where: {
        userId_propertyId: {
          userId,
          propertyId,
        },
      },
    });
  }
}

export default new WishlistRepository();