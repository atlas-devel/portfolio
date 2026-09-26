import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const AboutSummary = () => (
  <div className="relative z-10 flex flex-col justify-center space-y-5 p-6 text-gray-300 sm:p-10 lg:p-14">
    <motion.h3 initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="mb-2 bg-gradient-to-r from-[#02a94c] via-[#7ce9bd] to-cyan-300 bg-clip-text text-3xl font-bold leading-tight text-transparent md:text-4xl">
      Frontend Developer &amp; Co-Founder / CTO
    </motion.h3>
    <div className="space-y-4">
      <motion.p initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="text-sm leading-7 text-gray-300 sm:text-base">
        I’m <span className="font-semibold text-[#b0f9e2bf]">Leon</span>, a frontend developer and final-year Information Technology student at <span className="font-medium text-[#02a94c]">RP College of Kigali</span>. I build useful, responsive web experiences with React, Next.js, TypeScript, and Tailwind CSS.
      </motion.p>
      <motion.p initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1.3 }} className="text-sm leading-7 text-gray-400 sm:text-base">
        I’ve worked with remote and local teams, led frontend tasks, reviewed code, and helped deliver products including recruitment and e-commerce platforms. As Co-Founder and CTO at 9call, I also contribute to technical planning and product development.
      </motion.p>
      <motion.p initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1.6 }} className="text-sm leading-7 text-gray-400 sm:text-base">
        I enjoy solving practical problems, building reusable interfaces, and learning from collaboration. I also work with REST APIs, PostgreSQL, and Prisma.
      </motion.p>
    </div>
    <motion.a href="#contacts" initial={{ opacity: 0, x: 100 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1.9 }} className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-[#02a94c] to-[#02a94c] px-5 py-3 text-sm font-bold text-[#001012] shadow-lg shadow-[#02a94c]/15 transition hover:-translate-y-0.5 hover:shadow-[#02a94c]/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#02a94c]">
      Let’s build together <ArrowUpRight className="h-4 w-4" />
    </motion.a>
  </div>
);

export default AboutSummary;
