import { AuthRequest } from "src/types";
import { catchAsyncHandler } from "src/utils/catch-async-handler";
import { Response } from "express";
import { neonDB } from "src/db/neon-db";
import { requests } from "src/db/data-schema";
import { and, eq, sql } from "drizzle-orm";

const getRoadmapData = catchAsyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { tenantId } = req;

    // Group data by status using SQL aggregation
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
            'createdAt', ${requests.createdAt}
          )
        )`.as("items"),
      })
      .from(requests)
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
      data: groupedData,
    });
  }
);

export { getRoadmapData };
