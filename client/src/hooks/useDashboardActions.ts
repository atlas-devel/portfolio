import { NavigateFunction } from "react-router-dom";

interface DashboardActionDeps {
  baseUrl: string;
  getProjectData: () => Promise<void>;
  getCertificateData: () => Promise<void>;
  navigate: NavigateFunction;
}

export const useDashboardActions = ({ baseUrl, getProjectData, getCertificateData, navigate }: DashboardActionDeps) => {
  const logout = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/portfolio/logout`, { method: "post", credentials: "include" });
      const result = await response.json();
      if (result.success) navigate("/auth/secret/admin-login");
    } catch (error) { console.error(error); }
  };

  const saveProjectOrder = async (id: string, displayOrder: number) => {
    const body = new FormData();
    body.append("displayOrder", String(displayOrder));
    const response = await fetch(`${baseUrl}/api/projects/update/${id}`, { method: "PATCH", credentials: "include", body });
    const result = await response.json().catch(() => null);
    if (!response.ok || !result?.success) throw new Error(result?.message || "Project order was not saved.");
    await getProjectData();
  };

  const saveCertificateOrder = async (id: string, displayOrder: number) => {
    const response = await fetch(`${baseUrl}/api/certificates/order/${id}`, {
      method: "PATCH", credentials: "include", headers: { "content-type": "application/json" }, body: JSON.stringify({ displayOrder }),
    });
    const result = await response.json().catch(() => null);
    if (!response.ok || !result?.success) throw new Error(result?.message || "Certificate order was not saved.");
    await getCertificateData();
  };

  return { logout, saveProjectOrder, saveCertificateOrder };
};
