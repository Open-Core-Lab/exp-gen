import pool from "../configs/db.js";

//table need to be created before using these functions
// CREATE TABLE users (
//   id SERIAL PRIMARY KEY,
//   name VARCHAR(100) NOT NULL,
//   email VARCHAR(100) UNIQUE NOT NULL,
//   password VARCHAR(255) NOT NULL,
//   age INTEGER DEFAULT 0
// );
export const getAllUsers = async () => {
  const result = await pool.query("SELECT * FROM users ORDER BY id");
  return result.rows;
};

export const getUserById = async (id) => {
  const result = await pool.query("SELECT * FROM users WHERE id=$1", [id]);
  return result.rows[0];
};

export const createUser = async ({ name, email, password, age }) => {
  const result = await pool.query(
    "INSERT INTO users(name, email, password, age) VALUES($1, $2, $3, $4) RETURNING *",
    [name, email, password, age]
  );
  return result.rows[0];
};

export const updateUser = async (id, { name, email }) => {
  const result = await pool.query(
    "UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *",
    [name, email, id]
  );
  return result.rows[0];
};

export const deleteUser = async (id) => {
  await pool.query("DELETE FROM users WHERE id=$1", [id]);
};

export const findByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email=$1", [
    email,
  ]);
  return result.rows[0];
};
