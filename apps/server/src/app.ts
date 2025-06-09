import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { indexRouter } from "./routes";
import { errorHandler } from "./middleware/errorHandler";

// Create Express app
export const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
      /^http:\/\/.*\.localhost:3000$/,
      /^http:\/\/.*\.localhost:3002$/,
      /^http:\/\/.*\.localhost:3001$/,
    ],
  })
);

// Logging middleware
app.use(morgan("combined"));

// Body parsing middleware - only for non-multipart requests
app.use((req, res, next) => {
  // Skip body parsing for multipart requests to avoid conflicts with multer
  if (req.headers["content-type"]?.includes("multipart/form-data")) {
    return next();
  }
  express.json({ limit: "10mb" })(req, res, next);
});

app.use((req, res, next) => {
  // Skip body parsing for multipart requests to avoid conflicts with multer
  if (req.headers["content-type"]?.includes("multipart/form-data")) {
    return next();
  }
  express.urlencoded({ extended: true })(req, res, next);
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API routes
app.use("/api/v1", indexRouter);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.originalUrl} not found`,
  });
});

// Error handling middleware (should be last)
app.use(errorHandler);
