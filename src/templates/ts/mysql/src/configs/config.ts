import dotenv from "dotenv";

dotenv.config();

export default {
  db: {
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "test",
    connectionLimit: Number(process.env.DB_CONNECTION_LIMIT) || 10,
  },
};
