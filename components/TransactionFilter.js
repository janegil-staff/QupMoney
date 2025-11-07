"use client";
import { useState } from "react";

export default function TransactionFilter({ onFilter }) {
  const [type, setType] = useState("all");
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ type, search, startDate, endDate });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900 p-4 rounded shadow flex flex-col sm:flex-row flex-wrap gap-4 items-center"
    >
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="bg-gray-800 text-white px-3 py-2 rounded"
      >
        <option value="all">Alle typer</option>
        <option value="income">Inntekt</option>
        <option value="expense">Utgift</option>
      </select>

      <input
        type="text"
        placeholder="Søk etter beskrivelse"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-gray-800 text-white px-3 py-2 rounded w-full sm:w-auto"
      />

      <input
        type="date"
        value={startDate}
        placeholder="Velg måned"
        onChange={(e) => setStartDate(e.target.value)}
        className="bg-gray-800 text-white px-3 py-2 rounded"
      />

      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="bg-gray-800 text-white px-3 py-2 rounded"
      />

      <button
        type="submit"
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold"
      >
        Filtrer
      </button>
    </form>
  );
}
