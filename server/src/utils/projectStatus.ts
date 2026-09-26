import { ProjectStatus as DatabaseStatus } from "@prisma/client";
import { IProject, PROJECT_STATUSES, ProjectStatus } from "../models/ProjectModel";

const apiStatusByDatabaseStatus: Record<DatabaseStatus, ProjectStatus> = {
  [DatabaseStatus.DEV]: "dev",
  [DatabaseStatus.LIVE]: "live",
  [DatabaseStatus.DEP_LOCAL]: "dep-local",
};

const databaseStatusByApiStatus: Record<ProjectStatus, DatabaseStatus> = {
  dev: DatabaseStatus.DEV,
  live: DatabaseStatus.LIVE,
  "dep-local": DatabaseStatus.DEP_LOCAL,
};

export const toApiStatus = (status: DatabaseStatus): ProjectStatus =>
  apiStatusByDatabaseStatus[status];

export const toDatabaseStatus = (status: ProjectStatus): DatabaseStatus =>
  databaseStatusByApiStatus[status];

export const normalizeProjectStatus = (status?: string, isLive?: boolean): ProjectStatus => {
  if (status && PROJECT_STATUSES.includes(status as ProjectStatus)) return status as ProjectStatus;
  return isLive ? "live" : "dev";
};

export const normalizeProjectRecord = (project: IProject): IProject => {
  const status = normalizeProjectStatus(project.status, project.isLive);
  return { ...project, status, isLive: status === "live" };
};
