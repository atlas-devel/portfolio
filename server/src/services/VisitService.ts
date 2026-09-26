import { Request } from "express";
import { visitRepository } from "../repositories/VisitRepository";
import { getClientIp, makeVisitFingerprint } from "../utils/visitIdentity";

export interface IDailyVisitorStat { date: string; count: number }
export interface IVisitorStats { totalVisitors: number; todayVisitors: number; last7Days: IDailyVisitorStat[] }

const getDateKey = (date: Date): string => date.toISOString().slice(0, 10);

export const visitService = {
  async recordVisit(req: Request): Promise<{ recorded: boolean }> {
    const dateKey = getDateKey(new Date());
    const fingerprint = makeVisitFingerprint(req, dateKey);
    const ipAddress = getClientIp(req);
    const userAgent = req.get("user-agent") || "";
    if (await visitRepository.findVisitEvent(dateKey, fingerprint)) return { recorded: false };
    try {
      await visitRepository.createVisitEvent({ dateKey, fingerprint, ipAddress, userAgent });
    } catch (error) {
      if (error && typeof error === "object" && "code" in error && error.code === "P2002") {
        return { recorded: false };
      }
      throw error;
    }
    await visitRepository.incrementDailyCounter(dateKey);
    return { recorded: true };
  },

  async getStats(): Promise<IVisitorStats> {
    const today = getDateKey(new Date());
    const [totalVisitors, todayVisitors, recent] = await Promise.all([
      visitRepository.getTotalVisitors(),
      visitRepository.getDailyCount(today),
      visitRepository.getRecentDailyCounters(7),
    ]);
    return {
      totalVisitors, todayVisitors,
      last7Days: recent.map(({ dateKey, count }) => ({ date: dateKey, count })),
    };
  },
};
