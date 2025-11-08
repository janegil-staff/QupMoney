"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function TransactionsPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    type: "expense",
    amount: "",
    category: "",
    description: "",
    date: new Date().toISOString().slice(0, 10),
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form }),
    });

    if (res.ok) {
      alert("Transaksjon lagret!");
      setForm({ ...form, amount: "", category: "", description: "" });
      router.push("/dashboard");
    } else {
      alert("Feil ved lagring");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-10">
      <div className="max-w-xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center">Logg transaksjon</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type */}
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="type"
                value="income"
                checked={form.type === "income"}
                onChange={handleChange}
                className="accent-green-500"
              />
              Inntekt
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="type"
                value="expense"
                checked={form.type === "expense"}
                onChange={handleChange}
                className="accent-red-500"
              />
              Utgift
            </label>
          </div>

          {/* Amount */}
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="Beløp (kr)"
            className="w-full px-4 py-2 rounded bg-gray-800 text-white"
            required
          />

          {/* Category */}
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white"
            required
          >
            <option value="">Velg kategori</option>
            <option value="Lønning">Lønning</option>
            <option value="Mat">Mat</option>
            <option value="Daglivarer">Daglivarer</option>
            <option value="Transport">Transport</option>
            <option value="Helse">Helse</option>
            <option value="Gaver">Gaver</option>
            <option value="Bolig">Bolig</option>
            <option value="Vin">Vin</option>
            <option value="Alkohol">Alkohol</option>
            <option value="Røyk">Røyk</option>
            <option value="Snop">Snop</option>
            <option value="Sparing">Sparing</option>
            <option value="Strøm">Strøm</option>
            <option value="Regninger">Regninger</option>
            <option value="Klær">Klær</option>
            <option value="Medisiner">Medisiner</option>
            <option value="Investeringer">Investeringer</option>
            <option value="Abonnomanger">Abonnomanger</option>
            <option value="Husleie">Husleie</option>
            <option value="Narkotika">Narkotika</option>
            <option value="Kosmetikk">Kosmetikk</option>
            <option value="Brukerkonto">Brukerkonto</option>
          </select>

          {/* Note */}
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Beskrivelse"
            className="w-full px-4 py-2 rounded bg-gray-800 text-white"
            rows={3}
          />

          {/* Date */}
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-gray-800 text-white"
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 bg-green-600 hover:bg-green-700 rounded text-white font-semibold"
          >
            Lagre transaksjon
          </button>
        </form>
      </div>
    </div>
  );
}
