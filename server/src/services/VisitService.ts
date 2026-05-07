import { Request } from "express";
import { visitRepository } from "../repositories/VisitRepository";

export interface IDailyVisitorStat {
  date: string;
  count: number;
}

export interface IVisitorStats {
  totalVisitors: number;
  todayVisitors: number;
  last7Days: IDailyVisitorStat[];
}

export const visitService = {
  getDateKey(date: Date): string {
    return date.toISOString().slice(0, 10);
  },

  getClientIp(req: Request): string {
    const forwardedFor = req.headers["x-forwarded-for"];
    if (typeof forwardedFor === "string" && forwardedFor.trim()) {
      return forwardedFor.split(",")[0].trim();
    }
    if (Array.isArray(forwardedFor) && forwardedFor.length > 0) {
      return forwardedFor[0];
    }
    return req.ip || req.socket.remoteAddress || "unknown";
  },

  getFingerprint(req: Request, dateKey: string): string {
    const ipAddress = this.getClientIp(req);
    const userAgent = req.get("user-agent") || "unknown-user-agent";
    const language = req.get("accept-language") || "unknown-language";
    return `${dateKey}::${ipAddress}::${userAgent}::${language}`;
  },

  async recordVisit(req: Request): Promise<{ recorded: boolean }> {
    const today = this.getDateKey(new Date());
    const fingerprint = this.getFingerprint(req, today);
    const ipAddress = this.getClientIp(req);
    const userAgent = req.get("user-agent") || "";

    const existingVisit = await visitRepository.findVisitEvent(today, fingerprint);
    if (existingVisit) {
      return { recorded: false };
    }

    try {
      await visitRepository.createVisitEvent({
        dateKey: today,
        fingerprint,
        ipAddress,
        userAgent,
      });
    } catch (error: any) {
      if (error?.code === 11000) {
        return { recorded: false };
      }
      throw error;
    }

    await visitRepository.incrementDailyCounter(today);
    return { recorded: true };
  },

  async getStats(): Promise<IVisitorStats> {
    const today = this.getDateKey(new Date());
    const totalVisitors = await visitRepository.getTotalVisitors();
    const todayVisitors = await visitRepository.getDailyCount(today);
    const recentStats = await visitRepository.getRecentDailyCounters(7);

    const last7Days = recentStats.map((entry) => ({
      date: entry.dateKey,
      count: entry.count,
    }));

    return {
      totalVisitors,
      todayVisitors,
      last7Days,
    };
  },
};
