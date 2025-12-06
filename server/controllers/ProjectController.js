import ProjectModal from "../Model/productModel.js";
import fs from "fs/promises";

// creating project controller

export const createProjects = async (req, res) => {


  const { projectName, description, techs, githubLink, isLive } = req.body;


  if (!projectName || !description || !techs || !githubLink) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    // Get the Cloudinary URL
    // req.file.path contains the full Cloudinary URL
    const imageUrl = req.file ? req.file.path : "";

    const projects = await ProjectModal.create({
      projectName,
      githubLink,
      description,
      imageFile: imageUrl, // Store the Cloudinary URL
      techs: JSON.parse(techs),
      isLive,
    });

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      projects,
    });
  } catch (err) {
    console.log("error at create project: " + err.message);

    // Note: File is already uploaded to Cloudinary
    // You can delete it using cloudinary.uploader.destroy(req.file.filename) if needed

    return res.status(500).json({ success: false, message: err.message });
  }
};
// getting projects controller
export const getProjects = async (_req, res) => {
  const allProjects = await ProjectModal.find();
  if (!allProjects || allProjects.length < 1) {
    return res
      .status(404)
      .json({ success: false, message: "No projects found" });
  }
  res.status(200).json({ success: true, projects: allProjects });
};

// deleting project controller
export const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    if (id) {
      const existingProject = await ProjectModal.findByIdAndDelete({
        _id: id,
      });
      console.log(existingProject);
      if (!existingProject) {
        await fs.unlink(req.file?.path);
        console.log("project image file deleted : " + req.file?.path);
        return res
          .status(404)
          .json({ success: false, message: "project not found" });
      }
      return res
        .status(200)
        .json({ success: true, message: "Project deleted successfully" });
    }
  } catch (err) {
    console.error(err.message);
  }
};

// updating project controller

export const updateProject = async (req, res) => {
  const { projectId } = req.params;
  console.log(projectId);

  try {
    if (req.body) {
      if (typeof req.body.techs === "string") {
        try {
          req.body.techs = JSON.parse(req.body.techs);
        } catch (err) {
          return res.status(400).json({
            success: false,
            message: "Invalid techs format. Must be a JSON array.",
          });
        }
      }

      if (projectId) {
        const updateProject = await ProjectModal.findByIdAndUpdate(
          projectId,
          req.body,
          {
            runValidators: true,
            new: true,
          }
        );
        console.log(updateProject);
        if (!updateProject) {
          return res.status(404).json({
            success: false,
            message: "project not found.",
          });
        }
        return res
          .status(200)
          .json({ success: true, message: "project updated successfully" });
      }
    } else {
      return res
        .status(400)
        .json({ success: false, message: "request can't be empty" });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const singleProject = async (req, res) => {
  const { projectId } = req.params;

  try {
    if (projectId) {
      const matchProject = await ProjectModal.findOne({ _id: projectId });
      if (!matchProject) {
        return res
          .status(404)
          .json({ success: false, message: "project does not exist" });
      }
      return res.status(200).json({ success: true, project: matchProject });
    } else {
      return res.status(404).json({ success: false, message: "invalid id" });
    }
  } catch (err) {
    console.error(err.message);
  }
};
