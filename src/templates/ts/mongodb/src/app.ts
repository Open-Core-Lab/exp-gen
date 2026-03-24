import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import createError from "http-errors";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./configs/db";
import userRoutes from "./routes/user.route";
import authRoutes from "./routes/auth.route";

dotenv.config({ quiet: true });
const PORT = process.env.PORT || 3000;

connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Routes
app.get("/", (_: Request, res: Response) =>
  res.json({ message: "API is running 🚀" })
);
app.use("/api", userRoutes); // user routes
app.use("/api/auth", authRoutes); // login route

// 404 handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError.NotFound());
});

// Global error handler
app.use((err: any, req: Request, res: Response) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running @ http://localhost:${PORT}`);
});
