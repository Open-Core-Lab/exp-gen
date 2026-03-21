import { Router } from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { successResponse } from "../utils/response.js";

const router = Router();

router.get("/protected", protect, (req, res) => {
  res.json(successResponse({ user: req.user }, "Protected route accessed"));
});

router.get("/users", getUsers);
router.get("/users/:id", protect, getUser);
router.post("/users", createUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;
