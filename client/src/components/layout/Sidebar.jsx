import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-lg p-6">
      <h1 className="text-2xl font-bold text-rose-500 mb-10">
        FinanceTracker
      </h1>

      <nav className="flex flex-col gap-4 text-gray-600">
        <Link to="/" className="hover:text-rose-500">Dashboard</Link>
        <Link to="/transactions" className="hover:text-rose-500">Transactions</Link>
        <Link to="/budgets" className="hover:text-rose-500">Budgets</Link>
        <Link to="/recurring" className="hover:text-rose-500">Recurring</Link>
      </nav>
    </div>
  );
};

export default Sidebar;