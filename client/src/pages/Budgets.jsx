import { useEffect, useState } from "react";
import axios from "axios";
import { useFinance } from "../context/FinanceContext";
import { Save, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

const API = "http://localhost:5000/api";

const inputStyle = {
  background: "var(--bg-primary)",
  border: "1px solid var(--border-color)",
  borderRadius: 8,
  color: "var(--text-primary)",
  padding: "8px 12px",
  fontSize: 14,
  outline: "none",
};

export default function Budgets() {
  const { selectedMonth, setSelectedMonth, dashboard, fetchDashboard } = useFinance();

  const [budgetInput, setBudgetInput] = useState("");
  const [currentBudget, setCurrentBudget] = useState(null);
  const [budgetId, setBudgetId] = useState(null);
  const [editing, setEditing] = useState(false);

  const month = Number(selectedMonth.split("-")[1]);
  const year  = Number(selectedMonth.split("-")[0]);

  const formattedMonth = new Date(selectedMonth + "-01").toLocaleString("default", { month: "long", year: "numeric" });

  const navMonth = (dir) => {
    const d = new Date(selectedMonth + "-01");
    d.setMonth(d.getMonth() + dir);
    setSelectedMonth(d.toISOString().slice(0, 7));
  };

  useEffect(() => {
    fetchBudget();
    fetchDashboard();
  }, [selectedMonth]);

  const fetchBudget = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API}/budget?month=${month}&year=${year}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data) {
        setCurrentBudget(res.data.amount);
        setBudgetId(res.data.id);
      } else {
        setCurrentBudget(null);
        setBudgetId(null);
      }
    } catch {
      setCurrentBudget(null);
      setBudgetId(null);
    }
  };

  const handleSave = async () => {
    if (!budgetInput) return;
    const token = localStorage.getItem("token");
    try {
      await axios.post(`${API}/budget`, { amount: Number(budgetInput), month, year }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchBudget();
      await fetchDashboard();
      setBudgetInput("");
      setEditing(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!budgetId) return;
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${API}/budget/${budgetId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCurrentBudget(null);
      setBudgetId(null);
      fetchDashboard();
    } catch (err) {
      console.error(err);
    }
  };

  const spent    = dashboard?.expense || 0;
  const budget   = currentBudget ? Number(currentBudget) : 0;
  const remaining = budget - spent;
  const usedPct  = budget > 0 ? Math.min((spent / budget) * 100, 100) : 0;
  const isOver   = remaining < 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Header */}
      <div>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "var(--text-primary)" }}>Monthly Budgets</h1>
        <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--text-secondary)" }}>
          Track and manage your spending limits for {formattedMonth}.
        </p>
      </div>

      {/* Month Selector + Quick Budget Set */}
      <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color)", borderRadius: 12, padding: "20px 24px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>

          {/* Month nav */}
          <div>
            <p style={{ margin: "0 0 8px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--text-secondary)" }}>Selected Month</p>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button onClick={() => navMonth(-1)} style={{ width: 28, height: 28, borderRadius: 6, border: "1px solid var(--border-color)", background: "var(--bg-primary)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)" }}>
                <ChevronLeft size={14} />
              </button>
              <span style={{ fontSize: 14, fontWeight: 600, color: "var(--text-primary)", minWidth: 120, textAlign: "center" }}>{formattedMonth}</span>
              <button onClick={() => navMonth(1)} style={{ width: 28, height: 28, borderRadius: 6, border: "1px solid var(--border-color)", background: "var(--bg-primary)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)" }}>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
          </div>

          {/* Budget input */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", gap: 12, flex: 1, minWidth: 280 }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <p style={{ margin: "0 0 8px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--text-secondary)" }}>Quick Budget Set</p>
              <div style={{ position: "relative", flex: 1 }}>
                <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-secondary)", fontSize: 13 }}>₹</span>
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={budgetInput}
                  onChange={e => setBudgetInput(e.target.value)}
                  style={{ ...inputStyle, paddingLeft: 24, width: "100%" }}
                />
              </div>
            </div>
            <button onClick={handleSave} style={{ padding: "9px 18px", borderRadius: 8, background: "var(--accent-green)", color: "#fff", fontWeight: 700, fontSize: 13, border: "none", cursor: "pointer", height: 38, whiteSpace: "nowrap" }}>
              <Save size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }} /> Save
            </button>
          </div>
        </div>
      </div>
      {/* Active Budget */}
      {currentBudget && (
        <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color)", borderRadius: 12, overflow: "hidden" }}>
          <div style={{ padding: "16px 24px", borderBottom: "1px solid var(--border-color)" }}>
            <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>Active Budget</h2>
          </div>

          {/* Table header */}
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                  {["Month", "Budgeted", "Spent", "Remaining", "Usage", "Actions"].map(h => (
                    <th key={h} style={{ padding: "10px 20px", textAlign: "left", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--accent-green)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "16px 20px", fontSize: 14, fontWeight: 600, color: "var(--text-primary)" }}>{formattedMonth}</td>
                  <td style={{ padding: "16px 20px", fontSize: 14, color: "var(--text-primary)" }}>₹{Number(budget).toFixed(2)}</td>
                  <td style={{ padding: "16px 20px", fontSize: 14, color: "var(--text-primary)" }}>₹{spent.toFixed(2)}</td>
                  <td style={{ padding: "16px 20px", fontSize: 14, fontWeight: 700, color: isOver ? "var(--accent-red)" : "var(--accent-green)" }}>
                    {isOver ? "-" : ""}₹{Math.abs(remaining).toFixed(2)}
                    {isOver && <div style={{ fontSize: 10, color: "var(--accent-red)", fontWeight: 600 }}>Over budget</div>}
                  </td>
                  <td style={{ padding: "16px 20px", minWidth: 140 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ flex: 1, height: 6, background: "var(--border-color)", borderRadius: 3, overflow: "hidden" }}>
                        <div style={{ width: `${usedPct}%`, height: "100%", background: isOver ? "var(--accent-red)" : usedPct > 80 ? "var(--accent-yellow)" : "var(--accent-green)", borderRadius: 3 }} />
                      </div>
                      <span style={{ fontSize: 11, color: "var(--text-secondary)", whiteSpace: "nowrap" }}>{Math.round(usedPct)}% used</span>
                    </div>
                  </td>
                  <td style={{ padding: "16px 20px" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        onClick={() => { setBudgetInput(currentBudget); setEditing(true); }}
                        style={{ width: 30, height: 30, borderRadius: 6, background: "var(--bg-primary)", border: "1px solid var(--border-color)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)" }}
                      >
                        <Pencil size={13} />
                      </button>
                      <button
                        onClick={handleDelete}
                        style={{ width: 30, height: 30, borderRadius: 6, background: "rgba(248,113,113,0.1)", border: "1px solid var(--accent-red)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-red)" }}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Summary cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {[
          { label: "Total Monthly Budget", value: `₹${Number(budget).toFixed(2)}`, color: "var(--text-primary)" },
          { label: "Total Spent",           value: `₹${spent.toFixed(2)}`,          color: "var(--accent-red)" },
          { label: "Remaining Total",       value: `${isOver ? "-" : ""}₹${Math.abs(remaining).toFixed(2)}`, color: isOver ? "var(--accent-red)" : "var(--accent-green)" },
        ].map(s => (
          <div key={s.label} style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color)", borderRadius: 12, padding: "18px 20px" }}>
            <p style={{ margin: "0 0 8px", fontSize: 12, color: "var(--text-secondary)", fontWeight: 500 }}>{s.label}</p>
            <p style={{ margin: 0, fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      {!currentBudget && (
        <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color)", borderRadius: 12, padding: "40px", textAlign: "center", color: "var(--text-secondary)" }}>
          No budget set for {formattedMonth}. Enter an amount above and click Save to get started.
        </div>
      )}

    </div>
  );
}
