import { FinanceProvider, useFinance } from "./context/FinanceContext";
import SummaryCard from "./components/SummaryCard";
import Charts from "./components/Charts";
import TransactionTable from "./components/TransactionTable";
import RoleSwitcher from "./components/RoleSwitcher";
import Insights from "./components/Insights";
import { useState } from "react";

const Dashboard = () => {
  const { transactions } = useFinance();
  const [dark, setDark] = useState(false);

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);
  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);
  const balance = income - expense;

  return (
    <div
      className={
        dark
          ? "min-h-screen p-6 bg-gray-950 text-white space-y-8"
          : "min-h-screen p-6 bg-gradient-to-br from-gray-100 to-gray-200 space-y-8"
      }
    >
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold">Finance Dashboard</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Track your expenses smartly
          </p>
        </div>

        <div className="flex gap-3 items-center">
          {/* 🌙 DARK MODE BUTTON */}
          <button
            onClick={() => setDark(!dark)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 shadow hover:scale-110 transition"
          >
            {dark ? "☀️" : "🌙"}
          </button>

          <RoleSwitcher />
        </div>
      </div>

      {/* CARDS */}
      <div className="grid md:grid-cols-3 gap-6">
        <SummaryCard title="Balance" value={balance} />
        <SummaryCard title="Income" value={income} />
        <SummaryCard title="Expense" value={expense} />
      </div>

      {/* CHARTS */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
        <Charts />
      </div>

      {/* TABLE */}
      <TransactionTable />

      {/* INSIGHTS */}
      <Insights />
    </div>
  );
};

export default function App() {
  return (
    <FinanceProvider>
      <Dashboard />
    </FinanceProvider>
  );
}
