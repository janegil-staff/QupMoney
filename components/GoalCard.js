"use client";

import { useState } from "react";

export default function GoalCard({ goal, onSave }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(goal.title);
  const [targetAmount, setTargetAmount] = useState(goal.targetAmount);
  const [currentAmount, setCurrentAmount] = useState(goal.currentAmount);
  const [month, setMonth] = useState(goal.month);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave?.({
      title,
      targetAmount: Number(targetAmount),
      currentAmount: Number(currentAmount),
      month,
    });
    setEditing(false);
  };

  const current = parseFloat(currentAmount) || 0;
  const target = parseFloat(targetAmount) || 1;
  const progress = Math.min((current / target) * 100, 100);

  const barColor =
    progress >= 100
      ? "bg-green-600"
      : progress >= 75
      ? "bg-yellow-500"
      : progress >= 50
      ? "bg-blue-500"
      : "bg-red-500";

  return (
    <div className="bg-gray-900 p-4 rounded shadow space-y-3">
      {editing ? (
        <form onSubmit={handleSubmit} className="space-y-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 rounded text-white"
            placeholder="Tittel"
            required
          />
          <input
            type="number"
            value={currentAmount}
            onChange={(e) => setCurrentAmount(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 rounded text-white"
            placeholder="Nåværende beløp"
            required
          />
          <input
            type="number"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 rounded text-white"
            placeholder="Målbeløp"
            required
          />
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-full px-3 py-2 bg-gray-800 rounded text-white"
            required
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="px-3 py-1 bg-gray-700 text-white rounded"
            >
              Avbryt
            </button>
            <button
              type="submit"
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
            >
              Lagre
            </button>
          </div>
        </form>
      ) : (
        <>
          <div>
            <p className="font-semibold">{title}</p>
            <p className="text-sm text-gray-400">
              {month} · {current} / {target} kr
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-800 rounded h-3 overflow-hidden">
            <div
              className={`h-full ${barColor} transition-all duration-500`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-gray-400 text-right">{Math.round(progress)}%</p>

          <div className="flex justify-end">
            <button
              onClick={() => setEditing(true)}
              className="text-blue-400 hover:text-blue-500 text-sm"
            >
              Rediger
            </button>
          </div>
        </>
      )}
    </div>
  );
}
