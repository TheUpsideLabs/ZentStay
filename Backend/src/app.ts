import express, {
  Application,
  Request,
  Response,
} from "express";

import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";

import { errorMiddleware } from "./middleware/error.middleware";

import authRoutes from "./routes/auth.routes";
import propertyRoutes from "./routes/property.routes";
import bookingRoutes from "./routes/booking.routes";
import reviewRoutes from "./routes/review.routes";
import imageRoutes from "./routes/image.routes";
import notificationRoutes from "./routes/notification.routes";
import wishlistRoutes from "./routes/wishlist.routes";
import adminRoutes from "./routes/admin.routes";
import collegeRoutes from "./routes/college.routes";
import visitRequestRoutes from "./routes/visit-request.routes";
import ownerRoutes from "./routes/owner.routes";
import paymentRoutes from "./routes/payment.routes";

dotenv.config();

const app: Application = express();

// ================================
// CORS
// ================================

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow mobile apps, curl, server-to-server, and all Vercel deployments
      if (!origin || origin.includes("vercel.app") || origin.includes("localhost") || origin.includes("127.0.0.1")) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

// ================================
// Security Middleware
// ================================

app.use(helmet());

// ================================
// Body Parsers
// ================================

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// ================================
// Health Check
// ================================

app.get(
  "/api/v1/health",
  (_req: Request, res: Response) => {
    res.status(200).json({
      success: true,
      message: "ZentStay API is running smoothly.",
      timestamp: new Date().toISOString(),
    });
  }
);

// ================================
// API Routes
// ================================

app.use(
  "/api/v1/auth",
  authRoutes
);

app.use(
  "/api/v1/properties",
  propertyRoutes
);

app.use(
  "/api/v1/bookings",
  bookingRoutes
);

app.use(
  "/api/v1/reviews",
  reviewRoutes
);

app.use(
  "/api/v1/images",
  imageRoutes
);

app.use(
  "/api/v1/notifications",
  notificationRoutes
);

app.use(
  "/api/v1/wishlist",
  wishlistRoutes
);

app.use(
  "/api/v1/admin",
  adminRoutes
);

app.use(
  "/api/v1/colleges",
  collegeRoutes
);

app.use(
  "/api/v1/visit-requests",
  visitRequestRoutes
);

app.use(
  "/api/v1/owner",
  ownerRoutes
);

app.use(
  "/api/v1/payments",
  paymentRoutes
);

// ================================
// Error Middleware
// MUST BE LAST
// ================================

app.use(errorMiddleware);

export default app;