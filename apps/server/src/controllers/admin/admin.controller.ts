import { AuthRequest } from "src/types";
import { catchAsyncHandler } from "src/utils/catch-async-handler";
import { NextFunction, Response } from "express";
import { neonDB } from "src/db/neon-db";
import { tenants, userTenantsMapping } from "src/db/tenants-schema";
import { uploadToS3 } from "src/utils/s3-upload";
import { eq } from "drizzle-orm";
import { createError } from "src/middleware/errorHandler";

const getAdminAccount = catchAsyncHandler(
  async (req: AuthRequest, res: Response) => {
    res.status(200).json({
      status: "success",
      message: "User Fetched Successfully",
      data: { user: req.user },
    });
  }
);

const createNewTenant = catchAsyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { name, slug } = req.body;

    await neonDB.transaction(async (tx) => {
      const [createdTenant] = await tx
        .insert(tenants)
        .values({
          name,
          slug,
        })
        .returning();

      await tx.insert(userTenantsMapping).values({
        userId: req.user?.id!,
        tenantId: createdTenant.id,
        role: "admin",
      });
    });

    res.status(201).json({
      status: "success",
      message: "New Tenant Created",
      data: {},
    });
  }
);

export { getAdminAccount, createNewTenant };
