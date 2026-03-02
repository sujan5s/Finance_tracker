import { useState } from "react";
import { useFinance } from "../../context/FinanceContext";

const TransactionForm = () => {
  const { addTransaction } = useFinance();

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "Food",
    type: "expense",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title || !form.amount) return;

    addTransaction({
      ...form,
      amount: Number(form.amount),
      date: new Date().toISOString().split("T")[0],
    });

    setForm({
      title: "",
      amount: "",
      category: "Food",
      type: "expense",
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="mb-4 font-semibold">Add Transaction</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-5 gap-4">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          className="border rounded-xl p-2"
        />

        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) =>
            setForm({ ...form, amount: e.target.value })
          }
          className="border rounded-xl p-2"
        />

        <select
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
          className="border rounded-xl p-2"
        >
          <option>Food</option>
          <option>Rent</option>
          <option>Utilities</option>
          <option>Entertainment</option>
        </select>

        <select
          value={form.type}
          onChange={(e) =>
            setForm({ ...form, type: e.target.value })
          }
          className="border rounded-xl p-2"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <button className="bg-rose-500 text-white rounded-xl">
          Add
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;