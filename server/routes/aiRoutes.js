import express from "express";
import { generateWorkoutPlan, analyzeProgress } from "../controllers/aiController.js";

const router = express.Router();
router.post("/plan", generateWorkoutPlan);
router.get("/analyze", analyzeProgress);

export default router;
