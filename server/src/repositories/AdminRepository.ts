import AdminModel, { IAdmin } from "../models/AdminAuth";

export const adminRepository = {
  /**
   * Find an Admin by their email address
   */
  async findByEmail(email: string): Promise<IAdmin | null> {
    return await AdminModel.findOne({ email }).lean();
  },

  /**
   * Find an Admin by their database ID
   */
  async findById(id: string): Promise<IAdmin | null> {
    return await AdminModel.findById(id).lean();
  }
};
