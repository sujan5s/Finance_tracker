import express from "express";
import {
  getRecurring,
  addRecurring,
  deleteRecurring
} from "../controllers/recurringController.js";

const router = express.Router();

router.get("/", getRecurring);
router.post("/", addRecurring);
router.delete("/:id", deleteRecurring);

export default router;