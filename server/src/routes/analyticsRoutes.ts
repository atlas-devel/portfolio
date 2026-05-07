import { Router } from "express";
import {
  getVisitorStats,
  recordPortfolioVisit,
} from "../controllers/VisitController";
import { authenticateUser } from "../middleware/authMiddleware";

const analyticsRouter = Router();

analyticsRouter.post("/record-visit", recordPortfolioVisit);
analyticsRouter.get("/visitor-stats", authenticateUser, getVisitorStats);

export default analyticsRouter;
