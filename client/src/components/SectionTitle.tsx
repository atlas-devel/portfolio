import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface SectionTitleProps {
  title: string;
  accent: string;
  eyebrow?: string;
  description?: ReactNode;
  icon?: ReactNode;
  className?: string;
}

const SectionTitle = ({
  title,
  accent,
  eyebrow,
  description,
  icon,
  className = "mb-10",
}: SectionTitleProps) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.header
      initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
      className={`mx-auto max-w-3xl text-center ${className}`}
    >
      <h2 className="text-3xl font-extrabold uppercase tracking-wide text-white/90 sm:text-4xl">
        {title} <span className="text-[#02a94c]">{accent}</span>
      </h2>
      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
          {description}
        </p>
      )}
      <div className="mx-auto mt-6 h-px w-20 bg-gradient-to-r from-transparent via-[#02a94c] to-transparent" />
    </motion.header>
  );
};

export default SectionTitle;
