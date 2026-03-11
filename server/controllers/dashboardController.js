import prisma from "../config/prisma.js";

export const getDashboard = async (req,res)=>{

  try{

    const userId = req.user.id;

    const month = Number(req.query.month) || new Date().getMonth()+1;
    const year = Number(req.query.year) || new Date().getFullYear();

    const startDate = new Date(year,month-1,1);
    const endDate = new Date(year,month,1);

    const transactions = await prisma.transaction.findMany({
      where:{
        userId,
        date:{
          gte:startDate,
          lt:endDate
        }
      }
    });

    const budget = await prisma.budget.findFirst({
      where:{
        userId,
        month,
        year
      }
    });

    const totalExpense = transactions
      .filter(t=>t.type==="expense")
      .reduce((sum,t)=>sum+t.amount,0);

    const totalIncome = transactions
      .filter(t=>t.type==="income")
      .reduce((sum,t)=>sum+t.amount,0);

    const budgetAmount = budget ? budget.amount : 0;

    const remaining = budgetAmount - totalExpense;

    res.json({
      budget:budgetAmount,
      expense:totalExpense,
      income:totalIncome,
      remaining,
      transactions
    });

  }catch(err){

    res.status(500).json({error:err.message});

  }

};