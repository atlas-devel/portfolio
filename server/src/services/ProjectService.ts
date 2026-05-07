import { projectRepository } from "../repositories/ProjectRepository";
import { IProject, PROJECT_STATUSES, ProjectStatus } from "../models/ProjectModel";

const normalizeProjectStatus = (
  status?: string,
  isLive?: boolean,
): ProjectStatus => {
  if (status && PROJECT_STATUSES.includes(status as ProjectStatus)) {
    return status as ProjectStatus;
  }
  if (isLive === true) return "live";
  return "dev";
};

const normalizeProjectRecord = (project: IProject): IProject => {
  const normalizedStatus = normalizeProjectStatus(
    (project as any).status,
    (project as any).isLive,
  );
  (project as any).status = normalizedStatus;
  (project as any).isLive = normalizedStatus === "live";
  return project;
};

export const projectService = {
  async createProject(data: {
    projectName: string;
    description: string;
    techs: string;
    githubLink: string;
    status?: string;
    isLive?: boolean;
    imageFileUrl: string; // From cloudinary
  }): Promise<IProject> {
    if (!data.projectName || !data.description || !data.techs || !data.githubLink) {
      throw new Error("All fields are required");
    }

    let parsedTechs: string[] = [];
    try {
      parsedTechs = JSON.parse(data.techs);
    } catch (e) {
      // If parsing fails, store it as an array with a single string, or handle differently
      parsedTechs = [data.techs];
    }

    const projectData: Partial<IProject> = {
      projectName: data.projectName,
      githubLink: data.githubLink,
      description: data.description,
      imageFile: data.imageFileUrl,
      techs: parsedTechs,
      status: normalizeProjectStatus(data.status, data.isLive),
      isLive: data.isLive || false,
    };

    const created = await projectRepository.create(projectData);
    return normalizeProjectRecord(created);
  },

  async getAllProjects(): Promise<IProject[]> {
    const projects = await projectRepository.findAll();
    return projects.map((project) => normalizeProjectRecord(project));
  },

  async getProjectById(id: string): Promise<IProject | null> {
    if (!id) throw new Error("Project ID is required");
    const project = await projectRepository.findById(id);
    return project ? normalizeProjectRecord(project) : null;
  },

  async deleteProject(id: string): Promise<IProject | null> {
    if (!id) throw new Error("Project ID is required");
    return await projectRepository.delete(id);
  },

  async updateProject(id: string, updateData: any): Promise<IProject | null> {
    if (!id) throw new Error("Project ID is required");
    if (!updateData) throw new Error("Request body cannot be empty");

    if (updateData.techs && typeof updateData.techs === "string") {
      try {
        updateData.techs = JSON.parse(updateData.techs);
      } catch (err) {
        throw new Error("Invalid techs format. Must be a JSON array.");
      }
    }

    if (updateData.status && !PROJECT_STATUSES.includes(updateData.status)) {
      throw new Error("Invalid status. Allowed values: dev, live, dep-local.");
    }

    if (typeof updateData.isLive !== "undefined" && !updateData.status) {
      updateData.status = normalizeProjectStatus(undefined, updateData.isLive === true || updateData.isLive === "true");
    }
    if (updateData.status) {
      updateData.isLive = updateData.status === "live";
    }

    const updated = await projectRepository.update(id, updateData);
    return updated ? normalizeProjectRecord(updated) : null;
  }
};
