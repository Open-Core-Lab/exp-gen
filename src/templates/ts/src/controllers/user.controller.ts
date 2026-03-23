import * as userService from "../services/user.service.js";
import asyncHandler from "../utils/asyncHandler.js";
import type { Request, Response } from "express";

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const result = await userService.getUsers();
  res.status(result.status).json(result);
});

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const result = await userService.getUser(req.params.id as string);
  res.status(result.status).json(result);
});

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const result = await userService.createNewUser(req.body);
  res.status(result.status).json(result);
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const result = await userService.updateExistingUser(
    req.params.id as string,
    req.body
  );
  res.status(result.status).json(result);
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  const result = await userService.deleteExistingUser(req.params.id as string);
  res.status(result.status).json(result);
});
