import { Router } from "express";
import type { Request, Response } from "express";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  res.send({ message: "Ok api is working 🚀" });
});

export default router;
