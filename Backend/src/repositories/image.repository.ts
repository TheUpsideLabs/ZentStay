import prisma from "../config/prisma";

class ImageRepository {
  async create(data: {
    propertyId: string;
    imageUrl: string;
    publicId: string;
  }) {
    return prisma.propertyImage.create({
      data,
    });
  }

  async findById(id: string) {
    return prisma.propertyImage.findUnique({
      where: { id },
      include: {
        property: true,
      },
    });
  }

  async findByProperty(propertyId: string) {
    return prisma.propertyImage.findMany({
      where: {
        propertyId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async delete(id: string) {
    return prisma.propertyImage.delete({
      where: {
        id,
      },
    });
  }
}

export default new ImageRepository();