export interface CreateReviewDTO {
  propertyId: string;
  rating: number;
  comment: string;
}

export interface UpdateReviewDTO {
  rating?: number;
  comment?: string;
}