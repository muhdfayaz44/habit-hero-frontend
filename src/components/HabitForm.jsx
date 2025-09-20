import React, { useState, useEffect } from "react";
import axios from "axios";

function HabitForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [frequency, setFrequency] = useState("");
  const [startDate, setStartDate] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  // Fetch categories when component loads
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/categories/")
      .then((res) => {
        console.log('Categories fetched:', res.data);
        setCategories(res.data);
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting habit:', { name, description, category });

    axios.post("http://127.0.0.1:8000/api/habits/", {
      name,
      description,
      category,
      frequency,
      start_date: startDate,
    })
      .then((res) => {
        console.log('Habit created:', res.data);
        setName("");
        setDescription("");
        setCategory("");
        alert("Habit created!");
      })
      .catch((err) => {
  if (err.response) {
    console.error("Error creating habit:", err.response.data);
    alert("Failed to create habit: " + JSON.stringify(err.response.data));
  } else {
    console.error("Error creating habit:", err.message);
    alert("Failed to create habit: " + err.message);
  }
});
  };

  return (
    <form onSubmit={handleSubmit}>
  <h2>Add Habit</h2>

  <div style={{ marginBottom: '1rem' }}>
    <input
      type="text"
      placeholder="Habit Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      required
    />
  </div>

  <div style={{ marginBottom: '1rem' }}>
    <textarea
      placeholder="Description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
    />
  </div>

  <div style={{ marginBottom: '1rem' }}>
    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      required
    >
      <option value="">-- Select Category --</option>
      {categories.map((cat) => (
        <option key={cat.id} value={cat.id}>
          {cat.name}
        </option>
      ))}
    </select>
  </div>

  <div style={{ marginBottom: '1rem' }}>
    <input
      type="text"
      placeholder="Frequency"
      value={frequency}
      onChange={(e) => setFrequency(e.target.value)}
      required
    />
  </div>

  <div style={{ marginBottom: '1rem' }}>
    <input
      type="date"
      placeholder="Start Date"
      value={startDate}
      onChange={(e) => setStartDate(e.target.value)}
      required
    />
  </div>

  <button type="submit">Add Habit</button>
</form>

  );
}

export default HabitForm;
