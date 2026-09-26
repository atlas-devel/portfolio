import { ComponentType, ReactNode } from "react";

interface DashboardStatCardProps {
  label: string;
  value: number;
  icon: ComponentType;
  iconClassName: string;
  detail?: ReactNode;
}

const DashboardStatCard = ({
  label,
  value,
  icon: Icon,
  iconClassName,
  detail,
}: DashboardStatCardProps) => (
  <div className="bg-green-800/30 p-6 text-white backdrop-blur-sm rounded-md border border-white/20">
    <div className="flex items-center gap-3">
      <div className={`${iconClassName} w-fit p-4 rounded-lg`}>
        <Icon />
      </div>
      <div>
        <p className="font-sm text-gray-400">{label}</p>
        <h1 className="font-bold text-xl">{value}</h1>
        {detail}
      </div>
    </div>
  </div>
);

export default DashboardStatCard;
