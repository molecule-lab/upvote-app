import { and, eq } from "drizzle-orm";
import { NextFunction, Response } from "express";
import { changelog } from "src/db/data-schema";
import { neonDB } from "src/db/neon-db";
import { createError } from "src/middleware/errorHandler";
import { AuthRequest } from "src/types";
import { catchAsyncHandler } from "src/utils/catch-async-handler";
import { uploadToS3 } from "src/utils/s3-upload";

const getChangelogData = catchAsyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { tenantId } = req;

    const changelogData = await neonDB
      .select()
      .from(changelog)
      .where(eq(changelog.tenantId, tenantId!));

    res.status(200).json({
      status: "success",
      message: "Changelog fetched successfully",
      data: changelogData,
    });
  }
);

const createChangelog = catchAsyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { tenantId } = req;
    const { title, description, isVisible } = req.body;
    const file = req.file;

    const fileUrl = file && (await uploadToS3(file!));

    if (!title || !description) {
      return next(createError("Invalid Request", 400));
    }

    const [createdChangeLog] = await neonDB
      .insert(changelog)
      .values({
        tenantId: tenantId!,
        authoredBy: req.user?.id!,
        coverImage: fileUrl,
        description: description,
        title: title,
        isVisible,
      })
      .returning();

    res.status(200).json({
      status: "success",
      message: "Changelog created successfully",
      data: { changelog: createdChangeLog },
    });
  }
);

const updateChangelog = catchAsyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { tenantId } = req;
    const { title, description, isVisible } = req.body;
    const { changelogId } = req.params;
    let fileUrl: string | undefined;
    const file = req.file;

    if (file) {
      fileUrl = await uploadToS3(file);
    }

    const updateData: any = {};
    if (fileUrl) updateData.coverImage = fileUrl;
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (isVisible) updateData.isVisible = isVisible;

    await neonDB
      .update(changelog)
      .set(updateData)
      .where(
        and(eq(changelog.tenantId, tenantId!), eq(changelog.id, changelogId))
      );

    res.status(200).json({
      status: "success",
      message: "Changelog updated successfully",
      data: {},
    });
  }
);

export { createChangelog, getChangelogData, updateChangelog };
