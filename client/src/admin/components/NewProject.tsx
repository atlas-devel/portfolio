import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useContext } from "react";
import { AdminContextAuth } from "../context/AdminContext";

interface NewProjectProps {
  setaddProject: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess?: (name: string) => void;
}

interface CreateProjectForm {
  projectName: string;
  description: string;
  githubLink: string;
  liveLink: string;
  techs: string[];
  status: "dev" | "live" | "dep-local";
  imageFile: File | null;
}

const NewProject: React.FC<NewProjectProps> = ({ setaddProject, onSuccess }) => {
  const { baseUrl, getProjectData } = useContext(AdminContextAuth);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [createProject, setcreateProject] = useState<CreateProjectForm>({
    projectName: "",
    description: "",
    githubLink: "",
    liveLink: "",
    techs: [],
    status: "dev",
    imageFile: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setcreateProject((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleTechs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;
    setcreateProject((prev) => {
      if (checked && !prev.techs.includes(value)) {
        return { ...prev, techs: [...prev.techs, value] };
      }
      if (!checked) {
        return { ...prev, techs: prev.techs.filter((tech) => tech !== value) };
      }
      return prev;
    });
  };

  // submitting project to api backend

  const submitProject = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("projectName", createProject.projectName);
      formData.append("description", createProject.description);
      formData.append("githubLink", createProject.githubLink);
      formData.append("liveLink", createProject.liveLink);
      formData.append("techs", JSON.stringify(createProject.techs));
      formData.append("status", createProject.status);
      if (createProject.imageFile) {
        formData.append("image", createProject.imageFile);
      }

      const res = await fetch(`${baseUrl}/api/projects/upload`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await res.json();
      if (res.ok && data.success) {
        await getProjectData();
        onSuccess?.(createProject.projectName);
        setaddProject(false);
        return;
      }
      setErrorMessage(
        data?.message ||
          `Failed to upload project: ${res.status} ${res.statusText}`,
      );
    } catch (error) {
      console.log(error);
      setErrorMessage("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
  const navigate = useNavigate();
  return (
    <section className=" h-screen fixed top-0 right-0 overflow-hidden sm:overflow-auto bg-black/30 backdrop-blur-sm w-full flex items-center justify-center">
      <div className=" ">
        <motion.form
          initial={{ opacity: 0, y: -200 }}
          animate={{ opacity: 1, y: 1 }}
          transition={{
            duration: 0.4,
            type: "tween",
            transitionBehavior: 10,
            ease: "easeInOut",
          }}
          className="flex h-screen sm:h-[90vh] capitalize flex-col text-white bg-[#1c2532] p-8 sm:rounded-lg w-screen sm:w-[60vw] lg:w-[38vw] space-y-10"
        >
          <div>
            <h1 className="text-center font-bold text-2xl capitalize">
              Add new project
            </h1>
          </div>
          <div className="flex   capitalize flex-col space-y-7 overflow-auto custom-scroll">
            <div className="flex flex-col mx-4">
              <label className="text-gray-100 mb-2" htmlFor="title">
                project title
              </label>
              <input
                onChange={handleChange}
                className="rounded-md px-4 py-1 bg-[#2b3544]"
                placeholder="Enter The Project Title"
                type="text"
                name="projectName"
                id="title"
              />
            </div>
            <div className="flex flex-col mx-4">
              <label className="text-gray-100 mb-2" htmlFor="title">
                project file
              </label>
              <input
                className="rounded-md px-4 py-1 bg-[#2b3544]"
                type="file"
                name="image"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setcreateProject((prev) => {
                      return { ...prev, imageFile: e.target.files?.[0] ?? null };
                    });
                  }
                }}
                id="title"
              />
            </div>
            <div className="flex flex-col mx-4">
              <label className="text-gray-100 mb-2" htmlFor="title">
                github link
              </label>
              <input
                className="rounded-md px-4 py-1 bg-[#2b3544]"
                placeholder="https://github.com/octocat/example"
                type="text"
                onChange={handleChange}
                name="githubLink"
                id="title"
              />
            </div>
            <div className="flex flex-col mx-4">
              <label className="text-gray-100 mb-2" htmlFor="title">
                live link
              </label>
              <input
                className="rounded-md px-4 py-1 bg-[#2b3544]"
                placeholder="https://exam.com"
                type="text"
                onChange={handleChange}
                name="liveLink"
                id="title"
              />
            </div>
            <div className="flex flex-col mx-4">
              <label className="text-gray-100 mb-2" htmlFor="description">
                description
              </label>
              <textarea
                type="text"
                id="description"
                className="bg-[#2b3544] rounded-md p-4"
                onChange={handleChange}
                name="description"
                placeholder="Describe your Project"
              />
            </div>
            {/* Tech stacks */}
            <div className="flex flex-col mx-4">
              <div className="flex justify-between">
                <div className="flex flex-col  w-full">
                  <label className="text-gray-100 mb-2" htmlFor="stacks">
                    Select Tech Stacks
                  </label>
                  <div className="bg-[#2b3544] rounded-md px-4 py-2">
                    <div className="gap-3 flex flex-col md:flex-row md:justify-between p-2 ">
                      <div>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            value="React js"
                            className="accent-blue-500"
                            onChange={handleTechs}
                          />
                          <span>React js</span>
                        </label>

                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            value="Mongo DB"
                            onChange={handleTechs}
                            className="accent-green-500"
                          />
                          <span>Mongo DB</span>
                        </label>
                      </div>
                      <div>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            onChange={handleTechs}
                            value="Python"
                            className="accent-yellow-500"
                          />
                          <span>Python</span>
                        </label>

                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            onChange={handleTechs}
                            value="Express js"
                            className="accent-gray-500"
                          />
                          <span>Express js</span>
                        </label>
                      </div>
                      <div>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            onChange={handleTechs}
                            value="Postgresql"
                            className="accent-green-600"
                          />
                          <span>Node js</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            onChange={handleTechs}
                            value="Node js"
                            className="accent-green-600"
                          />
                          <span>Postgresql</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col mx-4">
              <label className="text-gray-100 mb-2" htmlFor="Tech">
                project status
              </label>

              <select
                onChange={(e) =>
                  setcreateProject((prev) => {
                    return {
                      ...prev,
                      status: (e.target as HTMLSelectElement).value as
                        | "dev"
                        | "live"
                        | "dep-local",
                    };
                  })
                }
                name="status"
                id="status"
                className="rounded-md px-4 py-2 bg-[#2b3544]"
                value={createProject.status}
              >
                <option value="dev">Development</option>
                <option value="live">Live</option>
                <option value="dep-local">Dep-Local</option>
              </select>
            </div>

            <div className="flex justify-between mx-4 pt-1">
              {errorMessage && (
                <p className="text-sm text-red-400">{errorMessage}</p>
              )}
            </div>

            <div className="flex justify-between mx-4">
              <button
                type="button"
                onClick={() => setaddProject(false)}
                className="py-1.5 px-2 md:px-10 rounded-md border border-white/10 bg-gray-600/40 cursor-pointer hover:bg-gray-700 duration-400"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={submitProject}
                disabled={submitting}
                className="py-1.5 px-2 md:px-6 rounded-md bg-green-600 hover:bg-green-500 cursor-pointer duration-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Uploading..." : "Submit Project"}
              </button>
            </div>
          </div>
        </motion.form>
      </div>
    </section>
  );
};

export default NewProject;
