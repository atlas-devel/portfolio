import { Request, Response } from "express";
import { projectService } from "../services/ProjectService";

export const createProjects = async (req: Request, res: Response) => {
  const { projectName, description, techs, githubLink, isLive, status } = req.body;

  if (!projectName || !description || !techs || !githubLink) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const imageUrl = req.file ? req.file.path : "";

    const projects = await projectService.createProject({
      projectName,
      description,
      techs,
      githubLink,
      status,
      isLive: isLive === "true" || isLive === true,
      imageFileUrl: imageUrl,
    });

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      projects,
    });
  } catch (err: any) {
    console.error("error at create project: " + err.message);
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const getProjects = async (_req: Request, res: Response) => {
  try {
    const allProjects = await projectService.getAllProjects();
    if (!allProjects || allProjects.length < 1) {
      return res.status(404).json({ success: false, message: "No projects found" });
    }
    res.status(200).json({ success: true, projects: allProjects });
  } catch (err: any) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const deleteProject = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  try {
    const existingProject = await projectService.deleteProject(id);
    if (!existingProject) {
      return res.status(404).json({ success: false, message: "project not found" });
    }
    return res.status(200).json({ success: true, message: "Project deleted successfully" });
  } catch (err: any) {
    console.error(err.message);
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const updateProject = async (req: Request, res: Response) => {
  const projectId = req.params.projectId as string;

  try {
    // If a new image was passed, update it
    const updateData = { ...req.body };
    if (req.file) updateData.imageFile = req.file.path;

    const updatedProject = await projectService.updateProject(projectId, updateData);
    if (!updatedProject) {
      return res.status(404).json({ success: false, message: "project not found." });
    }

    return res.status(200).json({ success: true, message: "project updated successfully" });
  } catch (err: any) {
    console.error(err.message);
    return res.status(500).json({ success: false, message: err.message });
  }
};

export const singleProject = async (req: Request, res: Response) => {
  const projectId = req.params.projectId as string;

  try {
    const matchProject = await projectService.getProjectById(projectId);
    if (!matchProject) {
      return res.status(404).json({ success: false, message: "project does not exist" });
    }
    return res.status(200).json({ success: true, project: matchProject });
  } catch (err: any) {
    console.error(err.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
