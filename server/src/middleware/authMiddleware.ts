import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { login_token } = req.cookies;

  if (!login_token) {
    return res
      .status(401)
      .json({ success: false, message: "No token, plase login again" });
  }

  try {
    const secret = process.env.SECRET_KEY;
    if (!secret) {
      throw new Error("SECRET_KEY missing");
    }

    const decoded = jwt.verify(login_token, secret) as { id: string };

    if (decoded.id) {
      req.userId = decoded.id; // Added via express augmentation
    }

    next();
  } catch (error: any) {
    console.error("error from authenticateUser middleware: " + error.message);
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};
