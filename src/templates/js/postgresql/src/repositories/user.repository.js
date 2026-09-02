import prisma from "../configs/db.js";

export const getAllUsers = async () => {
  return prisma.user.findMany({ orderBy: { id: "asc" } });
};

export const getUserById = async (id) => {
  return prisma.user.findUnique({ where: { id: Number(id) } });
};

export const createUser = async ({ name, email, password, age }) => {
  return prisma.user.create({ data: { name, email, password, age } });
};

export const updateUser = async (id, { name, email }) => {
  return prisma.user.update({
    where: { id: Number(id) },
    data: { name, email },
  });
};

export const deleteUser = async (id) => {
  return prisma.user.delete({ where: { id: Number(id) } });
};

export const findByEmail = async (email) => {
  return prisma.user.findUnique({ where: { email } });
};
