interface ProjectFiltersProps {
  stacks: string[];
  activeStack: string;
  onSelect: (stack: string) => void;
}

const ALL_STACKS = "__all__";

const ProjectFilters = ({ stacks, activeStack, onSelect }: ProjectFiltersProps) => (
  <div className="mx-auto mb-8 max-w-4xl">
    {stacks.length > 0 && <div aria-label="Filter projects by technology" className="custom-scroll mb-8 flex gap-2 overflow-x-auto pb-3">
      {[{ label: "All", value: ALL_STACKS }, ...stacks.map((stack) => ({ label: stack, value: stack }))].map(({ label, value }) => (
        <button key={value} type="button" aria-pressed={activeStack === value} onClick={() => onSelect(value)} className={`shrink-0 cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition ${activeStack === value ? "border-[#02a94c] bg-[#02a94c] text-[#001012]" : "border-[#02a94c]/25 bg-white/[0.03] text-gray-400 hover:border-[#02a94c]/60 hover:text-[#02a94c]"}`}>
          {label}
        </button>
      ))}
    </div>}
  </div>
);

export default ProjectFilters;
