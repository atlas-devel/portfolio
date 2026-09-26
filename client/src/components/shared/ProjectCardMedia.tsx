import { Code2 } from "lucide-react";
import { IProject } from "../../context/GlobalContext";
import { ProjectStatus, getProjectLiveUrl } from "../../utils/projectCard";
import ProjectStatusBadge from "./ProjectStatusBadge";

interface ProjectCardMediaProps {
  project: IProject;
  status: ProjectStatus;
}

const ProjectCardMedia = ({ project, status }: ProjectCardMediaProps) => {
  const liveUrl = getProjectLiveUrl(project.liveLink);
  return (
    <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-[#02a94c]/15 via-[#062321] to-[#001012]">
      {project.imageFile ? <img src={project.imageFile} alt={`${project.projectName} preview`} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" /> : <Code2 className="m-auto h-full w-full p-20 text-[#02a94c]/60" aria-hidden="true" />}
      {status === "live" && liveUrl && <a href={liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.projectName}`} className="absolute inset-0 z-[1]" />}
      <ProjectStatusBadge status={status} />
    </div>
  );
};

export default ProjectCardMedia;
