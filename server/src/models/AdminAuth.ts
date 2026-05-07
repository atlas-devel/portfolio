import mongoose, { Document, Schema } from "mongoose";

// Interface representing a document in MongoDB
export interface IAdmin extends Document {
  email: string;
  password?: string;
  createdAt?: string; // Automatically managed by mongoose timestamps
  updatedAt?: string;
}

const adminSchema = new Schema<IAdmin>(
  {
    email: {
      type: String,
      required: true,
      unique: true, // Typically, admin emails should be unique
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

// We export the model and map it to the "adminAuth" collection as in original code
const AdminModel = mongoose.model<IAdmin>("Admin", adminSchema, "adminAuth");

export default AdminModel;
