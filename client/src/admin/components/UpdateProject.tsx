import { Dispatch, SetStateAction } from "react";
import AdminFormActions from "./shared/AdminFormActions";
import AdminFormModal from "./shared/AdminFormModal";
import ProjectEditorFields from "./shared/ProjectEditorFields";
import ProjectLoadingNotice from "./shared/ProjectLoadingNotice";
import { useUpdateProject } from "../hooks/useUpdateProject";

interface UpdateProjectProps {
  projectId: string;
  setshowUpdate: Dispatch<SetStateAction<boolean>>;
}

const UpdateProject = ({ projectId, setshowUpdate }: UpdateProjectProps) => {
  const form = useUpdateProject(projectId, () => setshowUpdate(false));
  if (!form.project)
    return (
      <ProjectLoadingNotice
        error={form.error}
        onClose={() => setshowUpdate(false)}
      />
    );
  return (
    <AdminFormModal
      title="Update project"
      onSubmit={form.submit}
      titleClassName="mb-2 text-center text-3xl font-bold capitalize tracking-wide text-white"
      className="custom-scroll mx-auto flex max-h-[90vh] w-full max-w-2xl flex-col gap-8 overflow-y-auto overflow-hidden rounded-xl border border-[#2b3544] bg-[#1c2532]/95 p-8 text-white shadow-2xl sm:p-12"
    >
      <ProjectEditorFields
        value={form.form}
        onChange={form.change}
        onFileChange={form.setFile}
        onTechChange={form.setTechs}
        currentImage={form.project.imageFile}
      />
      {form.error && (
        <p
          role="alert"
          className="rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
        >
          {form.error}
        </p>
      )}
      <AdminFormActions
        onCancel={() => setshowUpdate(false)}
        saving={form.saving}
        busyLabel="Saving..."
        submitLabel="Update project"
      />
    </AdminFormModal>
  );
};

export default UpdateProject;
