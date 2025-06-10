import { eq } from "drizzle-orm";
import { NextFunction, Request, Response } from "express";
import { neonDB } from "src/db/neon-db";
import { tenants } from "src/db/tenants-schema";
import { createError } from "src/middleware/errorHandler";
import { catchAsyncHandler } from "src/utils/catch-async-handler";

const getTenant = catchAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { slug } = req.query;

    const [tenant] = await neonDB
      .select()
      .from(tenants)
      .where(eq(tenants.slug, slug! as string));
    if (!tenant) {
      return next(createError("Tenant Not Found", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Tenant Fetched Successfully",
      data: { tenant },
    });
  }
);

export { getTenant };
