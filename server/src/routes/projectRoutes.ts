import express from "express";
import {
  getProjects,
  createProjects,
  deleteProject,
  updateProject,
  singleProject,
} from "../controllers/ProjectController";
import { projectUploads } from "../middleware/multer";
import { authenticateUser } from "../middleware/authMiddleware";

const ProjectRouter = express.Router();

ProjectRouter.post("/upload", authenticateUser, projectUploads.single("image"), createProjects);
ProjectRouter.get("/all-projects", getProjects);
ProjectRouter.delete("/remove/:id", authenticateUser, deleteProject);
ProjectRouter.get("/:projectId", singleProject);
ProjectRouter.patch(
  "/update/:projectId",
  authenticateUser,
  projectUploads.single("image"),
  updateProject,
);

export default ProjectRouter;
