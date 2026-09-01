import { Router } from "express";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../controllers/wishlist.controller";

import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/:propertyId", protect, addToWishlist);

router.get("/", protect, getWishlist);

router.delete("/:propertyId", protect, removeFromWishlist);

export default router;