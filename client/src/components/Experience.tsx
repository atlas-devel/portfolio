import { useReducedMotion } from "framer-motion";
import { FaBriefcase } from "react-icons/fa";
import SectionTitle from "./SectionTitle";
import ExperienceTimeline from "./shared/ExperienceTimeline";

const Experience = () => {
  const reduceMotion = useReducedMotion() ?? false;
  return (
    <section id="experience" className="scroll-mt-24 py-16 text-gray-300 md:py-20">
      <SectionTitle title="Work" accent="experience" eyebrow="Professional journey" icon={<FaBriefcase aria-hidden="true" />} description="Teams I have worked with, products I have helped build, and the roles I have grown into." className="mb-12" />
      <ExperienceTimeline reduceMotion={reduceMotion} />
    </section>
  );
};

export default Experience;
