import { query } from "../configs/db.js";

export const ensureUsersTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      age INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `;
  try {
    await query(sql);
    console.log("✅ Users table ensured");
  } catch (error) {
    console.error("❌ Error ensuring users table:", error.message);
    throw error;
  }
};
