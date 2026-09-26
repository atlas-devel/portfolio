import { KeyboardEvent, useState } from "react";
import { FaTimes } from "react-icons/fa";

interface TechStackEditorProps {
  techs: string[];
  onChange: (techs: string[]) => void;
}

const TechStackEditor = ({ techs, onChange }: TechStackEditorProps) => {
  const [draft, setDraft] = useState("");

  const addTech = () => {
    const value = draft.trim();
    if (!value || techs.some((tech) => tech.toLowerCase() === value.toLowerCase())) return;
    onChange([...techs, value]);
    setDraft("");
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addTech();
    }
  };

  return (
    <div>
      <label htmlFor="tech-stack-input" className="mb-2 block text-gray-100">
        Tech stack
      </label>
      <div className="rounded-md bg-[#2b3544] p-3">
        <div className="flex gap-2">
          <input
            id="tech-stack-input"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a technology, e.g. React"
            className="min-w-0 flex-1 rounded-md bg-[#1c2532] px-3 py-2 text-white outline-none focus:ring-2 focus:ring-green-600"
          />
          <button type="button" onClick={addTech} className="rounded-md bg-green-600 px-4 text-sm font-semibold text-white transition hover:bg-green-500">
            Add
          </button>
        </div>
        <div className="mt-3 flex min-h-8 flex-wrap gap-2">
          {techs.map((tech, index) => (
            <span key={`${tech}-${index}`} className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-sm text-green-100">
              {tech}
              <button type="button" onClick={() => onChange(techs.filter((_, item) => item !== index))} aria-label={`Remove ${tech}`} className="text-green-200 transition hover:text-red-300">
                <FaTimes aria-hidden="true" />
              </button>
            </span>
          ))}
          {!techs.length && <span className="text-xs text-gray-400">Add one or more technologies.</span>}
        </div>
      </div>
    </div>
  );
};

export default TechStackEditor;
