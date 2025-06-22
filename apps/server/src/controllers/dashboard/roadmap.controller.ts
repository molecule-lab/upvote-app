import { AuthRequest } from "src/types";
import { catchAsyncHandler } from "src/utils/catch-async-handler";
import { Response } from "express";
import { neonDB } from "src/db/neon-db";
import { requests, votes } from "src/db/data-schema";
import { users } from "src/db/users-schema";
import { and, eq, sql } from "drizzle-orm";

const STATUS_PRIORITY_MAP = {
  "in-review": 0,
  "in-progress": 1,
  completed: 2,
  declined: 3,
};

const getRoadmapData = catchAsyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { tenantId } = req;

    // Group data by status using SQL aggregation with user information
    const groupedData = await neonDB
      .select({
        status: requests.status,
        items: sql`json_agg(
        json_build_object(
          'id', ${requests.id},
          'title', ${requests.title},
          'description', ${requests.description},
          'category', ${requests.category},
          'status', ${requests.status},
          'priority', ${requests.priority},
          'isVisible', ${requests.isVisible},
          'isArchived', ${requests.isArchived},
          'isDeleted', ${requests.isDeleted},
          'source', ${requests.source},
          'authoredBy', ${requests.authoredBy},
          'tenantId', ${requests.tenantId},
          'createdAt', ${requests.createdAt},
          'voteCount', (
            SELECT COUNT(*) FROM ${votes}
            WHERE ${votes.requestId} = ${requests.id}
          ),
          'authoredBy', json_build_object(
            'id', ${users.id},
            'name', ${users.name},
            'email', ${users.email},
            'displayPicture', ${users.displayPicture}
          )
        )
      )`.as("items"),
      })
      .from(requests)
      .innerJoin(users, eq(requests.authoredBy, users.id))
      .where(
        and(
          eq(requests.tenantId, tenantId!),
          eq(requests.isDeleted, false),
          eq(requests.isArchived, false)
        )
      )
      .groupBy(requests.status);

    res.status(200).json({
      status: "success",
      message: "Roadmap Data fetched successfully",
      data: groupedData
        .map((data) => ({
          ...data,
          priority: STATUS_PRIORITY_MAP[data.status],
        }))
        .sort((a, b) => a.priority - b.priority),
    });
  }
);

export { getRoadmapData };
