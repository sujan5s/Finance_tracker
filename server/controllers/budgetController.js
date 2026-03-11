import prisma from "../config/prisma.js";


export const getBudget = async (req, res) => {

  try {

    const { month, year } = req.query;

    const budget = await prisma.budget.findFirst({
      where: {
        month: Number(month),
        year: Number(year),
        userId: req.user.id
      }
    });

    res.json(budget);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Failed to fetch budget"
    });

  }

};


export const createBudget = async (req, res) => {

  try {

    const { amount, month, year } = req.body;

    const existing = await prisma.budget.findFirst({
      where: {
        month: Number(month),
        year: Number(year),
        userId: req.user.id
      }
    });

    if (existing) {

      const updated = await prisma.budget.update({
        where: { id: existing.id },
        data: { amount: Number(amount) }
      });

      return res.json(updated);

    }

    const budget = await prisma.budget.create({
      data: {
        amount: Number(amount),
        month: Number(month),
        year: Number(year),
        userId: req.user.id
      }
    });

    res.status(201).json(budget);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Failed to create budget"
    });

  }

};


export const deleteBudget = async (req, res) => {

  try {

    const { id } = req.params;

    await prisma.budget.delete({
      where: {
        id: Number(id)
      }
    });

    res.json({
      message: "Budget deleted"
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      message: "Failed to delete budget"
    });

  }

};