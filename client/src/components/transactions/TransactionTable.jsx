import { useFinance } from "../../context/FinanceContext";
import { useState, useMemo } from "react";
import EditTransactionModal from "./EditTransactionModal";

const TransactionTable = () => {
  const { transactions, deleteTransaction } = useFinance();
  const [editingTx, setEditingTx] = useState(null);
  const [search, setSearch] = useState("");

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) =>
      tx.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [transactions, search]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="mb-4 font-semibold">All Transactions</h2>

      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded-xl p-2 w-full mb-4"
      />

      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[600px]">
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
              <tr key={tx.id} className="border-b">
                <td className="py-3">{tx.title}</td>
                <td>{tx.category}</td>
                <td>{tx.type}</td>
                <td>₹{tx.amount}</td>
                <td>{tx.date}</td>
                <td className="space-x-2">
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
      </div>

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