import { createContext, useContext, useEffect, useState } from "react";
import { initialTransactions } from "../data/mockData";

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [role, setRole] = useState("viewer");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("transactions");
    if (saved) {
      setTransactions(JSON.parse(saved));
    } else {
      setTransactions(initialTransactions);
      localStorage.setItem("transactions", JSON.stringify(initialTransactions));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (txn) => {
    setTransactions([...transactions, { ...txn, id: Date.now() }]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const updateTransaction = (updatedTxn) => {
    setTransactions(
      transactions.map((t) => (t.id === updatedTxn.id ? updatedTxn : t)),
    );
  };

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        updateTransaction,
        role,
        setRole,
        filter,
        setFilter,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);
