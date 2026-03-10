import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getDashboard = async (req, res) => {

  try {

    const userId = req.userId;

    const transactions = await prisma.transaction.findMany({
      where: { userId }
    });

    let income = 0;
    let expenses = 0;

    transactions.forEach((t) => {

      if (t.type === "income") {
        income += t.amount;
      } else {
        expenses += t.amount;
      }

    });

    const balance = income - expenses;

    res.json({
      income,
      expenses,
      balance,
      transactions
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server error"
    });

  }

};