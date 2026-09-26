import { ExternalLink, Github } from "lucide-react";
import { IProject } from "../../context/GlobalContext";

type ProjectStatus = "dev" | "live" | "dep-local";

interface DashboardProjectLinksProps {
  project: IProject;
  status: ProjectStatus;
}

const DashboardProjectLinks = ({
  project,
  status,
}: DashboardProjectLinksProps) => (
  <>
    {status === "live" && project.liveLink ? (
      <a
        href={
          project.liveLink.startsWith("http")
            ? project.liveLink
            : `https://${project.liveLink}`
        }
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Open ${project.projectName}`}
        title="Open live project"
        className="text-[#02a94c] transition hover:scale-110 hover:text-white"
      >
        <ExternalLink className="w-4" />
      </a>
    ) : (
      <span title="No public live link" className="text-gray-600">
        <ExternalLink className="w-4" />
      </span>
    )}
    {project.githubLink && (
      <a
        href={project.githubLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${project.projectName} source code`}
        title="Open source code"
        className="text-gray-400 transition hover:scale-110 hover:text-white"
      >
        <Github className="w-4" />
      </a>
    )}
  </>
);

export default DashboardProjectLinks;
