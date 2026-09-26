import { useState } from "react";

export const useDashboardOverlays = () => {
  const [addProject, setAddProject] = useState(false);
  const [addCertificate, setAddCertificate] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [showUpdate, setShowUpdate] = useState(false);
  return { addProject, setAddProject, addCertificate, setAddCertificate, showProfile, setShowProfile, projectId, setProjectId, showUpdate, setShowUpdate };
};
