import { Request, Response } from "express";
import { projectService } from "../services/ProjectService";

export const createProjects = async (req: Request, res: Response) => {
  try {
    const { projectName, role, displayOrder, description, techs, githubLink, isLive, status } = req.body;
    const project = await projectService.createProject({
      projectName, role, displayOrder, description, techs, githubLink, status,
      isLive: isLive === "true" || isLive === true,
      imageFileUrl: req.file?.path ?? "",
    });
    return res.status(201).json({ success: true, message: "Project created successfully", projects: project });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Project creation failed";
    const status = message.includes("required") || message.includes("Validation") ? 400 : 500;
    return res.status(status).json({ success: false, message });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const project = await projectService.deleteProject(req.params.id as string);
    if (!project) return res.status(404).json({ success: false, message: "Project not found" });
    return res.status(200).json({ success: true, message: "Project deleted successfully" });
  } catch {
    return res.status(500).json({ success: false, message: "Project deletion failed" });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  try {
    const input = { ...req.body, ...(req.file ? { imageFile: req.file.path } : {}) };
    const project = await projectService.updateProject(req.params.projectId as string, input);
    if (!project) return res.status(404).json({ success: false, message: "Project not found" });
    return res.status(200).json({ success: true, message: "Project updated successfully" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Project update failed";
    return res.status(message.includes("required") || message.includes("Invalid") || message.includes("Validation") ? 400 : 500).json({ success: false, message });
  }
};
