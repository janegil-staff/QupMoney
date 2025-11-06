"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewGoalModal({ onClose, onCreate }) {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    targetAmount: "",
    currentAmount: "",
    month: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        targetAmount: Number(form.targetAmount),
        currentAmount: Number(form.currentAmount),
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      alert("Feil ved opprettelse: " + error.error);
      return;
    }

    const created = await res.json();
    onCreate(created);
    router.refresh();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-6 rounded shadow space-y-4 w-full max-w-md"
      >
        <h2 className="text-xl font-bold text-white">Nytt sparemål</h2>

        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 text-white"
          placeholder="Tittel"
          required
        />

        <input
          name="targetAmount"
          type="number"
          value={form.targetAmount}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 text-white"
          placeholder="Målbeløp"
          required
        />

        <input
          name="currentAmount"
          type="number"
          value={form.currentAmount}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 text-white"
          placeholder="Nåværende beløp"
          required
        />

        <input
          name="month"
          type="month"
          value={form.month}
          onChange={handleChange}
          className="w-full p-2 rounded bg-gray-800 text-white"
          required
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:underline"
          >
            Avbryt
          </button>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Opprett
          </button>
        </div>
      </form>
    </div>
  );
}
