import { db } from "../models/db.js";

export const getPersonalRecords = (req, res) => {
  const prs = db.prepare("SELECT * FROM personal_records ORDER BY exercise_name ASC").all();
  res.json(prs);
};

export const getExerciseProgress = (req, res) => {
  const { name } = req.params;
  const data = db.prepare(`
    SELECT e.weight, e.unit, w.date
    FROM exercises e
    JOIN workouts w ON e.workout_id = w.id
    WHERE LOWER(e.name) = LOWER(?)
    ORDER BY w.date ASC
  `).all(name);
  res.json(data);
};

export const getUniqueExercises = (req, res) => {
  const exercises = db.prepare("SELECT DISTINCT name FROM exercises ORDER BY name ASC").all();
  res.json(exercises.map(e => e.name));
};
