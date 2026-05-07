import ProjectModel, { IProject } from "../models/ProjectModel";

export const projectRepository = {
  /**
   * Find all projects in the database
   */
  async findAll(): Promise<IProject[]> {
    return await ProjectModel.find();
  },

  /**
   * Find a project by its ID
   */
  async findById(id: string): Promise<IProject | null> {
    return await ProjectModel.findById(id);
  },

  /**
   * Create a new project
   */
  async create(projectData: Partial<IProject>): Promise<IProject> {
    return await ProjectModel.create(projectData);
  },

  /**
   * Update an existing project by ID
   */
  async update(
    id: string,
    updateData: Partial<IProject>,
  ): Promise<IProject | null> {
    return await ProjectModel.findByIdAndUpdate(id, updateData, {
      new: true, // returns the updated document instead of the old one
      runValidators: true, // ensures the update data respects the model schema
    });
  },

  /**
   * Delete a project by ID
   */
  async delete(id: string): Promise<IProject | null> {
    return await ProjectModel.findByIdAndDelete(id);
  }
};
