import { useMemo } from "react";
import { useFinance } from "../../context/FinanceContext";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const COLORS = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#3b82f6"
];

const ExpenseChart = () => {

  const { transactions } = useFinance();

  const data = useMemo(() => {

    const expenses = transactions.filter(
      (t) => t.type === "expense"
    );

    const map = {};

    expenses.forEach((t) => {

      if (!map[t.category]) map[t.category] = 0;

      map[t.category] += t.amount;

    });

    return Object.keys(map).map((k) => ({
      name: k,
      value: map[k]
    }));

  }, [transactions]);

  return (

    <div className="bg-white p-6 rounded shadow">

      <h2 className="font-semibold mb-4">
        Expenses by Category
      </h2>

      <ResponsiveContainer width="100%" height={300}>

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            outerRadius={120}
            label
          >

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

    </div>

  );

};

export default ExpenseChart;