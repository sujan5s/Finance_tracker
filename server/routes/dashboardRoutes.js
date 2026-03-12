import express from "express";
import { getDashboard, getChartData } from "../controllers/dashboardController.js";
import authenticate from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticate, getDashboard);
router.get("/chart-data", authenticate, getChartData);

export default router;