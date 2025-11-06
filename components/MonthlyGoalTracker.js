"use client";
import { useEffect, useState } from "react";

export default function MonthlyGoalTracker({ transactions }) {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    fetch("/api/goals")
      .then((res) => res.json())
      .then((data) => {
        console.log("Goals received:", data);
        setGoals(data);
      })
      .catch(() => setGoals([]));
  }, []);

  const progress = goals.map((goal) => {
    const earned = transactions
      .filter((tx) => {
        const txMonth = new Date(tx.date).toISOString().slice(0, 7);
        return tx.type === "income" && txMonth === goal.month;
      })
      .reduce((sum, tx) => sum + tx.amount, 0);

    const percent = Math.min((earned / goal.targetAmount) * 100, 100);

    return {
      ...goal,
      earned,
      percent,
    };
  });

  return (
    <section>
      <h2 className="text-xl font-semibold mb-2">Måloppnåelse per måned</h2>
      {progress.length === 0 ? (
        <p className="text-gray-400">Ingen mål registrert.</p>
      ) : (
        <ul className="space-y-4">
          {progress.map(({ title, month, targetAmount, earned, percent }) => (
            <li key={month + title} className="bg-gray-900 p-4 rounded shadow">
              <p className="font-medium">
                {title} ({month})
              </p>
              <p className="text-sm text-gray-400 mb-2">
                {earned} kr av {targetAmount} kr ({Math.round(percent)}%)
              </p>
              <div className="w-full bg-gray-800 h-3 rounded">
                <div
                  className="h-3 bg-green-500 rounded"
                  style={{ width: `${percent}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
