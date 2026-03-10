import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDashboardSummary = async (req, res) => {

  try {

    const userId = req.user.userId;

    const transactions = await prisma.transaction.findMany({
      where: { userId }
    });

    let income = 0;
    let expense = 0;

    transactions.forEach(t => {
      if (t.type === "income") income += t.amount;
      else expense += t.amount;
    });

    res.json({
      income,
      expense,
      balance: income - expense
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};