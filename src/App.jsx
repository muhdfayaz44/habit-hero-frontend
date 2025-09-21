import React from "react";
import CategoryList from "./components/CategoryList";
import HabitForm from "./components/HabitForm";
import HabitList from "./components/HabitList";
import CheckInForm from "./components/CheckInForm";
import CheckinList from "./components/CheckinList";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Habit Hero</h1>

      <CategoryList />
      <HabitForm />
      <HabitList />
      <CheckInForm />
      <CheckinList />
    </div>
  );
}

export default App;
