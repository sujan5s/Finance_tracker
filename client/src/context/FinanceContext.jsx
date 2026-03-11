import { createContext, useState, useContext } from "react";
import axios from "axios";

const API = "http://localhost:5000/api";

export const FinanceContext = createContext();

export const useFinance = () => useContext(FinanceContext);

export const FinanceProvider = ({ children }) => {

  const [dashboard, setDashboard] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const getToken = () => localStorage.getItem("token");

  // DASHBOARD

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
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setDashboard(res.data);

    } catch (err) {

      console.log(err.response?.data || err.message);

    } finally {

      setLoading(false);

    }

  };

  // TRANSACTIONS

  const fetchTransactions = async () => {

    try {

      const token = getToken();

      const res = await axios.get(`${API}/transactions`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setTransactions(res.data);

    } catch (err) {

      console.log(err.response?.data || err.message);

    }

  };

  // ADD

  const addTransaction = async (data) => {

    try {

      const token = getToken();

      await axios.post(`${API}/transactions`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });

      fetchTransactions();
      fetchDashboard();

    } catch (err) {

      console.log(err.response?.data || err.message);

    }

  };

  // UPDATE

  const updateTransaction = async (id, data) => {

    try {

      const token = getToken();

      await axios.put(`${API}/transactions/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
      });

      fetchTransactions();
      fetchDashboard();

    } catch (err) {

      console.log(err.response?.data || err.message);

    }

  };

  // DELETE

  const deleteTransaction = async (id) => {

    try {

      const token = getToken();

      await axios.delete(`${API}/transactions/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      fetchTransactions();
      fetchDashboard();

    } catch (err) {

      console.log(err.response?.data || err.message);

    }

  };

  return (

    <FinanceContext.Provider
      value={{
        dashboard,
        transactions,
        loading,
        fetchDashboard,
        fetchTransactions,
        addTransaction,
        updateTransaction,
        deleteTransaction
      }}
    >

      {children}

    </FinanceContext.Provider>

  );

};