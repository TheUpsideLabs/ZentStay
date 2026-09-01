import { api } from "@/lib/api";

export interface College {
  id: string;
  name: string;
  shortName: string;
  slug: string;
  city: string;
  state: string;
  latitude: number | null;
  longitude: number | null;
  rating: number;
  distance?: number;
  verified?: boolean;
  isActive?: boolean;
  description?: string;
  established?: string;
  studentCount?: number;
  nirfRank?: number;
  officialWebsite?: string;
  logo?: string;
  banner?: string;
  properties?: any[];
  _count?: {
    properties: number;
  };
}

class CollegeService {
  async getAllColleges(params?: {
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
  }): Promise<{ data: College[]; pagination?: any }> {
    const response = await api.get<{
      success: boolean;
      count: number;
      data: College[];
      pagination?: any;
    }>("/colleges", { params });

    return { data: response.data.data, pagination: response.data.pagination };
  }

  async getCollegeById(
    id: string
  ): Promise<College> {
    const response = await api.get<{
      success: boolean;
      data: College;
    }>(`/colleges/${id}`);

    return response.data.data;
  }

  async getCollegeBySlug(
    slug: string
  ): Promise<College> {
    const response = await api.get<{
      success: boolean;
      data: College;
    }>(`/colleges/slug/${slug}`);
    
    return response.data.data;
  }

  async updateCollege(
    id: string,
    data: Partial<College>
  ): Promise<College> {
    const response = await api.put<{
      success: boolean;
      data: College;
    }>(`/colleges/${id}`, data);

    return response.data.data;
  }
}

export default new CollegeService();