import { AuthRequest } from "src/types";
import { catchAsyncHandler } from "src/utils/catch-async-handler";
import { Response } from "express";
import { neonDB } from "src/db/neon-db";
import { userTenantsMapping } from "src/db/tenants-schema";
import { and, count, eq } from "drizzle-orm";
import { users } from "src/db/users-schema";
import { requests } from "src/db/data-schema";

const getUsersData = catchAsyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { tenantId } = req;

    const usersData = await neonDB
      .select({
        userId: userTenantsMapping.userId,
        role: userTenantsMapping.role,
        name: users.name,
        email: users.email,
        postCount: count(requests.id).as("postCount"),
      })
      .from(userTenantsMapping)
      .innerJoin(users, eq(userTenantsMapping.userId, users.id))
      .leftJoin(requests, eq(requests.authoredBy, users.id))
      .where(
        and(
          eq(userTenantsMapping.tenantId, tenantId!),
          eq(userTenantsMapping.role, "user")
        )
      )
      .groupBy(
        userTenantsMapping.userId,
        userTenantsMapping.role,
        users.name,
        users.email
      );

    res.status(200).json({
      status: "success",
      message: "Users data fetched successfully",
      data: usersData,
    });
  }
);

export { getUsersData };
