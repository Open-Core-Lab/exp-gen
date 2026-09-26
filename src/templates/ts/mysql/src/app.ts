import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import createError from "http-errors";
import cors from "cors";
import dotenv from "dotenv";
import apiRoutes from "./routes/user.route";
import authRoutes from "./routes/auth.route";
import { connectDB } from "./configs/db";
import { ensureUsersTable } from "./models/user.model";

dotenv.config();

await connectDB();
await ensureUsersTable();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Routes
app.get("/", (_req: Request, res: Response) =>
  res.json({ message: "API is running 🚀" })
);
app.use("/api", apiRoutes);
app.use("/api/auth", authRoutes);

// 404 handler
app.use((_req: Request, _res: Response, next: NextFunction) => {
  next(createError.NotFound());
});

// Global error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running @ http://localhost:${PORT}`)
);
