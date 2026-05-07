import { IProject } from "../models/ProjectModel";
export declare class ProjectService {
    private projectRepo;
    createProject(data: {
        projectName: string;
        description: string;
        techs: string;
        githubLink: string;
        isLive?: boolean;
        imageFileUrl: string;
    }): Promise<IProject>;
    getAllProjects(): Promise<IProject[]>;
    getProjectById(id: string): Promise<IProject | null>;
    deleteProject(id: string): Promise<IProject | null>;
    updateProject(id: string, updateData: any): Promise<IProject | null>;
}
//# sourceMappingURL=ProjectService.d.ts.map