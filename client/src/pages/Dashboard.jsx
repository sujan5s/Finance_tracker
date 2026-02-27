import SummaryCard from "../components/dashboard/SummaryCard";
import CategoryPieChart from "../components/dashboard/CategoryPieChart";
import MonthlyBarChart from "../components/dashboard/MonthlyBarChart";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-3 gap-6">
        <SummaryCard title="Total Balance" amount="₹45,000" color="bg-emerald-100" />
        <SummaryCard title="Monthly Income" amount="₹60,000" color="bg-purple-100" />
        <SummaryCard title="Monthly Expense" amount="₹15,000" color="bg-rose-100" />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <CategoryPieChart />
        <MonthlyBarChart />
      </div>
    </div>
  );
};

export default Dashboard;