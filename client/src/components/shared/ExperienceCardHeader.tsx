import { FaBriefcase, FaMapMarkerAlt } from "react-icons/fa";
import { WorkExperience } from "../../assets/data";

const ExperienceCardHeader = ({ item }: { item: WorkExperience }) => (
  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
    <div>
      <h3 className="text-lg font-bold text-white sm:text-xl">{item.role}</h3>
      <p className="mt-1 font-semibold text-[#02a94c]">{item.organization}</p>
      <p className="mt-1 flex items-center gap-2 text-sm text-gray-400"><FaMapMarkerAlt aria-hidden="true" />{item.location}</p>
    </div>
    <span className="w-fit rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-gray-300">{item.period}</span>
  </div>
);

export default ExperienceCardHeader;
