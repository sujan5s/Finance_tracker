import { PieChart, Pie, Cell, Tooltip } from "recharts";

const data = [
  { name: "Food", value: 4000 },
  { name: "Rent", value: 8000 },
  { name: "Entertainment", value: 2000 },
];

const COLORS = ["#fda4af", "#a78bfa", "#34d399"];

const CategoryPieChart = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h2 className="mb-4 font-semibold">Spending by Category</h2>
      <PieChart width={300} height={250}>
        <Pie data={data} dataKey="value" outerRadius={80}>
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default CategoryPieChart;