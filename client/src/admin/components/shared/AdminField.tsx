import { ChangeEvent } from "react";

export interface AdminFieldOption {
  label: string;
  value: string;
}

interface AdminFieldProps {
  label: string;
  name: string;
  value?: string | number;
  type?: string;
  placeholder?: string;
  options?: AdminFieldOption[];
  onChange: (name: string, value: string) => void;
  onFileChange?: (file: File | null) => void;
  currentImage?: string;
}

const AdminField = ({ label, name, value, type = "text", placeholder, options, onChange, onFileChange, currentImage }: AdminFieldProps) => {
  const controlClass = "w-full rounded-md bg-[#2b3544] px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-600";
  const handleFile = (event: ChangeEvent<HTMLInputElement>) => onFileChange?.(event.target.files?.[0] ?? null);
  return <div>
    <label className="mb-2 block text-gray-100" htmlFor={name}>{label}</label>
    {type === "textarea" ? <textarea id={name} name={name} value={value} placeholder={placeholder} onChange={(event) => onChange(name, event.target.value)} className={`${controlClass} min-h-[100px]`} /> :
      type === "select" ? <select id={name} name={name} value={value} onChange={(event) => onChange(name, event.target.value)} className={controlClass}>{options?.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select> :
        <input id={name} name={name} type={type} value={type === "file" ? undefined : value} placeholder={placeholder} onChange={type === "file" ? handleFile : (event) => onChange(name, event.target.value)} className={controlClass} />}
    {currentImage && <img src={currentImage} alt="Current project" className="mt-3 h-28 w-40 rounded-lg border border-[#2b3544] object-cover" />}
  </div>;
};

export default AdminField;
