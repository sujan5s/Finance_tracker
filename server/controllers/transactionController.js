import prisma from "../config/prisma.js";
import { syncRecurringTransactions } from "../services/recurringSync.js";

// GET TRANSACTIONS BY MONTH

export const getTransactions = async (req, res) => {

  try {

    const { month, year } = req.query;

    await syncRecurringTransactions(req.user.id);

    const start = new Date(year, month - 1, 1);
    const end = new Date(year, month, 1);

    const transactions = await prisma.transaction.findMany({
      where: {
        userId: req.user.id,
        date: {
          gte: start,
          lt: end
        }
      },
      orderBy: {
        date: "desc"
      }
    });

    res.json(transactions);

  } catch (err) {

    console.error("Fetch Transactions Error:", err);

    res.status(500).json({
      message: "Failed to fetch transactions"
    });

  }

};


// ADD TRANSACTION

export const addTransaction = async (req, res) => {

  try {

    const { title, amount, type, category, date } = req.body;

    const transaction = await prisma.transaction.create({
      data: {
        title,
        amount: Number(amount),
        type,
        category,
        date: new Date(date),
        userId: req.user.id
      }
    });

    res.status(201).json(transaction);

  } catch (err) {

    console.error("Add Transaction Error:", err);

    res.status(500).json({
      message: "Failed to add transaction"
    });

  }

};


// UPDATE

export const updateTransaction = async (req, res) => {

  try {

    const { id } = req.params;

    const { title, amount, type, category, date } = req.body;

    const transaction = await prisma.transaction.update({
      where: { id: Number(id) },
      data: {
        title,
        amount: Number(amount),
        type,
        category,
        date: new Date(date)
      }
    });

    res.json(transaction);

  } catch (err) {

    console.error("Update Transaction Error:", err);

    res.status(500).json({
      message: "Failed to update transaction"
    });

  }

};


// DELETE

export const deleteTransaction = async (req, res) => {

  try {

    const { id } = req.params;

    await prisma.transaction.delete({
      where: { id: Number(id) }
    });

    res.json({
      message: "Transaction deleted"
    });

  } catch (err) {

    console.error("Delete Transaction Error:", err);

    res.status(500).json({
      message: "Failed to delete transaction"
    });

  }

};