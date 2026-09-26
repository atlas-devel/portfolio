import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { slideInFromLeft } from "../../utils/motion";

const HeroIdentity = () => (
  <motion.div variants={slideInFromLeft(1)} className="mt-2 flex flex-col gap-3 font-bold text-gray-300 sm:mt-4 sm:gap-4">
    <div className="inline-block w-full overflow-hidden text-start text-xl leading-relaxed sm:text-2xl lg:text-3xl">
      <span className="font-normal tracking-wide text-gray-400">Hi, I'm</span>
      <motion.span initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="mt-2 block bg-gradient-to-r from-[#02a94c] via-[#02a94c] to-cyan-600 bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl">
        <span className="hidden sm:inline">IRAKARAMA Jean Francois Leon</span>
        <span className="block text-wrap sm:hidden">IRAKARAMA</span>
        <span className="block text-wrap sm:hidden">Leon</span>
      </motion.span>
      <div className="my-2 inline-flex flex-wrap items-center justify-start gap-2 overflow-hidden sm:gap-3">
        <span className="self-start text-gray-300">I am</span>
        <Typewriter options={{ strings: ["Frontend Developer", "Frontend Team Lead", "Co-Founder & CTO"], autoStart: true, delay: 200, loop: true, wrapperClassName: "bg-gradient-to-r from-[#02a94c] to-cyan-600 bg-clip-text text-lg font-bold text-transparent sm:text-xl", cursorClassName: "origin-bottom text-cyan-600" }} />
      </div>
    </div>
  </motion.div>
);

export default HeroIdentity;
