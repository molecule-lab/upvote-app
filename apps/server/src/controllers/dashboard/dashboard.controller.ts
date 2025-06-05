import { AuthRequest } from "src/types";
import { catchAsyncHandler } from "src/utils/catch-async-handler";
import { Response } from "express";
import { neonDB } from "src/db/neon-db";
import { and, count, desc, eq, getTableColumns } from "drizzle-orm";
import { requests, votes } from "src/db/data-schema";
import { userTenantsMapping } from "src/db/tenants-schema";

const getDashboardData = catchAsyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { tenantId } = req;
    const requestsCount = neonDB
      .select({ count: count() })
      .from(requests)
      .where(
        and(
          eq(requests.tenantId, tenantId!),
          eq(requests.isDeleted, false),
          eq(requests.isArchived, false)
        )
      );

    const inProgressCount = neonDB
      .select({ count: count() })
      .from(requests)
      .where(
        and(
          eq(requests.tenantId, tenantId!),
          eq(requests.status, "in-progress"),
          eq(requests.isDeleted, false),
          eq(requests.isArchived, false)
        )
      );
    const completedCount = neonDB
      .select({ count: count() })
      .from(requests)
      .where(
        and(
          eq(requests.tenantId, tenantId!),
          eq(requests.status, "completed"),
          eq(requests.isDeleted, false),
          eq(requests.isArchived, false)
        )
      );
    const totalVoters = neonDB
      .select({ count: count() })
      .from(userTenantsMapping)
      .where(
        and(
          eq(userTenantsMapping.tenantId, tenantId!),
          eq(userTenantsMapping.role, "user")
        )
      );

    const topRequest = await neonDB
      .select({
        ...getTableColumns(requests),
        voteCount: count(votes.id).as("voteCount"),
      })
      .from(requests)
      .leftJoin(votes, eq(requests.id, votes.requestId))
      .where(
        and(
          eq(requests.tenantId, tenantId!),
          eq(requests.isDeleted, false),
          eq(requests.isArchived, false)
        )
      )
      .groupBy(requests.id)
      .orderBy(desc(count(votes.id)))
      .limit(10);

    const [
      [totalRequests],
      [inProgressRequests],
      [completedRequests],
      [totalRegisteredVoters],
      latestsRequest,
    ] = await Promise.all([
      requestsCount,
      inProgressCount,
      completedCount,
      totalVoters,
      topRequest,
    ]);

    res.status(200).json({
      status: "success",
      message: "Dashboard Data fetched successfully",
      data: {
        cards: [
          { ...totalRequests, title: "Total Requests", id: "total-requests" },
          { ...inProgressRequests, title: "In Progress", id: "in-progress" },
          { ...completedRequests, title: "Completed", id: "completed" },
          {
            ...totalRegisteredVoters,
            title: "Total Voters",
            id: "total-voters",
          },
        ],
        latestsRequest,
      },
    });
  }
);

export { getDashboardData };
