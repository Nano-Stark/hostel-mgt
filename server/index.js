import express from "express";
import userRoutes from "./routes/userRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import morgan from "morgan";
import cors from "cors"

import dotenv from "dotenv";
import connectDB from "./config/mongoDBConfig.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
dotenv.config();
connectDB();
const app = express();

app.use(morgan("dev"));
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/users", userRoutes);
app.use("/student", studentRoutes);
app.use("/attendance", attendanceRoutes);

app.get("/ping", (req, res) => {
  res.send("API is running....");
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
