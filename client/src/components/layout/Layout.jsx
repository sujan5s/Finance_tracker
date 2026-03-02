import { useState } from "react";
import Sidebar from "./sidebar";
import Navbar from "./navbar";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex h-screen bg-rose-50">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? "w-64" : "w-0"
        } h-full overflow-hidden`}
      >
        <Sidebar />
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col h-full">
        <Navbar toggleSidebar={() => setIsOpen(!isOpen)} />
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;