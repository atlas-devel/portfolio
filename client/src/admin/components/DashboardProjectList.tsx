import { IProject } from "../../context/GlobalContext";
import { formatProjectDate, resolveProjectStatus } from "../../utils/dashboard";
import DashboardProjectToolbar from "./DashboardProjectToolbar";
import DashboardProjectCard from "../../components/shared/DashboardProjectCard";

interface DashboardProjectListProps {
  projects: IProject[] | null;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onSaveOrder: (id: string, order: number) => Promise<void>;
}

const DashboardProjectList = ({
  projects,
  onEdit,
  onDelete,
  onSaveOrder,
}: DashboardProjectListProps) => (
  <section>
    <DashboardProjectToolbar />
    <div className="my-4 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {projects?.map((project) => (
        <DashboardProjectCard
          key={project._id}
          project={project}
          status={resolveProjectStatus(project)}
          formatDate={formatProjectDate}
          onEdit={() => onEdit(project._id)}
          onDelete={() => onDelete(project._id)}
          onSaveOrder={(order) => onSaveOrder(project._id, order)}
        />
      ))}
    </div>
  </section>
);

export default DashboardProjectList;
