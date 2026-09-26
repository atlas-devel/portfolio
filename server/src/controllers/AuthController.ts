import { Request, Response } from "express";
import { authService } from "../services/AuthService";

export const login = async (req: Request, res: Response) => {
  try {
    const { admin, token } = await authService.login(
      req.body?.email,
      req.body?.password,
    );
    const production = process.env.NODE_ENV === "production";
    res.cookie("login_token", token, {
      httpOnly: true,
      secure: production,
      sameSite: production ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });
    return res
      .status(200)
      .json({ success: true, message: "login successfully", data: admin });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Login failed";
    if (message.startsWith("Validation")) {
      return res
        .status(400)
        .json({ success: false, message: message.replace("Validation: ", "") });
    }
    if (message.startsWith("NotFound")) {
      return res
        .status(404)
        .json({ success: false, message: message.replace("NotFound: ", "") });
    }
    return res.status(500).json({ success: false, message: "Login failed" });
  }
};
