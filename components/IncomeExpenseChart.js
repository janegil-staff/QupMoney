"use client";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function IncomeExpenseChart({ transactions }) {
  const monthly = {};

  transactions.forEach((tx) => {
    const month = new Date(tx.date).toLocaleString("nb-NO", {
      month: "short",
      year: "numeric",
    });
    if (!monthly[month]) monthly[month] = { income: 0, expense: 0 };
    monthly[month][tx.type] += tx.amount;
  });

  const labels = Object.keys(monthly);
  const incomeData = labels.map((m) => monthly[m].income);
  const expenseData = labels.map((m) => monthly[m].expense);

  return (
    <div className="bg-gray-900 p-4 rounded shadow">
      <h3 className="text-lg font-semibold mb-2">Inntekt vs Utgift</h3>
      <Bar
        data={{
          labels,
          datasets: [
            {
              label: "Inntekt",
              data: incomeData,
              backgroundColor: "rgb(34 197 94)",
            },
            {
              label: "Utgift",
              data: expenseData,
              backgroundColor: "rgb(239 68 68)",
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "bottom" },
          },
        }}
      />
    </div>
  );
}
