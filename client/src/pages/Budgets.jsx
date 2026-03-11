import { useEffect, useState } from "react";
import axios from "axios";

function Budgets() {

  const currentMonth = new Date().toISOString().slice(0,7);

  const [selectedMonth,setSelectedMonth] = useState(currentMonth);
  const [budgetInput,setBudgetInput] = useState("");
  const [currentBudget,setCurrentBudget] = useState(null);
  const [budgetId,setBudgetId] = useState(null);

  const month = Number(selectedMonth.split("-")[1]);
  const year = Number(selectedMonth.split("-")[0]);

  useEffect(()=>{
    fetchBudget();
  },[selectedMonth]);

  const fetchBudget = async ()=>{

    try{

      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:5000/api/budget?month=${month}&year=${year}`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      if(res.data){

        setCurrentBudget(res.data.amount);
        setBudgetId(res.data.id);

      }else{

        setCurrentBudget(null);
        setBudgetId(null);

      }

    }catch(err){

      setCurrentBudget(null);
      setBudgetId(null);

    }

  };

  const handleSave = async ()=>{

    if(!budgetInput) return;

    const token = localStorage.getItem("token");

    try{

      await axios.post(
        "http://localhost:5000/api/budget",
        {
          amount:budgetInput,
          month,
          year
        },
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      setCurrentBudget(budgetInput);
      setBudgetInput("");

      fetchBudget();

    }catch(err){

      console.log(err);

    }

  };

  const handleEdit = ()=>{

    setBudgetInput(currentBudget);

  };

  const handleDelete = async ()=>{

    if(!budgetId) return;

    const token = localStorage.getItem("token");

    try{

      await axios.delete(
        `http://localhost:5000/api/budget/${budgetId}`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      setCurrentBudget(null);
      setBudgetInput("");
      setBudgetId(null);

    }catch(err){

      console.log(err);

    }

  };

  const formattedMonth = new Date(selectedMonth+"-01")
  .toLocaleString("default",{month:"long",year:"numeric"});

  return(

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-6">
        Budgets
      </h1>

      {/* FORM */}

      <div className="bg-white p-4 rounded shadow mb-6 flex gap-3 flex-wrap">

        <input
          type="month"
          value={selectedMonth}
          onChange={(e)=>setSelectedMonth(e.target.value)}
          className="border p-2"
        />

        <input
          type="number"
          placeholder="Enter monthly budget"
          value={budgetInput}
          onChange={(e)=>setBudgetInput(e.target.value)}
          className="border p-2 flex-1"
        />

        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>

      </div>

      {/* TABLE */}

      <div className="bg-white rounded shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-3 text-left">Month</th>
              <th className="p-3">Budget</th>
              <th className="p-3">Actions</th>
            </tr>

          </thead>

          <tbody>

            {currentBudget ? (

              <tr className="border-t">

                <td className="p-3">
                  {formattedMonth}
                </td>

                <td className="p-3 font-semibold">
                  ₹{currentBudget}
                </td>

                <td className="p-3 flex gap-2">

                  <button
                    onClick={handleEdit}
                    className="bg-yellow-400 px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={handleDelete}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ) : (

              <tr>

                <td colSpan="3" className="p-4 text-center text-gray-500">
                  No budget set for this month
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default Budgets;