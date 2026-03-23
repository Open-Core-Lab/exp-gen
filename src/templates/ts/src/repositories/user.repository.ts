import { User } from "../models/user.model.js";
import { CreateUserDTO, UpdateUserDTO } from "../dtos/user.dto";

export const getAllUsers = async () => {
  return await User.find({});
};

export const getUserById = async (id: string) => {
  return await User.findById(id);
};

export const createUser = async (data: CreateUserDTO) => {
  return await User.create(data);
};

export const updateUser = async (id: string, data: UpdateUserDTO) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};

export const deleteUser = async (id: string) => {
  return await User.findByIdAndDelete(id);
};
