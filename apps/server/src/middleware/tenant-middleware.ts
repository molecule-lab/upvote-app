import { NextFunction, Response } from "express";
import { AuthRequest } from "src/types";
import { catchAsyncHandler } from "src/utils/catch-async-handler";
import { createError } from "./errorHandler";

const tenantMiddleware = catchAsyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const tenantId = req.headers["x-tenant-id"] as string;

    if (!tenantId) {
      return next(createError("Tenant ID is required", 403));
    }

    req.tenantId = tenantId;

    next();
  }
);

export { tenantMiddleware };
