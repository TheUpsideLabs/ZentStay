import streamifier from "streamifier";
import cloudinary from "../config/cloudinary";
import imageRepository from "../repositories/image.repository";
import propertyRepository from "../repositories/property.repository";
import { AppError } from "../utils/AppError";
import { Role } from "@prisma/client";

class ImageService {
 private async uploadToCloudinary(
  file: Express.Multer.File
): Promise<{ imageUrl: string; publicId: string }> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "zentstay/properties",
      },
      (error, result) => {
        if (error || !result) {
          return reject(error);
        }

        resolve({
          imageUrl: result.secure_url,
          publicId: result.public_id,
        });
      }
    );

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
}

async uploadImages(
  propertyId: string,
  ownerId: string,
  files: Express.Multer.File[]
) {
  const property = await propertyRepository.findById(propertyId);

  if (!property) {
    throw new AppError(404, "Property not found");
  }

  if (property.ownerId !== ownerId) {
    throw new AppError(
      403,
      "You are not allowed to upload images for this property."
    );
  }

  if (!files || files.length === 0) {
    throw new AppError(400, "Please upload at least one image.");
  }

  const uploadedImages = [];

  for (const file of files) {
    const uploaded = await this.uploadToCloudinary(file);

    const image = await imageRepository.create({
      propertyId,
      imageUrl: uploaded.imageUrl,
      publicId: uploaded.publicId,
    });

    uploadedImages.push(image);
  }

  return {
    message: "Images uploaded successfully.",
    images: uploadedImages,
  };
} 
async getPropertyImages(propertyId: string) {
  const property = await propertyRepository.findById(propertyId);

  if (!property) {
    throw new AppError(404, "Property not found");
  }

  return imageRepository.findByProperty(propertyId);
}
async deleteImage(imageId: string, ownerId: string) {
  const image = await imageRepository.findById(imageId);

  if (!image) {
    throw new AppError(404, "Image not found");
  }

  if (image.property.ownerId !== ownerId) {
    throw new AppError(
      403,
      "You are not allowed to delete this image."
    );
  }

  await cloudinary.uploader.destroy(image.publicId);

  await imageRepository.delete(imageId);

  return {
    message: "Image deleted successfully.",
  };
}
}

export default new ImageService();