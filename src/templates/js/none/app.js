import express from "express";
import createError from "http-errors";
import morgan from "morgan";
import dotenv from "dotenv";
import apiRoutes from "./routes/api.route.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.get("/", async (req, res) => {
  res.send({ message: "Awesome it works 🐻" });
});

app.use("/api", apiRoutes);

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
