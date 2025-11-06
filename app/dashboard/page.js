import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

import GoalItem from "@/components/GoalItem";
import AddGoalWrapper from "@/components/AddGoalWrapper";
import AddTransactionWrapper from "@/components/AddTransactionWrapper";
import TransactionList from "@/components/TransactionList";
import IncomeExpenseChart from "@/components/IncomeExpenseChart";
import MonthlySummary from "@/components/MonthlySummary";
import { connectDB } from "@/lib/db";
import Goal from "@/models/Goal";
import Transaction from "@/models/Transaction";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) redirect("/login");

  await connectDB();




  const rawTransactions = await Transaction.find({
    user: session.user.id,
  }).lean();

 const rawGoals = await Goal.find({ user: session.user.id }).lean();
  const goals = JSON.parse(JSON.stringify(rawGoals));
  const transactions = JSON.parse(JSON.stringify(rawTransactions));

  if (!session || !session.user?.id) redirect("/login");

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

          {goals?.length === 0 ? (
            <p className="text-gray-400">Ingen sparemål registrert.</p>
          ) : (
            <ul className="space-y-4">
              {goals?.map((goal) => (
                <GoalItem key={goal._id} goal={goal} />
              ))}
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
