import { Router, type Router as ExpressRouter } from "express";
import { authMiddleware } from "../../middleware/auth-middleware";
import {
  createNewTenant,
  getAdminAccount,
} from "src/controllers/admin/admin.controller";

const adminRouter: ExpressRouter = Router();

adminRouter.use(authMiddleware);

adminRouter.route("/user").get(getAdminAccount);
adminRouter.route("/tenant").post(createNewTenant);

export { adminRouter };
