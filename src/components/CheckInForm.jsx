import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CheckInForm() {
  const [habits, setHabits] = useState([]);
  const [habit, setHabit] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState(true);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/habits/")
      .then((res) => setHabits(res.data))
      .catch((err) => console.error("Error fetching habits:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://127.0.0.1:8000/api/checkins/", {
      habit: habit,
      date: date,
      status: status,
    })
    .then(() => {
      alert("Check-in added successfully!");
      setHabit("");
      setDate("");
      setStatus(true);
    })
    .catch((err) => {
      if (err.response) alert("Failed: " + JSON.stringify(err.response.data));
      else alert("Failed: " + err.message);
    });
  };

  // Inline styles
  const formCard = {
    background: "#f8f9fa",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    marginBottom: "30px"
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
    boxSizing: "border-box"
  };

  const buttonStyle = {
    padding: "10px 20px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#27ae60",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer"
  };

  const labelStyle = { marginBottom: "5px", display: "block", fontWeight: "bold" };

  return (
    <form onSubmit={handleSubmit} style={formCard}>
      <h2 style={{ marginBottom: "20px" }}>📌 Log a Check-In</h2>

      <label style={labelStyle}>Habit</label>
      <select
        value={habit}
        onChange={(e) => setHabit(e.target.value)}
        style={inputStyle}
        required
      >
        <option value="">-- Select Habit --</option>
        {habits.map((h) => (
          <option key={h.id} value={h.id}>{h.name}</option>
        ))}
      </select>

      <label style={labelStyle}>Date</label>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={inputStyle}
        required
      />

      <label style={labelStyle}>Status</label>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value === "true")}
        style={inputStyle}
      >
        <option value="true">Done ✅</option>
        <option value="false">Missed ❌</option>
      </select>

      <button type="submit" style={buttonStyle}>Add Check-In</button>
    </form>
  );
}
