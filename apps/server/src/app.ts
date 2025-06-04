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
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

// Logging middleware
app.use(morgan("combined"));

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

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
