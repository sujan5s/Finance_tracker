import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useFinance } from "../../context/FinanceContext";

function CategoryPieChart() {

  const { transactions } = useFinance();

  const categoryTotals = {};

  transactions.forEach((t) => {

    if (t.type === "expense") {

      if (!categoryTotals[t.category]) {
        categoryTotals[t.category] = 0;
      }

      categoryTotals[t.category] += t.amount;
    }

  });

  const data = Object.keys(categoryTotals).map((category) => ({
    name: category,
    value: categoryTotals[category],
  }));

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
  ];

  return (
    <div className="bg-white p-4 rounded shadow">

      <h2 className="text-lg font-semibold mb-4">
        Expenses by Category
      </h2>

      <ResponsiveContainer width="100%" height={300}>

        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >

            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}

          </Pie>

          <Tooltip />
          <Legend />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}

export default CategoryPieChart;