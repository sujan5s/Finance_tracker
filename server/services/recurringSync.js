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
      
      // Use lastProcessedDate if it exists, otherwise use startDate
      let currentDate = new Date(rec.lastProcessedDate || rec.startDate);
      
      // If we've already processed this recurring transaction, increment to next period
      if (rec.lastProcessedDate) {
        if (rec.frequency === 'daily') {
          currentDate.setDate(currentDate.getDate() + 1);
        } else if (rec.frequency === 'monthly') {
          currentDate.setMonth(currentDate.getMonth() + 1);
        }
      } else {
        // First time processing - only generate if startDate is today or in the past
        if (currentDate > endOfToday) {
          continue; // Skip if startDate is in the future
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
        // Check if transactions already exist for these dates - normalize to date only
        const existingTransactions = await prisma.transaction.findMany({
          where: {
            userId: userId,
            title: rec.title,
            amount: rec.amount
          }
        });

        // Filter out duplicates by comparing dates (without time)
        const newTransactions = transactionsToCreate.filter(newTx => {
          const newDate = new Date(newTx.date);
          newDate.setHours(0, 0, 0, 0);
          
          return !existingTransactions.some(existing => {
            const existingDate = new Date(existing.date);
            existingDate.setHours(0, 0, 0, 0);
            return existingDate.getTime() === newDate.getTime();
          });
        });

        if (newTransactions.length > 0) {
          await prisma.transaction.createMany({
            data: newTransactions
          });
        }
        
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
