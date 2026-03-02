import { useState, useEffect } from "react";
import { useFinance } from "../../context/FinanceContext";

const EditTransactionModal = ({ transaction, onClose }) => {
  const { updateTransaction } = useFinance();
  const [form, setForm] = useState(transaction);

  useEffect(() => {
    setForm(transaction);
  }, [transaction]);

  const handleSubmit = (e) => {
    e.preventDefault();

    updateTransaction({
      ...form,
      amount: Number(form.amount),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-2xl w-96">
        <h2 className="mb-4 font-semibold">Edit Transaction</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            className="border p-2 rounded-xl w-full"
          />

          <input
            type="number"
            value={form.amount}
            onChange={(e) =>
              setForm({ ...form, amount: e.target.value })
            }
            className="border p-2 rounded-xl w-full"
          />

          <select
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
            className="border p-2 rounded-xl w-full"
          >
            <option>Food</option>
            <option>Rent</option>
            <option>Utilities</option>
            <option>Entertainment</option>
          </select>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-500"
            >
              Cancel
            </button>

            <button className="bg-rose-500 text-white px-4 py-2 rounded-xl">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTransactionModal;