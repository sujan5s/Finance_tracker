import { useState } from "react";
import { useFinance } from "../context/FinanceContext";

const Recurring = () => {
  const { recurring, addRecurring, runRecurring } = useFinance();

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "Food",
    type: "expense",
    day: 1,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    addRecurring({
      ...form,
      amount: Number(form.amount),
      day: Number(form.day),
    });

    setForm({
      title: "",
      amount: "",
      category: "Food",
      type: "expense",
      day: 1,
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="mb-4 font-semibold">
          Add Recurring Transaction
        </h2>

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

          <input
            type="number"
            placeholder="Day"
            value={form.day}
            onChange={(e) =>
              setForm({ ...form, day: e.target.value })
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

          <button className="bg-rose-500 text-white rounded-xl">
            Add
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="mb-4 font-semibold">
          Recurring List
        </h2>

        <ul className="space-y-2">
          {recurring.map((item) => (
            <li key={item.id} className="border p-3 rounded-xl">
              {item.title} - ₹{item.amount} (Day {item.day})
            </li>
          ))}
        </ul>

        <button
          onClick={runRecurring}
          className="mt-6 bg-purple-500 text-white px-4 py-2 rounded-xl"
        >
          Run Recurring This Month
        </button>
      </div>
    </div>
  );
};

export default Recurring;