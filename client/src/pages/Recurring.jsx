import { useState } from "react";
import { useFinance } from "../context/FinanceContext";

function Recurring() {

  const { addRecurring } = useFinance();

  const [form, setForm] = useState({
    title:"",
    amount:"",
    day:1,
    category:"Food"
  });

  const handleSubmit = (e)=>{

    e.preventDefault();

    addRecurring({
      title:form.title,
      amount:Number(form.amount),
      day:Number(form.day),
      category:form.category
    });

  };

  return (

    <div>

      <h1 className="text-xl font-bold mb-4">
        Add Recurring Transaction
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex gap-2"
      >

        <input
          placeholder="Title"
          onChange={(e)=>setForm({...form,title:e.target.value})}
          className="border p-2"
        />

        <input
          placeholder="Amount"
          onChange={(e)=>setForm({...form,amount:e.target.value})}
          className="border p-2"
        />

        <input
          type="number"
          defaultValue="1"
          onChange={(e)=>setForm({...form,day:e.target.value})}
          className="border p-2"
        />

        <button className="bg-red-500 text-white px-4">
          Add
        </button>

      </form>

    </div>

  );
}

export default Recurring;