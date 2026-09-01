import { api } from "@/lib/api";

import {
  ApiVisitRequest,
  CreateVisitRequestDTO,
  VisitRequestApiResponse,
  SingleVisitRequestApiResponse,
  OwnerVisitRequest,
  OwnerVisitRequestApiResponse,
  VisitActionResponse,
} from "@/types/api/visit-request";

class VisitRequestService {
  // ================================
  // STUDENT
  // ================================

  async createVisitRequest(
    data: CreateVisitRequestDTO
  ): Promise<ApiVisitRequest> {
    const response = await api.post<{
      success: boolean;
      message: string;
      data: ApiVisitRequest;
    }>("/visit-requests", data);

    return response.data.data;
  }

  async getMyVisitRequests(): Promise<
    ApiVisitRequest[]
  > {
    const response =
      await api.get<VisitRequestApiResponse>(
        "/visit-requests/my"
      );

    return response.data.data;
  }

  async getVisitRequestById(
    id: string
  ): Promise<ApiVisitRequest> {
    const response =
      await api.get<SingleVisitRequestApiResponse>(
        `/visit-requests/${id}`
      );

    return response.data.data;
  }

  async deleteVisitRequest(
    id: string
  ): Promise<void> {
    await api.delete(
      `/visit-requests/${id}`
    );
  }

  // ================================
  // OWNER
  // ================================

  async getOwnerVisitRequests(): Promise<
    OwnerVisitRequest[]
  > {
    const response =
      await api.get<OwnerVisitRequestApiResponse>(
        "/visit-requests/owner"
      );

    return response.data.data;
  }

  async confirmVisitRequest(
    id: string
  ): Promise<OwnerVisitRequest> {
    const response =
      await api.patch<VisitActionResponse>(
        `/visit-requests/${id}/confirm`
      );

    return response.data.data;
  }

  async rejectVisitRequest(
    id: string
  ): Promise<OwnerVisitRequest> {
    const response =
      await api.patch<VisitActionResponse>(
        `/visit-requests/${id}/reject`
      );

    return response.data.data;
  }
}

export default new VisitRequestService();