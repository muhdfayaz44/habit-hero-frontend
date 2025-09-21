import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CheckInList() {
  const [checkIns, setCheckIns] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/checkins/")
      .then((res) => setCheckIns(res.data))
      .catch((err) => console.error("Error fetching check-ins:", err));
  }, []);

  // Inline styles
  const card = {
    background: "#f8f9fa",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    marginBottom: "30px"
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left"
  };

  const thTdStyle = {
    padding: "10px",
    borderBottom: "1px solid #ddd"
  };

  const statusStyle = (status) => ({
    color: status ? "#27ae60" : "#c0392b",
    fontWeight: "bold"
  });

  return (
    <div style={card}>
      <h2 style={{ marginBottom: "15px" }}>📖 Check-In History</h2>
      {checkIns.length === 0 ? (
        <p>No check-ins found.</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              {/* <th style={thTdStyle}>ID</th> */}
              <th style={thTdStyle}>Habit</th>
              <th style={thTdStyle}>Date</th>
              <th style={thTdStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {checkIns.map((c) => (
              <tr key={c.id}>
                {/* <td style={thTdStyle}>{c.id}</td> */}
                <td style={thTdStyle}>{c.habit_name}</td>
                <td style={thTdStyle}>{c.date}</td>
                <td style={{ ...thTdStyle, ...statusStyle(c.status) }}>
                  {c.status ? "✅ Done" : "❌ Missed"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
