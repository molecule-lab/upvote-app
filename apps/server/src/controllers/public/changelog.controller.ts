import { and, eq, sql } from "drizzle-orm";
import { NextFunction, Response } from "express";
import { isEmpty } from "lodash";
import { changelog, requests } from "src/db/data-schema";
import { neonDB } from "src/db/neon-db";
import { AuthRequest } from "src/types";
import { catchAsyncHandler } from "src/utils/catch-async-handler";

const getChangelog = catchAsyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { tenantId, query } = req;
    const { search } = query;
    const whereConditions = [
      eq(changelog.tenantId, tenantId!),
      eq(changelog.isVisible, true),
    ];

    if (search && !isEmpty(search) && typeof search === "string") {
      const searchTerm = `%${search}%`;
      whereConditions.push(
        sql`(${changelog.title} ILIKE ${searchTerm} OR ${changelog.description} ILIKE ${searchTerm})`
      );
    }

    const changelogData = await neonDB
      .select()
      .from(changelog)
      .where(and(...whereConditions));

    res.status(200).json({
      status: "success",
      message: "Changelog fetched successfully",
      data: { changelog: changelogData },
    });
  }
);

export { getChangelog };
