import { Edit3, Trash } from "lucide-react";
import { IProject } from "../../context/GlobalContext";
import DashboardProjectLinks from "./DashboardProjectLinks";

type ProjectStatus = "dev" | "live" | "dep-local";

interface DashboardProjectActionsProps {
  project: IProject;
  status: ProjectStatus;
  onEdit: () => void;
  onDelete: () => void;
}

const DashboardProjectActions = ({ project, status, onEdit, onDelete }: DashboardProjectActionsProps) => (
  <div className="flex gap-4 p-2">
    <DashboardProjectLinks project={project} status={status} />
    <button type="button" aria-label={`Edit ${project.projectName}`} title="Edit project" onClick={onEdit} className="cursor-pointer text-gray-400 transition hover:scale-110 hover:text-[#02a94c]"><Edit3 className="w-4" /></button>
    <button type="button" aria-label={`Delete ${project.projectName}`} title="Delete project" onClick={onDelete} className="cursor-pointer text-gray-400 transition hover:scale-110 hover:text-red-400"><Trash className="w-4" /></button>
  </div>
);

export default DashboardProjectActions;
