// src/config/db.js
import pkg from "pg";
import 'dotenv/config';


const { Pool } = pkg;

const pool = new Pool({
  user: String(process.env.DB_USER),
  host: String(process.env.DB_HOST),
  database: String(process.env.DB_NAME),
  password: String(process.env.DB_PASSWORD),
  port: Number(process.env.DB_PORT),
});

export const connectDB = async () => {
  try {
    const client = await pool.connect();
    //remove this in production
    console.log("🚀 Connected to PostgreSQL database");

    client.release();
  } catch (err) {
    //remove this in production
    console.error("DB connection error:", err);
    process.exit(1);
  }
};

export default pool;
