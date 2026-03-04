import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-rose-50 min-h-screen">
      
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-white shadow-lg z-40 
        transition-all duration-300 ease-in-out
        ${isOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full"}
        overflow-hidden`}
      >
        <Sidebar closeSidebar={() => setIsOpen(false)} />
      </div>

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ease-in-out
        ${isOpen ? "ml-64" : "ml-0"}`}
      >
        <Navbar toggleSidebar={() => setIsOpen(!isOpen)} />

        <div className="p-4 md:p-8 min-h-screen">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;