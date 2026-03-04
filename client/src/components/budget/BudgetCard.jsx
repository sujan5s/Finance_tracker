import { useFinance } from "../../context/FinanceContext";
import { useMemo } from "react";

const BudgetCard = ({ category }) => {
  const { transactions, budgets, setBudget } = useFinance();

  const spent = useMemo(() => {
    return transactions
      .filter(
        (tx) => tx.type === "expense" && tx.category === category
      )
      .reduce((acc, curr) => acc + curr.amount, 0);
  }, [transactions, category]);

  const limit = budgets[category] || 0;
  const percentage = limit ? (spent / limit) * 100 : 0;

  let barColor = "bg-emerald-400";

  if (percentage >= 100) {
    barColor = "bg-red-500";
  } else if (percentage >= 80) {
    barColor = "bg-yellow-400";
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h3 className="font-semibold mb-3">{category}</h3>

      <input
        type="number"
        value={limit}
        onChange={(e) => setBudget(category, e.target.value)}
        className="border rounded-xl p-2 w-full mb-4"
        placeholder="Set Budget"
      />

      <div className="mb-2 text-sm text-gray-600">
        ₹{spent} / ₹{limit}
      </div>

      <div className="w-full bg-gray-200 rounded-full h-4">
        <div
          className={`${barColor} h-4 rounded-full transition-all`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        ></div>
      </div>

      {percentage >= 100 && (
        <p className="text-red-500 text-sm mt-2">
          Budget exceeded!
        </p>
      )}

      {percentage >= 80 && percentage < 100 && (
        <p className="text-yellow-500 text-sm mt-2">
          Approaching budget limit
        </p>
      )}
    </div>
  );
};

export default BudgetCard;