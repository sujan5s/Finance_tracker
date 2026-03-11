import { useEffect, useState } from "react";

function Budgets() {

  const [budgetInput, setBudgetInput] = useState("");
  const [currentBudget, setCurrentBudget] = useState(null);
  const [editing, setEditing] = useState(false);

  const month = new Date().toLocaleString("default", {
    month: "long",
    year: "numeric"
  });

  const storageKey = `budget-${month}`;

  useEffect(() => {

    const savedBudget = localStorage.getItem(storageKey);

    if (savedBudget) {
      setCurrentBudget(savedBudget);
    }

  }, []);

  const handleSave = () => {

    if (!budgetInput) return;

    localStorage.setItem(storageKey, budgetInput);

    setCurrentBudget(budgetInput);
    setBudgetInput("");
    setEditing(false);

  };

  const handleEdit = () => {

    setBudgetInput(currentBudget);
    setEditing(true);

  };

  const handleDelete = () => {

    localStorage.removeItem(storageKey);

    setCurrentBudget(null);
    setBudgetInput("");
    setEditing(false);

  };

  return (

    <div>

      <h1 className="text-2xl font-bold mb-6">
        Monthly Budget
      </h1>

      <div className="bg-white p-6 rounded-xl shadow mb-6">

        <h2 className="mb-3 font-medium">
          {editing ? "Edit Budget" : `Set Budget for ${month}`}
        </h2>

        <div className="flex gap-3">

          <input
            type="number"
            placeholder="Enter monthly budget"
            value={budgetInput}
            onChange={(e)=>setBudgetInput(e.target.value)}
            className="flex-1 border rounded-lg p-3"
          />

          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-6 rounded-lg"
          >
            Save
          </button>

        </div>

      </div>

      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-lg mb-2">
          Current Budget
        </h2>

        <p className="text-gray-500 mb-2">
          {month}
        </p>

        {currentBudget ? (

          <div>

            <h3 className="text-3xl font-bold mb-4">
              ₹{currentBudget}
            </h3>

            <div className="flex gap-3">

              <button
                onClick={handleEdit}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Edit
              </button>

              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>

            </div>

          </div>

        ) : (

          <p className="text-gray-500">
            No budget set for this month.
          </p>

        )}

      </div>

    </div>

  );
}

export default Budgets;