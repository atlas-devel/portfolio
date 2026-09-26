interface ProjectTechTagsProps {
  techs?: string[];
  limit?: number;
  className?: string;
  extraClassName?: string;
  containerClassName?: string;
}

const ProjectTechTags = ({
  techs = [],
  limit,
  className = "rounded-full border border-[#02a94c]/20 bg-[#02a94c]/[0.07] px-3 py-1 text-xs text-gray-300",
  extraClassName = "px-2 py-1 text-xs text-gray-500",
  containerClassName = "mt-4 flex flex-wrap gap-2",
}: ProjectTechTagsProps) => {
  const visibleTechs = limit === undefined ? techs : techs.slice(0, limit);
  const remaining =
    limit === undefined ? 0 : techs.length - visibleTechs.length;

  return (
    <div className={containerClassName}>
      {visibleTechs.map((tech) => (
        <span key={tech} className={className}>
          {tech}
        </span>
      ))}
      {remaining > 0 && <span className={extraClassName}>+{remaining}</span>}
    </div>
  );
};

export default ProjectTechTags;
