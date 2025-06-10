import { eq } from "drizzle-orm";
import { NextFunction, Response } from "express";
import { neonDB } from "src/db/neon-db";
import { tenants } from "src/db/tenants-schema";
import { createError } from "src/middleware/errorHandler";
import { AuthRequest } from "src/types";
import { catchAsyncHandler } from "src/utils/catch-async-handler";
import { uploadToS3 } from "src/utils/s3-upload";
import { RESERVED_SLUGS } from "src/utils/reserved-slugs";

// Function to validate slug format - only allows alphanumeric characters and hyphens
const isValidSlugFormat = (slug: string): boolean => {
  // Regular expression to match only alphanumeric characters and hyphens
  const slugRegex = /^[a-zA-Z0-9-]+$/;
  return slugRegex.test(slug);
};

const checkSlug = catchAsyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { slug } = req.body;

    if (!slug || typeof slug !== "string") {
      return next(createError("Invalid or missing Slug", 400));
    }

    // Check for valid slug format (only alphanumeric and hyphens)
    if (!isValidSlugFormat(slug)) {
      return next(createError("Domain Not available", 400));
    }

    // Check if slug is in reserved list (case-insensitive)
    if (RESERVED_SLUGS.includes(slug.toLowerCase())) {
      return next(createError("Domain Not available", 400));
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
    const file = req.file;

    // Validate slug format if provided
    if (slug && !isValidSlugFormat(slug)) {
      return next(createError("Domain Not available", 400));
    }

    // Check if slug is reserved if provided
    if (slug && RESERVED_SLUGS.includes(slug.toLowerCase())) {
      return next(createError("Domain Not available", 400));
    }

    let fileUrl: string | undefined;
    if (file) {
      fileUrl = await uploadToS3(file);
    }

    const updateData: any = {};
    if (fileUrl) updateData.displayLogo = fileUrl;
    if (name) updateData.name = name;
    if (slug) updateData.slug = slug;

    await neonDB
      .update(tenants)
      .set(updateData)
      .where(eq(tenants.id, tenantId!));

    res.status(200).json({
      status: "success",
      message: "Tenant updated successfully",
      data: {},
    });
  }
);

export { updateTenant, checkSlug };
