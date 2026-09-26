import { FormEvent, useState } from "react";
import { useAdminContext } from "../context/AdminContext";
import AdminFormActions from "./shared/AdminFormActions";
import AdminFormModal from "./shared/AdminFormModal";
import ProjectEditorFields from "./shared/ProjectEditorFields";

interface NewProjectProps {
  setaddProject: (open: boolean) => void;
  onSuccess?: (name: string) => void;
}
interface ProjectForm {
  projectName: string;
  role: string;
  displayOrder: number;
  description: string;
  githubLink: string;
  liveLink: string;
  techs: string[];
  status: "dev" | "live" | "dep-local";
  imageFile: File | null;
}
const initialForm: ProjectForm = {
  projectName: "",
  role: "",
  displayOrder: 1000,
  description: "",
  githubLink: "",
  liveLink: "",
  techs: [],
  status: "dev",
  imageFile: null,
};

const NewProject = ({ setaddProject, onSuccess }: NewProjectProps) => {
  const { baseUrl, getProjectData } = useAdminContext();
  const [form, setForm] = useState<ProjectForm>(initialForm);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const change = (name: string, value: string) =>
    setForm((prev) => ({
      ...prev,
      [name]: name === "displayOrder" ? Number(value) : value,
    }));
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSaving(true);
    try {
      const body = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key !== "imageFile")
          body.append(
            key,
            key === "techs" ? JSON.stringify(value) : String(value),
          );
      });
      if (form.imageFile) body.append("image", form.imageFile);
      const response = await fetch(`${baseUrl}/api/projects/upload`, {
        method: "POST",
        credentials: "include",
        body,
      });
      const data = await response.json();
      if (!response.ok || !data.success)
        throw new Error(data?.message || `Upload failed (${response.status}).`);
      await getProjectData();
      onSuccess?.(form.projectName);
      setaddProject(false);
    } catch (cause) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Network error. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };
  return (
    <AdminFormModal
      title="Add new project"
      onSubmit={submit}
      className="flex h-screen w-screen flex-col space-y-10 bg-[#1c2532] p-8 capitalize text-white sm:h-[90vh] sm:w-[60vw] sm:rounded-lg lg:w-[38vw]"
    >
      <div className="flex flex-col space-y-7 overflow-auto custom-scroll">
        <ProjectEditorFields
          value={form}
          onChange={change}
          onFileChange={(imageFile) =>
            setForm((prev) => ({ ...prev, imageFile }))
          }
          onTechChange={(techs) => setForm((prev) => ({ ...prev, techs }))}
        />
        {error && (
          <p role="alert" className="text-sm text-red-400">
            {error}
          </p>
        )}
        <AdminFormActions
          onCancel={() => setaddProject(false)}
          saving={saving}
          busyLabel="Uploading..."
          submitLabel="Submit project"
        />
      </div>
    </AdminFormModal>
  );
};

export default NewProject;
