import { useState } from "react";

const TransactionForm = () => {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "Food",
    type: "expense"
  });

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="mb-4 font-semibold">Add Transaction</h2>

      <div className="grid grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Title"
          className="border rounded-xl p-2"
        />

        <input
          type="number"
          placeholder="Amount"
          className="border rounded-xl p-2"
        />

        <select className="border rounded-xl p-2">
          <option>Food</option>
          <option>Rent</option>
          <option>Utilities</option>
          <option>Entertainment</option>
        </select>

        <button className="bg-rose-500 text-white rounded-xl">
          Add
        </button>
      </div>
    </div>
  );
};

export default TransactionForm;