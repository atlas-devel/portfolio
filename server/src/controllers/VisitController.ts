import { Request, Response } from "express";
import { visitService } from "../services/VisitService";

export const recordPortfolioVisit = async (req: Request, res: Response) => {
  try {
    const result = await visitService.recordVisit(req);
    return res.status(200).json({
      success: true,
      recorded: result.recorded,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to record visit",
    });
  }
};

export const getVisitorStats = async (_req: Request, res: Response) => {
  try {
    const stats = await visitService.getStats();
    return res.status(200).json({
      success: true,
      stats,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch visitor stats",
    });
  }
};
