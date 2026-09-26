import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const AboutPortrait = () => (
  <motion.div
    initial={{ opacity: 0, x: -100 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.9 }}
    className="relative flex min-h-[20rem] items-end justify-center p-6 sm:p-10 md:min-h-[70vh] lg:min-h-[78vh]"
  >
    <div className="absolute inset-6 overflow-hidden rounded-[1.5rem]  bg-[#001012]/10 sm:inset-8">
      <img
        src="/avatar.png"
        alt="Leon Irakara, frontend developer"
        className="h-full w-full object-cover object-top grayscale-[15%]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#001012]/90 via-transparent to-transparent" />
    </div>
    <div className="relative z-10 mb-2 flex w-full max-w-sm items-center gap-3 rounded-2xl border border-white/10 bg-[#001012]/75 p-4 shadow-xl backdrop-blur-lg">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#02a94c]/15 text-[#02a94c]">
        <MapPin className="h-5 w-5" />
      </span>
      <div>
        <p className="text-sm font-semibold text-white">Kigali, Rwanda</p>
        <p className="mt-0.5 text-xs text-gray-400">
          Building for people and teams
        </p>
      </div>
    </div>
  </motion.div>
);

export default AboutPortrait;
