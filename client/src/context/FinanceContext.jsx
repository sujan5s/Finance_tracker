import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const FinanceContext = createContext();

export const useFinance = () => {
  return useContext(FinanceContext);
};

export const FinanceProvider = ({ children }) => {

  const [transactions, setTransactions] = useState([]);
  const [dashboard, setDashboard] = useState(null);

  const API = "http://localhost:5000/api";

  const getToken = () => {
    return localStorage.getItem("token");
  };

  // FETCH TRANSACTIONS
  const fetchTransactions = async () => {

    try {

      const token = getToken();
      if (!token) return;

      const res = await axios.get(`${API}/transactions`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setTransactions(res.data);

    } catch (err) {

      console.error("Transactions error:", err.response?.data || err.message);

    }

  };

  // FETCH DASHBOARD
  const fetchDashboard = async () => {

    try {

      const token = getToken();
      if (!token) return;

      const res = await axios.get(`${API}/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setDashboard(res.data);

    } catch (err) {

      console.error("Dashboard error:", err.response?.data || err.message);

    }

  };

  // ADD TRANSACTION
  const addTransaction = async (data) => {

    try {

      const token = getToken();

      const res = await axios.post(
        `${API}/transactions`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setTransactions([res.data, ...transactions]);

      fetchDashboard();

    } catch (err) {

      console.error(err);

    }

  };

  // ADD RECURRING
  const addRecurring = async (data) => {

    try {

      const token = getToken();

      await axios.post(
        `${API}/recurring`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

    } catch (err) {

      console.error(err);

    }

  };

  useEffect(() => {

    const token = getToken();

    if (token) {

      fetchTransactions();
      fetchDashboard();

    }

  }, []);

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        dashboard,
        fetchTransactions,
        fetchDashboard,
        addTransaction,
        addRecurring
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
};

export default FinanceContext;