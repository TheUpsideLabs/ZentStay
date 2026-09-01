import { Role } from "@prisma/client";
import wishlistRepository from "../repositories/wishlist.repository";
import propertyRepository from "../repositories/property.repository";
import { AppError } from "../utils/AppError";

class WishlistService {
  async addToWishlist(
    userId: string,
    role: Role,
    propertyId: string
  ) {
    if (role !== Role.STUDENT) {
      throw new AppError(
        403,
        "Only students can use wishlist."
      );
    }

    const property = await propertyRepository.findById(propertyId);

    if (!property) {
      throw new AppError(404, "Property not found.");
    }

    if (property.ownerId === userId) {
      throw new AppError(
        400,
        "You cannot wishlist your own property."
      );
    }

    const alreadyExists = await wishlistRepository.find(
      userId,
      propertyId
    );

    if (alreadyExists) {
      throw new AppError(
        409,
        "Property already exists in wishlist."
      );
    }

    return wishlistRepository.add(userId, propertyId);
  }

  async getWishlist(userId: string) {
    return wishlistRepository.findAll(userId);
  }

  async removeFromWishlist(
    userId: string,
    propertyId: string
  ) {
    const wishlist = await wishlistRepository.find(
      userId,
      propertyId
    );

    if (!wishlist) {
      throw new AppError(
        404,
        "Wishlist item not found."
      );
    }

    await wishlistRepository.remove(userId, propertyId);

    return {
      message: "Property removed from wishlist.",
    };
  }
}

export default new WishlistService();