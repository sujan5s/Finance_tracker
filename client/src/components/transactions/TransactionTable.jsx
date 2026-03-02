import { useFinance } from "../../context/FinanceContext";
import { useState, useMemo } from "react";
import EditTransactionModal from "./EditTransactionModal";

const TransactionTable = () => {
  const { transactions, deleteTransaction } = useFinance();

  const [editingTx, setEditingTx] = useState(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  // 🔹 Filter Logic
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesSearch = tx.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        categoryFilter === "All" ||
        tx.category === categoryFilter;

      const matchesType =
        typeFilter === "All" || tx.type === typeFilter;

      return matchesSearch && matchesCategory && matchesType;
    });
  }, [transactions, search, categoryFilter, typeFilter]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="mb-4 font-semibold">All Transactions</h2>

      {/* 🔍 Filters */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-xl p-2"
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="border rounded-xl p-2"
        >
          <option>All</option>
          <option>Food</option>
          <option>Rent</option>
          <option>Utilities</option>
          <option>Entertainment</option>
          <option>Income</option>
        </select>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="border rounded-xl p-2"
        >
          <option>All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <table className="w-full text-left">
        <thead className="border-b">
          <tr>
            <th className="pb-3">Title</th>
            <th>Category</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {filteredTransactions.map((tx) => (
            <tr key={tx.id} className="border-b hover:bg-rose-50">
              <td className="py-3">{tx.title}</td>
              <td>{tx.category}</td>
              <td>
                <span
                  className={`px-2 py-1 rounded-lg text-sm ${
                    tx.type === "income"
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-rose-100 text-rose-600"
                  }`}
                >
                  {tx.type}
                </span>
              </td>
              <td
                className={
                  tx.type === "income"
                    ? "text-emerald-600 font-semibold"
                    : "text-rose-600 font-semibold"
                }
              >
                ₹{tx.amount}
              </td>
              <td>{tx.date}</td>
              <td className="space-x-3">
                <button
                  onClick={() => setEditingTx(tx)}
                  className="text-blue-500 text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteTransaction(tx.id)}
                  className="text-red-500 text-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingTx && (
        <EditTransactionModal
          transaction={editingTx}
          onClose={() => setEditingTx(null)}
        />
      )}
    </div>
  );
};

export default TransactionTable;