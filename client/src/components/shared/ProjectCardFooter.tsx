import { CalendarDays, ExternalLink, Github } from "lucide-react";
import { IProject } from "../../context/GlobalContext";
import { ProjectStatus, getProjectLiveUrl, getProjectYear } from "../../utils/projectCard";

interface ProjectCardFooterProps {
  project: IProject;
  status: ProjectStatus;
}

const ProjectCardFooter = ({ project, status }: ProjectCardFooterProps) => {
  const year = getProjectYear(project.createdAt);
  const liveUrl = getProjectLiveUrl(project.liveLink);
  return (
    <div className="mt-5 flex items-center justify-between border-t border-white/[0.07] pt-4">
      {year && <span className="inline-flex items-center gap-2 text-xs text-gray-500"><CalendarDays className="h-4 w-4" aria-hidden="true" />{year}</span>}
      <div className="ml-auto flex gap-2">
        {status === "live" && liveUrl && <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-[#02a94c] px-3 py-2 text-xs font-semibold text-[#001012] transition hover:bg-[#02a94c]">Live demo<ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /></a>}
        {project.githubLink && <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-gray-200 transition hover:border-[#02a94c]/50 hover:text-[#02a94c]"><Github className="h-3.5 w-3.5" aria-hidden="true" />Code</a>}
      </div>
    </div>
  );
};

export default ProjectCardFooter;
