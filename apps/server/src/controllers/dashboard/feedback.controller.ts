import { AuthRequest } from "src/types";
import { catchAsyncHandler } from "src/utils/catch-async-handler";
import { NextFunction, Response } from "express";
import { neonDB } from "src/db/neon-db";
import {
  categoryEnum,
  priorityEnum,
  requests,
  statusEnum,
  votes,
} from "src/db/data-schema";
import { and, count, desc, eq, getTableColumns } from "drizzle-orm";
import isEmpty from "lodash/isEmpty";
import { stat } from "fs";
import { users } from "src/db/users-schema";

export type Category = (typeof categoryEnum.enumValues)[number];
export type Status = (typeof statusEnum.enumValues)[number];
export type Priority = (typeof priorityEnum.enumValues)[number];

const getFeedbackRequests = catchAsyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { tenantId } = req;
    const {
      category,
      status,
      priority,
      visibility,
      showArchived = "false",
    } = req.query;

    // Build the where conditions array
    const whereConditions = [
      eq(requests.tenantId, tenantId!),
      eq(requests.isDeleted, false),
    ];

    // Add filters based on query parameters
    if (category && !isEmpty(category) && typeof category === "string") {
      whereConditions.push(eq(requests.category, category as Category));
    }

    if (status && !isEmpty(status) && typeof status === "string") {
      whereConditions.push(eq(requests.status, status as Status));
    }

    if (priority && !isEmpty(priority) && typeof priority === "string") {
      whereConditions.push(eq(requests.priority, priority as Priority));
    }

    if (
      !isEmpty(visibility) &&
      visibility !== undefined &&
      typeof visibility === "string"
    ) {
      const isVisible = visibility.toLowerCase() === "true";
      whereConditions.push(eq(requests.isVisible, isVisible));
    }

    // Handle archived items - by default, exclude archived items unless showArchived is explicitly true
    const shouldShowArchived =
      typeof showArchived === "string" && showArchived.toLowerCase() === "true";
    if (!shouldShowArchived) {
      whereConditions.push(eq(requests.isArchived, false));
    }
    const voteCount = count(votes.id).as("voteCount");
    const feedbackRequests = await neonDB
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
      message: "Feedback Requests fetched successfully",
      data: feedbackRequests,
    });
  }
);

const updateFeedbackRequest = catchAsyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { tenantId } = req;
    const { requestId } = req.params;
    const {
      status,
      priority,
      category,
      isVisible,
      isArchived,
      title,
      description,
    } = req.body;

    await neonDB
      .update(requests)
      .set({
        ...(status && { status }),
        ...(priority && { priority }),
        ...(category && { category }),
        ...(isVisible !== undefined && { isVisible }),
        ...(isArchived && { isArchived }),
        ...(title && { title }),
        ...(description && { description }),
      })
      .where(and(eq(requests.tenantId, tenantId!), eq(requests.id, requestId)));

    res.status(200).json({
      status: "success",
      message: "Request Updated Successfully",
      data: {},
    });
  }
);

const deleteFeedbackRequest = catchAsyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { tenantId } = req;
    const { requestId } = req.params;

    await neonDB
      .update(requests)
      .set({
        isDeleted: true,
      })
      .where(and(eq(requests.tenantId, tenantId!), eq(requests.id, requestId)));

    res.status(200).json({
      status: "success",
      message: "Request Updated Successfully",
      data: {},
    });
  }
);
const getFeedbackRequest = catchAsyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { tenantId } = req;
    const { requestId } = req.params;

    const queriedRequests = await neonDB
      .select()
      .from(requests)
      .where(and(eq(requests.tenantId, tenantId!), eq(requests.id, requestId)));

    res.status(200).json({
      status: "success",
      message: "Request Updated Successfully",
      data: { requests: queriedRequests },
    });
  }
);

export {
  getFeedbackRequests,
  updateFeedbackRequest,
  deleteFeedbackRequest,
  getFeedbackRequest,
};
