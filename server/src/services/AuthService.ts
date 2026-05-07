import { adminRepository } from "../repositories/AdminRepository";
import { IAdmin } from "../models/AdminAuth";
import jwt from "jsonwebtoken";

export const authService = {
  async login(
    email?: string,
    password?: string,
  ): Promise<{ admin: IAdmin; token: string }> {
    if (!email || !password) {
      throw new Error("Validation: all fields are required");
    }

    const userAdmin = await adminRepository.findByEmail(email);

    if (!userAdmin) {
      throw new Error("NotFound: admin not found");
    }

    if (password !== userAdmin.password) {
      throw new Error("Validation: incorrect password");
    }

    const secret = process.env.SECRET_KEY;
    if (!secret) throw new Error("Server: SECRET_KEY not defined");

    const token = jwt.sign({ id: userAdmin._id }, secret, {
      expiresIn: "24h",
    });

    return { admin: userAdmin, token };
  },

  async getUserData(userId: string): Promise<IAdmin> {
    if (!userId) {
      throw new Error("Validation: userId is required");
    }
    const admin = await adminRepository.findById(userId);
    if (!admin) {
      throw new Error("NotFound: user unauthorized");
    }
    return admin;
  }
};
