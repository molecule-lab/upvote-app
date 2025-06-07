import { and, eq } from "drizzle-orm";
import { NextFunction, Response } from "express";
import { votes } from "src/db/data-schema";
import { neonDB } from "src/db/neon-db";
import { AuthRequest } from "src/types";
import { catchAsyncHandler } from "src/utils/catch-async-handler";

const addVote = catchAsyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { tenantId, user, body } = req;
    const { requestId } = body;

    await neonDB.insert(votes).values({
      requestId: requestId!,
      tenantId: tenantId!,
      votedBy: user?.id!,
    });

    res.status(200).json({
      status: "success",
      message: "Voted Successfully",
    });
  }
);

const deleteVote = catchAsyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { tenantId, user, body } = req;
    const { requestId } = body;

    await neonDB
      .delete(votes)
      .where(
        and(
          eq(votes.requestId, requestId),
          eq(votes.votedBy, user?.id!),
          eq(votes.tenantId, tenantId!)
        )
      );

    res.status(200).json({
      status: "success",
      message: "Vote removed successfully",
    });
  }
);

export { addVote, deleteVote };
