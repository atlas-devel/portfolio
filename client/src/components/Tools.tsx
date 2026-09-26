import { easeInOut, motion } from "framer-motion";
import { toolsAndTech } from "../assets/data";
import SectionTitle from "./SectionTitle";
import SkillProgressList from "./shared/SkillProgressList";

const Tools = () => {
  return (
    <section className="mx-auto my-10 w-full py-10 text-gray-300 md:py-12">
      <SectionTitle title="Tools &" accent="Technologies" className="mb-0" />

      <motion.div
        initial={{ opacity: 0, scale: 0.4 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: easeInOut, type: "tween" }}
        className="mx-auto mt-10 max-w-4xl rounded-2xl border border-[#02a94c]/20 bg-[#06191a]/80 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.16)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-[#02a94c]/45 hover:shadow-[0_18px_45px_rgba(2,169,76,0.1)] sm:p-7"
      >
        <SkillProgressList items={toolsAndTech} />
      </motion.div>
    </section>
  );
};

export default Tools;
