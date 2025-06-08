import { checkApp } from "../utils/app-check";
import { catchAsyncHandler } from "../utils/catch-async-handler";
import { firebaseAuth } from "../utils/firebase";
import { createError } from "./errorHandler";
import { tenantFlow } from "./helpers/tenant-flow";
import { clientFlow } from "./helpers/client-flow";
import { AuthRequest } from "src/types";
import { NextFunction, Response, Request } from "express";
import { adminFlow } from "./helpers/admin-flow";

const flows = {
  dashboard: tenantFlow,
  client: clientFlow,
  admin: adminFlow,
};

const authMiddleware = catchAsyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const bearerToken = req.headers.authorization?.split(" ")[1];
    const tenantId = req.headers["x-tenant-id"] as string;

    if (!bearerToken) {
      return next(
        createError(
          "You are not logged in!! Please login to access this route",
          401
        )
      );
    }

    const decoded = await firebaseAuth.verifyIdToken(bearerToken);
    const { uid, email, picture, name } = decoded;

    if ((!uid && !email) || !email || !uid) {
      return next(createError("Invalid Request", 401));
    }

    const appType: "dashboard" | "client" | "admin" | undefined = checkApp(req);

    const commonOptions = {
      email: email,
      firebaseUserId: uid,
      picture: picture!,
      name: name!,
      tenantId,
    };

    const flow = appType && flows[appType];

    if (!flow) {
      return next(createError("Invalid Request", 400));
    }

    flow?.(req, res, next, commonOptions);
  }
);

export { authMiddleware };
