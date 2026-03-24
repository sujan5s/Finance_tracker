import prisma from "../config/prisma.js";

export const syncRecurringTransactions = async (userId) => {
  try {
    const recurring = await prisma.recurringTransaction.findMany({
      where: { userId }
    });

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    for (const rec of recurring) {
      const transactionsToCreate = [];
      
      let currentDate = new Date(rec.lastProcessedDate || rec.startDate);
      
      if (rec.lastProcessedDate) {
        if (rec.frequency === 'daily') {
          currentDate.setDate(currentDate.getDate() + 1);
        } else if (rec.frequency === 'monthly') {
          currentDate.setMonth(currentDate.getMonth() + 1);
        }
      }

      while (currentDate <= endOfToday) {
        transactionsToCreate.push({
          title: rec.title,
          amount: rec.amount,
          type: rec.type,
          category: rec.category,
          date: new Date(currentDate),
          userId: userId
        });

        if (rec.frequency === 'daily') {
          currentDate.setDate(currentDate.getDate() + 1);
        } else if (rec.frequency === 'monthly') {
          currentDate.setMonth(currentDate.getMonth() + 1);
        } else {
          break; 
        }
      }

      if (transactionsToCreate.length > 0) {
        await prisma.transaction.createMany({
          data: transactionsToCreate
        });
        
        const lastGeneratedDate = transactionsToCreate[transactionsToCreate.length - 1].date;
        await prisma.recurringTransaction.update({
          where: { id: rec.id },
          data: { lastProcessedDate: lastGeneratedDate }
        });
      }
    }
  } catch (err) {
    console.error("Error syncing recurring transactions:", err);
  }
};
