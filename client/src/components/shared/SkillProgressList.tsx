interface SkillProgress {
  name: string;
  rate: number;
}

interface SkillProgressListProps {
  items: SkillProgress[];
}

const SkillProgressList = ({ items }: SkillProgressListProps) => (
  <div className="flex flex-col justify-center space-y-4">
    {items.map((item) => (
      <div key={item.name}>
        <div className="flex justify-between px-1 py-1 text-sm font-semibold text-gray-200">
          <p>{item.name}</p>
          <p>{item.rate}%</p>
        </div>
        <div className="flex h-2.5 w-full items-center overflow-hidden rounded-full border border-[#02a94c]/80 bg-white/[0.04]">
          <span
            style={{ width: `${item.rate}%` }}
            className="inline-block h-full rounded-full bg-gradient-to-r from-[#02a94c]/6 to-[#02a94c]/80 shadow-[0_0_12px_rgba(34,208,150,0.25)]"
          />
        </div>
      </div>
    ))}
  </div>
);

export default SkillProgressList;
