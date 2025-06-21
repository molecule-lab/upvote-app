import { Router, type Router as ExpressRouter } from "express";
import {
  createFeedbackRequest,
  getTenant,
} from "src/controllers/widget/widget.controller";

const widgetRouter: ExpressRouter = Router();

widgetRouter.route("/tenant").get(getTenant);
widgetRouter.route("/feedback").post(createFeedbackRequest);

export { widgetRouter };
