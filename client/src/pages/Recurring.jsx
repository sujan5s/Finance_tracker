import { useEffect, useState } from "react";
import { useFinance } from "../context/FinanceContext";
import { Plus, Pencil, Trash2, X, RefreshCw } from "lucide-react";
import { CategoryIcon } from "../utils/categories";

const CATEGORIES  = ["Bills", "Subscription", "Rent", "Salary", "Utilities", "Health", "Entertainment", "Other"];
const FREQUENCIES = ["daily", "weekly", "monthly", "yearly"];

const inputStyle = {
  background: "var(--bg-primary)",
  border: "1px solid var(--border-color)",
  borderRadius: 8,
  color: "var(--text-primary)",
  padding: "8px 12px",
  fontSize: 14,
  outline: "none",
  width: "100%",
};

const fmtDate = (d) => {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
};

const capitalize = (s) => s ? s[0].toUpperCase() + s.slice(1) : s;

export default function Recurring() {
  const { recurring, fetchRecurring, addRecurring, updateRecurring, deleteRecurring } = useFinance();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: "", amount: "", type: "expense", category: "Bills", frequency: "monthly", startDate: ""
  });

  useEffect(() => { fetchRecurring(); }, []);

  const resetForm = () => {
    setForm({ title: "", amount: "", type: "expense", category: "Bills", frequency: "monthly", startDate: "" });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...form, amount: Number(form.amount) };
    if (editingId) {
      updateRecurring(editingId, data);
    } else {
      addRecurring(data);
    }
    resetForm();
  };

  const handleEdit = (r) => {
    setForm({
      title: r.title, amount: r.amount, type: r.type,
      category: r.category || "Bills", frequency: r.frequency,
      startDate: r.startDate?.split("T")[0] || ""
    });
    setEditingId(r.id);
    setShowForm(true);
  };

  const totalMonthly = (recurring || []).reduce((sum, r) => {
    const amt = Number(r.amount);
    if (r.frequency === "monthly") return sum + amt;
    if (r.frequency === "yearly")  return sum + amt / 12;
    if (r.frequency === "weekly")  return sum + amt * 4.33;
    if (r.frequency === "daily")   return sum + amt * 30;
    return sum + amt;
  }, 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "var(--text-primary)" }}>Manage Recurring Payments</h1>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--text-secondary)" }}>
            Schedule and track your automatic recurring transactions
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", borderRadius: 8, background: "var(--accent-green)", color: "#fff", fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer" }}
        >
          <Plus size={16} /> New Transaction
        </button>
      </div>

      {/* Schedule Form */}
      {showForm && (
        <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color)", borderRadius: 12, padding: "20px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 16 }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>
                ⚡ Schedule New Transaction
              </h2>
            </div>
            <button onClick={resetForm} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-secondary)" }}>
              <X size={18} />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 12 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-secondary)", display: "block", marginBottom: 5 }}>Transaction Title</label>
                <input style={inputStyle} type="text" placeholder="e.g. Netflix Subscription" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-secondary)", display: "block", marginBottom: 5 }}>Amount</label>
                <div style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--text-secondary)", fontSize: 13 }}>₹</span>
                  <input style={{ ...inputStyle, paddingLeft: 22 }} type="number" placeholder="0.00" min="0" step="0.01" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} required />
                </div>
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-secondary)", display: "block", marginBottom: 5 }}>Type</label>
                <select style={inputStyle} value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr auto", gap: 12, alignItems: "end" }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-secondary)", display: "block", marginBottom: 5 }}>Category</label>
                <select style={inputStyle} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-secondary)", display: "block", marginBottom: 5 }}>Frequency</label>
                <select style={inputStyle} value={form.frequency} onChange={e => setForm({ ...form, frequency: e.target.value })}>
                  {FREQUENCIES.map(f => <option key={f} value={f}>{capitalize(f)}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-secondary)", display: "block", marginBottom: 5 }}>Start Date</label>
                <input style={inputStyle} type="date" value={form.startDate} onChange={e => setForm({ ...form, startDate: e.target.value })} required />
              </div>
              <button type="submit" style={{ padding: "9px 18px", borderRadius: 8, background: "var(--accent-green)", color: "#fff", fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer", whiteSpace: "nowrap" }}>
                Save Schedule
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Active Recurring Payments */}
      <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color)", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", borderBottom: "1px solid var(--border-color)" }}>
          <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>Active Recurring Payments</h2>
          <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
            Total Monthly Outflow:{" "}
            <span style={{ color: "var(--accent-green)", fontWeight: 700 }}>₹{totalMonthly.toFixed(2)}</span>
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                {["Title & Category", "Amount", "Frequency", "Start Date", "Actions"].map(h => (
                  <th key={h} style={{ padding: "10px 20px", textAlign: "left", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--accent-green)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(!recurring || recurring.length === 0) ? (
                <tr>
                  <td colSpan={5} style={{ padding: "48px 20px", textAlign: "center", color: "var(--text-secondary)", fontSize: 14 }}>
                    No recurring payments scheduled. Click "+ New Transaction" to add one.
                  </td>
                </tr>
              ) : (
                recurring.map((r) => {
                  const isIncome = r.type === "income";
                  return (
                    <tr key={r.id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                      <td style={{ padding: "14px 20px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <CategoryIcon category={r.category || "Other"} size={36} />
                          <div>
                            <div style={{ fontWeight: 600, fontSize: 14, color: "var(--text-primary)" }}>{r.title}</div>
                            <div style={{ fontSize: 11, color: "var(--text-secondary)", marginTop: 2 }}>
                              {r.category} · {isIncome ? "AUTOMATIC" : "BANK TRANSFER"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: "14px 20px" }}>
                        <div style={{ fontWeight: 700, fontSize: 14, color: isIncome ? "var(--accent-green)" : "var(--text-primary)" }}>
                          ₹{Number(r.amount).toFixed(2)}
                        </div>
                        <div style={{ fontSize: 11, color: "var(--text-secondary)", textTransform: "uppercase", marginTop: 2 }}>
                          {isIncome ? "AUTOMATIC" : "BANK TRANSFER"}
                        </div>
                      </td>
                      <td style={{ padding: "14px 20px", fontSize: 13, color: "var(--text-primary)", textTransform: "capitalize" }}>
                        {r.frequency}
                      </td>
                      <td style={{ padding: "14px 20px" }}>
                        <div style={{ fontSize: 13, color: "var(--text-primary)" }}>{fmtDate(r.startDate)}</div>
                      </td>
                      <td style={{ padding: "14px 20px" }}>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button
                            onClick={() => handleEdit(r)}
                            style={{ width: 30, height: 30, borderRadius: 6, background: "var(--bg-primary)", border: "1px solid var(--border-color)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)" }}
                          >
                            <Pencil size={13} />
                          </button>
                          <button
                            onClick={() => deleteRecurring(r.id)}
                            style={{ width: 30, height: 30, borderRadius: 6, background: "rgba(248,113,113,0.1)", border: "1px solid var(--accent-red)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-red)" }}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
