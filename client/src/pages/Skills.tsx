import { BackendSkills, frontEndSkills } from "../assets/data";
import SectionTitle from "../components/SectionTitle";
import SkillCategoryCard from "../components/shared/SkillCategoryCard";
import SkillIconCarousel from "../components/shared/SkillIconCarousel";

const Skills = () => (
  <section id="skills" className="relative flex w-full flex-col items-center justify-center gap-3 overflow-hidden py-20 lg:px-10">
    <SectionTitle title="My" accent="Skills" className="mb-0" />
    <SkillIconCarousel />
    <div className="mt-10 grid h-full w-full grid-cols-1 gap-6 px-3 pb-10 sm:px-1 md:grid-cols-2">
      <SkillCategoryCard title="Frontend" items={frontEndSkills} />
      <SkillCategoryCard title="Backend" items={BackendSkills} delay={0.4} />
    </div>
  </section>
);

export default Skills;
