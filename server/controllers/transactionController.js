import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTransactions = async (req, res) => {

  try {

    const userId = req.user.userId;

    const transactions = await prisma.transaction.findMany({
      where: { userId },
      orderBy: { date: "desc" }
    });

    res.json(transactions);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};

export const addTransaction = async (req, res) => {

  try {

    const { title, amount, type, category } = req.body;

    const userId = req.user.userId;

    const transaction = await prisma.transaction.create({
      data: {
        title,
        amount: parseFloat(amount),
        type,
        category,
        userId
      }
    });

    res.json(transaction);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};

export const deleteTransaction = async (req, res) => {

  try {

    const id = parseInt(req.params.id);

    await prisma.transaction.delete({
      where: { id }
    });

    res.json({ message: "Transaction deleted" });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};