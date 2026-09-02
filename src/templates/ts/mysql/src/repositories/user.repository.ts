import { query } from "../configs/db";
import type { User } from "../types";

export const getAllUsers = async (): Promise<User[]> => {
  const rows = await query(
    "SELECT id, name, email, age, created_at, updated_at FROM users"
  );
  return rows as User[];
};

export const getUserById = async (id: number): Promise<User | null> => {
  const rows = await query(
    "SELECT id, name, email, age, created_at, updated_at FROM users WHERE id = ?",
    [id]
  );
  return (rows[0] as User) || null;
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const rows = await query(
    "SELECT id, name, email, password, age, created_at, updated_at FROM users WHERE email = ?",
    [email]
  );
  return (rows[0] as User) || null;
};

export const createUser = async (data: Partial<User>): Promise<User> => {
  const { name, email, password, age = 0 } = data as User;
  const insertResult: any = await query(
    "INSERT INTO users (name, email, password, age, created_at, updated_at) VALUES (?, ?, ?, ?, NOW(), NOW())",
    [name, email, password, age]
  );

  if (!insertResult || !insertResult.insertId) {
    throw new Error("Failed to create user - no insert ID returned");
  }

  return await getUserById(insertResult.insertId) as User;
};

export const updateUser = async (id: number, data: Partial<User>): Promise<User | null> => {
  const fields: string[] = [];
  const params: any[] = [];

  if (data.name !== undefined) {
    fields.push("name = ?");
    params.push(data.name);
  }
  if (data.email !== undefined) {
    fields.push("email = ?");
    params.push(data.email);
  }
  if (data.password !== undefined) {
    fields.push("password = ?");
    params.push(data.password);
  }
  if (data.age !== undefined) {
    fields.push("age = ?");
    params.push(data.age);
  }

  if (fields.length === 0) {
    return await getUserById(id);
  }

  params.push(id);
  const updateResult: any = await query(
    `UPDATE users SET ${fields.join(", ")}, updated_at = NOW() WHERE id = ?`,
    params
  );

  if (!updateResult || updateResult.affectedRows === 0) {
    return null;
  }

  return await getUserById(id);
};

export const deleteUser = async (id: number): Promise<User | null> => {
  const user = await getUserById(id);
  if (!user) return null;

  await query("DELETE FROM users WHERE id = ?", [id]);
  return user;
};
