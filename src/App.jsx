import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CategoryList from "./components/CategoryList";
import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";
import CheckInForm from "./components/CheckInForm";
import CheckinList from "./components/CheckinList";
import Analytics from "./components/Analytics";
import MotivationQuote from "./components/MotivationQuote";


export default function App() {
  const containerStyle = {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "30px",
    fontFamily: "Arial, sans-serif",
    color: "#333",
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "30px",
    color: "#2c3e50",
  };

  return (
    <Router>
      <div style={containerStyle}>
        <h1 style={headerStyle}>🎯 Habit Hero</h1>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <CategoryList />
                <MotivationQuote />
                <HabitForm />
                <HabitList />
                <CheckInForm />
                <CheckinList />
              </>
            }
          />
          <Route path="/analytics/:habitId" element={<AnalyticsWrapper />} />
        </Routes>
      </div>
    </Router>
  );
}

// Wrapper to extract habitId from URL and pass to Analytics
import { useParams } from "react-router-dom";
function AnalyticsWrapper() {
  const { habitId } = useParams();
  return <Analytics habitId={habitId} />;
}
