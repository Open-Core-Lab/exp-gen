import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const prisma = new PrismaClient();

export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("🚀 Connected to PostgreSQL database");
  } catch (err) {
    console.error("DB connection error:", err);
    process.exit(1);
  }
};

export default prisma;
