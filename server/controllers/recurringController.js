import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getRecurring = async (req, res) => {

  try {

    const data = await prisma.recurringTransaction.findMany();

    res.json(data);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};

export const addRecurring = async (req, res) => {

  try {

    const { title, amount, type, category, frequency, startDate } = req.body;

    const recurring = await prisma.recurringTransaction.create({
      data: {
        title,
        amount: parseFloat(amount),
        type,
        category,
        frequency,
        startDate: new Date(startDate)
      }
    });

    res.json(recurring);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};

export const deleteRecurring = async (req, res) => {

  try {

    const id = parseInt(req.params.id);

    await prisma.recurringTransaction.delete({
      where: { id }
    });

    res.json({ message: "Recurring deleted" });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};