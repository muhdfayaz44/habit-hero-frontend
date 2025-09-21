import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/categories/")
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  const container = { marginBottom: "30px" };
  const card = {
    background: "#f8f9fa",
    padding: "15px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    marginBottom: "10px"
  };

  return (
    <div style={container}>
      <h2>📂 Categories</h2>
      {categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        categories.map(cat => (
          <div key={cat.id} style={card}>
            {cat.name}
          </div>
        ))
      )}
    </div>
  );
}
