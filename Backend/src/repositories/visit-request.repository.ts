import prisma from "../config/prisma";

import {
  CreateVisitRequestDTO,
  UpdateVisitRequestStatusDTO,
} from "../interfaces/visit-request.interface";

class VisitRequestRepository {
  async create(
    studentId: string,
    data: CreateVisitRequestDTO
  ) {
    return prisma.visitRequest.create({
      data: {
        studentId,
        propertyId: data.propertyId,
        visitDate: new Date(data.visitDate),
        message: data.message,
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
    });
  }

  async findAll() {
    return prisma.visitRequest.findMany({
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

  async findById(id: string) {
    return prisma.visitRequest.findUnique({
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

  async findStudentRequests(studentId: string) {
    return prisma.visitRequest.findMany({
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

  async findOwnerRequests(
    ownerId: string
  ) {
    return prisma.visitRequest.findMany({
      where: {
        property: {
          ownerId,
        },
      },
      include: {
        property: true,
        student: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findByStudent(
    studentId: string,
    requestId: string
  ) {
    return prisma.visitRequest.findFirst({
      where: {
        id: requestId,
        studentId,
      },
      include: {
        property: true,
      },
    });
  }

  async findByOwner(
    ownerId: string,
    requestId: string
  ) {
    return prisma.visitRequest.findFirst({
      where: {
        id: requestId,
        property: {
          ownerId,
        },
      },
      include: {
        property: true,
        student: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async update(
    id: string,
    data: UpdateVisitRequestStatusDTO
  ) {
    return prisma.visitRequest.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.visitRequest.delete({
      where: { id },
    });
  }
}

export default new VisitRequestRepository();