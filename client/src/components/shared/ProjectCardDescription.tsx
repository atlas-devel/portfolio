import useExpandableText from "../../hooks/useExpandableText";

const ProjectCardDescription = ({ text }: { text: string }) => {
  const { expanded, toggle, canExpand } = useExpandableText(text);
  return (
    <>
      <p className={`mt-2 text-sm leading-6 text-gray-400 ${expanded ? "" : "line-clamp-4"}`}>{text}</p>
      {canExpand && <button type="button" aria-expanded={expanded} onClick={toggle} className="mt-2 w-fit text-xs font-semibold text-[#02a94c] transition hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#02a94c]">{expanded ? "Show less" : "Read more"}</button>}
    </>
  );
};

export default ProjectCardDescription;
