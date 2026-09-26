import { ComponentType } from "react";

interface SkillIconCardProps {
  name: string;
  color: string;
  Icon: ComponentType;
}

const SkillIconCard = ({ name, color, Icon }: SkillIconCardProps) => (
  <div
    style={{ color }}
    className="text-white w-[70vw] m-auto hover:shadow-[1px_1px_10px_#02a94c] cursor-pointer flex border border-[#02a94c]/80 flex-col items-center backdrop-blur-3xl bg-gradient-to-b from-50% to-[#02a94c]/30 rounded-md sm:w-[12em] py-3"
  >
    <span className="text-5xl mb-3">
      <Icon />
    </span>
    <h1 className="font-semibold text-gray-100">{name}</h1>
  </div>
);

export default SkillIconCard;
