import prisma from "../config/prisma.js";

// Returns last N months of income + expense totals for the chart
export const getChartData = async (req, res) => {
  try {
    const userId = req.user.id;
    const months = parseInt(req.query.months) || 6;
    const now = new Date();
    const result = [];

    for (let i = months - 1; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const startDate = new Date(d.getFullYear(), d.getMonth(), 1);
      const endDate   = new Date(d.getFullYear(), d.getMonth() + 1, 1);

      const txns = await prisma.transaction.findMany({
        where: { userId, date: { gte: startDate, lt: endDate } },
        select: { type: true, amount: true },
      });

      const income  = txns.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
      const expense = txns.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);

      result.push({
        month: d.toLocaleString("default", { month: "short" }).toUpperCase(),
        year:  d.getFullYear(),
        income,
        expense,
      });
    }

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;
    const month = Number(req.query.month) || new Date().getMonth() + 1;
    const year  = Number(req.query.year)  || new Date().getFullYear();

    const startDate = new Date(year, month - 1, 1);
    const endDate   = new Date(year, month, 1);

    const transactions = await prisma.transaction.findMany({
      where: { userId, date: { gte: startDate, lt: endDate } },
    });

    const budget = await prisma.budget.findFirst({
      where: { userId, month, year },
    });

    const totalExpense = transactions.filter(t => t.type === "expense").reduce((s, t) => s + t.amount, 0);
    const totalIncome  = transactions.filter(t => t.type === "income").reduce((s, t) => s + t.amount, 0);
    const budgetAmount = budget ? budget.amount : 0;
    const remaining    = budgetAmount - totalExpense;

    res.json({ budget: budgetAmount, expense: totalExpense, income: totalIncome, remaining, transactions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};