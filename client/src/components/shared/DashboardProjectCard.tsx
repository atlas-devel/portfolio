import { Calendar } from "lucide-react";
import { IProject } from "../../context/GlobalContext";
import DashboardProjectActions from "./DashboardProjectActions";
import DashboardProjectMedia from "./DashboardProjectMedia";
import DisplayOrderEditor from "./DisplayOrderEditor";
import ProjectTechTags from "./ProjectTechTags";

type ProjectStatus = "dev" | "live" | "dep-local";
interface DashboardProjectCardProps { project: IProject; status: ProjectStatus; formatDate: (createdAt?: string) => string; onEdit: () => void; onDelete: () => void; onSaveOrder: (order: number) => Promise<void>; }

const DashboardProjectCard = ({ project, status, formatDate, onEdit, onDelete, onSaveOrder }: DashboardProjectCardProps) => (
  <div className="overflow-hidden rounded-md border border-white/20 bg-gray-800/50 text-white backdrop-blur-sm">
    <DashboardProjectMedia project={project} status={status} />
    <div className="p-4">
      <h2 className="text-xl font-bold">{project.projectName}</h2>
      {project.role && <p className="mt-2 w-fit rounded-full border border-[#02a94c]/30 bg-[#02a94c]/10 px-3 py-1 text-xs font-semibold text-[#02a94c]">{project.role}</p>}
      <p className="my-3 line-clamp-3 text-sm font-semibold text-gray-400">{project.description}</p>
      <ProjectTechTags techs={project.techs} containerClassName="mt-3 flex flex-wrap gap-2" className="rounded-full border border-[#02a94c]/20 bg-[#02a94c]/[0.07] px-3 py-1 text-xs text-gray-300" />
      <div className="flex items-center justify-between text-sm text-gray-400"><span className="inline-flex items-center gap-3"><Calendar className="w-5" />{formatDate(project.createdAt)}</span><DashboardProjectActions project={project} status={status} onEdit={onEdit} onDelete={onDelete} /></div>
      <DisplayOrderEditor displayOrder={project.displayOrder ?? 1000} onSave={onSaveOrder} />
    </div>
  </div>
);

export default DashboardProjectCard;
