import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  res.send({ message: "Ok api is working 🚀" });
});

export default router;
