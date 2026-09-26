import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IAdminContextAuth } from "../context/AdminContext";
import DashboardCertificateSection from "./DashboardCertificateSection";
import DashboardCharts from "./DashboardCharts";
import DashboardHeader from "./DashboardHeader";
import DashboardNotice from "./DashboardNotice";
import DashboardOverlays from "./DashboardOverlays";
import DashboardProjectList from "./DashboardProjectList";
import DashboardStatsGrid from "./DashboardStatsGrid";
import { useDashboardActions } from "../../hooks/useDashboardActions";
import { useDashboardMetrics } from "../../hooks/useDashboardMetrics";
import { useDashboardNotice } from "../../hooks/useDashboardNotice";
import { useDashboardOverlays } from "../../hooks/useDashboardOverlays";
import { getUserInitials } from "../../utils/dashboard";

const DashboardContent = ({ context }: { context: IAdminContextAuth }) => {
  const navigate = useNavigate();
  const overlays = useDashboardOverlays();
  const { notice, showAdded } = useDashboardNotice();
  const metrics = useDashboardMetrics(context.projects, context.certificates, context.visitorStats);
  const actions = useDashboardActions({ baseUrl: context.baseUrl, getProjectData: context.getProjectData, getCertificateData: context.getCertificateData, navigate });

  useEffect(() => {
    context.getProjectData();
    context.getCertificateData();
    context.getVisitorStats();
  }, []);

  return (
    <section className="relative min-h-screen w-screen">
      {notice && <DashboardNotice {...notice} />}
      <div className="px-4 md:px-8 lg:px-16 xl:px-24">
        <DashboardHeader userData={context.userData} showProfile={overlays.showProfile} nameInitials={getUserInitials(context.userData?.fullName)} lastName={context.userData?.fullName?.trim().split(/\s+/).at(-1) ?? "Admin"} onToggleProfile={() => overlays.setShowProfile((value) => !value)} onAddCertificate={() => overlays.setAddCertificate(true)} onAddProject={() => overlays.setAddProject(true)} onLogout={actions.logout} onPortfolio={() => navigate("/")} />
        <DashboardStatsGrid metrics={metrics} visitors={context.visitorStats} />
        <DashboardCharts statsChartData={metrics.chartData} visitorTrendData={metrics.trendData} />
        <DashboardProjectList projects={context.projects} onEdit={(id) => { overlays.setProjectId(id); overlays.setShowUpdate(true); }} onDelete={context.deleteProject} onSaveOrder={actions.saveProjectOrder} />
        <DashboardCertificateSection certificates={context.certificates} onSaveOrder={actions.saveCertificateOrder} />
      </div>
      <DashboardOverlays addProject={overlays.addProject} addCertificate={overlays.addCertificate} showUpdate={overlays.showUpdate} projectId={overlays.projectId} setAddProject={overlays.setAddProject} setAddCertificate={overlays.setAddCertificate} setShowUpdate={overlays.setShowUpdate} onProjectSuccess={(name) => showAdded("project", name)} onCertificateSuccess={(title) => showAdded("certificate", title)} />
    </section>
  );
};

export default DashboardContent;
