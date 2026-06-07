import Anthropic from "@anthropic-ai/sdk";
import { db } from "../models/db.js";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export const generateWorkoutPlan = async (req, res) => {
  const { goal, level, daysPerWeek, equipment } = req.body;

  const recentWorkouts = db.prepare(`
    SELECT w.name, w.date, GROUP_CONCAT(e.name) as exercises
    FROM workouts w
    LEFT JOIN exercises e ON w.id = e.workout_id
    GROUP BY w.id ORDER BY w.date DESC LIMIT 5
  `).all();

  const prs = db.prepare("SELECT * FROM personal_records").all();

  const prompt = `You are an expert personal trainer. Generate a detailed ${daysPerWeek}-day workout plan.

User Profile:
- Goal: ${goal}
- Experience Level: ${level}
- Equipment: ${equipment}

Recent Workout History:
${recentWorkouts.map(w => `- ${w.date}: ${w.name} (${w.exercises || "no exercises"})`).join("\n")}

Personal Records:
${prs.map(pr => `- ${pr.exercise_name}: ${pr.weight}${pr.unit}`).join("\n") || "None yet"}

Create a structured weekly plan with:
1. Day-by-day breakdown
2. Specific exercises with sets, reps, and suggested weights based on their PRs
3. Rest day recommendations
4. Progressive overload tips
5. Warm-up and cool-down routines

Format clearly with sections for each day.`;

  const message = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1500,
    messages: [{ role: "user", content: prompt }],
  });

  res.json({ plan: message.content[0].text });
};

export const analyzeProgress = async (req, res) => {
  const workouts = db.prepare(`
    SELECT w.name, w.date, w.notes,
      json_group_array(json_object('name', e.name, 'sets', e.sets, 'reps', e.reps, 'weight', e.weight)) as exercises
    FROM workouts w
    LEFT JOIN exercises e ON w.id = e.workout_id
    GROUP BY w.id ORDER BY w.date DESC LIMIT 10
  `).all();

  const prs = db.prepare("SELECT * FROM personal_records").all();

  const prompt = `You are a fitness coach. Analyze this user's gym data and provide actionable insights.

Last 10 Workouts:
${JSON.stringify(workouts, null, 2)}

Personal Records:
${JSON.stringify(prs, null, 2)}

Provide:
1. Progress summary (what's improving)
2. Weaknesses or imbalances detected
3. Top 3 specific recommendations
4. Motivational insight based on their consistency

Keep it concise, data-driven, and encouraging.`;

  const message = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1000,
    messages: [{ role: "user", content: prompt }],
  });

  res.json({ analysis: message.content[0].text });
};
