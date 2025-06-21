import { userTenantsMapping } from "src/db/tenants-schema";
import { getUserFromEmail, getUserWithSpecificTenant } from "./user-ops";
import { neonDB } from "src/db/neon-db";
import { users } from "src/db/users-schema";
import { AuthRequest } from "src/types";
import { NextFunction, Response } from "express";
import { createError } from "../errorHandler";
import { eq } from "drizzle-orm";

const clientFlow = async (
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
  //Add firebase id to user if it doesn't exist

  if (!tenantId) {
    return next(createError("Tenant ID is Required", 400));
  }

  const emailBasedUser = await getUserFromEmail({
    email,
    role: "user",
    tenantId,
  });

  if (
    !emailBasedUser?.firebaseUserId ||
    !emailBasedUser.name ||
    !emailBasedUser.displayPicture
  ) {
    await neonDB
      .update(users)
      .set({ firebaseUserId, name, displayPicture: picture })
      .where(eq(users.email, email));
  }

  const existingUser = await getUserWithSpecificTenant({
    email,
    firebaseUserId,
    role: "user",
    tenantId,
  });

  if (existingUser && existingUser.tenantMappings?.length) {
    req.user = existingUser;
    req.tenantId = tenantId;
    return next();
  }

  if (existingUser && existingUser.tenantMappings?.length === 0) {
    const userTenantsRelation: typeof userTenantsMapping.$inferInsert = {
      userId: existingUser.id,
      tenantId: tenantId,
      role: "user",
    };

    await neonDB.insert(userTenantsMapping).values(userTenantsRelation);
  }

  // Check if only email exists or not if it does just update it with the firebase id and continue
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

      const userTenantsRelation: typeof userTenantsMapping.$inferInsert = {
        userId: createdUser.id,
        tenantId,
        role: "user",
      };
      await tx.insert(userTenantsMapping).values(userTenantsRelation);
    });
  }

  const user = await getUserWithSpecificTenant({
    email,
    firebaseUserId,
    role: "user",
    tenantId,
  });

  if (!user) {
    return next(createError("User Doesn't exist. Please try again later", 500));
  }

  req.user = user;
  req.tenantId = tenantId;
  next();
};
export { clientFlow };
