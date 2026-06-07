import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import ExerciseHistory from "../components/ExerciseHistory";
import { Trash2 } from "lucide-react";

export default function History() {
  const [workouts, setWorkouts] = useState([]);

  const load = () => api.get("/workouts").then(r => setWorkouts(r.data));
  useEffect(() => { load(); }, []);

  const del = async (id) => {
    if (confirm("Delete this workout?")) { await api.delete(`/workouts/${id}`); load(); }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Workout History</h1>
      <ExerciseHistory />
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">All Workouts</h2>
        {workouts.length === 0
          ? <p className="text-gray-500">No workouts logged yet.</p>
          : <div className="space-y-2">
              {workouts.map(w => (
                <div key={w.id} className="flex items-center justify-between bg-gray-950 rounded-lg px-4 py-3 border border-gray-800">
                  <div>
                    <span className="font-medium text-white">{w.name}</span>
                    <span className="text-gray-500 text-sm ml-3">{w.date}</span>
                    <span className="text-gray-600 text-xs ml-3">{w.exercise_count} exercises</span>
                  </div>
                  <button onClick={() => del(w.id)} className="text-gray-600 hover:text-red-400 transition-colors">
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>}
      </div>
    </div>
  );
}
