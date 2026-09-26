import { motion } from "framer-motion";
import { IProject } from "../../context/GlobalContext";
import ProjectCard from "../ProjectCard";

interface ProjectCollectionProps {
  projects: IProject[];
  visibleProjects: IProject[];
  showAll: boolean;
  onToggle: () => void;
  limit: number;
}

const ProjectCollection = ({ projects, visibleProjects, showAll, onToggle, limit }: ProjectCollectionProps) => (
  <>
    {projects.length ? <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:gap-7">
      {visibleProjects.map((project) => <ProjectCard key={project._id} project={project} />)}
    </motion.div> : <div className="rounded-2xl border border-white/10 bg-white/[0.025] px-6 py-12 text-center text-gray-400">No projects match this technology yet.</div>}
    {projects.length > limit && <div className="mt-8 text-center">
      <button type="button" aria-expanded={showAll} onClick={onToggle} className="rounded-full border border-[#02a94c]/50 px-5 py-2 text-sm font-semibold text-[#02a94c] transition hover:bg-[#02a94c]/10 hover:text-white">
        {showAll ? "Show less" : `See all ${projects.length} projects`}
      </button>
    </div>}
  </>
);

export default ProjectCollection;
