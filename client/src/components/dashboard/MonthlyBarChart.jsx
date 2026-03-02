import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useFinance } from "../../context/FinanceContext";
import { useMemo } from "react";

const MonthlyBarChart = () => {
  const { transactions } = useFinance();

  const data = useMemo(() => {
    const grouped = {};

    transactions.forEach((tx) => {
      const month = new Date(tx.date).toLocaleString("default", {
        month: "short",
      });

      if (!grouped[month]) {
        grouped[month] = { month, income: 0, expense: 0 };
      }

      if (tx.type === "income") {
        grouped[month].income += tx.amount;
      } else {
        grouped[month].expense += tx.amount;
      }
    });

    return Object.values(grouped);
  }, [transactions]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md h-80">
      <h2 className="mb-4 font-semibold">Monthly Overview</h2>

      {data.length === 0 ? (
        <p className="text-gray-500">No data available</p>
      ) : (
        <ResponsiveContainer width="100%" height="85%">
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#34d399" />
            <Bar dataKey="expense" fill="#f87171" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default MonthlyBarChart;