import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = () => window.innerWidth < 768;

  useEffect(() => {
    if (isMobile()) setSidebarOpen(false);
    const onResize = () => {
      if (!isMobile()) setSidebarOpen(true);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "var(--bg-primary)", color: "var(--text-primary)" }}>

      {/* Mobile backdrop */}
      {sidebarOpen && isMobile() && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 20 }}
        />
      )}

      {/* Static Sidebar — always part of the flex layout on desktop */}
      <div style={{
        flexShrink: 0,
        width: sidebarOpen ? 224 : 0,
        transition: "width 0.25s ease",
        overflow: "hidden",
        // On mobile it becomes fixed/absolute
        ...(isMobile() && sidebarOpen ? {
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: 30,
          height: "100%",
          width: 224,
        } : {}),
      }}>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>

      {/* Right area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}