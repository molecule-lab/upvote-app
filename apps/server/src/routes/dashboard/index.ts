import { Router, type Router as ExpressRouter } from "express";
import { authMiddleware } from "../../middleware/auth-middleware";
import { getDashboardData } from "src/controllers/dashboard/dashboard.controller";
import {
  deleteFeedbackRequest,
  getFeedbackRequest,
  getFeedbackRequests,
  updateFeedbackRequest,
} from "src/controllers/dashboard/feedback.controller";
import { getUsersData } from "src/controllers/dashboard/users.controller";
import { getRoadmapData } from "src/controllers/dashboard/roadmap.controller";

import multer from "multer";
import {
  checkSlug,
  updateTenant,
} from "src/controllers/dashboard/tenant.controller";
import {
  createChangelog,
  getChangelogData,
  updateChangelog,
} from "src/controllers/dashboard/changelog.controller";

const dashboardRouter: ExpressRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

dashboardRouter.use(authMiddleware);

dashboardRouter.route("/").get(getDashboardData);

dashboardRouter.route("/tenant").patch(upload.single("file"), updateTenant);
dashboardRouter.route("/tenant/check-slug").post(checkSlug);

dashboardRouter.route("/feedback").get(getFeedbackRequests);
dashboardRouter
  .route("/feedback/:requestId")
  .get(getFeedbackRequest)
  .patch(updateFeedbackRequest)
  .delete(deleteFeedbackRequest);

dashboardRouter.route("/users").get(getUsersData);
dashboardRouter.route("/roadmap").get(getRoadmapData);

dashboardRouter
  .route("/changelog")
  .get(getChangelogData)
  .post(upload.single("file"), createChangelog);
dashboardRouter
  .route("/changelog/:changelogId")
  .patch(upload.single("file"), updateChangelog);

export { dashboardRouter };
