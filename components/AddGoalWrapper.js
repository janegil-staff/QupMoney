"use client";
import AddGoalModal from "./AddGoalModal";

export default function AddGoalWrapper() {
  const handleCreate = async (newGoal) => {
    await fetch("/api/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newGoal),
    });
    location.reload();
  };

  return <AddGoalModal onCreate={handleCreate} />;
}
