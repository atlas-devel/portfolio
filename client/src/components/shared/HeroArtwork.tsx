import { motion } from "framer-motion";

const HeroArtwork = () => (
  <motion.div initial={{ opacity: 0, x: 150 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="relative hidden h-full w-full items-center justify-center px-4 lg:flex">
    <div className="absolute inset-0 scale-75 rounded-full bg-gradient-to-br from-[#02a94c]/10 to-cyan-600/20 blur-3xl" />
    <img src="/avatar.png" className="bounce relative z-10 h-auto w-full max-w-[520px] object-contain drop-shadow-2xl xl:max-w-[620px]" alt="Work icons" height={620} width={620} />
  </motion.div>
);

export default HeroArtwork;
