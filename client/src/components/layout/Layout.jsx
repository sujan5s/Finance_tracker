import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex flex-col flex-1">

        <Navbar setSidebarOpen={setSidebarOpen} />

        <main className="p-4 overflow-y-auto">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default Layout;