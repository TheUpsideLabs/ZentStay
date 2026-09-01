import { api } from "@/lib/api";

export interface DashboardStats {
  users: {
    total: number;
    students: number;
    owners: number;
    admins: number;
  };
  properties: {
    total: number;
    available: number;
  };
  bookings: {
    total: number;
    pending: number;
    confirmed: number;
    rejected: number;
    cancelled: number;
    completed: number;
  };
  reviews: number;
  wishlists: number;
  notifications: number;
  financials: {
    totalRevenue: number;
    totalPendingRevenue: number;
  };
}

export interface DashboardResponse {
  success: boolean;
  data: DashboardStats;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: string;
  isVerified: boolean;
  createdAt: string;
}

export interface UserListResponse {
  success: boolean;
  data: UserResponse[];
}

export interface AdminPropertyResponse {
  id: string;
  title: string;
  city: string;
  rent: number;
  available: boolean;
  owner: { name: string; email: string };
  college: { name: string };
}

export interface AdminBookingResponse {
  id: string;
  checkInDate: string;
  status: string;
  totalAmount: number;
  property: { title: string };
  student: { name: string; email: string };
}

class AdminService {
  async getDashboard() {
    const response = await api.get<DashboardResponse>("/admin/dashboard");
    return response.data;
  }

  async getAllUsers() {
    const response = await api.get<UserListResponse>("/admin/users");
    return response.data;
  }

  async getAllProperties() {
    const response = await api.get<{ success: boolean; data: AdminPropertyResponse[] }>("/properties");
    return response.data;
  }

  async getAllBookings() {
    const response = await api.get<{ success: boolean; data: AdminBookingResponse[] }>("/bookings");
    return response.data;
  }
}

export default new AdminService();
