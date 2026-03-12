import { useFinance } from "../../context/FinanceContext";

function Navbar({ sidebarOpen,setSidebarOpen }) {

  const { selectedMonth,setSelectedMonth } = useFinance();

  return(

    <div className="bg-white shadow p-4 flex items-center justify-between">

      <button
        onClick={()=>setSidebarOpen(!sidebarOpen)}
        className="text-xl"
      >
        ☰
      </button>

      <input
        type="month"
        value={selectedMonth}
        onChange={(e)=>setSelectedMonth(e.target.value)}
        className="border p-2 rounded"
      />

      <div>Finance Tracker</div>

    </div>

  );

}

export default Navbar;