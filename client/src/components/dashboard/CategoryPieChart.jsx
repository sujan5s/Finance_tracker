import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useFinance } from "../../context/FinanceContext";
import { useMemo } from "react";

const COLORS = ["#fda4af", "#a78bfa", "#34d399", "#fbbf24", "#60a5fa"];

const CategoryPieChart = () => {
  const { transactions } = useFinance();

  // 🔹 Calculate category totals dynamically
  const data = useMemo(() => {
    const expenseTransactions = transactions.filter(
      (tx) => tx.type === "expense"
    );

    const grouped = {};

    expenseTransactions.forEach((tx) => {
      if (!grouped[tx.category]) {
        grouped[tx.category] = 0;
      }
      grouped[tx.category] += tx.amount;
    });

    return Object.keys(grouped).map((category) => ({
      name: category,
      value: grouped[category],
    }));
  }, [transactions]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md h-80">
      <h2 className="mb-4 font-semibold">Spending by Category</h2>

      {data.length === 0 ? (
        <p className="text-gray-500">No expense data available</p>
      ) : (
        <ResponsiveContainer width="100%" height="85%">
          <PieChart>
            <Pie data={data} dataKey="value" outerRadius={100}>
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default CategoryPieChart;