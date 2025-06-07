import { and, eq } from "drizzle-orm";
import { NextFunction, Response } from "express";
import { changelog } from "src/db/data-schema";
import { neonDB } from "src/db/neon-db";
import { AuthRequest } from "src/types";
import { catchAsyncHandler } from "src/utils/catch-async-handler";

const getChangelog = catchAsyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { tenantId } = req;

    const changelogData = await neonDB
      .select()
      .from(changelog)
      .where(
        and(eq(changelog.tenantId, tenantId!), eq(changelog.isVisible, true))
      );

    res.status(200).json({
      status: "success",
      message: "Changelog fetched successfully",
      data: { changelog: changelogData },
    });
  }
);

export { getChangelog };
