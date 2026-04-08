import prisma from "./config/prisma.js";

async function run() {
  const allTx = await prisma.transaction.findMany();
  
  const keepIds = new Set();
  const deleteIds = [];
  const seen = new Set();

  for (const tx of allTx) {
    const key = `${tx.userId}-${tx.title}-${tx.amount}-${new Date(tx.date).getTime()}`;
    if (seen.has(key)) {
      deleteIds.push(tx.id);
    } else {
      seen.add(key);
      keepIds.add(tx.id);
    }
  }

  if (deleteIds.length > 0) {
    await prisma.transaction.deleteMany({
      where: { id: { in: deleteIds } }
    });
    console.log(`Deleted ${deleteIds.length} duplicate transactions.`);
  } else {
    console.log("No duplicates found.");
  }
}

run().catch(console.error).finally(() => process.exit(0));
