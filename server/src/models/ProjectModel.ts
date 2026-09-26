export const PROJECT_STATUSES = ["dev", "live", "dep-local"] as const;
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export interface IProject {
  _id: string;
  projectName: string;
  role?: string;
  displayOrder?: number;
  imageFile: string;
  githubLink: string;
  liveLink?: string;
  description: string;
  techs: string[];
  status: ProjectStatus;
  isLive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
