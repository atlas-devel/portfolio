import VisitCounterModel, { IVisitCounter } from "../models/VisitCounterModel";
import VisitEventModel, { IVisitEvent } from "../models/VisitEventModel";

export const visitRepository = {
  async findVisitEvent(dateKey: string, fingerprint: string): Promise<IVisitEvent | null> {
    return await VisitEventModel.findOne({ dateKey, fingerprint });
  },

  async createVisitEvent(data: Partial<IVisitEvent>): Promise<IVisitEvent> {
    return await VisitEventModel.create(data);
  },

  async incrementDailyCounter(dateKey: string): Promise<IVisitCounter | null> {
    return await VisitCounterModel.findOneAndUpdate(
      { dateKey },
      { $inc: { count: 1 } },
      { new: true, upsert: true, setDefaultsOnInsert: true },
    );
  },

  async getTotalVisitors(): Promise<number> {
    const totals = await VisitCounterModel.aggregate<{ total: number }>([
      { $group: { _id: null, total: { $sum: "$count" } } },
    ]);

    return totals[0]?.total ?? 0;
  },

  async getDailyCount(dateKey: string): Promise<number> {
    const doc = await VisitCounterModel.findOne({ dateKey });
    return doc?.count ?? 0;
  },

  async getRecentDailyCounters(limit: number): Promise<IVisitCounter[]> {
    const docs = await VisitCounterModel.find()
      .sort({ dateKey: -1 })
      .limit(limit);

    return docs.reverse();
  },
};
