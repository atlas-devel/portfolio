import { motion } from "framer-motion";
import { HiSparkles } from "react-icons/hi2";
import { slideInFromTop } from "../../utils/motion";

const HeroWelcomeBadge = () => (
  <motion.div
    variants={slideInFromTop}
    className="welcome-box inline-flex w-fit items-center gap-3 rounded-full border border-[#02a94c]/25 bg-[#02a94c]/[0.07] px-4 md:px-5 py-2  shadow-lg shadow-[#02a94c]/10 backdrop-blur-md sm:px-5"
  >
    <HiSparkles className="h-4 w-4 animate-pulse text-[#02a94c]" />
    <h1 className="welcome-text text-xs font-semibold tracking-wide text-gray-200 sm:text-sm">
      Software Developer & Team Lead
    </h1>
  </motion.div>
);

export default HeroWelcomeBadge;
