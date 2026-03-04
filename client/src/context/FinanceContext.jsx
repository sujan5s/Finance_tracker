import { createContext, useContext, useState, useMemo } from "react";

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  // ================================
  // 🔹 Date Filter
  // ================================
  const [dateFilter, setDateFilter] = useState("all");

  // ================================
  // 🔹 Transactions
  // ================================
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
  ]);

  const [budgets, setBudgets] = useState({
    Food: 5000,
    Rent: 12000,
    Utilities: 3000,
    Entertainment: 4000,
  });

  const [recurring, setRecurring] = useState([]);

  // ================================
  // 🔹 Date Filter Logic
  // ================================
  const filteredTransactions = useMemo(() => {
    if (dateFilter === "all") return transactions;

    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    return transactions.filter((tx) => {
      const txDate = new Date(tx.date);

      if (dateFilter === "thisMonth") {
        return (
          txDate.getMonth() === currentMonth &&
          txDate.getFullYear() === currentYear
        );
      }

      if (dateFilter === "lastMonth") {
        const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const year =
          currentMonth === 0 ? currentYear - 1 : currentYear;

        return (
          txDate.getMonth() === lastMonth &&
          txDate.getFullYear() === year
        );
      }

      return true;
    });
  }, [transactions, dateFilter]);

  // ================================
  // 🔹 CRUD
  // ================================
  const addTransaction = (transaction) => {
    setTransactions((prev) => [
      ...prev,
      { ...transaction, id: Date.now() },
    ]);
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) =>
      prev.filter((tx) => tx.id !== id)
    );
  };

  const updateTransaction = (updatedTx) => {
    setTransactions((prev) =>
      prev.map((tx) =>
        tx.id === updatedTx.id ? updatedTx : tx
      )
    );
  };

  const addRecurring = (item) => {
    setRecurring((prev) => [
      ...prev,
      { ...item, id: Date.now() },
    ]);
  };

  const setBudget = (category, amount) => {
    setBudgets((prev) => ({
      ...prev,
      [category]: Number(amount),
    }));
  };

  // ================================
  // 🔹 Calculations (Using Filtered)
  // ================================
  const totalIncome = useMemo(() => {
    return filteredTransactions
      .filter((tx) => tx.type === "income")
      .reduce((acc, curr) => acc + curr.amount, 0);
  }, [filteredTransactions]);

  const totalExpense = useMemo(() => {
    return filteredTransactions
      .filter((tx) => tx.type === "expense")
      .reduce((acc, curr) => acc + curr.amount, 0);
  }, [filteredTransactions]);

  const totalBalance = totalIncome - totalExpense;

  return (
    <FinanceContext.Provider
      value={{
        transactions: filteredTransactions,
        addTransaction,
        deleteTransaction,
        updateTransaction,
        totalIncome,
        totalExpense,
        totalBalance,
        budgets,
        setBudget,
        recurring,
        addRecurring,
        dateFilter,
        setDateFilter,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);