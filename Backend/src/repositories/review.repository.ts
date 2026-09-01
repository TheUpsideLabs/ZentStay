import prisma from "../config/prisma";
import { UpdateReviewDTO } from "../interfaces/review.interface";

class ReviewRepository {
  async create(data: {
    studentId: string;
    propertyId: string;
    rating: number;
    comment: string;
  }) {
    return prisma.review.create({
      data,
    });
  }

  async findById(id: string) {
    return prisma.review.findUnique({
      where: { id },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        property: true,
      },
    });
  }

  async findAll() {
    return prisma.review.findMany({
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        property: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findByProperty(propertyId: string) {
    return prisma.review.findMany({
      where: {
        propertyId,
      },
      include: {
        student: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findByStudent(studentId: string) {
    return prisma.review.findMany({
      where: {
        studentId,
      },
      include: {
        property: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findStudentReview(
    studentId: string,
    propertyId: string
  ) {
    return prisma.review.findFirst({
      where: {
        studentId,
        propertyId,
      },
    });
  }

  async findOwnerReviews(ownerId: string) {
    return prisma.review.findMany({
      where: {
        property: {
          ownerId,
        },
      },
      include: {
        student: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        property: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async update(id: string, data: UpdateReviewDTO) {
    return prisma.review.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.review.delete({
      where: { id },
    });
  }
}

export default new ReviewRepository();