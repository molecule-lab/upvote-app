import { eq } from "drizzle-orm";
import { NextFunction, Response } from "express";
import { neonDB } from "src/db/neon-db";
import { tenants } from "src/db/tenants-schema";
import { createError } from "src/middleware/errorHandler";
import { AuthRequest } from "src/types";
import { catchAsyncHandler } from "src/utils/catch-async-handler";
import { uploadToS3 } from "src/utils/s3-upload";

const checkSlug = catchAsyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { slug } = req.body;

    if (!slug || typeof slug !== "string") {
      return next(createError("Invalid or missing Slug", 400));
    }

    const existingTenant = await neonDB
      .select()
      .from(tenants)
      .where(eq(tenants.slug, slug));

    if (existingTenant.length > 0) {
      return next(createError("Domain Not available", 400));
    }

    res
      .status(200)
      .json({ status: "success", message: "Slug Available", data: {} });
  }
);

const updateTenant = catchAsyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { tenantId } = req;
    const { slug, name } = req.body;
    const file = req.file!;

    const fileUrl = await uploadToS3(file);

    await neonDB
      .update(tenants)
      .set({
        ...(fileUrl && { displayLogo: fileUrl }),
        ...(name && { name }),
        ...(slug && { slug }),
      })
      .where(eq(tenants.id, tenantId!));

    res.status(200).json({
      status: "success",
      message: "Tenant updated successfully",
      data: {},
    });
  }
);

export { updateTenant, checkSlug };
