import { Router, type Router as ExpressRouter } from "express";
import { authMiddleware } from "../../middleware/auth-middleware";
import { AuthRequest } from "src/types";
import express from "express";

const publicRouter: ExpressRouter = Router();

publicRouter.use(express.json({ limit: "10mb" }));
publicRouter.use(express.urlencoded({ extended: true }));
publicRouter.use(authMiddleware);

// Public routes will be defined here
publicRouter.get("/", (req: AuthRequest, res) => {
  res.json({
    message: "Public API endpoints",
    description: "These are publicly accessible endpoints",
    data: req.user,
  });
});

export { publicRouter };
