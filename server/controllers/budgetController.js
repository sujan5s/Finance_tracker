import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const getBudget = async (req,res)=>{

  try{

    const userId = req.userId;

    const { month, year } = req.query;

    const budget = await prisma.budget.findFirst({

      where:{
        userId,
        month:Number(month),
        year:Number(year)
      }

    });

    res.json(budget);

  }catch(err){

    console.log(err);

    res.status(500).json({
      error:err.message
    });

  }

};



export const setBudget = async (req,res)=>{

  try{

    const userId = req.userId;

    const { amount, month, year } = req.body;

    const existing = await prisma.budget.findFirst({

      where:{
        userId,
        month,
        year
      }

    });

    if(existing){

      const updated = await prisma.budget.update({

        where:{ id:existing.id },

        data:{
          amount:Number(amount)
        }

      });

      return res.json(updated);

    }

    const budget = await prisma.budget.create({

      data:{
        amount:Number(amount),
        month,
        year,
        userId
      }

    });

    res.json(budget);

  }catch(err){

    console.log(err);

    res.status(500).json({
      error:err.message
    });

  }

};



export const deleteBudget = async (req,res)=>{

  try{

    const { id } = req.params;

    await prisma.budget.delete({

      where:{
        id:Number(id)
      }

    });

    res.json({
      message:"Budget deleted"
    });

  }catch(err){

    console.log(err);

    res.status(500).json({
      error:err.message
    });

  }

};