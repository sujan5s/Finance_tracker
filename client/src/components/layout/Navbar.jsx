import { useLocation } from "react-router-dom";
import { useFinance } from "../../context/FinanceContext";
import { useTheme } from "../../context/ThemeContext";
import { Menu, Search, Bell, Sun, Moon } from "lucide-react";

const PAGE_TITLES = {
  "/dashboard":    "Overview",
  "/transactions": "Transactions",
  "/budgets":      "Monthly Budgets",
  "/recurring":    "Manage Recurring Payments",
};

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  const { user, selectedMonth, setSelectedMonth } = useFinance();
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useLocation();

  const title = Object.entries(PAGE_TITLES).find(([p]) => pathname.startsWith(p))?.[1] || "Overview";

  return (
    <header style={{
      height: 58,
      background: "var(--header-bg)",
      borderBottom: "1px solid var(--border-color)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 20px",
      flexShrink: 0,
      gap: 12,
    }}>
      {/* Left */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-secondary)", padding: 6, borderRadius: 6, display: "flex" }}
        >
          <Menu size={20} />
        </button>
        <h1 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>{title}</h1>
      </div>

      {/* Right */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {/* Month picker */}
        <input
          type="month"
          value={selectedMonth || ""}
          onChange={e => setSelectedMonth(e.target.value)}
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border-color)",
            borderRadius: 8,
            color: "var(--text-primary)",
            padding: "5px 10px",
            fontSize: 13,
            outline: "none",
          }}
        />

        {/* Search */}
        <div style={{ position: "relative", display: "none" }} className="sm:block" >
          <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-secondary)" }} />
          <input
            type="text"
            placeholder="Search transactions..."
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border-color)",
              borderRadius: 8,
              color: "var(--text-primary)",
              padding: "6px 10px 6px 30px",
              fontSize: 13,
              outline: "none",
              width: 180,
            }}
          />
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          title="Toggle theme"
          style={{
            width: 34, height: 34, borderRadius: 8,
            background: "var(--bg-surface)",
            border: "1px solid var(--border-color)",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", color: "var(--text-secondary)",
          }}
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Bell */}
        <button style={{
          width: 34, height: 34, borderRadius: 8, position: "relative",
          background: "var(--bg-surface)",
          border: "1px solid var(--border-color)",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", color: "var(--text-secondary)",
        }}>
          <Bell size={16} />
          <span style={{
            position: "absolute", top: 8, right: 8, width: 6, height: 6,
            background: "var(--accent-red)", borderRadius: "50%",
          }} />
        </button>

        {/* User */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div className="hidden sm:flex flex-col items-end">
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{user?.name || "Alex Rivera"}</span>
            <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>Premium Account</span>
          </div>
          <div style={{ width: 34, height: 34, borderRadius: "50%", overflow: "hidden", border: "2px solid var(--accent-green)", flexShrink: 0 }}>
            <img
              src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user?.name || "Felix"}&backgroundColor=fce5cd`}
              alt="avatar"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}