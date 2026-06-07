import { useState } from "react";
import api from "../api/axiosInstance";
import { Plus, Trash2, Save } from "lucide-react";

const emptyExercise = () => ({ name: "", sets: "", reps: "", weight: "", unit: "kg" });

export default function WorkoutLogger({ onSaved }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [notes, setNotes] = useState("");
  const [exercises, setExercises] = useState([emptyExercise()]);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const update = (i, field, val) => {
    const updated = [...exercises];
    updated[i] = { ...updated[i], [field]: val };
    setExercises(updated);
  };

  const save = async () => {
    if (!name || !date) return alert("Workout name and date required");
    setSaving(true);
    try {
      await api.post("/workouts", {
        name, date, notes,
        exercises: exercises.filter(e => e.name && e.sets && e.reps && e.weight),
      });
      setSuccess(true);
      setName(""); setNotes(""); setExercises([emptyExercise()]);
      onSaved?.();
      setTimeout(() => setSuccess(false), 3000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 space-y-5">
      <h2 className="text-xl font-bold text-white">Log Workout</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input className="input" placeholder="Workout name (e.g. Push Day)" value={name} onChange={e => setName(e.target.value)} />
        <input className="input" type="date" value={date} onChange={e => setDate(e.target.value)} />
      </div>
      <textarea className="input w-full" placeholder="Notes (optional)" rows={2} value={notes} onChange={e => setNotes(e.target.value)} />

      <div className="space-y-3">
        <div className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Exercises</div>
        {exercises.map((ex, i) => (
          <div key={i} className="grid grid-cols-6 gap-2 items-center">
            <input className="input col-span-2" placeholder="Exercise name" value={ex.name} onChange={e => update(i, "name", e.target.value)} />
            <input className="input" type="number" placeholder="Sets" value={ex.sets} onChange={e => update(i, "sets", e.target.value)} />
            <input className="input" type="number" placeholder="Reps" value={ex.reps} onChange={e => update(i, "reps", e.target.value)} />
            <input className="input" type="number" placeholder="Weight" value={ex.weight} onChange={e => update(i, "weight", e.target.value)} />
            <button onClick={() => setExercises(exercises.filter((_, j) => j !== i))} className="text-gray-600 hover:text-red-400 transition-colors">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        <button onClick={() => setExercises([...exercises, emptyExercise()])}
          className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm font-medium transition-colors">
          <Plus size={16} /> Add Exercise
        </button>
      </div>

      <button onClick={save} disabled={saving}
        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white px-5 py-2.5 rounded-lg font-medium transition-colors">
        <Save size={16} /> {saving ? "Saving..." : "Save Workout"}
      </button>

      {success && <p className="text-green-400 text-sm font-medium">✅ Workout saved!</p>}

      <style>{`.input { background: #111827; border: 1px solid #374151; border-radius: 8px; padding: 8px 12px; color: white; width: 100%; outline: none; font-size: 14px; } .input:focus { border-color: #6366f1; } .input::placeholder { color: #6b7280; }`}</style>
    </div>
  );
}
