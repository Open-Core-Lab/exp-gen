import { Router } from "express";
import { login, signup } from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", login);
router.post("/signup", signup);

export default router;
