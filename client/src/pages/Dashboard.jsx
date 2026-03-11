import { useFinance } from "../context/FinanceContext";
import CategoryPieChart from "../components/dashboard/CategoryPieChart";

function Dashboard() {

  const { dashboard } = useFinance();

  const balance = dashboard?.balance || 0;
  const income = dashboard?.income || 0;
  const expenses = dashboard?.expenses || 0;

  return (

    <div>

      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

        <div className="bg-green-200 p-6 rounded-xl shadow">
          <p>Total Balance</p>
          <h2 className="text-2xl font-bold">₹{balance}</h2>
        </div>

        <div className="bg-purple-200 p-6 rounded-xl shadow">
          <p>Income</p>
          <h2 className="text-2xl font-bold">₹{income}</h2>
        </div>

        <div className="bg-red-200 p-6 rounded-xl shadow">
          <p>Expense</p>
          <h2 className="text-2xl font-bold">₹{expenses}</h2>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <CategoryPieChart />

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Monthly Overview</h2>
          <p>No data available</p>
        </div>

      </div>

    </div>

  );
}

export default Dashboard;