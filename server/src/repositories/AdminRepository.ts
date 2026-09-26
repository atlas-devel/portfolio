import prisma from "../config/prisma";
import { IAdmin } from "../models/AdminAuth";

const toAdmin = (
  admin: Awaited<ReturnType<typeof prisma.admin.findUnique>>,
): IAdmin | null => (admin ? { ...admin, _id: admin.id } : null);

export const adminRepository = {
  /**
   * Find an Admin by their email address
   */
  async findByEmail(email: string): Promise<IAdmin | null> {
    return toAdmin(await prisma.admin.findUnique({ where: { email } }));
  },

  /**
   * Find an Admin by their database ID
   */
  async findById(id: string): Promise<IAdmin | null> {
    return toAdmin(await prisma.admin.findUnique({ where: { id } }));
  },
};
