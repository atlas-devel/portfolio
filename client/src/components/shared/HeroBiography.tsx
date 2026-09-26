import { motion } from "framer-motion";
import useExpandableText from "../../hooks/useExpandableText";

const biography = "I am a final-year Information Technology student at RP College of Kigali, a frontend developer, and Co-Founder & CTO at 9call. I build responsive web products with React, Next.js, TypeScript, and Tailwind CSS, and enjoy leading frontend work with collaborative teams.";

const HeroBiography = () => {
  const { expanded, toggle } = useExpandableText(biography);
  return (
    <div className="max-w-[700px]">
      <motion.p initial={{ opacity: 0, x: -100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className={`mt-4 text-sm leading-relaxed text-gray-400/90 sm:text-base ${expanded ? "line-clamp-none" : "line-clamp-3 lg:line-clamp-none"}`}>
        I am a final-year Information Technology student at <span className="font-medium text-[#02a94c]">RP College of Kigali</span>, a frontend developer, and Co-Founder &amp; CTO at 9call. I build responsive web products with React, Next.js, TypeScript, and Tailwind CSS, and enjoy leading frontend work with collaborative teams.
      </motion.p>
      <button type="button" onClick={toggle} className="mt-2 inline-block cursor-pointer text-sm font-medium text-[#02a94c] transition-colors duration-300 hover:text-[#02a94c] lg:hidden">
        {expanded ? "Show Less ←" : "Read More →"}
      </button>
    </div>
  );
};

export default HeroBiography;
