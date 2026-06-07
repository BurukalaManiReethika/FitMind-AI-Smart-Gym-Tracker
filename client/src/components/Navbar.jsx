import { Link, useLocation } from "react-router-dom";
import { Dumbbell, LayoutDashboard, ClipboardList, Brain } from "lucide-react";

const links = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/workouts", label: "Log Workout", icon: Dumbbell },
  { to: "/history", label: "History", icon: ClipboardList },
  { to: "/coach", label: "AI Coach", icon: Brain },
];

export default function Navbar() {
  const { pathname } = useLocation();
  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🏋️</span>
          <span className="font-bold text-xl text-white">FitMind AI</span>
        </div>
        <div className="flex gap-1">
          {links.map(({ to, label, icon: Icon }) => (
            <Link key={to} to={to}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                ${pathname === to ? "bg-indigo-600 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800"}`}>
              <Icon size={16} />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
