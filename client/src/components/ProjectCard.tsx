import { IProject } from "../context/GlobalContext";
import { getProjectStatus } from "../utils/projectCard";
import ProjectCardDescription from "./shared/ProjectCardDescription";
import ProjectCardFooter from "./shared/ProjectCardFooter";
import ProjectCardMedia from "./shared/ProjectCardMedia";
import ProjectCardTitle from "./shared/ProjectCardTitle";
import ProjectTechTags from "./shared/ProjectTechTags";

const ProjectCard = ({ project }: { project: IProject }) => {
  const status = getProjectStatus(project);
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#02a94c]/25 bg-[#06191a]/80 shadow-[0_12px_40px_rgba(0,0,0,0.2)] transition duration-300 hover:-translate-y-1 hover:border-[#02a94c]/60 hover:shadow-[0_18px_48px_rgba(2,169,76,0.13)]">
      <ProjectCardMedia project={project} status={status} />
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <ProjectCardTitle project={project} />
        <ProjectCardDescription text={project.description} />
        <ProjectTechTags techs={project.techs} limit={6} />
        <ProjectCardFooter project={project} status={status} />
      </div>
    </article>
  );
};

export default ProjectCard;
