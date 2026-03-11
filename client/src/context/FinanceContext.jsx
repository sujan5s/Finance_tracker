import { createContext, useState, useContext } from "react";
import axios from "axios";

const API = "http://localhost:5000/api";

export const FinanceContext = createContext();

export const useFinance = () => useContext(FinanceContext);

export const FinanceProvider = ({ children }) => {

  const [dashboard, setDashboard] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [recurring, setRecurring] = useState([]);
  const [loading, setLoading] = useState(false);

  const getToken = () => localStorage.getItem("token");

  // ---------------- DASHBOARD ----------------

  const fetchDashboard = async () => {

    try {

      setLoading(true);

      const token = getToken();

      const today = new Date();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();

      const res = await axios.get(
        `${API}/dashboard?month=${month}&year=${year}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setDashboard(res.data);

    } catch (err) {

      console.log("Dashboard error:", err.response?.data || err.message);

    } finally {

      setLoading(false);

    }

  };

  // ---------------- TRANSACTIONS ----------------

  const fetchTransactions = async () => {

    try {

      const token = getToken();

      const res = await axios.get(`${API}/transactions`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setTransactions(res.data);

    } catch (err) {

      console.log("Transactions error:", err.response?.data || err.message);

    }

  };

  const addTransaction = async (data) => {

    try {

      const token = getToken();

      await axios.post(`${API}/transactions`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      fetchTransactions();
      fetchDashboard();

    } catch (err) {

      console.log("Add transaction error:", err.response?.data || err.message);

    }

  };

  const updateTransaction = async (id, data) => {

    try {

      const token = getToken();

      await axios.put(`${API}/transactions/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      fetchTransactions();
      fetchDashboard();

    } catch (err) {

      console.log("Update transaction error:", err.response?.data || err.message);

    }

  };

  const deleteTransaction = async (id) => {

    try {

      const token = getToken();

      await axios.delete(`${API}/transactions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      fetchTransactions();
      fetchDashboard();

    } catch (err) {

      console.log("Delete transaction error:", err.response?.data || err.message);

    }

  };

  // ---------------- RECURRING ----------------

  const fetchRecurring = async () => {

    try {

      const token = getToken();

      const res = await axios.get(`${API}/recurring`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setRecurring(res.data);

    } catch (err) {

      console.log("Recurring fetch error:", err.response?.data || err.message);

    }

  };

  const addRecurring = async (data) => {

    try {

      const token = getToken();

      await axios.post(`${API}/recurring`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      fetchRecurring();

    } catch (err) {

      console.log("Add recurring error:", err.response?.data || err.message);

    }

  };

  const deleteRecurring = async (id) => {

    try {

      const token = getToken();

      await axios.delete(`${API}/recurring/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      fetchRecurring();

    } catch (err) {

      console.log("Delete recurring error:", err.response?.data || err.message);

    }

  };

  const updateRecurring = async (id, data) => {

  try {

    const token = getToken();

    await axios.put(`${API}/recurring/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    fetchRecurring();

  } catch (err) {

    console.log(
      "Update recurring error:",
      err.response?.data || err.message
    );

  }

};

  return (

    <FinanceContext.Provider
      value={{
  dashboard,
  transactions,
  recurring,
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