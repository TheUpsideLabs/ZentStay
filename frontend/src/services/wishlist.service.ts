import { api } from "@/lib/api";

export interface WishlistPropertyImage {
  id: string;
  imageUrl: string;
  publicId: string;
}

export interface WishlistOwner {
  id: string;
  name: string;
  email: string;
}

export interface WishlistProperty {
  id: string;
  ownerId: string;
  collegeId: string;

  title: string;
  description: string;

  address: string;
  city: string;
  state: string;
  pincode: string;

  rent: number;
  rentPeriod?: "MONTHLY" | "YEARLY";
  securityDeposit: number;
  availableRooms: number;

  gender: string;
  roomType: string;
  furnishing: string;

  available: boolean;

  createdAt: string;
  updatedAt: string;

  owner?: WishlistOwner;
  images?: WishlistPropertyImage[];
}

export interface WishlistItem {
  id: string;
  userId: string;
  propertyId: string;
  createdAt: string;
  property: WishlistProperty;
}

interface WishlistResponse {
  success: boolean;
  count?: number;
  data: WishlistItem[];
  message?: string;
}

class WishlistService {
  // ==========================================
  // GET MY WISHLIST
  // ==========================================

  async getWishlist(): Promise<WishlistItem[]> {
    const response =
      await api.get<WishlistResponse>(
        "/wishlist"
      );

    return response.data.data;
  }

  // ==========================================
  // ADD PROPERTY
  // ==========================================

  async addToWishlist(
    propertyId: string
  ): Promise<WishlistItem> {
    const response =
      await api.post<{
        success: boolean;
        message: string;
        data: WishlistItem;
      }>(`/wishlist/${propertyId}`);

    return response.data.data;
  }

  // ==========================================
  // REMOVE PROPERTY
  // ==========================================

  async removeFromWishlist(
    propertyId: string
  ): Promise<void> {
    await api.delete(
      `/wishlist/${propertyId}`
    );
  }
}

export default new WishlistService();