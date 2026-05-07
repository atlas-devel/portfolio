import { motion } from "framer-motion";
import React, { useEffect, useState, useContext } from "react";
import { AdminContextAuth } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";

type ProjectStatus = "dev" | "live" | "dep-local";

const normalizeProjectStatus = (project: any): ProjectStatus => {
  if (project?.status === "live" || project?.status === "dep-local" || project?.status === "dev") {
    return project.status;
  }
  return project?.isLive ? "live" : "dev";
};

const UpdateProject = ({ projectId, setshowUpdate }) => {
  const navigate = useNavigate();
  const { baseUrl, getProjectData } = useContext(AdminContextAuth);
  const [project, setProject] = useState(null);
  const [formState, setFormState] = useState({
    projectName: "",
    description: "",
    githubLink: "",
    liveLink: "",
    techs: [],
    status: "dev" as ProjectStatus,
    imageFile: null,
  });

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/projects/${projectId}`);
        const data = await res.json();
        setProject(data.project);
        setFormState({
          projectName: data.project.projectName || "",
          description: data.project.description || "",
          githubLink: data.project.githubLink || "",
          liveLink: data.project.liveLink || "",
          techs: data.project.techs || [],
          status: normalizeProjectStatus(data.project),
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchProject();
  }, [baseUrl, projectId]);

  const handleChange = (e) => {
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTechs = (e) => {
    const { value, checked } = e.target;

    setFormState((prev) => {
      const techs = checked
        ? [...prev.techs, value]
        : prev.techs.filter((t) => t !== value);
      return { ...prev, techs };
    });
  };

  const handleStatus = (e) => {
    setFormState((prev) => ({
      ...prev,
      status: e.target.value as ProjectStatus,
    }));
  };

  const handleFile = (e) => {
    if (e.target.files[0]) {
      setFormState((prev) => ({
        ...prev,
        imageFile: e.target.files[0],
      }));
    }
  };

  const submitProject = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("projectName", formState.projectName);
      formData.append("description", formState.description);
      formData.append("githubLink", formState.githubLink);
      formData.append("liveLink", formState.liveLink);
      formData.append("techs", JSON.stringify(formState.techs));
      formData.append("status", formState.status);
      if (formState.imageFile) {
        formData.append("image", formState.imageFile);
      }

      console.log(formState.techs);

      const res = await fetch(`${baseUrl}/api/projects/update/${projectId}`, {
        method: "PATCH",
        credentials: "include",
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to update project");
      await getProjectData();
      navigate("/auth/secret/admin/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  if (!project) return <div className="text-white">Loading...</div>;

  return (
    <section className="fixed inset-0 h-screen w-full flex overflow-hidden items-center bg-black/30 backdrop-blur-sm justify-center p-0 m-0 custom-scroll">
      <motion.form
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          type: "tween",
          ease: "easeInOut",
        }}
        onSubmit={submitProject}
        className="w-full max-w-2xl mx-auto bg-[#1c2532]/95 custom-scroll rounded-xl overflow-hidden shadow-2xl border border-[#2b3544] p-8 sm:p-12 flex flex-col gap-8 overflow-y-auto max-h-[90vh]"
      >
        <h1 className="text-center font-bold text-3xl capitalize text-white mb-2 tracking-wide">
          Update Project
        </h1>
        <div className="">
          <label className="text-gray-100 mb-2 block o" htmlFor="title">
            Project Title
          </label>
          <input
            onChange={handleChange}
            className="rounded-md px-4 py-2 bg-[#2b3544] text-white w-full focus:outline-none focus:ring-2 focus:ring-green-600 transition"
            placeholder="Enter The Project Title"
            type="text"
            name="projectName"
            id="title"
            value={formState.projectName}
            autoComplete="off"
          />
        </div>
        <div>
          <label className="text-gray-100 mb-2 block" htmlFor="image">
            Project Image
          </label>
          <input
            className="rounded-md px-4 py-2 bg-[#2b3544] text-white w-full"
            type="file"
            name="image"
            onChange={handleFile}
            id="image"
          />
          {project.imageFile && (
            <img
              src={project.imageFile}
              alt="Current"
              className="mt-3 w-40 h-28 object-cover rounded-lg border border-[#2b3544] shadow"
            />
          )}
        </div>
        <div>
          <label className="text-gray-100 mb-2 block" htmlFor="githubLink">
            Github Link
          </label>
          <input
            className="rounded-md px-4 py-2 bg-[#2b3544] text-white w-full focus:outline-none focus:ring-2 focus:ring-green-600 transition"
            placeholder="https://github.com/octocat/example"
            type="text"
            onChange={handleChange}
            name="githubLink"
            id="githubLink"
            value={formState.githubLink}
            autoComplete="off"
          />
        </div>
        <div>
          <label className="text-gray-100 mb-2 block" htmlFor="liveLink">
            Live Link
          </label>
          <input
            className="rounded-md px-4 py-2 bg-[#2b3544] text-white w-full focus:outline-none focus:ring-2 focus:ring-green-600 transition"
            placeholder="https://exam.com"
            type="text"
            onChange={handleChange}
            name="liveLink"
            id="liveLink"
            value={formState.liveLink}
            autoComplete="off"
          />
        </div>
        <div>
          <label className="text-gray-100 mb-2 block" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            className="bg-[#2b3544] rounded-md p-4 text-white w-full min-h-[100px] focus:outline-none focus:ring-2 focus:ring-green-600 transition"
            onChange={handleChange}
            name="description"
            placeholder="Describe your Project"
            value={formState.description}
          />
        </div>
        {/* Tech stacks */}
        <div>
          <label className="text-gray-100 mb-2 block" htmlFor="stacks">
            Select Tech Stacks
          </label>
          <div className="bg-[#2b3544] rounded-md px-4 py-3 flex flex-wrap gap-4">
            {["React js", "Mongo DB", "Python", "Express js", "Node js"].map(
              (tech) => {
                return (
                  <label
                    key={tech}
                    className="flex items-center space-x-2 text-white"
                  >
                    <input
                      type="checkbox"
                      value={tech}
                      checked={formState.techs?.includes(tech)}
                      onChange={handleTechs}
                      className="accent-green-500"
                    />
                    <span>{tech}</span>
                  </label>
                );
              }
            )}
          </div>
        </div>
        <div>
          <label className="text-gray-100 mb-2 block" htmlFor="status">
            Project Status
          </label>
          <select
            onChange={handleStatus}
            name="status"
            id="status"
            className="rounded-md px-4 py-2 bg-[#2b3544] text-white w-full focus:outline-none focus:ring-2 focus:ring-green-600 transition"
            value={formState.status}
          >
            <option value="dev">Development</option>
            <option value="live">Live</option>
            <option value="dep-local">Dep-Local</option>
          </select>
        </div>
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={() => setshowUpdate(false)}
            className="py-2 px-6 rounded-md border border-white/10 bg-gray-600/40 text-white hover:bg-gray-700 hover:text-green-400 transition duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="py-2 px-8 rounded-md bg-green-600 text-white font-semibold hover:bg-green-500 transition duration-300 shadow-lg"
          >
            Update Project
          </button>
        </div>
      </motion.form>
    </section>
  );
};

export default UpdateProject;
