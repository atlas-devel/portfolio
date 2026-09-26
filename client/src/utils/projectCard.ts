import { IProject } from "../context/GlobalContext";

export type ProjectStatus = "dev" | "live" | "dep-local";

export const getProjectStatus = (project: IProject): ProjectStatus => {
  if (project.isLive) return "live";
  if (["dev", "live", "dep-local"].includes(project.status ?? "")) {
    return project.status as ProjectStatus;
  }
  return "dev";
};

export const getProjectLiveUrl = (value?: string) => {
  const link = value?.trim();
  if (!link) return "";
  return /^https?:\/\//i.test(link) ? link : `https://${link}`;
};

export const getProjectYear = (createdAt?: string | Date) => {
  if (!createdAt) return null;
  const year = new Date(createdAt).getFullYear();
  return Number.isNaN(year) ? null : year;
};
