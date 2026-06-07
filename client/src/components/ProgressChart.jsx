import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function ProgressChart({ data, exercise }) {
  const formatted = data.map(d => ({ date: d.date, weight: Number(d.weight) }));
  return (
    <div>
      <p className="text-sm text-gray-400 mb-3">{exercise} — weight over time</p>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={formatted}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
          <XAxis dataKey="date" stroke="#6b7280" tick={{ fontSize: 12 }} />
          <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
          <Tooltip contentStyle={{ background: "#111827", border: "1px solid #374151", borderRadius: 8 }} />
          <Line type="monotone" dataKey="weight" stroke="#6366f1" strokeWidth={2} dot={{ fill: "#6366f1", r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
