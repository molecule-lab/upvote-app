import { eq } from "drizzle-orm";
import { NextFunction, Response, Request } from "express";
import { requests } from "src/db/data-schema";
import { neonDB } from "src/db/neon-db";
import { tenants, userTenantsMapping } from "src/db/tenants-schema";
import { users } from "src/db/users-schema";
import { catchAsyncHandler } from "src/utils/catch-async-handler";

const getTenant = catchAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { tenantId } = req.query;

    console.log(tenantId);

    const tenant = await neonDB
      .select()
      .from(tenants)
      .where(eq(tenants.id, tenantId as string));

    res.status(200).json({
      status: "success",
      message: "Tenant Fetched Successfully",
      data: {
        tenant: tenant[0],
      },
    });
  }
);

const createFeedbackRequest = catchAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { tenantId, email, title, description, selectedType } = req.body;

    let existingUser = await neonDB
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (!existingUser.length) {
      await neonDB.transaction(async (tx) => {
        existingUser = await tx
          .insert(users)
          .values({ email: email })
          .returning();

        await tx
          .insert(userTenantsMapping)
          .values({ role: "user", tenantId, userId: existingUser?.[0]?.id });
      });
    }

    await neonDB.insert(requests).values({
      authoredBy: existingUser?.[0]?.id,
      category: selectedType,
      status: "in-review",
      tenantId: tenantId,
      title: title,
      description: description,
      source: "widget",
    });

    res.status(201).json({
      status: "success",
      message: "Request Submitted Successfully",
      data: {},
    });
  }
);

export { getTenant, createFeedbackRequest };
