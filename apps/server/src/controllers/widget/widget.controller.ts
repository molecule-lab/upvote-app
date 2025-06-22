import { eq } from "drizzle-orm";
import { NextFunction, Response, Request } from "express";
import { requests, votes } from "src/db/data-schema";
import { neonDB } from "src/db/neon-db";
import { tenants, userTenantsMapping } from "src/db/tenants-schema";
import { users } from "src/db/users-schema";
import { getUserFromEmail } from "src/middleware/helpers/user-ops";
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

const insertRequestAndRecordVote = async ({
  userId,
  category,
  tenantId,
  title,
  description,
}: {
  userId: string;
  category: "idea" | "issue" | "feedback";
  tenantId: string;
  title: string;
  description: string;
}) => {
  await neonDB.transaction(async (tx) => {
    const [createdRequest] = await tx
      .insert(requests)
      .values({
        authoredBy: userId,
        category,
        status: "in-review",
        tenantId,
        title,
        description,
        source: "widget",
      })
      .returning();

    await tx.insert(votes).values({
      requestId: createdRequest.id,
      tenantId,
      votedBy: userId,
      source: "widget",
    });
  });
};

const createFeedbackRequest = catchAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { tenantId, email, title, description, selectedType } = req.body;

    let existingUser = await getUserFromEmail({
      email,
      role: "user",
      tenantId,
    });

    if (existingUser && existingUser.tenantMappings?.length) {
      // User exists with mapping
      // Insert feedback and create vote
      console.log("User and mapping both exists");
      await insertRequestAndRecordVote({
        userId: existingUser.id,
        category: selectedType,
        description,
        title,
        tenantId,
      });
    }

    if (existingUser && existingUser.tenantMappings.length === 0) {
      // User exists but not in the specific tenant so create mapping and then insert
      // Create mapping, create post and add vote
      console.log("User exists");

      await neonDB
        .insert(userTenantsMapping)
        .values({ role: "user", tenantId, userId: existingUser.id });

      await insertRequestAndRecordVote({
        userId: existingUser.id,
        category: selectedType,
        description,
        title,
        tenantId,
      });
    }

    if (!existingUser) {
      console.log("Nothing exists");
      // Create user, create mapping, create post and add vote
      await neonDB.transaction(async (tx) => {
        const [newUser] = await tx
          .insert(users)
          .values({
            email,
          })
          .returning();

        await tx
          .insert(userTenantsMapping)
          .values({ role: "user", tenantId, userId: newUser.id });

        const [createdRequest] = await tx
          .insert(requests)
          .values({
            authoredBy: newUser.id,
            category: selectedType,
            status: "in-review",
            tenantId,
            title,
            description,
            source: "widget",
          })
          .returning();

        await tx.insert(votes).values({
          requestId: createdRequest.id,
          tenantId,
          votedBy: newUser.id,
          source: "widget",
        });
      });
    }

    res.status(201).json({
      status: "success",
      message: "Request Submitted Successfully",
      data: {},
    });
  }
);

export { getTenant, createFeedbackRequest };
