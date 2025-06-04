import { neonDB } from "src/db/neon-db";
import { tenants, userTenantsMapping } from "src/db/tenants-schema";
import { users } from "src/db/users-schema";
import { getUser, getUserWithSpecificTenant } from "./user-ops";
import { AuthRequest } from "src/types";
import { NextFunction, Response } from "express";
import { createError } from "../errorHandler";

const tenantFlow = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
  {
    email,
    firebaseUserId,
    picture,
    name,
    tenantId,
  }: {
    email: string;
    firebaseUserId: string;
    picture: string;
    name: string;
    tenantId: string;
  }
) => {
  if (!tenantId) {
    return next(createError("Tenant ID is Required", 400));
  }

  const existingUser = await getUserWithSpecificTenant({
    email,
    firebaseUserId,
    role: "admin",
    tenantId,
  });

  if (existingUser && existingUser.tenantMappings.length) {
    req.user = existingUser;
    req.tenantId = tenantId;
    return next();
  }

  if (existingUser && existingUser.tenantMappings?.length === 0) {
    return next(createError("No Access for Tenant Id", 403));
  }

  if (!existingUser) {
    return next(createError("User Doesn't exist. Please try again later", 500));
  }
};
export { tenantFlow };
