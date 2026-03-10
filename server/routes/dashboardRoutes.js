import express from "express";
import { getDashboardSummary } from "../controllers/dashboardController.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticate, getDashboardSummary);

export default router;