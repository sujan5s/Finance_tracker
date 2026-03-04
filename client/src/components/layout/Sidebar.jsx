import { Link } from "react-router-dom";

const Sidebar = ({ closeSidebar }) => {
  return (
    <div className="h-full p-6">
      <h1 className="text-2xl font-bold text-rose-500 mb-10">
        FinanceTracker
      </h1>

      <nav className="flex flex-col gap-6 text-gray-600">
        <Link to="/" onClick={closeSidebar}>
          Dashboard
        </Link>
        <Link to="/transactions" onClick={closeSidebar}>
          Transactions
        </Link>
        <Link to="/budgets" onClick={closeSidebar}>
          Budgets
        </Link>
        <Link to="/recurring" onClick={closeSidebar}>
          Recurring Transactions
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;