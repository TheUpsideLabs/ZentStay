"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const error_middleware_1 = require("./middleware/error.middleware");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const property_routes_1 = __importDefault(require("./routes/property.routes"));
const booking_routes_1 = __importDefault(require("./routes/booking.routes"));
const review_routes_1 = __importDefault(require("./routes/review.routes"));
const image_routes_1 = __importDefault(require("./routes/image.routes"));
const notification_routes_1 = __importDefault(require("./routes/notification.routes"));
const wishlist_routes_1 = __importDefault(require("./routes/wishlist.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const college_routes_1 = __importDefault(require("./routes/college.routes"));
const visit_request_routes_1 = __importDefault(require("./routes/visit-request.routes"));
const owner_routes_1 = __importDefault(require("./routes/owner.routes"));
const payment_routes_1 = __importDefault(require("./routes/payment.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// ================================
// CORS
// ================================
app.use((0, cors_1.default)({
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
}));
// ================================
// Security Middleware
// ================================
app.use((0, helmet_1.default)());
// ================================
// Body Parsers
// ================================
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true,
}));
// ================================
// Health Check
// ================================
app.get("/api/v1/health", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "ZentStay API is running smoothly.",
        timestamp: new Date().toISOString(),
    });
});
// ================================
// API Routes
// ================================
app.use("/api/v1/auth", auth_routes_1.default);
app.use("/api/v1/properties", property_routes_1.default);
app.use("/api/v1/bookings", booking_routes_1.default);
app.use("/api/v1/reviews", review_routes_1.default);
app.use("/api/v1/images", image_routes_1.default);
app.use("/api/v1/notifications", notification_routes_1.default);
app.use("/api/v1/wishlist", wishlist_routes_1.default);
app.use("/api/v1/admin", admin_routes_1.default);
app.use("/api/v1/colleges", college_routes_1.default);
app.use("/api/v1/visit-requests", visit_request_routes_1.default);
app.use("/api/v1/owner", owner_routes_1.default);
app.use("/api/v1/payments", payment_routes_1.default);
// ================================
// Error Middleware
// MUST BE LAST
// ================================
app.use(error_middleware_1.errorMiddleware);
exports.default = app;
