import asyncHandler from "../utils/asyncHandler";
import * as userService from "../services/user.service";
import { successResponse, errorResponse } from "../utils/response";
import type { Request, Response } from "express";

export const getUsers = asyncHandler(async (_req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.json(successResponse(users));
  } catch (error) {
    res.status(500).json(errorResponse(error, "Failed to fetch users"));
  }
});

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const user = await userService.getUserById(id);
    if (!user) return res.status(404).json(errorResponse({ status: 404 }, "User not found"));
    res.json(successResponse(user));
  } catch (error) {
    res.status(500).json(errorResponse(error, "Failed to fetch user"));
  }
});

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const user = await userService.createUser(data);
    res.status(201).json(successResponse(user, "User created"));
  } catch (error) {
    res.status(500).json(errorResponse(error, "Failed to create user"));
  }
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = req.body;
    const updated = await userService.updateUser(id, data);
    if (!updated) return res.status(404).json(errorResponse({ status: 404 }, "User not found"));
    res.json(successResponse(updated, "User updated"));
  } catch (error) {
    res.status(500).json(errorResponse(error, "Failed to update user"));
  }
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const deleted = await userService.deleteUser(id);
    if (!deleted) return res.status(404).json(errorResponse({ status: 404 }, "User not found"));
    res.json(successResponse(deleted, "User deleted"));
  } catch (error) {
    res.status(500).json(errorResponse(error, "Failed to delete user"));
  }
});
