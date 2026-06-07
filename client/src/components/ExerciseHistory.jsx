import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import ProgressChart from "./ProgressChart";

export default function ExerciseHistory() {
  const [exercises, setExercises] = useState([]);
  const [selected, setSelected] = useState("");
  const [progress, setProgress] = useState([]);

  useEffect(() => {
    api.get("/exercises/unique").then(r => { setExercises(r.data); if (r.data[0]) setSelected(r.data[0]); });
  }, []);

  useEffect(() => {
    if (selected) api.get(`/exercises/progress/${encodeURIComponent(selected)}`).then(r => setProgress(r.data));
  }, [selected]);

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 space-y-4">
      <h2 className="text-xl font-bold text-white">Progress Tracker</h2>
      <select className="bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm"
        value={selected} onChange={e => setSelected(e.target.value)}>
        {exercises.map(e => <option key={e} value={e}>{e}</option>)}
      </select>
      {progress.length > 0 ? <ProgressChart data={progress} exercise={selected} /> : (
        <p className="text-gray-500 text-sm">No data for this exercise yet.</p>
      )}
    </div>
  );
}
