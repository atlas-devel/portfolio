import { easeInOut, motion } from "framer-motion";
import React from "react";
import { FaAward, FaCertificate } from "react-icons/fa";
import { HiAcademicCap } from "react-icons/hi2";

const certificates = [
  {
    id: 1,
    title: "3rd Place Team Award",
    issuer: "KOICA Arduino Training Program - Cohort 2",
    date: "December 2025",
    description:
      "Awarded for IoT dashboard project presented to Korean Ambassador and KOICA Country Director. Led web development using React and Node.js.",
    icon: FaAward,
    color: "#FFD700", // Gold
  },
  {
    id: 2,
    title: "Top 5 Project Selection",
    issuer: "KOICA Arduino Training Program - Cohort 1",
    date: "July 2025",
    description:
      "Recognized for innovative assistive technology concept. Received dinner invitation with Korean Ambassador at Kigali Convention Center.",
    icon: FaCertificate,
    color: "#02a94c", // Green
  },
  {
    id: 3,
    title: "Leadership Recognition",
    issuer: "World Mission High School",
    date: "2021 - 2023",
    description:
      "Served as Class Monitor for 2 years. Led peer study groups and coordinated classroom initiatives.",
    icon: HiAcademicCap,
    color: "#3b82f6", // Blue
  },
];

const Certificates = () => {
  return (
    <section
      id="certificates"
      className="w-full mx-auto my-10 md:py-12 backdrop-blur-5xl duration-300 text-gray-300"
    >
      <motion.h2
        initial={{ opacity: 0, x: -200 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.4,
          type: "tween",
        }}
        className="text-4xl font-extrabold text-center text-white/85 uppercase tracking-wide"
      >
        Certificates & <span className="text-[#02a94c]">Recognition</span>
      </motion.h2>
      <hr className="w-35 m-[18px_auto] border-t-2 border-[#02a94c]/50" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 px-3">
        {certificates.map((cert, index) => {
          const Icon = cert.icon;
          return (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.2,
                ease: easeInOut,
              }}
              className="relative group border-[#02a94c]/60 bg-[#02a94c]/6 backdrop-blur-3xl hover:shadow-[0px_5px_20px_#02a94c] duration-500 ease-in-out hover:-translate-y-2 border rounded-lg p-6 flex flex-col"
            >
              {/* Icon with gradient background */}
              <div className="flex items-center justify-between mb-4">
                <div
                  style={{
                    background: `linear-gradient(135deg, ${cert.color}20, ${cert.color}10)`,
                  }}
                  className="p-3 rounded-lg border border-[#02a94c]/30"
                >
                  <Icon style={{ color: cert.color }} className="text-3xl" />
                </div>
                <span className="text-xs text-gray-400 font-medium">
                  {cert.date}
                </span>
              </div>

              {/* Certificate Title */}
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#02a94c] transition-colors duration-300">
                {cert.title}
              </h3>

              {/* Issuer */}
              <p className="text-sm text-[#02a94c] font-semibold mb-3">
                {cert.issuer}
              </p>

              {/* Description */}
              <p className="text-sm text-gray-400 leading-relaxed flex-grow">
                {cert.description}
              </p>

              {/* Decorative border on hover */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#02a94c] to-cyan-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-b-lg" />
            </motion.div>
          );
        })}
      </div>

      {/* Additional Note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-10 text-center"
      >
        <p className="text-gray-400 text-sm">
          Physical certificates and event photos available on{" "}
          <a
            href="https://linkedin.com/in/irakarama-jean-francois-leon-070831278"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#02a94c] hover:text-[#22d096] transition-colors duration-300 font-semibold"
          >
            LinkedIn
          </a>
        </p>
      </motion.div>
    </section>
  );
};

export default Certificates;
