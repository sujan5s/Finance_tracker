import { useEffect, useState } from "react";
import { useFinance } from "../context/FinanceContext";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";

const EXPENSE_CATS = ["Food", "Transport", "Shopping", "Bills", "Entertainment", "Health", "Other"];
const INCOME_CATS  = ["Salary", "Freelance", "Investment", "Business", "Other"];

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

export default function Transactions() {
  const { transactions, fetchTransactions, addTransaction, updateTransaction, deleteTransaction, selectedMonth } = useFinance();

  const [type, setType]         = useState("expense");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm]         = useState({ title: "", amount: "", category: "Food", date: "" });
  const [showForm, setShowForm]  = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, [selectedMonth]);

  const resetForm = () => {
    setForm({ title: "", amount: "", category: "Food", date: "" });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { ...form, amount: Number(form.amount), type };
    if (editingId) {
      updateTransaction(editingId, data);
    } else {
      addTransaction(data);
    }
    resetForm();
  };

  const handleEdit = (t) => {
    setForm({ title: t.title, amount: t.amount, category: t.category || "Other", date: t.date?.split("T")[0] || "" });
    setType(t.type);
    setEditingId(t.id);
    setShowForm(true);
  };

  const cats = type === "income" ? INCOME_CATS : EXPENSE_CATS;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 800, color: "var(--text-primary)" }}>Transactions</h1>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--text-secondary)" }}>Manage and track your financial activities across all accounts</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={() => { setType("income"); setShowForm(true); }}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", borderRadius: 8, background: "var(--accent-green)", color: "#fff", fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer" }}
          >
            <Plus size={16} /> Add Income
          </button>
          <button
            onClick={() => { setType("expense"); setShowForm(true); }}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "9px 16px", borderRadius: 8, background: "rgba(248,113,113,0.15)", color: "var(--accent-red)", fontWeight: 700, fontSize: 14, border: "1px solid var(--accent-red)", cursor: "pointer" }}
          >
            <Plus size={16} /> Add Expense
          </button>
        </div>
      </div>

      {/* Quick Entry Form */}
      {showForm && (
        <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color)", borderRadius: 12, padding: "20px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
            <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>
              ⚡ {editingId ? "Edit" : "Quick Entry"} — {type === "income" ? "Income" : "Expense"}
            </h2>
            <button onClick={resetForm} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-secondary)" }}>
              <X size={18} />
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr auto", gap: 12, alignItems: "end" }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-secondary)", display: "block", marginBottom: 5 }}>Title</label>
                <input style={inputStyle} type="text" placeholder="e.g. Groceries" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-secondary)", display: "block", marginBottom: 5 }}>Amount</label>
                <input style={inputStyle} type="number" placeholder="$ 0.00" min="0" step="0.01" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} required />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-secondary)", display: "block", marginBottom: 5 }}>Category</label>
                <select style={inputStyle} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                  {cats.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-secondary)", display: "block", marginBottom: 5 }}>Date</label>
                <input style={inputStyle} type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required />
              </div>
              <button type="submit" style={{ padding: "9px 18px", borderRadius: 8, background: "var(--accent-green)", color: "#fff", fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer", whiteSpace: "nowrap" }}>
                Save Entry
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color)", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                {["Date", "Transaction", "Category", "Type", "Amount", "Actions"].map(h => (
                  <th key={h} style={{ padding: "11px 20px", textAlign: "left", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--accent-green)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: "48px 20px", textAlign: "center", color: "var(--text-secondary)", fontSize: 14 }}>
                    No transactions for this month. Click "Add Income" or "Add Expense" to get started.
                  </td>
                </tr>
              ) : (
                transactions.map((t) => {
                  const isIncome = t.type === "income";
                  return (
                    <tr key={t.id} style={{ borderBottom: "1px solid var(--border-color)" }}>
                      <td style={{ padding: "14px 20px", fontSize: 13, color: "var(--text-secondary)" }}>{fmtDate(t.date)}</td>
                      <td style={{ padding: "14px 20px" }}>
                        <div style={{ fontWeight: 600, fontSize: 14, color: "var(--text-primary)" }}>{t.title}</div>
                      </td>
                      <td style={{ padding: "14px 20px" }}>
                        <span style={{ padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 700, background: "var(--bg-primary)", color: "var(--text-secondary)", border: "1px solid var(--border-color)" }}>
                          {t.category || (isIncome ? "Income" : "General")}
                        </span>
                      </td>
                      <td style={{ padding: "14px 20px" }}>
                        <span style={{
                          padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 700,
                          background: isIncome ? "rgba(0,208,94,0.12)" : "rgba(248,113,113,0.12)",
                          color: isIncome ? "var(--accent-green)" : "var(--accent-red)",
                        }}>
                          ● {t.type.toUpperCase()}
                        </span>
                      </td>
                      <td style={{ padding: "14px 20px", fontSize: 14, fontWeight: 700, color: isIncome ? "var(--accent-green)" : "var(--accent-red)" }}>
                        {isIncome ? "+" : "-"}₹{Number(t.amount).toFixed(2)}
                      </td>
                      <td style={{ padding: "14px 20px" }}>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button
                            onClick={() => handleEdit(t)}
                            style={{ width: 30, height: 30, borderRadius: 6, background: "var(--bg-primary)", border: "1px solid var(--border-color)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)" }}
                          >
                            <Pencil size={13} />
                          </button>
                          <button
                            onClick={() => deleteTransaction(t.id)}
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
