import { IProject, PROJECT_STATUSES } from "../models/ProjectModel";
import { normalizeProjectStatus } from "./projectStatus";
import { parseDisplayOrder } from "./displayOrder";

export const parseProjectTechs = (techs: string): string[] => {
  try {
    const parsed: unknown = JSON.parse(techs);
    if (Array.isArray(parsed) && parsed.every((value) => typeof value === "string")) return parsed;
  } catch {
    return [techs];
  }
  throw new Error("Invalid techs format. Must be a JSON array.");
};

export const normalizeProjectUpdate = (input: Record<string, unknown>): Partial<IProject> => {
  const update = { ...input };
  if (typeof update.techs === "string") update.techs = parseProjectTechs(update.techs);
  if (update.displayOrder !== undefined) update.displayOrder = parseDisplayOrder(update.displayOrder);
  if (update.status && !PROJECT_STATUSES.includes(update.status as never)) {
    throw new Error("Invalid status. Allowed values: dev, live, dep-local.");
  }
  if (update.isLive !== undefined && !update.status) {
    update.status = normalizeProjectStatus(undefined, update.isLive === true || update.isLive === "true");
  }
  if (update.status) update.isLive = update.status === "live";
  return update as Partial<IProject>;
};
