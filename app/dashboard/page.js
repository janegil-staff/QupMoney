import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import IncomeExpenseChart from "@/components/IncomeExpenseChart";
import TransactionList from "@/components/TransactionList";
import EditGoalModal from "@/components/EditGoalModal";
import AddGoalWrapper from "@/components/AddGoalWrapper";
import AddTransactionWrapper from "@/components/AddTransactionWrapper";
import MonthlySummary from "@/components/MonthlySummary";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const cookie = (await headers()).get("cookie") || "";

  let goals = [];
  let transactions = [];

  try {
    const [goalsRes, transactionsRes] = await Promise.all([
      fetch("http://localhost:3000/api/goals", {
        headers: { Cookie: cookie },
        cache: "no-store",
      }),
      fetch("http://localhost:3000/api/transactions", {
        headers: { Cookie: cookie },
        cache: "no-store",
      }),
    ]);

    if (goalsRes.ok) goals = await goalsRes.json();
    if (transactionsRes.ok) transactions = await transactionsRes.json();
  } catch (err) {
    console.error("Feil ved henting av data:", err);
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white px-4 py-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-green-400">
          Din økonomioversikt
        </h1>

        {/* Chart Section */}
        <IncomeExpenseChart transactions={transactions} />
        <MonthlySummary transactions={transactions} />

        {/* Goals Section */}
        <section>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">Sparemål</h2>
            <AddGoalWrapper />
          </div>

          {goals.length === 0 ? (
            <p className="text-gray-400">Ingen sparemål registrert.</p>
          ) : (
            <ul className="space-y-4">
              {goals.map((goal) => {
                const progress =
                  goal.currentAmount && goal.targetAmount
                    ? Math.min(
                        (goal.currentAmount / goal.targetAmount) * 100,
                        100
                      )
                    : 0;

                return (
                  <li
                    key={goal._id}
                    className="bg-gray-900 p-4 rounded shadow space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{goal.title}</span>
                      <span className="text-green-400">
                        {goal.currentAmount ?? 0} / {goal.targetAmount} kr
                      </span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded">
                      <div
                        className="h-full bg-green-500 rounded"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <EditGoalModal
                      goal={goal}
                      onSave={async (updatedGoal) => {
                        await fetch(`/api/goals/${goal._id}`, {
                          method: "PUT",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify(updatedGoal),
                        });
                        location.reload();
                      }}
                    />
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {/* Transactions Section */}
        <section>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">Transaksjoner</h2>
            <AddTransactionWrapper />
          </div>
          <TransactionList transactions={transactions} />
        </section>
      </div>
    </main>
  );
}
