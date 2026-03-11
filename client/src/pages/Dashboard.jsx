import { useEffect } from "react";
import { useFinance } from "../context/FinanceContext";
import ExpenseChart from "../components/dashboard/ExpenseChart";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const Dashboard = () => {

  const { dashboard, fetchDashboard, loading } = useFinance();

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading || !dashboard) return <p>Loading...</p>;

  const data = [
    { name: "Income", value: dashboard.income },
    { name: "Expense", value: dashboard.expense }
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  const usedPercent =
    dashboard.budget > 0
      ? (dashboard.expense / dashboard.budget) * 100
      : 0;

  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Dashboard
      </h1>

      {/* CARDS */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">

        <div className="bg-green-100 p-4 rounded">
          <h3>Income</h3>
          <p>₹ {dashboard.income}</p>
        </div>

        <div className="bg-red-100 p-4 rounded">
          <h3>Expense</h3>
          <p>₹ {dashboard.expense}</p>
        </div>

        <div className="bg-blue-100 p-4 rounded">
          <h3>Budget</h3>
          <p>₹ {dashboard.budget}</p>
        </div>

        <div className="bg-yellow-100 p-4 rounded">
          <h3>Remaining</h3>
          <p>₹ {dashboard.remaining}</p>
        </div>

      </div>

      {/* CHARTS SECTION */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

        {/* INCOME VS EXPENSE */}

        <div className="bg-white p-6 rounded shadow">

          <h2 className="mb-4 font-semibold">
            Income vs Expense
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
                    fill={COLORS[index]}
                  />
                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

        {/* EXPENSE CATEGORY */}

        <div className="bg-white p-6 rounded shadow">

          <ExpenseChart />

        </div>

      </div>

      {/* BUDGET BAR */}

      <div className="bg-white p-6 rounded shadow">

        <h2 className="mb-3 font-semibold">
          Budget Usage
        </h2>

        <div className="w-full bg-gray-200 h-4 rounded">

          <div
            className="bg-blue-500 h-4 rounded"
            style={{ width: `${usedPercent}%` }}
          ></div>

        </div>

        <p className="mt-2 text-sm">
          ₹{dashboard.expense} of ₹{dashboard.budget} used
        </p>

      </div>

    </div>

  );

};

export default Dashboard;