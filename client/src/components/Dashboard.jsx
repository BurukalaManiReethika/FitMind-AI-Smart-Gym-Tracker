import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { Flame, Trophy, Dumbbell, TrendingUp } from "lucide-react";

export default function Dashboard() {
  const [streak, setStreak] = useState(0);
  const [prs, setPrs] = useState([]);
  const [recentWorkouts, setRecentWorkouts] = useState([]);

  useEffect(() => {
    api.get("/workouts/streak").then(r => setStreak(r.data.streak));
    api.get("/exercises/prs").then(r => setPrs(r.data));
    api.get("/workouts").then(r => setRecentWorkouts(r.data.slice(0, 5)));
  }, []);

  const stats = [
    { label: "Day Streak", value: streak, icon: Flame, color: "text-orange-400" },
    { label: "Personal Records", value: prs.length, icon: Trophy, color: "text-yellow-400" },
    { label: "Total Workouts", value: recentWorkouts.length, icon: Dumbbell, color: "text-indigo-400" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-gray-900 rounded-xl p-5 border border-gray-800 flex items-center gap-4">
            <Icon className={`${color} w-8 h-8`} />
            <div>
              <div className="text-2xl font-bold text-white">{value}</div>
              <div className="text-sm text-gray-400">{label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
          <h2 className="font-semibold text-white mb-3 flex items-center gap-2">
            <TrendingUp size={18} className="text-indigo-400" /> Recent Workouts
          </h2>
          {recentWorkouts.length === 0
            ? <p className="text-gray-500 text-sm">No workouts yet. Go log one!</p>
            : <ul className="space-y-2">
                {recentWorkouts.map(w => (
                  <li key={w.id} className="flex justify-between text-sm">
                    <span className="text-gray-200">{w.name}</span>
                    <span className="text-gray-500">{w.date}</span>
                  </li>
                ))}
              </ul>}
        </div>
        <div className="bg-gray-900 rounded-xl p-5 border border-gray-800">
          <h2 className="font-semibold text-white mb-3 flex items-center gap-2">
            <Trophy size={18} className="text-yellow-400" /> Personal Records
          </h2>
          {prs.length === 0
            ? <p className="text-gray-500 text-sm">No PRs yet. Start lifting!</p>
            : <ul className="space-y-2">
                {prs.slice(0, 5).map(pr => (
                  <li key={pr.id} className="flex justify-between text-sm">
                    <span className="text-gray-200">{pr.exercise_name}</span>
                    <span className="text-yellow-400 font-bold">{pr.weight}{pr.unit}</span>
                  </li>
                ))}
              </ul>}
        </div>
      </div>
    </div>
  );
}
