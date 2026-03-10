import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTransactions = async (req, res) => {

  try {

    const userId = req.userId;

    const transactions = await prisma.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }
    });

    res.json(transactions);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: error.message
    });

  }

};

export const addTransaction = async (req, res) => {

  try {

    const userId = req.userId;

    const { amount, category, type, description } = req.body;

    const transaction = await prisma.transaction.create({
      data: {
        amount,
        category,
        type,
        description,
        userId
      }
    });

    res.json(transaction);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: error.message
    });

  }

};