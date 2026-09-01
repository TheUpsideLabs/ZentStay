import { api } from "@/lib/api";

export interface ReviewResponse {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
  student: {
    id: string;
    name: string;
    email: string;
  };
  property: {
    id: string;
    title: string;
  };
}

export interface ReviewListResponse {
  success: boolean;
  data: ReviewResponse[];
}

export interface CreateReviewDTO {
  propertyId: string;
  rating: number;
  comment: string;
}

class ReviewService {
  async createReview(data: CreateReviewDTO) {
    const response = await api.post<{
      success: boolean;
      data: ReviewResponse;
    }>("/reviews", data);
    return response.data.data;
  }
  async getOwnerReviews() {
    const response = await api.get<ReviewListResponse>("/reviews/owner");
    return response.data;
  }

  async getMyReviews() {
    const response = await api.get<ReviewListResponse>("/reviews/my");
    return response.data;
  }
}

export default new ReviewService();
