import { adminRepository } from "../repositories/AdminRepository";
import { IAdmin } from "../models/AdminAuth";
import jwt from "jsonwebtoken";
import { verifyPassword } from "../utils/password";

const publicAdmin = (admin: IAdmin): IAdmin => {
  const { password: _password, ...safeAdmin } = admin;
  return safeAdmin;
};

export const authService = {
  async login(
    email?: string,
    password?: string,
  ): Promise<{ admin: IAdmin; token: string }> {
    if (!email || !password) {
      throw new Error("Validation: all fields are required");
    }

    const userAdmin = await adminRepository.findByEmail(email.trim().toLowerCase());

    if (!userAdmin) {
      throw new Error("NotFound: admin not found");
    }

    if (!(await verifyPassword(password, userAdmin.password ?? ""))) {
      throw new Error("Validation: incorrect password");
    }

    const secret = process.env.SECRET_KEY;
    if (!secret) throw new Error("Server: SECRET_KEY not defined");

    const token = jwt.sign({ id: userAdmin._id }, secret, {
      expiresIn: "24h",
    });

    return { admin: publicAdmin(userAdmin), token };
  },

  async getUserData(userId: string): Promise<IAdmin> {
    if (!userId) {
      throw new Error("Validation: userId is required");
    }
    const admin = await adminRepository.findById(userId);
    if (!admin) {
      throw new Error("NotFound: user unauthorized");
    }
    return publicAdmin(admin);
  }
};
