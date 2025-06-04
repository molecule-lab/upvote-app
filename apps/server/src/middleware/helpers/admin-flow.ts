import { neonDB } from "src/db/neon-db";
import { getUser } from "./user-ops";
import { tenants, userTenantsMapping } from "src/db/tenants-schema";
import { users } from "src/db/users-schema";
import { AuthRequest } from "src/types";
import { NextFunction, Response } from "express";
import { createError } from "../errorHandler";

const adminFlow = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
  {
    email,
    firebaseUserId,
    picture,
    name,
  }: {
    email: string;
    firebaseUserId: string;
    picture: string;
    name: string;
  }
) => {
  const existingUser = await getUser({ email, firebaseUserId, role: "admin" });

  if (existingUser && existingUser.tenantMappings.length > 0) {
    req.user = existingUser;
    return next();
  }

  if (existingUser && existingUser.tenantMappings.length === 0) {
    await neonDB.transaction(async (tx) => {
      const tenantData: typeof tenants.$inferInsert = {
        name: "App 1",
      };
      const [createdTenant] = await tx
        .insert(tenants)
        .values(tenantData)
        .returning();

      const userTenantsRelation: typeof userTenantsMapping.$inferInsert = {
        userId: existingUser.id,
        tenantId: createdTenant.id,
        role: "admin",
      };

      await tx.insert(userTenantsMapping).values(userTenantsRelation);
    });
  }

  if (!existingUser) {
    await neonDB.transaction(async (tx) => {
      const newUserData: typeof users.$inferInsert = {
        email,
        firebaseUserId,
        displayPicture: picture,
        name: name,
      };

      const [createdUser] = await tx
        .insert(users)
        .values(newUserData)
        .returning();

      const tenantData: typeof tenants.$inferInsert = {
        name: "App 1",
      };

      const [createdTenant] = await tx
        .insert(tenants)
        .values(tenantData)
        .returning();

      const userTenantsRelation: typeof userTenantsMapping.$inferInsert = {
        userId: createdUser.id,
        tenantId: createdTenant.id,
        role: "admin",
      };

      await tx.insert(userTenantsMapping).values(userTenantsRelation);
    });
  }

  const user = await getUser({ email, firebaseUserId, role: "admin" });

  if (!user) {
    return next(createError("User Doesn't exist. Please try again later", 500));
  }

  req.user = user;
  next();
};

export { adminFlow };
