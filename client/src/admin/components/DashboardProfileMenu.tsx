import { LogOut, Phone } from "lucide-react";
import { IUserData } from "../context/AdminContext";

interface DashboardProfileMenuProps {
  userData: IUserData | null;
  nameInitials: string;
  lastName: string;
  onLogout: () => void;
  onPortfolio: () => void;
  onMouseLeave: () => void;
}

const DashboardProfileMenu = ({
  userData,
  nameInitials,
  lastName,
  onLogout,
  onPortfolio,
  onMouseLeave,
}: DashboardProfileMenuProps) => (
  <div
    onMouseLeave={onMouseLeave}
    className="absolute left-0 top-24 z-10 flex w-full flex-col gap-2 rounded-md border-2 border-green-500/30 bg-[#001012] p-4 py-5 text-sm text-gray-300 sm:w-auto xl:text-md"
  >
    <div className="flex items-center gap-2 border-b border-green-500/40 pb-3 font-semibold">
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-green-500 bg-green-600/20 p-1">
        <span className="text-xl text-white">{nameInitials}</span>
      </span>
      <div>
        <p>{userData?.email}</p>
        <p>{lastName}</p>
      </div>
    </div>
    <div className="flex items-center gap-1 pt-2">
      <Phone className="w-4" />
      <p>{userData?.phone_number}</p>
    </div>
    <button
      type="button"
      onClick={onLogout}
      className="flex items-center gap-1 font-semibold text-green-600 hover:text-green-500"
    >
      <LogOut className="w-4" />
      Logout
    </button>
    {userData?.phone_number && (
      <button
        type="button"
        onClick={onPortfolio}
        className="text-center font-light uppercase hover:text-green-500"
      >
        Portfolio
      </button>
    )}
  </div>
);

export default DashboardProfileMenu;
