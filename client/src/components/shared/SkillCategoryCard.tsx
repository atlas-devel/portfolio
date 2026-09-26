import { easeInOut, motion } from "framer-motion";
import SkillProgressList from "./SkillProgressList";

interface SkillCategoryCardProps {
  title: string;
  items: { name: string; rate: number }[];
  delay?: number;
}

const SkillCategoryCard = ({ title, items, delay = 0 }: SkillCategoryCardProps) => (
  <div className={delay ? "mt-14 md:mt-0" : ""}>
    <motion.h3 initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.35, delay }} className="mb-6 text-center text-xl font-bold uppercase text-gray-300">
      {title}
    </motion.h3>
    <motion.div initial={{ opacity: 0, scale: 0.4 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay, ease: easeInOut }} className="flex h-full flex-col justify-center space-y-4 rounded-2xl border border-[#02a94c]/20 bg-[#06191a]/80 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.16)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#02a94c]/45 hover:shadow-[0_18px_45px_rgba(2,169,76,0.1)] sm:p-6">
      <SkillProgressList items={items} />
    </motion.div>
  </div>
);

export default SkillCategoryCard;
