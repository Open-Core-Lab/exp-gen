import mysql, { Pool } from "mysql2/promise";
import config from "./config";

let pool: Pool | null = null;

export const connectDB = async (): Promise<void> => {
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

    const connection = await pool.getConnection();
    try {
      const [rows] = await connection.query("SELECT 1 + 1 AS solution");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      console.log("The solution is:", (rows as any)[0].solution);
    } finally {
      connection.release();
    }

    console.log(`✅ MysqlDB Connected: ${config.db.host}`);
  } catch (error: any) {
    console.error("❌ MysqlDB connection error:", error.message);
    process.exit(1);
  }
};

export const getPool = (): Pool => {
  if (!pool) {
    throw new Error("Pool not initialized. Call connectDB() first.");
  }
  return pool;
};

export const query = async (sql: string, params: any[] = []): Promise<any> => {
  const p = getPool();
  try {
    const [rows] = await p.query(sql, params);
    return rows;
  } catch (error: any) {
    console.error("❌ Query error:", error.message);
    throw error;
  }
};
