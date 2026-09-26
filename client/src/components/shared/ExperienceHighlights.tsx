import { motion } from "framer-motion";

interface ExperienceHighlightsProps { items: string[]; reduceMotion: boolean }

const ExperienceHighlights = ({ items, reduceMotion }: ExperienceHighlightsProps) => (
  <motion.ul initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} variants={{ visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.08 } } }} className="mt-5 space-y-2 text-sm leading-6 text-gray-400">
    {items.map((item) => <motion.li key={item} variants={{ hidden: { opacity: 0, x: reduceMotion ? 0 : -8 }, visible: { opacity: 1, x: 0 } }} transition={{ duration: reduceMotion ? 0 : 0.3 }} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#02a94c]" />{item}</motion.li>)}
  </motion.ul>
);

export default ExperienceHighlights;
