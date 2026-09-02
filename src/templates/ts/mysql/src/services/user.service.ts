import * as userRepo from "../repositories/user.repository";
import type { User } from "../types";

export const getAllUsers = async (): Promise<User[]> => {
  return await userRepo.getAllUsers();
};

export const getUserById = async (id: number): Promise<User | null> => {
  return await userRepo.getUserById(id);
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  return await userRepo.getUserByEmail(email);
};

export const createUser = async (data: Partial<User>): Promise<User> => {
  return await userRepo.createUser(data);
};

export const updateUser = async (id: number, data: Partial<User>): Promise<User | null> => {
  return await userRepo.updateUser(id, data);
};

export const deleteUser = async (id: number): Promise<User | null> => {
  return await userRepo.deleteUser(id);
};
