import { useEffect, useState } from "react";

interface DashboardNoticeState { title: string; detail: string; time: string }

export const useDashboardNotice = () => {
  const [notice, setNotice] = useState<DashboardNoticeState | null>(null);
  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(null), 3200);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const showAdded = (type: "project" | "certificate", rawName: string) => {
    const name = rawName?.trim() || (type === "project" ? "Untitled project" : "Untitled certificate");
    const noun = type === "project" ? "Project" : "Certificate";
    const location = type === "project" ? "Projects" : "Certificates";
    setNotice({ title: `New ${type} added`, detail: `${noun} "${name}" was added to ${location}.`, time: new Date().toLocaleTimeString() });
  };

  return { notice, showAdded };
};
