import { Code } from "lucide-react";
import { IProject } from "../../context/GlobalContext";
import ProjectStatusBadge from "./ProjectStatusBadge";

type ProjectStatus = "dev" | "live" | "dep-local";

const DashboardProjectMedia = ({ project, status }: { project: IProject; status: ProjectStatus }) => (
  <div className="relative h-60 w-full bg-gradient-to-bl from-white/20 to-0">
    <ProjectStatusBadge status={status} variant="admin" />
    {project.imageFile ? <img src={project.imageFile} alt="" className="h-full w-full cursor-pointer object-cover brightness-75 transition duration-300 hover:brightness-95" /> : <div className="flex h-full w-full items-center text-gray-400"><Code className="m-auto h-15 w-20" /></div>}
  </div>
);

export default DashboardProjectMedia;
