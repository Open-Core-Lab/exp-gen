import { Router } from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware";
import { successResponse } from "../utils/response.js";
import type { Request, Response } from "express";

const userRoutes = Router();

userRoutes.get("/protected", protect, (req: Request, res: Response) => {
  res.json(successResponse({ user: req.user }, "Protected route accessed"));
});

userRoutes.get("/users", getUsers);
userRoutes.get("/users/:id", protect, getUser);
userRoutes.post("/users", createUser);
userRoutes.put("/users/:id", updateUser);
userRoutes.delete("/users/:id", deleteUser);

export default userRoutes;
