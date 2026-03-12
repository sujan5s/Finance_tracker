import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFinance } from "../../context/FinanceContext";
import { useTheme } from "../../context/ThemeContext";
import {
  Menu, Bell, Sun, Moon, Settings, BarChart3,
  LogOut, ChevronDown, X, CheckCheck, AlertCircle, TrendingUp, Wallet,
} from "lucide-react";

const PAGE_TITLES = {
  "/dashboard":    "Overview",
  "/transactions": "Transactions",
  "/budgets":      "Monthly Budgets",
  "/recurring":    "Manage Recurring Payments",
  "/reports":      "Reports",
  "/settings":     "Settings",
};

const SAMPLE_NOTIFS = [
  { id: 1, color: "#f87171", title: "Budget Alert", body: "You've used 80% of your monthly budget.", time: "5 min ago", read: false },
  { id: 2, color: "#00d05e", title: "Income Added",  body: "Salary of ₹1,00,000 was recorded.",   time: "2h ago",  read: false },
  { id: 3, color: "#f59e0b", title: "New Expense",   body: "Electricity bill ₹1,200 added.",       time: "Yesterday", read: true },
];

export default function Navbar({ sidebarOpen, setSidebarOpen }) {
  const { user, selectedMonth, setSelectedMonth, transactions } = useFinance();
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const title = Object.entries(PAGE_TITLES).find(([p]) => pathname.startsWith(p))?.[1] || "Overview";

  // ── Dropdowns state ──
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen,   setNotifOpen]   = useState(false);
  const [notifs, setNotifs] = useState(() => {
    try {
      const saved = localStorage.getItem("user_notifs");
      return saved ? JSON.parse(saved) : SAMPLE_NOTIFS;
    } catch {
      return SAMPLE_NOTIFS;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem("user_notifs", JSON.stringify(notifs));
  }, [notifs]);

  const profileRef = useRef(null);
  const notifRef   = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
      if (notifRef.current   && !notifRef.current.contains(e.target))   setNotifOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const unreadCount = notifs.filter(n => !n.read).length;

  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  const dismissNotif = (id) => setNotifs(prev => prev.filter(n => n.id !== id));

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Calendar icon colour fix: pass colorScheme via inline style
  const monthInputStyle = {
    background: "var(--bg-surface)",
    border: "1px solid var(--border-color)",
    borderRadius: 8,
    color: "var(--text-primary)",
    padding: "5px 10px",
    fontSize: 13,
    outline: "none",
    colorScheme: theme === "dark" ? "dark" : "light",
  };

  const iconBtn = {
    width: 34, height: 34, borderRadius: 8, position: "relative",
    background: "var(--bg-surface)",
    border: "1px solid var(--border-color)",
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", color: "var(--text-secondary)", flexShrink: 0,
  };

  const dropdownBase = {
    position: "absolute",
    top: "calc(100% + 8px)",
    right: 0,
    background: "var(--bg-surface)",
    border: "1px solid var(--border-color)",
    borderRadius: 12,
    boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
    zIndex: 999,
    minWidth: 220,
  };

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

      {/* ── Left ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-secondary)", padding: 6, borderRadius: 6, display: "flex" }}>
          <Menu size={20} />
        </button>
        <h1 style={{ fontSize: 18, fontWeight: 700, color: "var(--text-primary)", margin: 0 }}>{title}</h1>
      </div>

      {/* ── Right ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>

        {/* Month picker — colorScheme set inline for dark mode calendar icon fix */}
        <input type="month" value={selectedMonth || ""} onChange={e => setSelectedMonth(e.target.value)} style={monthInputStyle} />

        {/* Theme toggle */}
        <button onClick={toggleTheme} title="Toggle theme" style={iconBtn}>
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* ── Notification bell ── */}
        <div ref={notifRef} style={{ position: "relative" }}>
          <button onClick={() => { setNotifOpen(p => !p); setProfileOpen(false); }} style={iconBtn}>
            <Bell size={16} />
            {unreadCount > 0 && (
              <span style={{ position: "absolute", top: 7, right: 7, width: 7, height: 7, background: "var(--accent-red)", borderRadius: "50%", border: "1.5px solid var(--bg-surface)" }} />
            )}
          </button>

          {notifOpen && (
            <div style={{ ...dropdownBase, minWidth: 320 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: "1px solid var(--border-color)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>Notifications</span>
                  {unreadCount > 0 && (
                    <span style={{ padding: "1px 7px", background: "var(--accent-red)", color: "#fff", borderRadius: 10, fontSize: 11, fontWeight: 700 }}>{unreadCount}</span>
                  )}
                </div>
                <button onClick={markAllRead} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--accent-green)", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                  <CheckCheck size={13} /> Mark all read
                </button>
              </div>

              <div style={{ maxHeight: 320, overflowY: "auto" }}>
                {notifs.length === 0 ? (
                  <div style={{ padding: "32px 16px", textAlign: "center", color: "var(--text-secondary)", fontSize: 13 }}>
                    No notifications
                  </div>
                ) : (
                  notifs.map(n => (
                    <div key={n.id} style={{ display: "flex", gap: 12, padding: "12px 16px", borderBottom: "1px solid var(--border-color)", background: n.read ? "transparent" : "var(--nav-active-bg)", position: "relative" }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: n.color + "20", color: n.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <AlertCircle size={14} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{n.title}</div>
                        <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>{n.body}</div>
                        <div style={{ fontSize: 11, color: "var(--text-secondary)", marginTop: 4 }}>{n.time}</div>
                      </div>
                      <button onClick={() => dismissNotif(n.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-secondary)", padding: 2, alignSelf: "flex-start" }}>
                        <X size={13} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* ── Profile dropdown ── */}
        <div ref={profileRef} style={{ position: "relative" }}>
          <button
            onClick={() => { setProfileOpen(p => !p); setNotifOpen(false); }}
            style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", padding: "4px 6px", borderRadius: 8 }}
          >
            <div style={{ display: "none" }} className="sm:flex flex-col items-end">
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{user?.name || "User"}</span>
              <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>Premium Account</span>
            </div>
            <div style={{ width: 34, height: 34, borderRadius: "50%", overflow: "hidden", border: "2px solid var(--accent-green)", flexShrink: 0 }}>
              <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user?.name || "Felix"}&backgroundColor=fce5cd`} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <ChevronDown size={14} style={{ color: "var(--text-secondary)" }} />
          </button>

          {profileOpen && (
            <div style={dropdownBase}>
              {/* Profile header */}
              <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--border-color)" }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text-primary)" }}>{user?.name || "User"}</div>
                <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 2 }}>{user?.email || ""}</div>
              </div>

              {/* Menu items */}
              {[
                { icon: <BarChart3 size={15} />, label: "Reports",  path: "/reports" },
                { icon: <Settings  size={15} />, label: "Settings", path: "/settings" },
              ].map(item => (
                <button
                  key={item.path}
                  onClick={() => { navigate(item.path); setProfileOpen(false); }}
                  style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "11px 16px", background: "none", border: "none", cursor: "pointer", color: "var(--text-primary)", fontSize: 14, fontWeight: 500, textAlign: "left" }}
                >
                  <span style={{ color: "var(--text-secondary)" }}>{item.icon}</span>
                  {item.label}
                </button>
              ))}

              <div style={{ borderTop: "1px solid var(--border-color)", marginTop: 4 }}>
                <button
                  onClick={logout}
                  style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "11px 16px", background: "none", border: "none", cursor: "pointer", color: "var(--accent-red)", fontSize: 14, fontWeight: 500 }}
                >
                  <LogOut size={15} /> Sign out
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}