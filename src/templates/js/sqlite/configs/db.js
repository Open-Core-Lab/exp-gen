import sqlite3 from "sqlite3";
import config from "../configs/config.js";

let db;

const openDatabase = () =>
  new Promise((resolve, reject) => {
    const database = new sqlite3.Database(
      config.db.filename,
      sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
      (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(database);
        }
      }
    );
  });

const run = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve({ lastID: this.lastID, changes: this.changes });
      }
    });
  });

const all = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });

export const connectDB = async () => {
  try {
    db = await openDatabase();
    const rows = await all("SELECT 1 + 1 AS solution");
    console.log("The solution is:", rows[0].solution);
    console.log(`✅ SQLite DB Connected: ${config.db.filename}`);
  } catch (error) {
    console.error("❌ SQLite DB connection error:", error.message);
    process.exit(1);
  }
};

export const getDB = () => {
  if (!db) {
    throw new Error("Database not initialized. Call connectDB() first.");
  }
  return db;
};

export const query = async (sql, params = []) => {
  try {
    const statement = sql.trim().split(" ")[0].toUpperCase();
    if (
      statement === "SELECT" ||
      statement === "PRAGMA" ||
      statement === "WITH"
    ) {
      return await all(sql, params);
    }
    return await run(sql, params);
  } catch (error) {
    console.error("❌ Query error:", error.message);
    throw error;
  }
};
