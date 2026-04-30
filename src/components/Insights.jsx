import { useFinance } from "../context/FinanceContext";

const Insights = () => {
  const { transactions } = useFinance();

  const expenses = transactions.filter((t) => t.type === "expense");
  const total = expenses.reduce((a, b) => a + b.amount, 0);

  const highest = expenses.reduce(
    (acc, curr) => (curr.amount > acc.amount ? curr : acc),
    expenses[0] || {},
  );

  return (
    <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow">
      <h2 className="text-lg font-semibold mb-2">Insights</h2>

      {highest.category ? (
        <>
          <p>
            Top Category: <b>{highest.category}</b>
          </p>
          <p>Total Spending: ₹{total}</p>
          <p>Avg Expense: ₹{Math.floor(total / (expenses.length || 1))}</p>
        </>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Insights;
