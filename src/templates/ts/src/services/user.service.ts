import * as userRepo from "../repositories/user.repository";
import { successResponse, errorResponse } from "../utils/response";
import type { HttpError } from "http-errors";
import { CreateUserDTO, UpdateUserDTO } from "../dtos/user.dto";

export const getUsers = async () => {
  try {
    const users = await userRepo.getAllUsers();
    return successResponse(users, "Users fetched successfully");
  } catch (err) {
    return errorResponse(err as HttpError, "Failed to fetch users");
  }
};

export const getUser = async (id: string) => {
  try {
    const user = await userRepo.getUserById(id);
    if (!user) throw new Error("User not found");
    return successResponse(user, "User fetched successfully");
  } catch (err) {
    return errorResponse(err as HttpError, "Failed to fetch user");
  }
};

export const createNewUser = async (data: CreateUserDTO) => {
  try {
    const user = await userRepo.createUser(data);
    return successResponse(user, "User created successfully");
  } catch (err) {
    return errorResponse(err as HttpError, "Failed to create user");
  }
};

export const updateExistingUser = async (id: string, data: UpdateUserDTO) => {
  try {
    const user = await userRepo.updateUser(id, data);
    if (!user) throw new Error("User not found");
    return successResponse(user, "User updated successfully");
  } catch (err) {
    return errorResponse(err as HttpError, "Failed to update user");
  }
};

export const deleteExistingUser = async (id: string) => {
  try {
    const user = await userRepo.deleteUser(id);
    if (!user) throw new Error("User not found");
    return successResponse(user, "User deleted successfully");
  } catch (err) {
    return errorResponse(err as HttpError, "Failed to delete user");
  }
};
