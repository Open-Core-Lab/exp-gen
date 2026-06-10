import { query } from "../configs/db.js";

export const getAllUsers = async () => {
  const rows = await query(
    "SELECT id, name, email, age, created_at, updated_at FROM users"
  );
  return rows;
};

export const getUserById = async (id) => {
  const rows = await query(
    "SELECT id, name, email, age, created_at, updated_at FROM users WHERE id = ?",
    [id]
  );
  return rows[0] || null;
};

export const getUserByEmail = async (email) => {
  const rows = await query(
    "SELECT id, name, email, password, age, created_at, updated_at FROM users WHERE email = ?",
    [email]
  );
  return rows[0] || null;
};

export const createUser = async (data) => {
  const { name, email, password, age = 0 } = data;
  const insertResult = await query(
    "INSERT INTO users (name, email, password, age, created_at, updated_at) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)",
    [name, email, password, age]
  );

  if (!insertResult || typeof insertResult.lastID !== "number") {
    throw new Error("Failed to create user - no insert ID returned");
  }

  return await getUserById(insertResult.lastID);
};

export const updateUser = async (id, data) => {
  const fields = [];
  const params = [];

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
  const updateResult = await query(
    `UPDATE users SET ${fields.join(", ")}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
    params
  );

  if (!updateResult || updateResult.changes === 0) {
    return null;
  }

  return await getUserById(id);
};

export const deleteUser = async (id) => {
  const user = await getUserById(id);
  if (!user) return null;

  await query("DELETE FROM users WHERE id = ?", [id]);
  return user;
};
