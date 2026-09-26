import { IProject } from "../context/GlobalContext";

export type ProjectStatus = "dev" | "live" | "dep-local";

export const resolveProjectStatus = (project: Pick<IProject, "status" | "isLive">): ProjectStatus => {
  if (["live", "dep-local", "dev"].includes(project.status ?? "")) return project.status as ProjectStatus;
  return project.isLive ? "live" : "dev";
};

export const formatProjectDate = (value?: string) => {
  if (!value) return "Date unavailable";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Date unavailable" : date.toDateString();
};

export const getUserInitials = (name?: string) => {
  const parts = name?.trim().split(/\s+/) ?? [];
  return parts.length ? `${parts[0][0]}${parts.at(-1)?.[0]}`.toUpperCase() : "AD";
};
