import { and, count, desc, eq, getTableColumns, sql } from "drizzle-orm";
import { NextFunction, Response } from "express";
import { isEmpty } from "lodash";
import { requests, votes } from "src/db/data-schema";
import { neonDB } from "src/db/neon-db";
import { users } from "src/db/users-schema";
import { AuthRequest } from "src/types";
import { catchAsyncHandler } from "src/utils/catch-async-handler";
import { Category, Status } from "../dashboard/feedback.controller";

const getFeedback = catchAsyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { tenantId } = req;
    const { category, status, search } = req.query;

    const whereConditions = [
      eq(requests.tenantId, tenantId!),
      eq(requests.isDeleted, false),
      eq(requests.isArchived, false),
      eq(requests.isVisible, true),
    ];
    if (category && !isEmpty(category) && typeof category === "string") {
      whereConditions.push(eq(requests.category, category as Category));
    }

    if (status && !isEmpty(status) && typeof status === "string") {
      whereConditions.push(eq(requests.status, status as Status));
    }

    if (search && !isEmpty(search) && typeof search === "string") {
      const searchTerm = `%${search}%`;
      whereConditions.push(
        sql`(${requests.title} ILIKE ${searchTerm} OR ${requests.description} ILIKE ${searchTerm})`
      );
    }

    const voteCount = count(votes.id).as("voteCount");

    const feedbacks = await neonDB
      .select({
        ...getTableColumns(requests),
        voteCount,
        authoredBy: users,
      })
      .from(requests)
      .leftJoin(votes, eq(requests.id, votes.requestId))
      .leftJoin(users, eq(requests.authoredBy, users.id))
      .where(and(...whereConditions))
      .groupBy(requests.id, users.id)
      .orderBy(desc(voteCount));

    res.status(200).json({
      status: "success",
      message: "Feedbacks fetched successfully",
      data: { feedback: feedbacks },
    });
  }
);

const createFeedback = catchAsyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { tenantId, user, body } = req;

    const { title, category, description } = body;

    const [createdRequest] = await neonDB
      .insert(requests)
      .values({
        title: title!,
        category: category!,
        description: description!,
        authoredBy: user?.id!,
        tenantId: tenantId!,
        status: "in-review",
      })
      .returning();

    await neonDB.insert(votes).values({
      requestId: createdRequest.id,
      tenantId: tenantId!,
      votedBy: user?.id!,
    });

    res.status(200).json({
      status: "success",
      message: "Feedback Request Created Successfully",
      data: {},
    });
  }
);

const updateFeedback = catchAsyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { tenantId, user, body, params } = req;
    const { title, category, description } = body;
    const { requestId } = params;

    await neonDB
      .update(requests)
      .set({ title, category, description })
      .where(
        and(
          eq(requests.authoredBy, user?.id!),
          eq(requests.tenantId, tenantId!),
          eq(requests.id, requestId)
        )
      );

    res.status(200).json({
      status: "success",
      message: "Request updated successfully",
      data: {},
    });
  }
);

export { getFeedback, createFeedback, updateFeedback };
