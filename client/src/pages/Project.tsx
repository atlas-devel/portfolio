import { useGlobalContext } from "../context/GlobalContext";
import { useProjectDisplay } from "../hooks/useProjectDisplay";
import ProjectCollection from "../components/shared/ProjectCollection";
import ProjectFilters from "../components/shared/ProjectFilters";
import SectionTitle from "../components/SectionTitle";

const Project = () => {
  const { allProjects } = useGlobalContext();
  const display = useProjectDisplay(allProjects);

  return (
    <section id="projects" className="mb-16 scroll-mt-24 py-12">
      <SectionTitle title="Recent" accent="works" eyebrow="Selected work" description="A selection of products I have helped build with teams across recruitment, e-commerce, and property technology." className="mb-10" />
      <ProjectFilters stacks={display.stacks} activeStack={display.activeStack} onSelect={display.selectStack} />
      <ProjectCollection projects={display.projects} visibleProjects={display.visible} showAll={display.showAll} onToggle={display.toggleAll} limit={display.limit} />
    </section>
  );
};

export default Project;
