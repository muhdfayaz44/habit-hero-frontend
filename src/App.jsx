import React from "react";
import CategoryList from "./components/CategoryList";
import HabitList from "./components/HabitList";
import HabitForm from "./components/HabitForm";

function App() {
  return (
    <div>
      <h1>Habit Hero</h1>
      <CategoryList />
      <HabitForm />
      <HabitList />
    </div>
  );
}

export default App;
