"use client";
import { useMemo } from "react";

export default function MonthlySummary({ transactions }) {
  const monthlyTotals = useMemo(() => {
    const map = {};

    transactions?.forEach((tx) => {
      const date = new Date(tx.date);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

      if (!map[key]) {
        map[key] = { income: 0, expense: 0 };
      }

      if (tx.type === "income") {
        map[key].income += tx.amount;
      } else if (tx.type === "expense") {
        map[key].expense += tx.amount;
      }
    });

    return Object.entries(map)
      .sort((a, b) => b[0].localeCompare(a[0])) // newest first
      .map(([month, { income, expense }]) => ({
        month,
        income,
        expense,
        net: income - expense,
      }));
  }, [transactions]);

  return (
    <section>
      <h2 className="text-xl font-semibold mb-2">Månedlig oppsummering</h2>
      {monthlyTotals.length === 0 ? (
        <p className="text-gray-400">Ingen transaksjoner registrert.</p>
      ) : (
        <ul className="space-y-2">
          {monthlyTotals.map(({ month, income, expense, net }) => (
            <li
              key={month}
              className="bg-gray-900 p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{month}</p>
                <p className="text-sm text-gray-400">
                  Inntekt: {income} kr · Utgift: {expense} kr
                </p>
              </div>
              <span
                className={`font-semibold ${
                  net >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {net >= 0 ? "+" : ""}
                {net} kr
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
