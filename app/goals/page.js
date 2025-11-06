"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GoalCard from "@/components/GoalCard";
import EditGoalModal from "@/components/EditGoalModal";
import NewGoalModal from "@/components/NewGoalModal";

export default function SparemålPage() {
  const router = useRouter();
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingGoal, setEditingGoal] = useState(null);
  const [showNewModal, setShowNewModal] = useState(false);

  const handleCreate = (newGoal) => {
    setGoals((prev) => [...prev, newGoal]);
    setShowNewModal(false);
  };

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const res = await fetch("/api/goals");
        const data = await res.json();
        setGoals(data);
      } catch (err) {
        console.error("Feil ved henting av mål:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, []);

  const handleSave = (updatedGoal) => {
    setGoals((prev) =>
      prev.map((g) => (g._id === updatedGoal._id ? updatedGoal : g))
    );
    setEditingGoal(null);
    router.refresh();
  };

  return (
    <main className="max-w-2xl mx-auto py-8 px-4 space-y-6">
      <h1 className="text-2xl font-bold text-white">Sparemål</h1>
      <button
        onClick={() => setShowNewModal(true)}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        + Nytt mål
      </button>
      {showNewModal && (
        <NewGoalModal
          onClose={() => setShowNewModal(false)}
          onCreate={handleCreate}
        />
      )}

      {loading ? (
        <p className="text-gray-400">Laster mål...</p>
      ) : goals.length === 0 ? (
        <p className="text-gray-400">Ingen mål funnet.</p>
      ) : (
        <ul className="space-y-4">
          {goals.map((goal) => (
            <li key={goal._id}>
              <GoalCard goal={goal} onEdit={() => setEditingGoal(goal)} />
            </li>
          ))}
        </ul>
      )}

      {editingGoal && (
        <EditGoalModal
          goal={editingGoal}
          onClose={() => setEditingGoal(null)}
          onSave={handleSave}
        />
      )}
    </main>
  );
}
