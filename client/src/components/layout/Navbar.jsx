const Navbar = ({ toggleSidebar }) => {
  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      <button
        onClick={toggleSidebar}
        className="text-xl font-bold px-3 py-1 rounded-lg hover:bg-rose-100"
      >
        ☰
      </button>
      
      <h1 className="text-2xl font-bold text-rose-500">
        FinanceTracker
      </h1>

      <div className="text-gray-500">
        Welcome 👋
      </div>
    </div>
  );
};

export default Navbar;