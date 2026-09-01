import { Request, Response, NextFunction } from "express";
import imageService from "../services/image.service";

class ImageController {
  async uploadImages(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const propertyId = req.params.propertyId;
      const ownerId = (req as any).user.id;
      const files = req.files as Express.Multer.File[];

      const result = await imageService.uploadImages(
        propertyId,
        ownerId,
        files
      );

      res.status(201).json({
        success: true,
        message: result.message,
        data: result.images,
      });
    } catch (error) {
      next(error);
    }
  }

  async getPropertyImages(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { propertyId } = req.params;

      const images = await imageService.getPropertyImages(propertyId);

      res.status(200).json({
        success: true,
        data: images,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteImage(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { imageId } = req.params;

      const ownerId = (req as any).user.id;

      const result = await imageService.deleteImage(
        imageId,
        ownerId
      );

      res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ImageController();