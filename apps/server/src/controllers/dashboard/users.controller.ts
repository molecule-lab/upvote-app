import { AuthRequest } from "src/types";
import { catchAsyncHandler } from "src/utils/catch-async-handler";
import { Response } from "express";
import { neonDB } from "src/db/neon-db";
import { userTenantsMapping } from "src/db/tenants-schema";
import { and, count, countDistinct, eq } from "drizzle-orm";
import { users } from "src/db/users-schema";
import { requests, votes } from "src/db/data-schema";

const getUsersData = catchAsyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { tenantId } = req;

    console.log(tenantId);

    const usersData = await neonDB
      .select({
        userId: userTenantsMapping.userId,
        role: userTenantsMapping.role,
        name: users.name,
        email: users.email,
        displayPicture: users.displayPicture,
        createdAt: users.createdAt,
        postCount: countDistinct(requests.id).as("postCount"),
        voteCount: countDistinct(votes.id).as("voteCount"),
      })
      .from(userTenantsMapping)
      .innerJoin(users, eq(userTenantsMapping.userId, users.id))
      .leftJoin(
        requests,
        and(eq(requests.authoredBy, users.id), eq(requests.tenantId, tenantId!))
      )
      .leftJoin(
        votes,
        and(eq(votes.votedBy, users.id), eq(votes.tenantId, tenantId!))
      )
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
        users.email,
        users.displayPicture,
        users.createdAt
      );
    res.status(200).json({
      status: "success",
      message: "Users data fetched successfully",
      data: usersData,
    });
  }
);

export { getUsersData };
