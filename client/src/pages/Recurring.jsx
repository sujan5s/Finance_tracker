import { useEffect, useState } from "react";
import { useFinance } from "../context/FinanceContext";

const Recurring = () => {

  const {
    recurring,
    fetchRecurring,
    addRecurring,
    updateRecurring,
    deleteRecurring
  } = useFinance();

  const [form, setForm] = useState({
    title: "",
    amount: "",
    type: "expense",
    category: "Bills",
    frequency: "monthly",
    startDate: ""
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchRecurring();
  }, []);

  const handleSubmit = (e) => {

    e.preventDefault();

    if (editingId) {

      updateRecurring(editingId, form);
      setEditingId(null);

    } else {

      addRecurring(form);

    }

    setForm({
      title: "",
      amount: "",
      type: "expense",
      category: "Bills",
      frequency: "monthly",
      startDate: ""
    });

  };

  const handleEdit = (r) => {

    setForm({
      title: r.title,
      amount: r.amount,
      type: r.type,
      category: r.category || "Bills",
      frequency: r.frequency,
      startDate: r.startDate.split("T")[0]
    });

    setEditingId(r.id);

  };

  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Recurring Transactions
      </h1>

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

        <select
          value={form.type}
          onChange={(e) =>
            setForm({ ...form, type: e.target.value })
          }
          className="border p-2"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <select
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
          className="border p-2"
        >
          <option value="Bills">Bills</option>
          <option value="Subscription">Subscription</option>
          <option value="Rent">Rent</option>
          <option value="Salary">Salary</option>
          <option value="Other">Other</option>
        </select>

        <select
          value={form.frequency}
          onChange={(e) =>
            setForm({ ...form, frequency: e.target.value })
          }
          className="border p-2"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>

        <input
          type="date"
          value={form.startDate}
          onChange={(e) =>
            setForm({ ...form, startDate: e.target.value })
          }
          className="border p-2"
          required
        />

        <button
          className={`px-4 py-2 text-white rounded ${
            editingId ? "bg-yellow-500" : "bg-blue-500"
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
              <th className="p-3">Frequency</th>
              <th className="p-3">Start Date</th>
              <th className="p-3">Actions</th>
            </tr>

          </thead>

          <tbody>

            {recurring?.length === 0 ? (

              <tr>
                <td colSpan="7" className="p-4 text-center">
                  No recurring transactions
                </td>
              </tr>

            ) : (

              recurring.map((r) => (

                <tr key={r.id} className="border-t">

                  <td className="p-3">{r.title}</td>

                  <td className="p-3">₹{r.amount}</td>

                  <td className="p-3">

                    <span
                      className={
                        r.type === "income"
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {r.type}
                    </span>

                  </td>

                  <td className="p-3">{r.category || "-"}</td>

                  <td className="p-3">{r.frequency}</td>

                  <td className="p-3">
                    {new Date(r.startDate).toLocaleDateString()}
                  </td>

                  <td className="p-3 flex gap-2">

                    <button
                      onClick={() => handleEdit(r)}
                      className="bg-yellow-400 px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteRecurring(r.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default Recurring;