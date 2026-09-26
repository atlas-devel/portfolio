import { Award, Code, Edit3, Eye, Globe, Tag } from "lucide-react";
import DashboardStatCard from "../../components/shared/DashboardStatCard";
import { useDashboardMetrics } from "../../hooks/useDashboardMetrics";
import { IVisitorStats } from "../context/AdminContext";

interface DashboardStatsGridProps {
  metrics: ReturnType<typeof useDashboardMetrics>;
  visitors: IVisitorStats;
}

const DashboardStatsGrid = ({ metrics, visitors }: DashboardStatsGridProps) => {
  const stats = [
    {
      label: "Total Projects",
      value: metrics.totalProjects,
      icon: Code,
      color: "bg-green-500",
    },
    {
      label: "In development",
      value: metrics.development,
      icon: Edit3,
      color: "bg-orange-500",
    },
    {
      label: "Live projects",
      value: metrics.live,
      icon: Globe,
      color: "bg-blue-500",
    },
    {
      label: "Dep-local projects",
      value: metrics.local,
      icon: Globe,
      color: "bg-indigo-500",
    },
    {
      label: "Tech stacks",
      value: metrics.technologies,
      icon: Tag,
      color: "bg-violet-500",
    },
    {
      label: "Total certificates",
      value: metrics.totalCertificates,
      icon: Award,
      color: "bg-emerald-500",
    },
    {
      label: "Certificates with file",
      value: metrics.withFiles,
      icon: Tag,
      color: "bg-teal-500",
    },
    {
      label: "Portfolio visitors",
      value: visitors.totalVisitors,
      icon: Eye,
      color: "bg-cyan-500",
      detail: (
        <p className="mt-1 text-xs text-cyan-200">
          {visitors.todayVisitors} today
        </p>
      ),
    },
  ];
  return (
    <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => (
        <DashboardStatCard
          key={stat.label}
          label={stat.label}
          value={stat.value}
          icon={stat.icon}
          iconClassName={stat.color}
          detail={stat.detail}
        />
      ))}
    </div>
  );
};

export default DashboardStatsGrid;
