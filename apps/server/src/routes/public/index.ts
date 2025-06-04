import { Router, type Router as ExpressRouter } from "express";
import { authMiddleware } from "../../middleware/auth-middleware";
import { AuthRequest } from "src/types";

const publicRouter: ExpressRouter = Router();

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
