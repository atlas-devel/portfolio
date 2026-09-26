import { motion } from "framer-motion";

const HeroContactLink = () => (
  <motion.a href="#contacts" initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1.3 }} className="group relative inline-flex min-h-12 max-w-[200px] items-center justify-center overflow-hidden rounded-full border border-[#02a94c]/50 px-7 py-3 text-center font-semibold text-[#b8f7dc] shadow-lg shadow-[#02a94c]/10 transition duration-300 hover:-translate-y-0.5 hover:border-[#02a94c] hover:shadow-[#02a94c]/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#02a94c]">
    <span className="absolute inset-0 translate-y-full bg-gradient-to-r from-[#02a94c] to-cyan-600/15 transition-transform duration-300 ease-out group-hover:translate-y-0" />
    <span className="relative z-10 transition-colors group-hover:text-white">Say Hello!</span>
  </motion.a>
);

export default HeroContactLink;
