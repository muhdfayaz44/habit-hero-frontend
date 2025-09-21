import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function HabitList() {
  const [habits, setHabits] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/habits/")
      .then(res => setHabits(res.data))
      .catch(err => console.error(err));
  }, []);

  // Inline styles
  const card = {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    marginBottom: "15px",
    cursor: "pointer",
  };

  const badge = (color) => ({
    display: "inline-block",
    padding: "3px 10px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: color,
    marginRight: "10px"
  });

  // Category colors
  const categoryColors = {
    Health: "#27ae60",
    Work: "#f39c12",
    Learning: "#8e44ad",
    default: "#34495e"
  };

  const frequencyColors = {
    daily: "#2980b9",
    weekly: "#d35400",
    default: "#7f8c8d"
  };

  return (
    <div style={{ marginBottom: "30px" }}>
      <h2>📋 Habits</h2>
      {habits.length === 0 ? (
        <p>No habits found.</p>
      ) : (
        habits.map(habit => (
          <div key={habit.id} style={card} onClick={() => navigate(`/analytics/${habit.id}`)}>
            <strong style={{ fontSize: "18px" }}>{habit.name}</strong>
            <p>{habit.description}</p>

            {/* Badges */}
            <div style={{ marginTop: "10px" }}>
              <span style={badge(categoryColors[habit.category] || categoryColors.default)}>
                {habit.category}
              </span>
              <span style={badge(frequencyColors[habit.frequency] || frequencyColors.default)}>
                {habit.frequency.charAt(0).toUpperCase() + habit.frequency.slice(1)}
              </span>
            </div>

            <small>Start Date: {habit.start_date}</small>
          </div>
        ))
      )}
    </div>
  );
}
