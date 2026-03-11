import { Link } from "react-router-dom";

function Sidebar({ sidebarOpen, setSidebarOpen }) {

  const handleClick = () => {
    setSidebarOpen(false);
  };

  const handleLogout = () => {

    localStorage.removeItem("token");

    window.location.href = "/login";

  };

  return (

    <div
      className={`bg-white shadow h-screen flex flex-col justify-between transition-all duration-300
      ${sidebarOpen ? "w-64" : "w-0 overflow-hidden"}`}
    >

      <div>

        <div className="p-6 font-bold text-xl border-b">
          FinanceTracker
        </div>

        <nav className="flex flex-col p-4 gap-3">

          <Link
            to="/dashboard"
            onClick={handleClick}
            className="hover:bg-gray-100 p-2 rounded"
          >
           Dashboard
          </Link>

          <Link
            to="/transactions"
            onClick={handleClick}
            className="hover:bg-gray-100 p-2 rounded"
          >
            Transactions
          </Link>

          <Link
            to="/budgets"
            onClick={handleClick}
            className="hover:bg-gray-100 p-2 rounded"
          >
            Budgets
          </Link>

          <Link
            to="/recurring"
            onClick={handleClick}
            className="hover:bg-gray-100 p-2 rounded"
          >
            Recurring Transactions
          </Link>

        </nav>

      </div>


      {/* Logout Button */}

      <div className="p-4 border-t">

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>

      </div>

    </div>

  );

}

export default Sidebar;