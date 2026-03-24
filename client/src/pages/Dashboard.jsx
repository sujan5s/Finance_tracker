import { useEffect, useState } from "react";
import { useFinance } from "../context/FinanceContext";
import { TrendingUp, TrendingDown, Target, PiggyBank, Filter } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { getCategoryColor, CategoryIcon, CategoryBadge } from "../utils/categories";

const fmtINR = (n) => {
  const v = Math.abs(n ?? 0);
  return "₹" + Number(v).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const fmtDate = (d) => {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("en-IN", { month: "short", day: "2-digit", year: "numeric" });
};



export default function Dashboard() {
  const {
    dashboard, fetchDashboard, fetchChartData, fetchTransactions,
    transactions, loading, chartData, selectedMonth
  } = useFinance();

  const [chartMonths, setChartMonths] = useState(6);

  useEffect(() => {
    fetchDashboard();
    fetchTransactions();
    fetchChartData(chartMonths);
  }, [selectedMonth, chartMonths]);

  if (loading && !dashboard) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 300 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 32, height: 32, border: "2px solid var(--accent-green)", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 10px" }} />
          <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>Loading dashboard…</p>
        </div>
      </div>
    );
  }

  const income = dashboard?.income || 0;
  const expense = dashboard?.expense || 0;
  const budget = dashboard?.budget || 0;
  const remaining = dashboard?.remaining ?? (budget - expense);

  const recentTxns = (transactions || []).slice(0, 5);

  // Category breakdown from real transactions
  const catTotals = {};
  (transactions || [])
    .filter(t => t.type === "expense")
    .forEach(t => {
      const cat = t.category || "Other";
      catTotals[cat] = (catTotals[cat] || 0) + Number(t.amount);
    });
  const categories = Object.entries(catTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  const maxCat = categories[0]?.[1] || 1;

  const kpiCards = [
    { label: "Total Income", value: income, change: null, icon: <TrendingUp size={18} />, color: "var(--accent-green)" },
    { label: "Total Expenses", value: expense, change: null, icon: <TrendingDown size={18} />, color: "var(--accent-red)" },
    { label: "Monthly Budget", value: budget, change: "Target", icon: <Target size={18} />, color: "#3b82f6" },
    { label: "Remaining", value: remaining, change: budget > 0 ? `${Math.round((expense / budget) * 100)}% used` : null, icon: <PiggyBank size={18} />, color: "var(--accent-yellow)" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* ── 4 KPI Cards ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
        {kpiCards.map((k, i) => (
          <div key={i} style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color)", borderRadius: 12, padding: "18px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 500 }}>{k.label}</span>
              <div style={{ width: 34, height: 34, borderRadius: 8, background: k.color + "22", display: "flex", alignItems: "center", justifyContent: "center", color: k.color }}>
                {k.icon}
              </div>
            </div>
            <div style={{ fontSize: 24, fontWeight: 800, color: "var(--text-primary)", marginBottom: 6 }}>
              {fmtINR(k.value)}
            </div>
            {k.change && (
              <span style={{ fontSize: 12, color: "var(--text-secondary)" }}>{k.change}</span>
            )}
          </div>
        ))}
      </div>

      {/* ── Charts Row ── */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-4">

        {/* Bar chart — real data from API */}
        <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color)", borderRadius: 12, padding: "20px 24px", minWidth: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>Income vs Expenses</h2>
              <p style={{ margin: "4px 0 0", fontSize: 12, color: "var(--text-secondary)" }}>Last {chartMonths} months overview</p>
            </div>
            <div style={{ display: "flex", gap: 4, background: "var(--bg-primary)", padding: 3, borderRadius: 8, border: "1px solid var(--border-color)" }}>
              {[6, 12, 24].map(m => (
                <button
                  key={m}
                  onClick={() => setChartMonths(m)}
                  style={{
                    padding: "4px 8px",
                    fontSize: 11,
                    fontWeight: 600,
                    borderRadius: 6,
                    border: "none",
                    cursor: "pointer",
                    background: chartMonths === m ? "var(--accent-green)" : "transparent",
                    color: chartMonths === m ? "#fff" : "var(--text-secondary)",
                    transition: "all 0.2s"
                  }}
                >
                  {m}M
                </button>
              ))}
            </div>
          </div>

          {chartData.length === 0 ? (
            <div style={{ height: 200, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)", fontSize: 14 }}>
              No data yet — add some transactions to see your chart!
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData} barGap={4} barSize={26}>
                <XAxis dataKey="month" tick={{ fill: "var(--text-secondary)", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ background: "var(--bg-surface)", border: "1px solid var(--border-color)", borderRadius: 8, fontSize: 12 }}
                  formatter={(v, name) => [fmtINR(v), name === "income" ? "Income" : "Expenses"]}
                />
                <Bar dataKey="income" fill="var(--accent-green)" radius={[4, 4, 0, 0]} name="income" />
                <Bar dataKey="expense" fill="#7c3a2d" radius={[4, 4, 0, 0]} name="expense" />
              </BarChart>
            </ResponsiveContainer>
          )}

          <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--text-secondary)" }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: "var(--accent-green)", display: "inline-block" }} />Income
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--text-secondary)" }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: "#7c3a2d", display: "inline-block" }} />Expenses
            </span>
          </div>
        </div>

        {/* Category breakdown pie */}
        <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color)", borderRadius: 12, padding: "20px 24px" }}>
          <h2 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>Monthly Spending</h2>
          {categories.length === 0 ? (
            <p style={{ color: "var(--text-secondary)", fontSize: 13, textAlign: "center", marginTop: 40 }}>
              No expense data for this month.
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {categories.map(([name, amount]) => {
                const pct = Math.round((amount / maxCat) * 100);
                const color = getCategoryColor(name);
                return (
                  <div key={name}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                      <span style={{ fontSize: 13, color: "var(--text-primary)" }}>{name}</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{fmtINR(amount)}</span>
                    </div>
                    <div style={{ height: 5, background: "var(--border-color)", borderRadius: 3, overflow: "hidden" }}>
                      <div style={{ width: `${pct}%`, height: "100%", background: getCategoryColor(name), borderRadius: 3 }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>

      {/* ── Recent Transactions ── */}
      <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color)", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: "16px 24px", borderBottom: "1px solid var(--border-color)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <h2 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>Recent Transactions</h2>
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, padding: "5px 10px", border: "1px solid var(--border-color)", borderRadius: 6, background: "transparent", color: "var(--text-secondary)", cursor: "pointer" }}>
              <Filter size={12} /> Filter
            </button>
            <a href="/transactions" style={{ fontSize: 12, color: "var(--accent-green)", border: "none", background: "transparent", cursor: "pointer", fontWeight: 600, textDecoration: "none" }}>
              View All
            </a>
          </div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-color)" }}>
                {["Transaction", "Category", "Date", "Amount", "Type"].map(h => (
                  <th key={h} style={{ padding: "10px 20px", textAlign: "left", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "var(--accent-green)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentTxns.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: "40px 20px", textAlign: "center", color: "var(--text-secondary)", fontSize: 14 }}>
                    No transactions yet — add one from the Transactions page!
                  </td>
                </tr>
              ) : (
                recentTxns.map((txn, i) => {
                  const isIncome = txn.type === "income";
                  return (
                    <tr key={txn.id || i} style={{ borderBottom: "1px solid var(--border-color)" }}>
                      <td style={{ padding: "14px 20px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <CategoryIcon category={txn.category || (isIncome ? "Income" : "Other")} size={34} />
                          <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>{txn.title}</span>
                        </div>
                      </td>
                      <td style={{ padding: "14px 20px" }}>
                        <CategoryBadge category={txn.category || (isIncome ? "Income" : "Other")} />
                      </td>
                      <td style={{ padding: "14px 20px", fontSize: 13, color: "var(--text-secondary)" }}>{fmtDate(txn.date)}</td>
                      <td style={{ padding: "14px 20px", fontSize: 13, fontWeight: 700, color: isIncome ? "var(--accent-green)" : "var(--accent-red)" }}>
                        {isIncome ? "+" : "-"}{fmtINR(Math.abs(txn.amount))}
                      </td>
                      <td style={{ padding: "14px 20px" }}>
                        <span style={{
                          padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 700,
                          background: isIncome ? "rgba(0,208,94,0.12)" : "rgba(248,113,113,0.12)",
                          color: isIncome ? "var(--accent-green)" : "var(--accent-red)",
                        }}>
                          ● {txn.type.toUpperCase()}
                        </span>
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