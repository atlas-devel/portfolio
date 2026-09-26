import { FormEvent, useState } from "react";
import { useAdminContext } from "../context/AdminContext";
import AdminFormActions from "./shared/AdminFormActions";
import AdminFormModal from "./shared/AdminFormModal";
import CertificateEditorFields from "./shared/CertificateEditorFields";

interface NewCertificateProps {
  setAddCertificate: (open: boolean) => void;
  onSuccess?: (title: string) => void;
}
interface CertificateForm {
  title: string;
  issuer: string;
  date: string;
  description: string;
  displayOrder: number;
  imageFile: File | null;
}
const initialForm: CertificateForm = {
  title: "",
  issuer: "",
  date: "",
  description: "",
  displayOrder: 1000,
  imageFile: null,
};

const NewCertificate = ({
  setAddCertificate,
  onSuccess,
}: NewCertificateProps) => {
  const { baseUrl, getCertificateData } = useAdminContext();
  const [form, setForm] = useState(initialForm);
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
        if (key !== "imageFile") body.append(key, String(value));
      });
      if (form.imageFile) body.append("image", form.imageFile);
      const response = await fetch(`${baseUrl}/api/certificates/add`, {
        method: "POST",
        credentials: "include",
        body,
      });
      const data = await response.json();
      if (!response.ok || !data.success)
        throw new Error(data?.message || "Failed to upload certificate.");
      await getCertificateData();
      onSuccess?.(form.title);
      setAddCertificate(false);
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
      title="Add new certificate"
      onSubmit={submit}
      className="flex h-screen w-screen flex-col space-y-10 bg-[#1c2532] p-8 text-white sm:h-[90vh] sm:w-[60vw] sm:rounded-lg lg:w-[38vw]"
    >
      <div className="flex flex-col space-y-7 overflow-auto custom-scroll">
        <CertificateEditorFields
          value={form}
          onChange={change}
          onFileChange={(imageFile) =>
            setForm((prev) => ({ ...prev, imageFile }))
          }
        />
        {error && (
          <p role="alert" className="text-sm text-red-400">
            {error}
          </p>
        )}
        <AdminFormActions
          onCancel={() => setAddCertificate(false)}
          saving={saving}
          busyLabel="Uploading..."
          submitLabel="Submit certificate"
        />
      </div>
    </AdminFormModal>
  );
};

export default NewCertificate;
