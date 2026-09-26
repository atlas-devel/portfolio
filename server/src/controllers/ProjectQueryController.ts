import { Request, Response } from "express";
import { projectService } from "../services/ProjectService";

export const getProjects = async (_req: Request, res: Response) => {
  try {
    const projects = await projectService.getAllProjects();
    return res.status(200).json({ success: true, projects });
  } catch {
    return res.status(500).json({ success: false, message: "Could not retrieve projects" });
  }
};

export const singleProject = async (req: Request, res: Response) => {
  try {
    const project = await projectService.getProjectById(req.params.projectId as string);
    if (!project) return res.status(404).json({ success: false, message: "Project not found" });
    return res.status(200).json({ success: true, project });
  } catch {
    return res.status(500).json({ success: false, message: "Could not retrieve project" });
  }
};
