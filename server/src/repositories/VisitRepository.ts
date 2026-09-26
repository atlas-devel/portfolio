import prisma from "../config/prisma";
import { IVisitCounter } from "../models/VisitCounterModel";
import { IVisitEvent } from "../models/VisitEventModel";

export const visitRepository = {
  async findVisitEvent(
    dateKey: string,
    fingerprint: string,
  ): Promise<IVisitEvent | null> {
    const event = await prisma.visitEvent.findUnique({
      where: { dateKey_fingerprint: { dateKey, fingerprint } },
    });
    return event ? { ...event, _id: event.id } : null;
  },

  async createVisitEvent(data: Partial<IVisitEvent>): Promise<IVisitEvent> {
    const { _id, createdAt, updatedAt, ...eventData } = data;
    const event = await prisma.visitEvent.create({
      data: eventData as Parameters<typeof prisma.visitEvent.create>[0]["data"],
    });
    return { ...event, _id: event.id };
  },

  async incrementDailyCounter(dateKey: string): Promise<IVisitCounter | null> {
    const counter = await prisma.visitCounter.upsert({
      where: { dateKey },
      create: { dateKey, count: 1 },
      update: { count: { increment: 1 } },
    });
    return { ...counter, _id: counter.id };
  },

  async getTotalVisitors(): Promise<number> {
    const totals = await prisma.visitCounter.aggregate({
      _sum: { count: true },
    });
    return totals._sum.count ?? 0;
  },

  async getDailyCount(dateKey: string): Promise<number> {
    const doc = await prisma.visitCounter.findUnique({ where: { dateKey } });
    return doc?.count ?? 0;
  },

  async getRecentDailyCounters(limit: number): Promise<IVisitCounter[]> {
    const docs = await prisma.visitCounter.findMany({
      orderBy: { dateKey: "desc" },
      take: limit,
    });
    return docs.reverse().map((doc) => ({ ...doc, _id: doc.id }));
  },
};
