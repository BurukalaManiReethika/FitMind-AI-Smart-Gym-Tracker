import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import workoutRoutes from "./routes/workoutRoutes.js";
import exerciseRoutes from "./routes/exerciseRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { initDB } from "./models/db.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());

initDB();

app.use("/api/workouts", workoutRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/ai", aiRoutes);
app.use(errorHandler);

app.listen(PORT, () => console.log(`FitMind server running on port ${PORT}`));
