import express from "express";
import { deleteProject, createProjects, updateProject } from "../controllers/ProjectController";
import { getProjects, singleProject } from "../controllers/ProjectQueryController";
import { projectUploads } from "../middleware/multer";
import { authenticateUser } from "../middleware/authMiddleware";

const projectRouter = express.Router();
projectRouter.post("/upload", authenticateUser, projectUploads.single("image"), createProjects);
projectRouter.get("/all-projects", getProjects);
projectRouter.delete("/remove/:id", authenticateUser, deleteProject);
projectRouter.get("/:projectId", singleProject);
projectRouter.patch("/update/:projectId", authenticateUser, projectUploads.single("image"), updateProject);

export default projectRouter;
