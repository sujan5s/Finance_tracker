import { createContext, useContext, useState, useMemo } from "react";

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  // 🔹 Dummy initial data
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      title: "Salary",
      amount: 60000,
      category: "Income",
      type: "income",
      date: "2026-02-01",
    },
    {
      id: 2,
      title: "Rent",
      amount: 10000,
      category: "Rent",
      type: "expense",
      date: "2026-02-03",
    },
    {
      id: 3,
      title: "Food",
      amount: 4000,
      category: "Food",
      type: "expense",
      date: "2026-02-05",
    },
  ]);

  // 🔹 Add Transaction
  const addTransaction = (transaction) => {
    setTransactions((prev) => [
      ...prev,
      { ...transaction, id: Date.now() },
    ]);
  };

  // 🔹 Delete Transaction
  const deleteTransaction = (id) => {
    setTransactions((prev) =>
      prev.filter((tx) => tx.id !== id)
    );
  };

  // 🔹 Calculations
  const totalIncome = useMemo(() => {
    return transactions
      .filter((tx) => tx.type === "income")
      .reduce((acc, curr) => acc + curr.amount, 0);
  }, [transactions]);

  const totalExpense = useMemo(() => {
    return transactions
      .filter((tx) => tx.type === "expense")
      .reduce((acc, curr) => acc + curr.amount, 0);
  }, [transactions]);

  const totalBalance = totalIncome - totalExpense;

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        totalIncome,
        totalExpense,
        totalBalance,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);