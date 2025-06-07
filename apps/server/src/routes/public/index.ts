import { Router, type Router as ExpressRouter } from "express";
import { authMiddleware } from "../../middleware/auth-middleware";
import { AuthRequest } from "src/types";
import express from "express";
import { getTenant } from "src/controllers/public/tenant.controller";
import {
  createFeedback,
  getFeedback,
  updateFeedback,
} from "src/controllers/public/feedback.controller";
import { tenantMiddleware } from "src/middleware/tenant-middleware";
import { getRoadmap } from "src/controllers/public/roadmap.controller";
import { getChangelog } from "src/controllers/public/changelog.controller";
import {
  getUser,
  getUserProfile,
} from "src/controllers/public/user.controller";
import { addVote, deleteVote } from "src/controllers/public/votes.controller";

const publicRouter: ExpressRouter = Router();

publicRouter.route("/tenant").get(getTenant);
publicRouter.route("/feedback").get(tenantMiddleware, getFeedback);
publicRouter.route("/roadmap").get(tenantMiddleware, getRoadmap);
publicRouter.route("/changelog").get(tenantMiddleware, getChangelog);

publicRouter.use(authMiddleware);

publicRouter.route("/user").get(getUser);
publicRouter.route("/user/profile").get(getUserProfile);
publicRouter.route("/feedback").post(createFeedback);
publicRouter.route("/feedback/:requestId").patch(updateFeedback);

publicRouter.route("/vote").post(addVote).delete(deleteVote);

// Public routes will be defined here
publicRouter.get("/", (req: AuthRequest, res) => {
  res.json({
    message: "Public API endpoints",
    description: "These are publicly accessible endpoints",
    data: req.user,
  });
});

export { publicRouter };
