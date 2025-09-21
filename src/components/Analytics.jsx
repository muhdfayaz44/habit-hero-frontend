import { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";

const COLORS = ["#4CAF50", "#F44336"]; 
const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function Analytics({ habitId }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log("Habit ID from route:", habitId);
    axios
      .get(`http://127.0.0.1:8000/api/habits/${habitId}/analytics/`)
      .then(res => {
        console.log("Analytics data:", res.data);
        setData(res.data);
      })
      .catch(err => console.error("Error fetching analytics:", err));
  }, [habitId]);

  if (!data) return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading analytics...</p>;

 const completed = data.completed_checkins ?? 0;
const missed = data.missed_checkins ?? 0;

const pieData = [
  { name: "Completed", value: completed },
  { name: "Missed", value: missed },
];


  // Bar chart data 
  const barData = daysOfWeek.map((day, idx) => ({
    day,
    checkins: data.weekly_distribution ? data.weekly_distribution[idx] : 0
  }));

  // Inline styles
  const containerStyle = { padding: "30px", fontFamily: "Arial, sans-serif", color: "#333" };
  const headerStyle = { textAlign: "center", marginBottom: "25px", color: "#2c3e50" };
  const statsContainer = { display: "flex", justifyContent: "space-around", marginBottom: "30px", gap: "20px", flexWrap: "wrap" };
  const statCard = { background: "#f8f9fa", padding: "20px", borderRadius: "10px", textAlign: "center", flex: "1", minWidth: "150px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" };
  const statValue = { fontSize: "22px", fontWeight: "bold", marginTop: "10px", color: "#2c3e50" };
  const chartCard = { background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", margin: "20px", flex: "1", minWidth: "300px" };
  const chartTitle = { textAlign: "center", marginBottom: "10px", fontWeight: "bold" };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <h2 style={headerStyle}>📊 Analytics for <span style={{ color: "#2980b9" }}>{data?.habit ?? "N/A"}</span></h2>

      {/* Stats Cards */}
      <div style={statsContainer}>
        <div style={statCard}>
          <h3>✅ Success Rate</h3>
          <p style={statValue}>{data?.success_rate ?? 0}%</p>
        </div>
        <div style={statCard}>
          <h3>🔥 Current Streak</h3>
          <p style={statValue}>
            {data?.streak ?? 0} {(data?.streak ?? 0) === 1 ? "day" : "days"}
          </p>
        </div>
        <div style={statCard}>
          <h3>📅 Best Day</h3>
          <p style={statValue}>
            {data?.best_day !== null && data?.best_day !== undefined ? daysOfWeek[data.best_day] : "N/A"}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around" }}>
        {/* Pie Chart */}
        <div style={chartCard}>
          <h3 style={chartTitle}>Completion Rate</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div style={chartCard}>
          <h3 style={chartTitle}>CheckIns</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="checkins" fill="#3498db" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
