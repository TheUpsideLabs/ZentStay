"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Global Middleware
app.use((0, helmet_1.default)()); // Security headers
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));
app.use(express_1.default.json()); // Parse incoming JSON payloads
app.use(express_1.default.urlencoded({ extended: true }));
// Health Check Route
app.get('/api/v1/health', (_req, res) => {
    res.status(200).json({
        success: true,
        message: 'ZentStay API is running smoothly.',
        timestamp: new Date().toISOString()
    });
});
// Note: API routes and global error handlers will be injected here in upcoming steps
exports.default = app;
