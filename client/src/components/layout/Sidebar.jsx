import { Link, useLocation } from "react-router-dom";
import { useFinance } from "../../context/FinanceContext";
import { LayoutDashboard, ArrowRightLeft, Wallet, RefreshCw, BarChart3, Settings, LogOut, CreditCard, X } from "lucide-react";

const NAV = [
  { to: "/dashboard",    icon: LayoutDashboard, label: "Dashboard" },
  { to: "/transactions", icon: ArrowRightLeft,  label: "Transactions" },
  { to: "/budgets",      icon: Wallet,          label: "Budgets" },
  { to: "/recurring",    icon: RefreshCw,       label: "Recurring" },
];

const BOTTOM_NAV = [
  { to: "/reports",  icon: BarChart3, label: "Reports" },
  { to: "/settings", icon: Settings,  label: "Settings" },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const { user } = useFinance();
  const { pathname } = useLocation();

  const isActive = (to) => pathname === to || pathname.startsWith(to + "/");

  const close = () => {
    if (window.innerWidth < 768) setSidebarOpen(false);
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <aside
      style={{
        width: 224,
        minWidth: 224,
        height: "100%",
        background: "var(--sidebar-bg)",
        borderRight: "1px solid var(--border-color)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* ── Logo ── */}
      <div style={{ padding: "18px 20px 16px", borderBottom: "1px solid var(--border-color)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link to="/dashboard" onClick={close} style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--accent-green)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <CreditCard size={16} color="#fff" />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text-primary)" }}>FinanceTracker</div>
            <div style={{ fontSize: 10, color: "var(--accent-green)", fontWeight: 600 }}>Your Financial Assistant</div>
          </div>
        </Link>
        <button
          onClick={() => setSidebarOpen(false)}
          style={{ display: "none" }}
          className="md:hidden"
        >
          <X size={16} color="var(--text-secondary)" />
        </button>
      </div>

      {/* ── User Card ── */}
      <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--border-color)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, background: "var(--bg-card)" }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", overflow: "hidden", border: "2px solid var(--accent-green)", flexShrink: 0 }}>
            <img
              src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user?.name || "Alex"}&backgroundColor=fce5cd`}
              alt="avatar"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 13, color: "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {user?.name || "user.name"}
            </div>
            <div style={{ fontSize: 10, color: "var(--accent-green)", fontWeight: 600, textTransform: "lowercase", letterSpacing: "0.05em" }}>
              {user?.email || "user.email"}
            </div>
          </div>
        </div>
      </div>

      {/* ── Nav ── */}
      <nav style={{ flex: 1, padding: "12px 12px 0", overflowY: "auto" }}>
        <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-secondary)", padding: "0 8px 8px" }}>
          Main Menu
        </div>
        {NAV.map(({ to, icon: Icon, label }) => {
          const active = isActive(to);
          return (
            <Link
              key={to}
              to={to}
              onClick={close}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "9px 12px",
                borderRadius: 8,
                marginBottom: 2,
                fontWeight: active ? 600 : 500,
                fontSize: 14,
                textDecoration: "none",
                color: active ? "var(--nav-active-text)" : "var(--text-secondary)",
                background: active ? "var(--nav-active-bg)" : "transparent",
              }}
            >
              <Icon size={16} />
              <span style={{ flex: 1 }}>{label}</span>
            </Link>
          );
        })}

        <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-secondary)", padding: "14px 8px 8px" }}>
          General
        </div>
        {BOTTOM_NAV.map(({ to, icon: Icon, label }) => (
          <Link
            key={label}
            to={to}
            onClick={close}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "9px 12px",
              borderRadius: 8,
              marginBottom: 2,
              fontWeight: 500,
              fontSize: 14,
              textDecoration: "none",
              color: "var(--text-secondary)",
            }}
          >
            <Icon size={16} />
            {label}
          </Link>
        ))}
      </nav>

      {/* ── Bottom ── */}
      <div style={{ padding: "14px 12px 18px", borderTop: "1px solid var(--border-color)" }}>
        <button
          onClick={logout}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "9px 12px",
            borderRadius: 8,
            background: "transparent",
            color: "var(--text-secondary)",
            fontWeight: 500,
            fontSize: 14,
            border: "none",
            cursor: "pointer",
          }}
        >
          <LogOut size={15} />
          Logout
        </button>
      </div>
    </aside>
  );
}