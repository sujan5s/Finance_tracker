import prisma from "./config/prisma.js";

async function run() {
  const recurring = await prisma.recurringTransaction.findMany();
  console.log("RECURRING:", recurring);
  const tx = await prisma.transaction.findMany();
  console.log("TRANSACTIONS:", tx);
  const budget = await prisma.budget.findMany();
  console.log("BUDGET:", budget);
  process.exit(0);
}

run();
