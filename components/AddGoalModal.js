"use client";
import { useState } from "react";

export default function AddGoalModal({ onCreate }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");
  const [month, setMonth] = useState(new Date().toISOString().slice(0, 7)); // "YYYY-MM"

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onCreate({
      title,
      targetAmount: Number(targetAmount),
      currentAmount: Number(currentAmount),
      month, // ✅ required by backend
    });
    setTitle("");
    setTargetAmount("");
    setCurrentAmount("");
    setMonth(new Date().toISOString().slice(0, 7));
    setOpen(false);
  };

  return (
    <>
    
      <button
        onClick={() => setOpen(true)}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold"
      >
        Legg til nytt mål
      </button>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-gray-900 p-6 rounded-lg shadow-lg space-y-4 w-full max-w-md"
          >
            <h2 className="text-xl font-semibold text-white">Nytt sparemål</h2>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 rounded text-white"
              placeholder="Tittel"
              required
            />

            <input
              type="number"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 rounded text-white"
              placeholder="Målbeløp"
              required
            />

            <input
              type="number"
              value={currentAmount}
              onChange={(e) => setCurrentAmount(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 rounded text-white"
              placeholder="Nåværende beløp"
              required
            />

            <input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 rounded text-white"
              required
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-gray-700 text-white rounded"
              >
                Avbryt
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-semibold"
              >
                Lagre
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
