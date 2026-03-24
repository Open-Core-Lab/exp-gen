import express from "express";
import morgan from "morgan";
import createError from "http-errors";
import cors from "cors";
import dotenv from "dotenv";
import apiRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./configs/db.js";

dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Routes
app.get("/", (req, res) => res.json({ message: "API is running 🚀" }));
app.use("/api", apiRoutes); // user routes
app.use("/api/auth", authRoutes); // login route

// 404 handler
app.use((req, res, next) => {
  next(createError.NotFound());
});

// Global error handler
app.use((err, req, res) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running @ http://localhost:${PORT}`)
);
