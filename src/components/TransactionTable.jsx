import { useFinance } from "../context/FinanceContext";
import { useState } from "react";

const TransactionTable = () => {
  const {
    transactions,
    filter,
    setFilter,
    role,
    addTransaction,
    deleteTransaction,
    updateTransaction,
  } = useFinance();

  const [editing, setEditing] = useState(null);

  const filtered = transactions.filter((t) =>
    t.category.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div className="bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-lg">
      <div className="flex justify-between mb-4">
        <input
          placeholder="Search..."
          className="border px-3 py-2 rounded-lg"
          onChange={(e) => setFilter(e.target.value)}
        />

        {role === "admin" && (
          <button
            className="bg-black text-white px-4 py-2 rounded-lg"
            onClick={() =>
              addTransaction({
                date: new Date().toISOString().split("T")[0],
                amount: 1000,
                category: "Shopping",
                type: "expense",
              })
            }
          >
            + Add
          </button>
        )}
      </div>

      <table className="w-full text-sm">
        <thead className="border-b">
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Type</th>
            {role === "admin" && <th>Action</th>}
          </tr>
        </thead>

        <tbody>
          {filtered.map((t) => (
            <tr
              key={t.id}
              className="border-b hover:bg-gray-100 even:bg-gray-50"
            >
              <td>{t.date}</td>
              <td>₹{t.amount}</td>
              <td>{t.category}</td>
              <td
                className={
                  t.type === "income" ? "text-green-500" : "text-red-500"
                }
              >
                {t.type}
              </td>

              {role === "admin" && (
                <td className="space-x-2">
                  <button
                    onClick={() => setEditing(t)}
                    className="text-blue-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTransaction(t.id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* EDIT MODAL */}
      {editing && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-80 space-y-3">
            <h2 className="font-semibold">Edit Transaction</h2>

            <input
              className="border p-2 w-full"
              value={editing.amount}
              onChange={(e) =>
                setEditing({ ...editing, amount: +e.target.value })
              }
            />

            <input
              className="border p-2 w-full"
              value={editing.category}
              onChange={(e) =>
                setEditing({ ...editing, category: e.target.value })
              }
            />

            <div className="flex justify-between">
              <button
                onClick={() => {
                  updateTransaction(editing);
                  setEditing(null);
                }}
                className="bg-black text-white px-3 py-1 rounded"
              >
                Save
              </button>

              <button onClick={() => setEditing(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionTable;
