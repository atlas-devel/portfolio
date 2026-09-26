import { IProject } from "../models/ProjectModel";
import { projectRepository } from "../repositories/ProjectRepository";
import { normalizeProjectRecord, normalizeProjectStatus } from "../utils/projectStatus";
import { normalizeProjectUpdate, parseProjectTechs } from "../utils/projectInput";
import { parseDisplayOrder } from "../utils/displayOrder";

interface CreateProjectInput {
  projectName: string;
  role?: string;
  displayOrder?: string | number;
  description: string;
  techs: string;
  githubLink: string;
  status?: string;
  isLive?: boolean;
  imageFileUrl: string;
}

export const projectService = {
  async createProject(input: CreateProjectInput): Promise<IProject> {
    const { projectName, description, techs, githubLink } = input;
    if (!projectName || !description || !techs || !githubLink) throw new Error("All fields are required");
    const project = await projectRepository.create({
      projectName, role: input.role?.trim() ?? "", displayOrder: parseDisplayOrder(input.displayOrder), description, githubLink, imageFile: input.imageFileUrl,
      techs: parseProjectTechs(techs),
      status: normalizeProjectStatus(input.status, input.isLive),
      isLive: input.isLive ?? false,
    });
    return normalizeProjectRecord(project);
  },

  async getAllProjects(): Promise<IProject[]> {
    const projects = await projectRepository.findAll();
    return projects.map(normalizeProjectRecord);
  },

  async getProjectById(id: string): Promise<IProject | null> {
    if (!id) throw new Error("Project ID is required");
    const project = await projectRepository.findById(id);
    return project ? normalizeProjectRecord(project) : null;
  },

  async deleteProject(id: string): Promise<IProject | null> {
    if (!id) throw new Error("Project ID is required");
    return projectRepository.delete(id);
  },

  async updateProject(id: string, input: Record<string, unknown>): Promise<IProject | null> {
    if (!id) throw new Error("Project ID is required");
    if (!input || Object.keys(input).length === 0) throw new Error("Request body cannot be empty");
    const project = await projectRepository.update(id, normalizeProjectUpdate(input));
    return project ? normalizeProjectRecord(project) : null;
  },
};
