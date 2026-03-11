import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:5000/api";

export const FinanceContext = createContext();

export const useFinance = () => useContext(FinanceContext);

export const FinanceProvider = ({ children }) => {

  const currentMonth = new Date().toISOString().slice(0,7);

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const [dashboard,setDashboard] = useState(null);
  const [transactions,setTransactions] = useState([]);
  const [recurring,setRecurring] = useState([]);
  const [user,setUser] = useState(null);
  const [loading,setLoading] = useState(false);

  const getToken = () => localStorage.getItem("token");

  const month = Number(selectedMonth.split("-")[1]);
  const year = Number(selectedMonth.split("-")[0]);

  // ---------------- PROFILE ----------------

  const fetchProfile = async () => {

    try{

      const token = getToken();

      const res = await axios.get(
        `${API}/user/profile`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      setUser(res.data);

    }catch(err){

      console.log(err.response?.data || err.message);

    }

  };


  // ---------------- DASHBOARD ----------------

  const fetchDashboard = async () => {

    try{

      setLoading(true);

      const token = getToken();

      const res = await axios.get(
        `${API}/dashboard?month=${month}&year=${year}`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      setDashboard(res.data);

    }catch(err){

      console.log(err.response?.data || err.message);

    }finally{

      setLoading(false);

    }

  };


  // ---------------- TRANSACTIONS ----------------

  const fetchTransactions = async () => {

    try{

      const token = getToken();

      const res = await axios.get(
        `${API}/transactions?month=${month}&year=${year}`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      setTransactions(res.data);

    }catch(err){

      console.log(err.response?.data || err.message);

    }

  };


  const addTransaction = async (data) => {

    try{

      const token = getToken();

      await axios.post(
        `${API}/transactions`,
        data,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      fetchTransactions();
      fetchDashboard();

    }catch(err){

      console.log(err.response?.data || err.message);

    }

  };


  const updateTransaction = async (id,data) => {

    try{

      const token = getToken();

      await axios.put(
        `${API}/transactions/${id}`,
        data,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      fetchTransactions();
      fetchDashboard();

    }catch(err){

      console.log(err.response?.data || err.message);

    }

  };


  const deleteTransaction = async (id) => {

    try{

      const token = getToken();

      await axios.delete(
        `${API}/transactions/${id}`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      fetchTransactions();
      fetchDashboard();

    }catch(err){

      console.log(err.response?.data || err.message);

    }

  };


  // ---------------- RECURRING ----------------

  const fetchRecurring = async () => {

    try{

      const token = getToken();

      const res = await axios.get(
        `${API}/recurring`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      setRecurring(res.data);

    }catch(err){

      console.log(err.response?.data || err.message);

    }

  };


  const addRecurring = async (data) => {

    try{

      const token = getToken();

      await axios.post(
        `${API}/recurring`,
        data,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      fetchRecurring();

    }catch(err){

      console.log(err.response?.data || err.message);

    }

  };


  const updateRecurring = async (id,data) => {

    try{

      const token = getToken();

      await axios.put(
        `${API}/recurring/${id}`,
        data,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      fetchRecurring();

    }catch(err){

      console.log(err.response?.data || err.message);

    }

  };


  const deleteRecurring = async (id) => {

    try{

      const token = getToken();

      await axios.delete(
        `${API}/recurring/${id}`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      fetchRecurring();

    }catch(err){

      console.log(err.response?.data || err.message);

    }

  };


  useEffect(()=>{

    const token = getToken();

    if(token){
      fetchProfile();
    }

  },[]);


  return(

    <FinanceContext.Provider
      value={{
        selectedMonth,
        setSelectedMonth,
        dashboard,
        transactions,
        recurring,
        user,
        loading,
        fetchDashboard,
        fetchTransactions,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        fetchRecurring,
        addRecurring,
        updateRecurring,
        deleteRecurring
      }}
    >

      {children}

    </FinanceContext.Provider>

  );

};