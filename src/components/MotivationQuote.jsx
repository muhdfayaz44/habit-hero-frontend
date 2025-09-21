import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MotivationQuote() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    axios
      .get("https://api.quotable.io/random?tags=motivational")
      .then((res) => {
        setQuote(res.data.content);
        setAuthor(res.data.author);
      })
      .catch((err) => {
        console.error("Error fetching quote:", err);
        setQuote("Stay consistent. Small steps every day lead to big results!");
        setAuthor("Habit Hero AI");
      });
  }, []);

  return (
    <div style={{
      background: "#f0f8ff",
      padding: "15px",
      borderRadius: "10px",
      marginBottom: "20px",
      textAlign: "center",
      boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
    }}>
      <h3 style={{ marginBottom: "10px", color: "#2c3e50" }}>🌟 Daily Motivation</h3>
      <p style={{ fontStyle: "italic", fontSize: "18px", margin: "0" }}>
        "{quote}"
      </p>
      <p style={{ marginTop: "5px", fontWeight: "bold", color: "#555" }}>
        — {author}
      </p>
    </div>
  );
}
