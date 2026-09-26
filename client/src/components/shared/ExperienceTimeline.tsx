import { motion } from "framer-motion";
import { workExperience } from "../../assets/data";
import ExperienceCard from "./ExperienceCard";

const ExperienceTimeline = ({ reduceMotion }: { reduceMotion: boolean }) => (
  <div className="relative mx-auto max-w-4xl space-y-5">
    <motion.div aria-hidden="true" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: reduceMotion ? 0 : 0.8, ease: "easeOut" }} className="absolute bottom-8 left-[19px] top-8 w-px origin-top bg-gradient-to-b from-[#02a94c]/70 to-transparent sm:left-[23px]" />
    {workExperience.map((item, index) => <ExperienceCard key={item.organization} item={item} index={index} reduceMotion={reduceMotion} />)}
  </div>
);

export default ExperienceTimeline;
