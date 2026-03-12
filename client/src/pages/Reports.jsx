import { useEffect, useState, useRef } from "react";
import { useFinance } from "../context/FinanceContext";
import { BarChart3, TrendingUp, TrendingDown, ArrowUpRight, FileText, Download } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { getCategoryColor, getCategoryInfo } from "../utils/categories";
import html2pdf from "html2pdf.js";

const fmtINR = (n) => "₹" + Number(Math.abs(n ?? 0)).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const fmtDate = (d) => d ? new Date(d).toLocaleDateString("en-IN", { month: "short", day: "2-digit", year: "numeric" }) : "—";

const COLORS = ["#00d05e", "#f87171", "#f59e0b", "#3b82f6", "#a855f7", "#ec4899", "#06b6d4"];

export default function Reports() {
  const { transactions, fetchTransactions, fetchChartData, chartData, dashboard, fetchDashboard, selectedMonth } = useFinance();
  const [isExporting, setIsExporting] = useState(false);
  const reportRef = useRef(null);

  useEffect(() => {
    fetchTransactions();
    fetchChartData();
    fetchDashboard();
  }, [selectedMonth]);

  // Category breakdown
  const expenseByCat = {};
  (transactions || []).filter(t => t.type === "expense").forEach(t => {
    expenseByCat[t.category || "Other"] = (expenseByCat[t.category || "Other"] || 0) + Number(t.amount);
  });
  const pieData = Object.entries(expenseByCat).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);

  const totalIncome  = (transactions || []).filter(t => t.type === "income").reduce((s, t) => s + Number(t.amount), 0);
  const totalExpense = (transactions || []).filter(t => t.type === "expense").reduce((s, t) => s + Number(t.amount), 0);
  const netSavings   = totalIncome - totalExpense;
  const savingsRate  = totalIncome > 0 ? Math.round((netSavings / totalIncome) * 100) : 0;

  const exportToPDF = async () => {
    if (!reportRef.current) return;
    setIsExporting(true);
    
    const opt = {
      margin:       [10, 10],
      filename:     `Finance_Report_${selectedMonth || "Monthly"}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { 
        scale: 2, 
        useCORS: true, 
        windowWidth: 1100,
        onclone: (doc) => {
          // Force all overflowing table wrappers to be fully visible and grids to expand
          const tableWrappers = doc.querySelectorAll('div[style*="overflow-x: auto"], div[style*="overflowX: auto"]');
          tableWrappers.forEach(el => { el.style.overflowX = 'visible'; });
        }
      },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    try {
      await html2pdf().set(opt).from(reportRef.current).save();
    } catch (err) {
      console.error("PDF Export failed", err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div ref={reportRef} style={{ display: "flex", flexDirection: "column", gap: 20, padding: isExporting ? "20px" : "0", background: "var(--bg-main)" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(0,208,94,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-green)" }}>
            <BarChart3 size={20} />
          </div>
          <div>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: "var(--text-primary)" }}>Financial Reports</h1>
            <p style={{ margin: 0, fontSize: 13, color: "var(--text-secondary)" }}>Detailed breakdown of your financial activity</p>
          </div>
        </div>

        {/* Generate Report Button */}
        <button
          onClick={exportToPDF}
          disabled={isExporting}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "9px 16px", borderRadius: 8,
            background: "var(--accent-green)", color: "#fff",
            fontWeight: 700, fontSize: 13, border: "none",
            cursor: isExporting ? "not-allowed" : "pointer",
            opacity: isExporting ? 0.7 : 1, transition: "opacity 0.2s"
          }}
        >
          <Download size={14} />
          {isExporting ? "Generating..." : "Generate PDF"}
        </button>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
        {[
          { label: "Total Income",   value: fmtINR(totalIncome),  color: "var(--accent-green)", icon: <TrendingUp size={18} /> },
          { label: "Total Expenses", value: fmtINR(totalExpense), color: "var(--accent-red)",   icon: <TrendingDown size={18} /> },
          { label: "Net Savings",    value: fmtINR(netSavings),   color: netSavings >= 0 ? "var(--accent-green)" : "var(--accent-red)", icon: <ArrowUpRight size={18} /> },
          { label: "Savings Rate",   value: `${savingsRate}%`,    color: "var(--accent-yellow)", icon: <BarChart3 size={18} /> },
        ].map((s, i) => (
          <div key={i} style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color)", borderRadius: 12, padding: "16px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 500 }}>{s.label}</span>
              <span style={{ color: s.color }}>{s.icon}</span>
            </div>
            <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 16 }}>

        {/* Monthly trend */}
        <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color)", borderRadius: 12, padding: "20px 24px" }}>
          <h2 style={{ margin: "0 0 18px", fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>Income vs Expenses — Last 6 Months</h2>
          {chartData.length === 0 ? (
            <div style={{ height: 200, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)", fontSize: 14 }}>
              No chart data yet.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={chartData} barGap={4} barSize={24}>
                <XAxis dataKey="month" tick={{ fill: "var(--text-secondary)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "var(--text-secondary)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => "₹" + (v >= 1000 ? Math.round(v / 1000) + "k" : v)} />
                <Tooltip contentStyle={{ background: "var(--bg-surface)", border: "1px solid var(--border-color)", borderRadius: 8, fontSize: 12 }} formatter={v => fmtINR(v)} />
                <Bar dataKey="income"  fill="var(--accent-green)" radius={[4,4,0,0]} name="Income" />
                <Bar dataKey="expense" fill="#7c3a2d"             radius={[4,4,0,0]} name="Expenses" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Expense by category pie */}
        <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color)", borderRadius: 12, padding: "20px 24px" }}>
          <h2 style={{ margin: "0 0 18px", fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>Expenses by Category</h2>
          {pieData.length === 0 ? (
            <div style={{ height: 200, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)", fontSize: 14 }}>
              No expense data.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} dataKey="value" paddingAngle={2}>
                  {pieData.map((entry, i) => (
                    <Cell key={entry.name} fill={getCategoryColor(entry.name)} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => fmtINR(v)} contentStyle={{ background: "var(--bg-surface)", border: "1px solid var(--border-color)", borderRadius: 8, fontSize: 12 }} />
                <Legend iconType="circle" iconSize={8} formatter={v => <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>{v}</span>} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Transactions breakdown table */}
      <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color)", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: "16px 24px", borderBottom: "1px solid var(--border-color)", display: "flex", alignItems: "center", gap: 8 }}>
          <FileText size={16} style={{ color: "var(--accent-green)" }} />
          <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>All Transactions This Month</h2>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                {["Date", "Title", "Category", "Type", "Amount"].map(h => (
                  <th key={h} style={{ padding: "10px 20px", textAlign: "left", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--accent-green)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr><td colSpan={5} style={{ padding: 40, textAlign: "center", color: "var(--text-secondary)" }}>No transactions found.</td></tr>
              ) : (
                transactions.map((t, i) => {
                  const isIncome = t.type === "income";
                  const info = getCategoryInfo(t.category || (isIncome ? "Income" : "Other"));
                  return (
                    <tr key={t.id || i} style={{ borderBottom: "1px solid var(--border-color)" }}>
                      <td style={{ padding: "12px 20px", fontSize: 12, color: "var(--text-secondary)", whiteSpace: "nowrap" }}>{fmtDate(t.date)}</td>
                      <td style={{ padding: "12px 20px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ fontSize: 18 }}>{info.emoji}</span>
                          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{t.title}</span>
                        </div>
                      </td>
                      <td style={{ padding: "12px 20px" }}>
                        <span style={{ padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600, background: info.bg, color: info.color }}>{t.category || "Other"}</span>
                      </td>
                      <td style={{ padding: "12px 20px" }}>
                        <span style={{ fontSize: 11, fontWeight: 700, color: isIncome ? "var(--accent-green)" : "var(--accent-red)" }}>
                          ● {t.type.toUpperCase()}
                        </span>
                      </td>
                      <td style={{ padding: "12px 20px", fontSize: 13, fontWeight: 700, color: isIncome ? "var(--accent-green)" : "var(--accent-red)" }}>
                        {isIncome ? "+" : "-"}{fmtINR(t.amount)}
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
