"use client";
import GoalCard from "./GoalCard";

export default function GoalCardWrapper({ goal }) {
  const handleSave = async (updatedGoal) => {
    await fetch(`/api/goals/${goal._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedGoal),
    });
    location.reload();
  };

  return <GoalCard goal={goal} onSave={handleSave} />;
}
