import prisma from "../config/prisma";
import { IProject } from "../models/ProjectModel";
import { toApiStatus, toDatabaseStatus } from "../utils/projectStatus";

const toProject = (project: Awaited<ReturnType<typeof prisma.project.findUnique>>): IProject | null =>
  project ? { ...project, _id: project.id, status: toApiStatus(project.status) } : null;

export const projectRepository = {
  async findAll(): Promise<IProject[]> {
    const projects = await prisma.project.findMany({ orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }] });
    return projects.map((project) => ({ ...project, _id: project.id, status: toApiStatus(project.status) }));
  },

  async findById(id: string): Promise<IProject | null> {
    return toProject(await prisma.project.findUnique({ where: { id } }));
  },

  async create(input: Partial<IProject>): Promise<IProject> {
    const { _id, createdAt, updatedAt, status, ...data } = input;
    const project = await prisma.project.create({
      data: { ...data, status: toDatabaseStatus(status ?? "dev") } as Parameters<typeof prisma.project.create>[0]["data"],
    });
    return { ...project, _id: project.id, status: toApiStatus(project.status) };
  },

  async update(id: string, input: Partial<IProject>): Promise<IProject | null> {
    const { _id, createdAt, updatedAt, status, ...data } = input;
    const result = await prisma.project.updateMany({
      where: { id },
      data: { ...data, ...(status ? { status: toDatabaseStatus(status) } : {}) } as Parameters<typeof prisma.project.updateMany>[0]["data"],
    });
    if (!result.count) return null;
    return toProject(await prisma.project.findUnique({ where: { id } }));
  },

  async delete(id: string): Promise<IProject | null> {
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project) return null;
    await prisma.project.delete({ where: { id } });
    return { ...project, _id: project.id, status: toApiStatus(project.status) };
  },
};
