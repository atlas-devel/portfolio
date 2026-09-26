import express from "express";
import { login } from "../controllers/AuthController";
import { logout, userData } from "../controllers/AuthSessionController";
import { authenticateUser } from "../middleware/authMiddleware";

const authRouter = express.Router();
authRouter.post("/login", login);
authRouter.get("/user", authenticateUser, userData);
authRouter.post("/logout", logout);

export default authRouter;
