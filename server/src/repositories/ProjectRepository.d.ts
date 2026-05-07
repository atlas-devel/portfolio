import { IProject } from "../models/ProjectModel";
export declare class ProjectRepository {
    /**
     * Find all projects in the database
     */
    findAll(): Promise<IProject[]>;
    /**
     * Find a project by its ID
     */
    findById(id: string): Promise<IProject | null>;
    /**
     * Create a new project
     */
    create(projectData: Partial<IProject>): Promise<IProject>;
    /**
     * Update an existing project by ID
     */
    update(id: string, updateData: Partial<IProject>): Promise<IProject | null>;
    /**
     * Delete a project by ID
     */
    delete(id: string): Promise<IProject | null>;
}
//# sourceMappingURL=ProjectRepository.d.ts.map