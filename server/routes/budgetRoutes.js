import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  getBudget,
  createBudget,
  deleteBudget
} from "../controllers/budgetController.js";

const router = express.Router();

router.get("/", authMiddleware, getBudget);
router.post("/", authMiddleware, createBudget);
router.delete("/:id", authMiddleware, deleteBudget);

export default router;