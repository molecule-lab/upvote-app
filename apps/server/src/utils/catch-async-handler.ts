import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "src/types";

type AsyncHandler = (
  req: Request | AuthRequest,
  res: Response,
  next: NextFunction
) => Promise<void>;

function catchAsyncHandler(fn: AsyncHandler) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
}

export { catchAsyncHandler };
