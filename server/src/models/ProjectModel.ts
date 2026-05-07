import mongoose, { Document, Schema } from "mongoose";

export const PROJECT_STATUSES = ["dev", "live", "dep-local"] as const;
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

// Interface representing a document in MongoDB
export interface IProject extends Document {
  projectName: string;
  imageFile: string;
  githubLink: string;
  liveLink?: string;
  description: string;
  techs: string[];
  status: ProjectStatus;
  isLive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const projectSchema = new Schema<IProject>(
  {
    projectName: {
      type: String,
      required: true,
      trim: true,
    },
    imageFile: {
      type: String,
      required: true,
    },
    githubLink: {
      type: String,
      required: true,
    },
    liveLink: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      required: true,
    },
    techs: {
      type: [String],
      required: true,
    },
    status: {
      type: String,
      enum: PROJECT_STATUSES,
      default: "dev",
    },
    // Legacy field kept for backward compatibility with existing records.
    isLive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const ProjectModel = mongoose.model<IProject>("Project", projectSchema);

export default ProjectModel;
