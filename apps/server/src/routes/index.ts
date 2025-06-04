import { Router, type Router as ExpressRouter } from "express";
import { publicRouter } from "./public";
import { dashboardRouter } from "./dashboard";
import { adminRouter } from "./admin";

const indexRouter: ExpressRouter = Router();

// Mount route modules
indexRouter.use("/public", publicRouter);
indexRouter.use("/dashboard", dashboardRouter);
indexRouter.use("/admin", adminRouter);

export { indexRouter };
