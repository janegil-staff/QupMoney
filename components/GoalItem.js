"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import EditGoalModal from "./EditGoalModal";

export default function GoalItem({ goal }) {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [title, setTitle] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");
  const [month, setMonth] = useState("");

  const current = parseFloat(goal.currentAmount) || 0;
  const target = parseFloat(goal.targetAmount) || 1;
  const progress = Math.min((current / target) * 100, 100);

  const barColor =
    progress >= 100
      ? "bg-green-600"
      : progress >= 75
      ? "bg-yellow-500"
      : progress >= 50
      ? "bg-blue-500"
      : "bg-red-500";

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Er du sikker på at du vil slette dette sparemålet?"
    );
    if (!confirmed) return;

    setDeleting(true);

    try {
      const res = await fetch(`/api/goals/${goal._id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const error = await res.json();
        alert("Feil ved sletting: " + error.error);
        setDeleting(false);
        return;
      }

      router.refresh();
    } catch (err) {
      console.error("Sletting feilet:", err);
      alert("Uventet feil ved sletting.");
      setDeleting(false);
    }
  };

  return (
    <li className="bg-gray-900 p-4 rounded shadow space-y-3">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">{goal.title}</h3>
          <p className="text-sm text-gray-400">
            {goal.currentAmount} / {goal.targetAmount} kr
          </p>
        </div>
        <button
          onClick={handleDelete}
          disabled={deleting}
          className={`text-sm ${
            deleting
              ? "text-gray-500 cursor-not-allowed"
              : "text-red-500 hover:underline"
          }`}
        >
          {deleting ? "Sletter..." : "Slett"}
        </button>
      </div>

      {showModal && (
        <EditGoalModal
          goal={goal}
          onClose={() => setShowModal(false)}
          onSave={(updated) => {
            setTitle(updated.title);
            setTargetAmount(updated.targetAmount);
            setCurrentAmount(updated.currentAmount);
            setMonth(updated.month);
          }}
        />
      )}
      <div className="flex justify-baseline">
        <button
          onClick={() => setShowModal(true)}
          className="text-blue-400 hover:text-blue-500 text-sm"
        >
          Rediger
        </button>
      </div>
      {/* Progress bar */}
      <div className="w-full bg-gray-800 rounded h-3 overflow-hidden">
        <div
          className={`h-full ${barColor} transition-all duration-500`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Optional percentage label */}
      <p className="text-xs text-gray-400 text-right">
        {Math.round(progress)}%
      </p>
    </li>
  );
}
