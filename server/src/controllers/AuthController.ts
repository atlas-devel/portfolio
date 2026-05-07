import { Request, Response } from "express";
import { authService } from "../services/AuthService";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req?.body;

    const { admin, token } = await authService.login(email, password);

    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("login_token", token, {
      httpOnly: true,
      secure: isProduction,
      // @ts-ignore
      sameSite: isProduction ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });

    res.status(200).json({
      success: true,
      message: "login successfully",
      data: admin,
    });
  } catch (error: any) {
    if (error.message.startsWith("Validation")) {
      return res
        .status(400)
        .json({
          success: false,
          message: error.message.replace("Validation: ", ""),
        });
    }
    if (error.message.startsWith("NotFound")) {
      return res
        .status(404)
        .json({
          success: false,
          message: error.message.replace("NotFound: ", ""),
        });
    }
    res
      .status(500)
      .json({ success: false, message: "login error: " + error.message });
  }
};

export const userData = async (req: Request, res: Response) => {
  const userId = req.userId; // From authMiddleware

  if (!userId) {
    return res
      .status(401)
      .json({ success: false, message: "user unauthorized" });
  }

  try {
    const user = await authService.getUserData(userId);
    // Ignore typings dynamically using spread or predefined schema if extending Admin record
    const { email, ...rest } = user;

    return res.status(200).json({ success: true, email, ...rest });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("login_token", {
    path: "/",
  });
  return res.status(200).json({ success: true, message: "logged out" });
};

export const test = async (req: Request, res: Response) => {
  return res
    .status(200)
    .json({ success: true, data: { name: "leon", age: 21 } });
};
