function Navbar({ sidebarOpen, setSidebarOpen }) {

  return (

    <div className="bg-white shadow p-4 flex items-center justify-between">

      {/* TOGGLE BUTTON */}

      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="text-xl"
      >
        ☰
      </button>

      <h1 className="font-bold text-lg text-pink-500">
        FinanceTracker
      </h1>

      <div>
        Welcome 👋
      </div>

    </div>

  );

}

export default Navbar;