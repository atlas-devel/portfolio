import { Award, Plus } from "lucide-react";
import { IUserData } from "../context/AdminContext";
import DashboardProfileMenu from "./DashboardProfileMenu";

interface DashboardHeaderProps {
  userData: IUserData | null; showProfile: boolean; nameInitials: string; lastName: string;
  onToggleProfile: () => void; onAddCertificate: () => void; onAddProject: () => void;
  onLogout: () => void; onPortfolio: () => void;
}

const DashboardHeader = ({ userData, showProfile, nameInitials, lastName, onToggleProfile, onAddCertificate, onAddProject, onLogout, onPortfolio }: DashboardHeaderProps) => (
  <nav className="relative flex items-center justify-between border-b border-green-400/40 py-10 pb-3 text-white">
    <button type="button" aria-label="Open profile menu" aria-expanded={showProfile} onClick={onToggleProfile} className="flex h-12 w-12 items-center justify-center rounded-full border border-green-500 bg-green-600/10">
      <img src="/leon.jpeg" alt="Leon's profile" className="h-full w-full rounded-full object-cover" />
    </button>
    <div className="flex gap-4">
      <button type="button" onClick={onAddCertificate} className="flex items-center gap-2 rounded-lg bg-[#0a7a3b] px-4 py-3 duration-300 hover:bg-green-500 md:py-1.5"><Award className="h-5 w-5" /><span className="hidden sm:block">Add a certificate</span></button>
      <button type="button" onClick={onAddProject} className="flex items-center gap-2 rounded-lg bg-[#02a94c] px-4 py-3 duration-300 hover:bg-green-500 md:py-1.5"><Plus className="h-5 w-5" /><span className="hidden sm:block">Add a project</span></button>
    </div>
    {showProfile && <DashboardProfileMenu userData={userData} nameInitials={nameInitials} lastName={lastName} onLogout={onLogout} onPortfolio={onPortfolio} onMouseLeave={onToggleProfile} />}
  </nav>
);

export default DashboardHeader;
