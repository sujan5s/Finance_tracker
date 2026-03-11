import prisma from "../config/prisma.js";

export const getRecurring = async (req, res) => {
  try {

    const recurring = await prisma.recurringTransaction.findMany({
      where: {
        userId: req.user.id
      },
      orderBy: {
        startDate: "desc"
      }
    });

    res.json(recurring);

  } catch (err) {

    console.error("Recurring Fetch Error:", err);

    res.status(500).json({
      message: "Failed to fetch recurring transactions"
    });

  }
};


export const addRecurring = async (req, res) => {
  try {

    const {
      title,
      amount,
      type,
      category,
      frequency,
      startDate
    } = req.body;

    const recurring = await prisma.recurringTransaction.create({
      data: {
        title,
        amount: Number(amount),
        type,
        category,
        frequency,
        startDate: new Date(startDate),
        userId: req.user.id
      }
    });

    res.status(201).json(recurring);

  } catch (err) {

    console.error("Add Recurring Error:", err);

    res.status(500).json({
      message: "Failed to add recurring"
    });

  }
};


export const updateRecurring = async (req, res) => {
  try {

    const { id } = req.params;

    const {
      title,
      amount,
      type,
      category,
      frequency,
      startDate
    } = req.body;

    const recurring = await prisma.recurringTransaction.update({
      where: {
        id: Number(id)
      },
      data: {
        title,
        amount: Number(amount),
        type,
        category,
        frequency,
        startDate: new Date(startDate)
      }
    });

    res.json(recurring);

  } catch (err) {

    console.error("Update Recurring Error:", err);

    res.status(500).json({
      message: "Failed to update recurring"
    });

  }
};


export const deleteRecurring = async (req, res) => {
  try {

    const { id } = req.params;

    await prisma.recurringTransaction.delete({
      where: {
        id: Number(id)
      }
    });

    res.json({
      message: "Recurring deleted"
    });

  } catch (err) {

    console.error("Delete Recurring Error:", err);

    res.status(500).json({
      message: "Failed to delete recurring"
    });

  }
};