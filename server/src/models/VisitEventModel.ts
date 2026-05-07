import mongoose, { Document, Schema } from "mongoose";

export interface IVisitEvent extends Document {
  dateKey: string;
  fingerprint: string;
  ipAddress?: string;
  userAgent?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const visitEventSchema = new Schema<IVisitEvent>(
  {
    dateKey: { type: String, required: true, index: true },
    fingerprint: { type: String, required: true, index: true },
    ipAddress: { type: String, default: "" },
    userAgent: { type: String, default: "" },
  },
  { timestamps: true },
);

visitEventSchema.index({ dateKey: 1, fingerprint: 1 }, { unique: true });

const VisitEventModel = mongoose.model<IVisitEvent>("VisitEvent", visitEventSchema);

export default VisitEventModel;
