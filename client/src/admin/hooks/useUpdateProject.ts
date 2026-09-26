import { FormEvent, useEffect, useState } from "react";
import { IProject } from "../../context/GlobalContext";
import { useAdminContext } from "../context/AdminContext";

export type ProjectStatus = "dev" | "live" | "dep-local";
export interface ProjectForm { projectName: string; role: string; displayOrder: number; description: string; githubLink: string; liveLink: string; techs: string[]; status: ProjectStatus; imageFile: File | null }
const emptyForm: ProjectForm = { projectName: "", role: "", displayOrder: 1000, description: "", githubLink: "", liveLink: "", techs: [], status: "dev", imageFile: null };
const getStatus = (project: IProject): ProjectStatus => project.status ?? (project.isLive ? "live" : "dev");

export const useUpdateProject = (projectId: string, close: () => void) => {
  const { baseUrl, getProjectData } = useAdminContext();
  const [project, setProject] = useState<IProject | null>(null);
  const [form, setForm] = useState<ProjectForm>(emptyForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    fetch(`${baseUrl}/api/projects/${projectId}`).then(async (response) => {
      const data = await response.json();
      if (!response.ok || !data.project) throw new Error(data?.message || `Could not load project (${response.status}).`);
      setProject(data.project);
      setForm({ projectName: data.project.projectName || "", role: data.project.role || "", displayOrder: data.project.displayOrder ?? 1000, description: data.project.description || "", githubLink: data.project.githubLink || "", liveLink: data.project.liveLink || "", techs: data.project.techs || [], status: getStatus(data.project), imageFile: null });
    }).catch((cause) => setError(cause instanceof Error ? cause.message : "Could not load project."));
  }, [baseUrl, projectId]);
  const change = (name: string, value: string) => setForm((prev) => ({ ...prev, [name]: name === "displayOrder" ? Number(value) : value }));
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setError(""); setSaving(true);
    try {
      const body = new FormData();
      Object.entries(form).forEach(([key, value]) => { if (key !== "imageFile") body.append(key, key === "techs" ? JSON.stringify(value) : String(value)); });
      if (form.imageFile) body.append("image", form.imageFile);
      const response = await fetch(`${baseUrl}/api/projects/update/${projectId}`, { method: "PATCH", credentials: "include", body });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.success) throw new Error(result?.message || `Update failed (${response.status}).`);
      await getProjectData(); close();
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Failed to update project."); }
    finally { setSaving(false); }
  };
  const setFile = (file: File | null) => setForm((prev) => ({ ...prev, imageFile: file }));
  const setTechs = (techs: string[]) => setForm((prev) => ({ ...prev, techs }));
  return { project, form, error, saving, change, setFile, setTechs, submit };
};
