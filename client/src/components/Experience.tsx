import { easeInOut, motion } from "framer-motion";
import React from "react";

const achievements = [
  {
    id: 1,
    title: "3rd Place Team - KOICA Arduino Training Program Cohort 2",
    company: "IPRC Kigali",
    date: "December 2025",
    description:
      "Led web development for IoT dashboard project. Built React frontend and Node.js/Express backend for automated clothes protection system. Presented to Korean Ambassador and KOICA Country Director.",
  },
  {
    id: 2,
    title: "Top 5 Project Selection - KOICA Arduino Training Program Cohort 1",
    company: "IPRC Kigali",
    date: "July 2025",
    description:
      "Recognized for innovative assistive technology concept. Awarded dinner invitation with Korean Ambassador and KOICA Country Director at Kigali Convention Center.",
  },
  {
    id: 3,
    title: "Social Media Coordinator - Media Club",
    company: "World Mission High School",
    date: "2022 - 2023",
    description:
      "Led social media strategy and content creation for school media initiatives. Coordinated team activities and managed digital communication channels.",
  },
];

const Experience = () => {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.4 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: easeInOut, type: "tween" }}
      id="background"
      className="w-full  mx-auto my-3 md:py-12 backdrop-blur-5xl duration-300  text-gray-300"
    >
      <h2 className="text-4xl w-full text-center font-extrabold  mb-22 text-white/85 uppercase tracking-wide">
        <span>Education &</span>{" "}
        <span className="text-[#02a94c]">Recognition </span>
        <hr className="w-35 m-[18px_auto] border-t-2 border-[#02a94c]/50" />
      </h2>

      <div className="grid gap-10 lg:grid-cols-2 ">
        {/* Education Block */}
        <div className="space-y-2 w-full border-[#02a94c]/60 backdrop-blur-3xl hover:shadow-[1px_1px_10px_#02a94c] duration-500 ease-in-out hover:-translate-1.5  h-full border rounded-md flex flex-col justify-start p-5  bg-[#02a94c]/6">
          <h3 className="text-2xl font-semibold mb-4 text-[#02a94c]">
            🎓 Education
          </h3>
          <p className="text-lg font-semibold uppercase">
            Integrated Polytechnic Regional College (IPRC) Kigali
          </p>
          <p className="text-sm text-gray-400">
            Advanced Diploma in Information Technology — 2024 - Present (Year 2)
          </p>
          <p className="mt-2 text-gray-300">
            Specializing in software development and web technologies. Building
            hands-on experience with full-stack development, databases, and
            modern frameworks.
          </p>

          <hr className="my-4 border-[#02a94c]/20" />

          <p className="text-lg font-medium">World Mission High School</p>
          <p className="text-sm text-gray-400">
            A2 Certificate in Science — 2021 - 2023
          </p>
          <p className="mt-2 text-gray-300">
            Graduated in top 3 of class. Served as Class Monitor for 2 years,
            leading classroom initiatives and coordinating peer study groups.
          </p>
        </div>

        {/* Experience & Recognition Block */}
        <div className="space-y-2 w-full  border-[#02a94c]/60 backdrop-blur-3xl hover:shadow-[1px_1px_10px_#02a94c] duration-500 ease-in-out hover:-translate-1.5  h-full border  rounded-md flex flex-col justify-start p-5 bg-[#02a94c]/6">
          <h3 className="text-2xl upper font-semibold mb-4 text-[#02a94c]">
            🏆 Experience & Recognition
          </h3>
          {achievements.map((exp, index) => (
            <div key={index} className="mb-6">
              <p className="text-lg font-medium">{exp.title}</p>
              <p className="text-sm text-[#02a94c]">{exp.company}</p>
              <p className="text-sm text-gray-400">{exp.date}</p>
              <p className="mt-1 text-gray-300">{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Experience;
