import { useFinance } from "../context/FinanceContext";
import SummaryCard from "../components/dashboard/SummaryCard";
import CategoryPieChart from "../components/dashboard/CategoryPieChart";
import MonthlyBarChart from "../components/dashboard/MonthlyBarChart";

const Dashboard = () => {
  const {
    totalBalance,
    totalIncome,
    totalExpense,
    dateFilter,
    setDateFilter,
  } = useFinance();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <select
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="border rounded-xl p-2"
        >
          <option value="all">All Time</option>
          <option value="thisMonth">This Month</option>
          <option value="lastMonth">Last Month</option>
        </select>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          title="Total Balance"
          amount={`₹${totalBalance}`}
          color="bg-emerald-100"
        />
        <SummaryCard
          title="Income"
          amount={`₹${totalIncome}`}
          color="bg-purple-100"
        />
        <SummaryCard
          title="Expense"
          amount={`₹${totalExpense}`}
          color="bg-rose-100"
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <CategoryPieChart />
        <MonthlyBarChart />
      </div>
    </div>
  );
};

export default Dashboard;