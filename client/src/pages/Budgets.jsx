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

    <div>

      <h1 className="text-2xl font-bold mb-6">
        Monthly Budget
      </h1>

      <div className="bg-white p-6 rounded-xl shadow mb-6">

        <h2 className="mb-3 font-medium">
          Select Month
        </h2>

        <input
          type="month"
          value={selectedMonth}
          onChange={(e)=>setSelectedMonth(e.target.value)}
          className="border p-3 rounded mb-4"
        />

        <div className="flex gap-3">

          <input
            type="number"
            placeholder="Enter monthly budget"
            value={budgetInput}
            onChange={(e)=>setBudgetInput(e.target.value)}
            className="flex-1 border rounded-lg p-3"
          />

          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-6 rounded-lg"
          >
            Save
          </button>

        </div>

      </div>

      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-lg mb-2">
          Current Budget
        </h2>

        <p className="text-gray-500 mb-2">
          {formattedMonth}
        </p>

        {currentBudget ? (

          <div>

            <h3 className="text-3xl font-bold mb-4">
              ₹{currentBudget}
            </h3>

            <div className="flex gap-3">

              <button
                onClick={handleEdit}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Edit
              </button>

              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>

            </div>

          </div>

        ) : (

          <p className="text-gray-500">
            No budget set for this month.
          </p>

        )}

      </div>

    </div>

  );
}

export default Budgets;