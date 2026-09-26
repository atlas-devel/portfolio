import { useMemo } from "react";
import { ICertificate, IProject } from "../context/GlobalContext";
import { IVisitorStats } from "../admin/context/AdminContext";
import { resolveProjectStatus } from "../utils/dashboard";

export const useDashboardMetrics = (projects: IProject[] | null, certificates: ICertificate[], visitors: IVisitorStats) => {
  const projectList = projects ?? [];
  const projectCounts = {
    total: projectList.length,
    live: projectList.filter((item) => resolveProjectStatus(item) === "live").length,
    local: projectList.filter((item) => resolveProjectStatus(item) === "dep-local").length,
    development: projectList.filter((item) => resolveProjectStatus(item) === "dev").length,
    technologies: new Set(projectList.flatMap((item) => item.techs ?? [])).size,
  };
  const certificateCounts = {
    total: certificates.length,
    withFiles: certificates.filter((item) => Boolean(item.imageUrl)).length,
  };
  const chartData = useMemo(() => [
    { metric: "Projects", value: projectCounts.total }, { metric: "In Dev", value: projectCounts.development },
    { metric: "Live", value: projectCounts.live }, { metric: "Dep-Local", value: projectCounts.local },
    { metric: "Tech", value: projectCounts.technologies }, { metric: "Certs", value: certificateCounts.total },
    { metric: "Cert Files", value: certificateCounts.withFiles }, { metric: "Visitors", value: visitors.totalVisitors },
    { metric: "Today", value: visitors.todayVisitors },
  ], [projectCounts.total, projectCounts.development, projectCounts.live, projectCounts.local, projectCounts.technologies, certificateCounts.total, certificateCounts.withFiles, visitors.totalVisitors, visitors.todayVisitors]);
  const trendData = useMemo(() => visitors.last7Days.map((day) => ({
    day: new Date(day.date).toLocaleDateString(undefined, { month: "short", day: "numeric" }),
    visitors: day.count,
  })), [visitors.last7Days]);

  return {
    totalProjects: projectCounts.total,
    live: projectCounts.live,
    local: projectCounts.local,
    development: projectCounts.development,
    technologies: projectCounts.technologies,
    totalCertificates: certificateCounts.total,
    withFiles: certificateCounts.withFiles,
    chartData,
    trendData,
  };
};
