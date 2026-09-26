import AdminField from "./AdminField";
import TechStackEditor from "../TechStackEditor";

interface ProjectFields {
  projectName: string; role: string; displayOrder: number; description: string;
  githubLink: string; liveLink: string; techs: string[]; status: string;
}
interface ProjectEditorFieldsProps {
  value: ProjectFields;
  onChange: (name: string, value: string) => void;
  onFileChange: (file: File | null) => void;
  onTechChange: (techs: string[]) => void;
  currentImage?: string;
}

const ProjectEditorFields = ({ value, onChange, onFileChange, onTechChange, currentImage }: ProjectEditorFieldsProps) => <>
  <AdminField label="Project title" name="projectName" value={value.projectName} onChange={onChange} placeholder="Enter the project title" />
  <AdminField label="Your role in this project" name="role" value={value.role} onChange={onChange} placeholder="e.g. Frontend Developer Team Lead" />
  <AdminField label="Display position (lower numbers appear first)" name="displayOrder" type="number" value={value.displayOrder} onChange={onChange} />
  <AdminField label="Project image" name="image" type="file" onChange={onChange} onFileChange={onFileChange} currentImage={currentImage} />
  <AdminField label="Github link" name="githubLink" value={value.githubLink} onChange={onChange} placeholder="https://github.com/octocat/example" />
  <AdminField label="Live link" name="liveLink" value={value.liveLink} onChange={onChange} placeholder="https://example.com" />
  <AdminField label="Description" name="description" type="textarea" value={value.description} onChange={onChange} placeholder="Describe your project" />
  <TechStackEditor techs={value.techs} onChange={onTechChange} />
  <AdminField label="Project status" name="status" type="select" value={value.status} onChange={onChange} options={[{ label: "Development", value: "dev" }, { label: "Live", value: "live" }, { label: "Dep-Local", value: "dep-local" }]} />
</>;

export default ProjectEditorFields;
