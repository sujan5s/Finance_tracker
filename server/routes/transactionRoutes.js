import express from "express";
import {
  getTransactions,
  addTransaction,
  deleteTransaction
} from "../controllers/transactionController.js";

import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticate, getTransactions);
router.post("/", authenticate, addTransaction);
router.delete("/:id", authenticate, deleteTransaction);

export default router;