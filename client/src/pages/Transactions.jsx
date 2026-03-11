import { useEffect, useState } from "react";
import { useFinance } from "../context/FinanceContext";

const Transactions = () => {

  const {
    transactions,
    fetchTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction
  } = useFinance();

  const [type, setType] = useState("expense");

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "Food",
    date: ""
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleSubmit = (e) => {

    e.preventDefault();

    const data = {
      ...form,
      type
    };

    if (editingId) {

      updateTransaction(editingId, data);
      setEditingId(null);

    } else {

      addTransaction(data);

    }

    setForm({
      title: "",
      amount: "",
      category: "Food",
      date: ""
    });

  };

  const handleEdit = (t) => {

    setForm({
      title: t.title,
      amount: t.amount,
      category: t.category,
      date: t.date.split("T")[0]
    });

    setType(t.type);

    setEditingId(t.id);

  };

  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Transactions
      </h1>

      {/* TYPE BUTTONS */}

      <div className="flex gap-3 mb-4">

        <button
          onClick={() => setType("expense")}
          className={`px-4 py-2 rounded ${
            type === "expense"
              ? "bg-red-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Add Expense
        </button>

        <button
          onClick={() => setType("income")}
          className={`px-4 py-2 rounded ${
            type === "income"
              ? "bg-green-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Add Income
        </button>

      </div>

      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow mb-6 flex gap-3 flex-wrap"
      >

        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          className="border p-2"
          required
        />

        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) =>
            setForm({ ...form, amount: e.target.value })
          }
          className="border p-2"
          required
        />

        {/* CATEGORY ONLY FOR EXPENSE */}

        {type === "expense" && (

          <select
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
            className="border p-2"
          >
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Shopping">Shopping</option>
            <option value="Bills">Bills</option>
            <option value="Entertainment">Entertainment</option>
          </select>

        )}

        <input
          type="date"
          value={form.date}
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
          className="border p-2"
          required
        />

        <button
          className={`px-4 py-2 rounded text-white ${
            type === "expense"
              ? "bg-red-500"
              : "bg-green-500"
          }`}
        >

          {editingId ? "Update" : "Add"}

        </button>

      </form>

      {/* TABLE */}

      <div className="bg-white rounded shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Type</th>
              <th className="p-3">Category</th>
              <th className="p-3">Date</th>
              <th className="p-3">Actions</th>
            </tr>

          </thead>

          <tbody>

            {transactions.map((t) => (

              <tr key={t.id} className="border-t">

                <td className="p-3">{t.title}</td>

                <td className="p-3">₹{t.amount}</td>

                <td className="p-3">
                  <span
                    className={
                      t.type === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {t.type}
                  </span>
                </td>

                <td className="p-3">
                  {t.category || "-"}
                </td>

                <td className="p-3">
                  {new Date(t.date).toLocaleDateString()}
                </td>

                <td className="p-3 flex gap-2">

                  <button
                    onClick={() => handleEdit(t)}
                    className="bg-yellow-400 px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteTransaction(t.id)
                    }
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default Transactions;