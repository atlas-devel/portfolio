import mongoose, { Schema, Document } from "mongoose";

export interface ICertificate extends Document {
  title: string;
  issuer: string;
  date: string;
  description: string;
  imageUrl?: string;
}

const certificateSchema = new Schema<ICertificate>(
  {
    title: { type: String, required: true },
    issuer: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String },
  },
  { timestamps: true },
);

export default mongoose.model<ICertificate>("Certificate", certificateSchema);
