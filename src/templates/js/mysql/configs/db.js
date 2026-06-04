import mysql from "mysql2/promise";
import config from "../configs/config.js";

let pool;

export const connectDB = async () => {
  try {
    pool = mysql.createPool({
      host: config.db.host,
      user: config.db.user,
      password: config.db.password,
      database: config.db.database,
      waitForConnections: true,
      connectionLimit: config.db.connectionLimit || 10,
      queueLimit: 0,
    });

    // Simple test query
    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query("SELECT 1 + 1 AS solution");
      console.log("The solution is:", rows[0].solution);
    } finally {
      connection.release();
    }

    console.log(`✅ MysqlDB Connected: ${config.db.host}`);
  } catch (error) {
    console.error("❌ MysqlDB connection error:", error.message);
    process.exit(1);
  }
};

export const getPool = () => {
  if (!pool) {
    throw new Error("Pool not initialized. Call connectDB() first.");
  }
  return pool;
};

export const query = async (sql, params = []) => {
  const p = getPool();
  try {
    const [rows, fields] = await p.query(sql, params);
    return rows;
  } catch (error) {
    console.error("❌ Query error:", error.message);
    throw error;
  }
};
