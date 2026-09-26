import type { Request, Response, NextFunction } from "express";

export default function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) {
  return function (req: Request, res: Response, next: NextFunction) {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fn(req, res, next).catch(next);
  };
}
