import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import recurringRoutes from "./routes/recurringRoutes.js";
import budgetRoutes from "./routes/budgetRoutes.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/recurring", recurringRoutes);
app.use("/api/budget", budgetRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Finance Tracker API running" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});