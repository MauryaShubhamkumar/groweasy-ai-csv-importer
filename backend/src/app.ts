import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import importRoutes from "./routes/import.routes.js";
import { errorHandler } from "./utils/errorHandler.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
  })
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "GrowEasy AI CSV Importer API is running",
  });
});

app.use("/api/import", importRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
