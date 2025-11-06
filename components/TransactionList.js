"use client";
import { useState, useMemo } from "react";
import TransactionFilter from "./TransactionFilter";

export default function TransactionList({ transactions }) {
  const [filters, setFilters] = useState({ type: "all", search: "" });

  const filtered = useMemo(() => {
    return transactions?.filter((tx) => {
      const matchType = filters.type === "all" || tx.type === filters.type;

      const desc = tx.description ?? "";
      const matchSearch = desc
        .toLowerCase()
        .includes(filters.search.toLowerCase());

      const txDate = tx.date ? new Date(tx.date) : null;
      const matchStart = filters.startDate
        ? txDate && txDate >= new Date(filters.startDate)
        : true;
      const matchEnd = filters.endDate
        ? txDate && txDate <= new Date(filters.endDate)
        : true;

      return matchType && matchSearch && matchStart && matchEnd;
    });
  }, [transactions, filters]);

  return (
    <section className="space-y-4">
      <TransactionFilter onFilter={setFilters} />

      {filtered?.length === 0 ? (
        <p className="text-gray-400 mt-4">
          Ingen transaksjoner matcher filteret.
        </p>
      ) : (
        <ul className="space-y-2">
          {filtered?.map((tx) => {
            const formattedDate = tx.date
              ? new Date(tx.date).toLocaleDateString("no-NO", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "Ukjent dato";

            return (
              <li
                key={tx._id}
                className="bg-gray-900 p-4 rounded shadow flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{tx.description}</p>
                  <p className="text-sm text-gray-400">
                    {tx.category} • {formattedDate}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`font-semibold ${
                      tx.type === "income"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {tx.amount} kr
                  </span>

                  <button
                    onClick={async () => {
                      const confirmed = window.confirm(
                        "Er du sikker på at du vil slette denne transaksjonen?"
                      );
                      if (confirmed) {
                        await fetch(`/api/transactions/${tx._id}`, {
                          method: "DELETE",
                        });
                        location.reload();
                      }
                    }}
                    className="text-red-400 hover:text-red-500 text-sm"
                  >
                    Slett
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
