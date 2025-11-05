"use client";
import { useState } from "react";

export default function AddTransactionModal({ onCreate }) {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description,
          amount: Number(amount),
          type,
          date: date || new Date().toISOString(),
          category,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Noe gikk galt");
        return;
      }

      setDescription("");
      setAmount("");
      setType("income");
      setDate("");
      setOpen(false);
      onCreate?.();
    } catch (err) {
      setError("Serverfeil ved lagring");
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold"
      >
        Legg til transaksjon
      </button>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-gray-900 p-6 rounded-lg shadow-lg space-y-4 w-full max-w-md"
          >
            <h2 className="text-xl font-semibold text-white">Ny transaksjon</h2>

            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 rounded text-white"
              placeholder="Beskrivelse"
              required
            />

            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 rounded text-white"
              placeholder="Beløp"
              required
            />
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 rounded text-white"
              placeholder="Kategori"
              required
            />

            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 rounded text-white"
            >
              <option value="income">Inntekt</option>
              <option value="expense">Utgift</option>
            </select>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 rounded text-white"
            />

            {error && <p className="text-red-400 text-sm">{error}</p>}

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
