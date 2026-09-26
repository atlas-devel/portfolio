import { ExternalLink } from "lucide-react";
import { IProject } from "../../context/GlobalContext";
import { getProjectLiveUrl } from "../../utils/projectCard";

const ProjectCardTitle = ({ project }: { project: IProject }) => {
  const liveUrl = getProjectLiveUrl(project.liveLink);
  return (
    <>
      {project.role && <p className="mb-2 w-fit rounded-full border border-[#02a94c]/30 bg-[#02a94c]/10 px-3 py-1 text-xs font-semibold text-[#02a94c]">{project.role}</p>}
      <h3 className="text-xl font-bold text-white transition-colors group-hover:text-[#02a94c]">
        {liveUrl ? <a href={liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.projectName}`} className="inline-flex items-center gap-2 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#02a94c]">{project.projectName}<ExternalLink className="h-4 w-4 shrink-0 opacity-70" aria-hidden="true" /></a> : project.projectName}
      </h3>
    </>
  );
};

export default ProjectCardTitle;
