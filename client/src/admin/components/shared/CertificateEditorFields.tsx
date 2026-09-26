import AdminField from "./AdminField";

interface CertificateEditorFieldsProps {
  value: { title: string; issuer: string; date: string; description: string; displayOrder: number };
  onChange: (name: string, value: string) => void;
  onFileChange: (file: File | null) => void;
}

const CertificateEditorFields = ({ value, onChange, onFileChange }: CertificateEditorFieldsProps) => <>
  <AdminField label="Title" name="title" value={value.title} onChange={onChange} placeholder="Enter certificate title" />
  <AdminField label="Issuer" name="issuer" value={value.issuer} onChange={onChange} placeholder="e.g. Forward Edge Ltd" />
  <AdminField label="Date" name="date" value={value.date} onChange={onChange} placeholder="e.g. 2024" />
  <AdminField label="Description" name="description" type="textarea" value={value.description} onChange={onChange} placeholder="Describe this certificate" />
  <AdminField label="Display position (lower numbers appear first)" name="displayOrder" type="number" value={value.displayOrder} onChange={onChange} />
  <AdminField label="Certificate file/image" name="image" type="file" onChange={onChange} onFileChange={onFileChange} />
</>;

export default CertificateEditorFields;
