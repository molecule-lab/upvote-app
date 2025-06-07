import { and, count, desc, eq, getTableColumns } from "drizzle-orm";
import { NextFunction, Response } from "express";
import { requests, votes } from "src/db/data-schema";
import { neonDB } from "src/db/neon-db";
import { users } from "src/db/users-schema";
import { AuthRequest } from "src/types";
import { catchAsyncHandler } from "src/utils/catch-async-handler";

const getUser = catchAsyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    res.status(200).json({
      status: "success",
      message: "User Fetched Successfully",
      data: { user: req.user },
    });
  }
);

const getUserProfile = catchAsyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { tenantId, user } = req;
    const voteCount = count(votes.id).as("voteCount");

    const userPosts = await neonDB
      .select({ ...getTableColumns(requests), voteCount, authoredBy: users })
      .from(requests)
      .leftJoin(votes, eq(requests.id, votes.requestId))
      .leftJoin(users, eq(requests.authoredBy, users.id))
      .where(
        and(
          eq(requests.tenantId, tenantId!),
          eq(requests.authoredBy, user?.id!)
        )
      )
      .groupBy(requests.id, users.id)
      .orderBy(desc(voteCount));
    const userVotes = await neonDB
      .select()
      .from(votes)
      .where(and(eq(votes.tenantId, tenantId!), eq(votes.votedBy, user?.id!)));

    res.status(200).json({
      status: "success",
      message: "User Profile Fetched Successfully",
      data: {
        posts: userPosts,
        votes: userVotes,
      },
    });
  }
);

export { getUser, getUserProfile };
