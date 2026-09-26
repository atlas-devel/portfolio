import { Request, Response } from "express";
import { authService } from "../services/AuthService";

export const userData = async (req: Request, res: Response) => {
  if (!req.userId) return res.status(401).json({ success: false, message: "User unauthorized" });
  try {
    const user = await authService.getUserData(req.userId);
    const { email, ...profile } = user;
    return res.status(200).json({ success: true, email, ...profile });
  } catch {
    return res.status(500).json({ success: false, message: "Could not retrieve user" });
  }
};

export const logout = (_req: Request, res: Response) => {
  const production = process.env.NODE_ENV === "production";
  res.clearCookie("login_token", { path: "/", httpOnly: true, secure: production, sameSite: production ? "none" : "lax" });
  return res.status(200).json({ success: true, message: "logged out" });
};
