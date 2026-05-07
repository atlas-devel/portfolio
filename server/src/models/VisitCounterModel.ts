import mongoose, { Document, Schema } from "mongoose";

export interface IVisitCounter extends Document {
  dateKey: string;
  count: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const visitCounterSchema = new Schema<IVisitCounter>(
  {
    dateKey: { type: String, required: true, unique: true, index: true },
    count: { type: Number, required: true, default: 0 },
  },
  { timestamps: true },
);

const VisitCounterModel = mongoose.model<IVisitCounter>("VisitCounter", visitCounterSchema);

export default VisitCounterModel;
