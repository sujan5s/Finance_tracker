import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { FinanceProvider } from "./context/FinanceContext";
import { ThemeProvider } from "./context/ThemeContext";

import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard    from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Recurring    from "./pages/Recurring";
import Budgets      from "./pages/Budgets";
import Login        from "./pages/Login";
import Signup       from "./pages/Signup";

export default function App() {
  const token = localStorage.getItem("token");

  return (
    <ThemeProvider>
      <FinanceProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
            <Route path="/login"  element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route path="/dashboard"    element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/recurring"    element={<Recurring />} />
              <Route path="/budgets"      element={<Budgets />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </FinanceProvider>
    </ThemeProvider>
  );
}