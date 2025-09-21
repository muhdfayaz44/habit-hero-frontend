import React, { useState, useEffect } from "react";
import axios from "axios";

export default function HabitForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [frequency, setFrequency] = useState("");
  const [startDate, setStartDate] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  // Fetch categories on mount
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/categories/")
      .then(res => setCategories(res.data))
      .catch(err => console.error("Error fetching categories:", err));
  }, []);

  // Add habit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category) {
      alert("Please select a category!");
      return;
    }
    axios.post("http://127.0.0.1:8000/api/habits/", {
      name,
      description,
      category,
      frequency,
      start_date: startDate,
    })
    .then(res => {
      alert("Habit created successfully!");
      setName("");
      setDescription("");
      setFrequency("");
      setStartDate("");
      setCategory("");
    })
    .catch(err => {
      console.error(err);
      if (err.response) alert("Failed: " + JSON.stringify(err.response.data));
      else alert("Failed: " + err.message);
    });
  };

  // Styles
  const formCard = { background: "#f8f9fa", padding: "25px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", marginBottom: "30px" };
  const inputStyle = { width: "100%", padding: "10px", marginBottom: "15px", borderRadius: "6px", border: "1px solid #ccc", fontSize: "16px" };
  const buttonStyle = { padding: "10px 20px", borderRadius: "6px", border: "none", backgroundColor: "#3498db", color: "#fff", fontWeight: "bold", cursor: "pointer" };
  const labelStyle = { marginBottom: "5px", display: "block", fontWeight: "bold" };

  return (
    <form onSubmit={handleSubmit} style={formCard}>
      <h2 style={{ marginBottom: "20px" }}>➕ Add Habit</h2>

      <label style={labelStyle}>Habit Name</label>
      <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Habit Name" style={inputStyle} required />

      <label style={labelStyle}>Description</label>
      <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" style={inputStyle} />

      <label style={labelStyle}>Category</label>
      <select value={category} onChange={e => setCategory(e.target.value)} style={inputStyle} required>
        <option value="">-- Select Category --</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>

      <label style={labelStyle}>Frequency</label>
      <select value={frequency} onChange={e => setFrequency(e.target.value)} style={inputStyle} required>
        <option value="">-- Select Frequency --</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
      </select>

      <label style={labelStyle}>Start Date</label>
      <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} style={inputStyle} required />

      <button type="submit" style={buttonStyle}>Add Habit</button>
    </form>
  );
}
