import { api } from "@/lib/api";

export interface OwnerAnalyticsResponse {
  totalProperties: number;
  totalAvailableRooms: number;
  totalBookings: number;
  activeBookings: number;
  financials: {
    totalRevenue: number;
    totalPendingRevenue: number;
  };
}

class OwnerService {
  async getAnalytics() {
    const response = await api.get<{ success: boolean; data: OwnerAnalyticsResponse }>(
      "/owner/analytics"
    );
    return response.data;
  }
}

export default new OwnerService();
