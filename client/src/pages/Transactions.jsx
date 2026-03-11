import { useState } from "react";
import { useFinance } from "../context/FinanceContext";

function Transactions() {

  const { transactions, addTransaction } = useFinance();

  const [form, setForm] = useState({
    amount: "",
    category: "",
    type: "expense",
    description: ""
  });

  const handleSubmit = (e) => {

    e.preventDefault();

    addTransaction({
      amount: Number(form.amount),
      category: form.category,
      type: form.type,
      description: form.description
    });

    setForm({
      amount: "",
      category: "",
      type: "expense",
      description: ""
    });

  };

  return (

    <div>

      <h1 className="text-2xl font-bold mb-4">Transactions</h1>

      <form
        onSubmit={handleSubmit}
        className="flex gap-2 mb-6"
      >

        <input
          placeholder="Amount"
          value={form.amount}
          onChange={(e)=>setForm({...form, amount:e.target.value})}
          className="border p-2"
        />

        <input
          placeholder="Category"
          value={form.category}
          onChange={(e)=>setForm({...form, category:e.target.value})}
          className="border p-2"
        />

        <select
          value={form.type}
          onChange={(e)=>setForm({...form, type:e.target.value})}
          className="border p-2"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <button className="bg-blue-500 text-white px-4">
          Add
        </button>

      </form>

      <div>

        {transactions.map((t)=>(
          <div
            key={t.id}
            className="flex justify-between border p-2 mb-2"
          >

            <span>{t.category}</span>
            <span>{t.type}</span>
            <span>₹{t.amount}</span>

          </div>
        ))}

      </div>

    </div>

  );
}

export default Transactions;