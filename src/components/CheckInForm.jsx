import React, { useState, useEffect } from "react";
import axios from "axios";

function CheckInForm() {
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
    .then((res) => {
      alert("Check-in added successfully!");
      setHabit("");
      setDate("");
      setStatus(true);
    })
    .catch((err) => console.error("Error adding check-in:", err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Log a Check-In</h2>

      <select value={habit} onChange={(e) => setHabit(e.target.value)} required>
        <option value="">-- Select Habit --</option>
        {habits.map((h) => (
          <option key={h.id} value={h.id}>
            {h.name}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />

      <select value={status} onChange={(e) => setStatus(e.target.value === "true")}>
        <option value="true">Done ✅</option>
        <option value="false">Missed ❌</option>
      </select>

      <button type="submit">Add Check-In</button>
    </form>
  );
}

export default CheckInForm;
