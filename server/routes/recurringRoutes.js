import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  getRecurring,
  addRecurring,
  updateRecurring,
  deleteRecurring
} from "../controllers/recurringController.js";

const router = express.Router();

router.get("/", authMiddleware, getRecurring);
router.post("/", authMiddleware, addRecurring);
router.put("/:id", authMiddleware, updateRecurring);
router.delete("/:id", authMiddleware, deleteRecurring);

export default router;