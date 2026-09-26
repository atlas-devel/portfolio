import { motion } from "framer-motion";
import { FaBriefcase } from "react-icons/fa";
import { WorkExperience } from "../../assets/data";
import ExperienceCardHeader from "./ExperienceCardHeader";
import ExperienceHighlights from "./ExperienceHighlights";

interface ExperienceCardProps { item: WorkExperience; index: number; reduceMotion: boolean }

const ExperienceCard = ({ item, index, reduceMotion }: ExperienceCardProps) => (
  <motion.article initial={{ opacity: 0, x: reduceMotion ? 0 : 24, y: reduceMotion ? 0 : 8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} whileHover={reduceMotion ? undefined : { y: -4 }} transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : index * 0.1, ease: "easeOut" }} className="group relative ml-10 rounded-2xl border border-[#02a94c]/20 bg-[#02a94c]/[0.045] p-5 shadow-[0_12px_36px_rgba(0,0,0,0.08)] transition-colors hover:border-[#02a94c]/45 hover:bg-[#02a94c]/[0.07] hover:shadow-[0_18px_44px_rgba(2,169,76,0.1)] sm:ml-12 sm:p-7">
    <motion.span initial={{ scale: reduceMotion ? 1 : 0.65, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true, amount: 0.5 }} whileHover={reduceMotion ? undefined : { scale: 1.1 }} transition={{ duration: reduceMotion ? 0 : 0.3, delay: reduceMotion ? 0 : index * 0.1 }} className="absolute -left-[34px] top-7 flex h-8 w-8 items-center justify-center rounded-full border border-[#02a94c]/50 bg-[#001012] text-[#02a94c] shadow-[0_0_0_5px_rgba(2,169,76,0.08)] sm:-left-[42px] sm:h-10 sm:w-10">
      <FaBriefcase aria-hidden="true" />
    </motion.span>
    <ExperienceCardHeader item={item} />
    <ExperienceHighlights items={item.highlights} reduceMotion={reduceMotion} />
  </motion.article>
);

export default ExperienceCard;
