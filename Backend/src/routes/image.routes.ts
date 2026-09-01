import { Router } from "express";
import { Role } from "@prisma/client";

import imageController from "../controllers/image.controller";
import upload from "../middleware/upload.middleware";
import { protect, authorize } from "../middleware/auth.middleware";

const router = Router();

router.post(
  "/:propertyId",
  protect,
  authorize(Role.OWNER),
  upload.array("images", 10),
  imageController.uploadImages
);

router.get(
  "/property/:propertyId",
  imageController.getPropertyImages
);

router.delete(
  "/:imageId",
  protect,
  authorize(Role.OWNER),
  imageController.deleteImage
);

export default router;