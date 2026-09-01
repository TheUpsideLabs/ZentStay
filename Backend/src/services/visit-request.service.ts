import {
  Role,
  VisitStatus,
} from "@prisma/client";

import visitRequestRepository from "../repositories/visit-request.repository";
import propertyRepository from "../repositories/property.repository";

import {
  CreateVisitRequestDTO,
} from "../interfaces/visit-request.interface";

import { AppError } from "../utils/AppError";
import notificationService from "./notification.service";

class VisitRequestService {
  async createVisitRequest(
    studentId: string,
    role: Role,
    data: CreateVisitRequestDTO
  ) {
    if (role !== Role.STUDENT) {
      throw new AppError(
        403,
        "Only students can request property visits."
      );
    }

    const property =
      await propertyRepository.findById(
        data.propertyId
      );

    if (!property) {
      throw new AppError(
        404,
        "Property not found."
      );
    }

    if (!property.available) {
      throw new AppError(
        400,
        "Property is not available."
      );
    }

    if (property.ownerId === studentId) {
      throw new AppError(
        400,
        "You cannot request a visit to your own property."
      );
    }

    const visitRequest =
      await visitRequestRepository.create(
        studentId,
        data
      );

    await notificationService.createNotification(
      property.ownerId,
      "New Visit Request",
      `You have received a new visit request for "${property.title}".`
    );

    return visitRequest;
  }

  async getAllVisitRequests(
    role: Role
  ) {
    if (role !== Role.ADMIN) {
      throw new AppError(
        403,
        "Only admins can view all visit requests."
      );
    }

    return visitRequestRepository.findAll();
  }

  async getVisitRequestById(
    requestId: string,
    userId: string,
    role: Role
  ) {
    if (role === Role.ADMIN) {
      const request =
        await visitRequestRepository.findById(
          requestId
        );

      if (!request) {
        throw new AppError(
          404,
          "Visit request not found."
        );
      }

      return request;
    }

    if (role === Role.STUDENT) {
      const request =
        await visitRequestRepository.findByStudent(
          userId,
          requestId
        );

      if (!request) {
        throw new AppError(
          404,
          "Visit request not found."
        );
      }

      return request;
    }

    if (role === Role.OWNER) {
      const request =
        await visitRequestRepository.findByOwner(
          userId,
          requestId
        );

      if (!request) {
        throw new AppError(
          404,
          "Visit request not found."
        );
      }

      return request;
    }

    throw new AppError(
      403,
      "Access denied."
    );
  }

  async getStudentVisitRequests(
    studentId: string
  ) {
    return visitRequestRepository.findStudentRequests(
      studentId
    );
  }

  async getOwnerVisitRequests(
    ownerId: string
  ) {
    return visitRequestRepository.findOwnerRequests(
      ownerId
    );
  }

  async updateVisitRequestStatus(
    requestId: string,
    ownerId: string,
    status: VisitStatus
  ) {
    const request =
      await visitRequestRepository.findByOwner(
        ownerId,
        requestId
      );

    if (!request) {
      throw new AppError(
        404,
        "Visit request not found."
      );
    }

    const updatedRequest =
      await visitRequestRepository.update(
        requestId,
        { status }
      );

    if (status === VisitStatus.CONFIRMED) {
      await notificationService.createNotification(
        request.studentId,
        "Visit Confirmed",
        `Your visit request for "${request.property.title}" has been confirmed.`
      );
    }

    if (status === VisitStatus.REJECTED) {
      await notificationService.createNotification(
        request.studentId,
        "Visit Rejected",
        `Your visit request for "${request.property.title}" has been rejected.`
      );
    }

    return updatedRequest;
  }

  async deleteVisitRequest(
    requestId: string,
    studentId: string
  ) {
    const request =
      await visitRequestRepository.findByStudent(
        studentId,
        requestId
      );

    if (!request) {
      throw new AppError(
        404,
        "Visit request not found."
      );
    }

    await visitRequestRepository.delete(
      requestId
    );

    await notificationService.createNotification(
      request.property.ownerId,
      "Visit Request Cancelled",
      `A visit request for "${request.property.title}" has been cancelled by the student.`
    );

    return {
      message:
        "Visit request cancelled successfully.",
    };
  }
}

export default new VisitRequestService();