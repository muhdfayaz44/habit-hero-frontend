import React, { useState, useEffect } from "react";
import axios from "axios";

function HabitList() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/habits/")
      .then(res => {
        setHabits(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Failed to fetch habits");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading habits...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Habit List</h2>
      {habits.length === 0 ? (
        <p>No habits found.</p>
      ) : (
        <ul>
          {habits.map(habit => (
            <li key={habit.id}>
              <strong>{habit.name}</strong> - {habit.description} <br />
              Category: {habit.category} | Frequency: {habit.frequency} | Start Date: {habit.start_date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HabitList;
