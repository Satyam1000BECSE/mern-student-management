import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import studentRoutes from "./routes/studentRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import authRoutes from "./routes/authRoutes.js";




dotenv.config();

const app = express();

// app.use(cors());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    process.env.CLIENT_URL
  ],
  credentials: true
}));
app.use(express.json());

if (!process.env.MONGO_URI) {
  console.log("MONGO_URI is missing");
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use("/api/students", studentRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
