import { Dispatch, SetStateAction } from "react";
import NewCertificate from "./NewCertificate";
import NewProject from "./NewProject";
import UpdateProject from "./UpdateProject";

interface DashboardOverlaysProps {
  addProject: boolean;
  addCertificate: boolean;
  showUpdate: boolean;
  projectId: string | null;
  setAddProject: Dispatch<SetStateAction<boolean>>;
  setAddCertificate: Dispatch<SetStateAction<boolean>>;
  setShowUpdate: Dispatch<SetStateAction<boolean>>;
  onProjectSuccess: (name: string) => void;
  onCertificateSuccess: (title: string) => void;
}

const DashboardOverlays = ({
  addProject,
  addCertificate,
  showUpdate,
  projectId,
  setAddProject,
  setAddCertificate,
  setShowUpdate,
  onProjectSuccess,
  onCertificateSuccess,
}: DashboardOverlaysProps) => (
  <>
    {addProject && (
      <section className="absolute top-0 left-0 min-h-screen w-full z-50">
        <NewProject
          setaddProject={setAddProject}
          onSuccess={onProjectSuccess}
        />
      </section>
    )}
    {addCertificate && (
      <section className="absolute top-0 left-0 min-h-screen w-full z-50">
        <NewCertificate
          setAddCertificate={setAddCertificate}
          onSuccess={onCertificateSuccess}
        />
      </section>
    )}
    {showUpdate && projectId && (
      <UpdateProject setshowUpdate={setShowUpdate} projectId={projectId} />
    )}
  </>
);

export default DashboardOverlays;
