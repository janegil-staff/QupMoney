"use client";
import EditGoalModal from "./EditGoalModal";

export default function EditGoalWrapper({ goal }) {
  const handleSave = async (updatedGoal) => {
    await fetch(`/api/goals/${goal._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedGoal),
    });
    location.reload();
  };

  return <EditGoalModal goal={goal} onSave={handleSave} />;
}
