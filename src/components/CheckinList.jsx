import React, { useState, useEffect } from "react";
import axios from "axios";

function CheckInList() {
  const [checkIns, setCheckIns] = useState([]);

  useEffect(() => {
  axios.get("http://127.0.0.1:8000/api/checkins/")
    .then((res) => {
      console.log("Fetched check-ins:", res.data);
      setCheckIns(res.data);
    })
    .catch((err) => console.error("Error fetching check-ins:", err));
  }, []);


  return (
    <div>
      <h2>Check-In History</h2>
      <table border="1" cellPadding="5" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Habit</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {checkIns.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.habit_name}</td>
              <td>{c.date}</td>
              <td>{c.status ? "✅ Done" : "❌ Missed"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CheckInList;
