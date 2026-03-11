import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getTransactions,
  addTransaction
} from "../controllers/transactionController.js";

const router = express.Router();

router.get("/", authMiddleware, getTransactions);

router.post("/", authMiddleware, addTransaction);

export default router;