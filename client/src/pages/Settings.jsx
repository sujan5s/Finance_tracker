import { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import { useTheme } from "../context/ThemeContext";
import { User, Bell, Shield, Palette, Moon, Sun, Save, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const sectionStyle = {
  background: "var(--bg-surface)",
  border: "1px solid var(--border-color)",
  borderRadius: 12,
  overflow: "hidden",
};
const headerStyle = {
  padding: "16px 24px",
  borderBottom: "1px solid var(--border-color)",
  display: "flex",
  alignItems: "center",
  gap: 10,
};
const rowStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "14px 24px",
  borderBottom: "1px solid var(--border-color)",
  gap: 16,
  flexWrap: "wrap",
};
const labelStyle = { fontSize: 14, fontWeight: 500, color: "var(--text-primary)" };
const subStyle = { fontSize: 12, color: "var(--text-secondary)", marginTop: 2 };
const inputStyle = {
  background: "var(--bg-primary)",
  border: "1px solid var(--border-color)",
  borderRadius: 8,
  color: "var(--text-primary)",
  padding: "7px 12px",
  fontSize: 14,
  outline: "none",
  width: "100%",
  maxWidth: 260,
};
const toggleStyle = (on) => ({
  width: 44,
  height: 24,
  borderRadius: 12,
  background: on ? "var(--accent-green)" : "var(--border-color)",
  position: "relative",
  cursor: "pointer",
  border: "none",
  transition: "background 0.2s",
  flexShrink: 0,
});
const thumbStyle = (on) => ({
  position: "absolute",
  top: 3,
  left: on ? 23 : 3,
  width: 18,
  height: 18,
  borderRadius: "50%",
  background: "#fff",
  transition: "left 0.2s",
});

export default function Settings() {
  const { user } = useFinance();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [saved, setSaved] = useState(false);

  const [notifBudget, setNotifBudget] = useState(true);
  const [notifTransaction, setNotifTransaction] = useState(true);
  const [notifRecurring, setNotifRecurring] = useState(false);

  const handleSave = () => {
    // Profile save (extend with API call if needed)
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const Toggle = ({ on, onChange }) => (
    <button role="switch" aria-checked={on} onClick={onChange} style={toggleStyle(on)}>
      <div style={thumbStyle(on)} />
    </button>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 720 }}>

      <div>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "var(--text-primary)" }}>Settings</h1>
        <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--text-secondary)" }}>Manage your account preferences and notifications</p>
      </div>

      {/* Profile */}
      <div style={sectionStyle}>
        <div style={headerStyle}>
          <User size={16} style={{ color: "var(--accent-green)" }} />
          <span style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>Profile</span>
        </div>

        {/* Avatar */}
        <div style={{ padding: "18px 24px", borderBottom: "1px solid var(--border-color)", display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 60, height: 60, borderRadius: "50%", overflow: "hidden", border: "3px solid var(--accent-green)" }}>
            <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${name || "User"}&backgroundColor=fce5cd`} alt="avatar" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text-primary)" }}>{user?.name || "User"}</div>
            <div style={{ fontSize: 12, color: "var(--accent-green)", fontWeight: 600, marginTop: 2 }}>Premium Member</div>
          </div>
        </div>

        <div style={rowStyle}>
          <div><div style={labelStyle}>Display Name</div><div style={subStyle}>How your name appears in the app</div></div>
          <input value={name} onChange={e => setName(e.target.value)} style={inputStyle} placeholder="Your name" />
        </div>
        <div style={{ ...rowStyle, borderBottom: "none" }}>
          <div><div style={labelStyle}>Email</div><div style={subStyle}>Your account email address</div></div>
          <input value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} placeholder="you@email.com" type="email" />
        </div>

        <div style={{ padding: "14px 24px", borderTop: "1px solid var(--border-color)", display: "flex", justifyContent: "flex-end" }}>
          <button onClick={handleSave} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 18px", borderRadius: 8, background: "var(--accent-green)", color: "#fff", fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer" }}>
            <Save size={14} /> {saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Appearance */}
      <div style={sectionStyle}>
        <div style={headerStyle}>
          <Palette size={16} style={{ color: "var(--accent-green)" }} />
          <span style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>Appearance</span>
        </div>
        <div style={{ ...rowStyle, borderBottom: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {theme === "dark" ? <Moon size={16} style={{ color: "var(--text-secondary)" }} /> : <Sun size={16} style={{ color: "var(--text-secondary)" }} />}
            <div>
              <div style={labelStyle}>Dark Mode</div>
              <div style={subStyle}>Currently: {theme === "dark" ? "Dark" : "Light"} theme</div>
            </div>
          </div>
          <Toggle on={theme === "dark"} onChange={toggleTheme} />
        </div>
      </div>

      {/* Notifications */}
      <div style={sectionStyle}>
        <div style={headerStyle}>
          <Bell size={16} style={{ color: "var(--accent-green)" }} />
          <span style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>Notifications</span>
        </div>
        {[
          { label: "Budget Alerts", sub: "Get notified when you're close to your budget", on: notifBudget, set: setNotifBudget },
          { label: "Transaction Alerts", sub: "Notify on new income or expense transactions", on: notifTransaction, set: setNotifTransaction },
          { label: "Recurring Reminders", sub: "Reminders before recurring payments are processed", on: notifRecurring, set: setNotifRecurring },
        ].map((item, i, arr) => (
          <div key={item.label} style={{ ...rowStyle, ...(i === arr.length - 1 ? { borderBottom: "none" } : {}) }}>
            <div>
              <div style={labelStyle}>{item.label}</div>
              <div style={subStyle}>{item.sub}</div>
            </div>
            <Toggle on={item.on} onChange={() => item.set(p => !p)} />
          </div>
        ))}
      </div>

      {/* Security */}
      <div style={sectionStyle}>
        <div style={headerStyle}>
          <Shield size={16} style={{ color: "var(--accent-green)" }} />
          <span style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)" }}>Security</span>
        </div>
        <div style={{ ...rowStyle, borderBottom: "none" }}>
          <div>
            <div style={labelStyle}>Sign Out</div>
            <div style={subStyle}>Log out of your account on this device</div>
          </div>
          <button onClick={logout} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, background: "rgba(248,113,113,0.1)", border: "1px solid var(--accent-red)", color: "var(--accent-red)", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </div>

    </div>
  );
}
