import { easeInOut, motion } from "framer-motion";
import React from "react";

const toolsAndTech = [
  { name: "Git & GitHub", rate: 80 },
  { name: "VS Code", rate: 90 },
  { name: "Postman", rate: 75 },
  { name: "Cloudinary", rate: 70 },
  { name: "Multer", rate: 65 },
  { name: "Socket.io", rate: 50 },
];

const Tools = () => {
  return (
    <section className="w-full mx-auto my-10 md:py-12 backdrop-blur-5xl duration-300 text-gray-300">
      <motion.h2
        initial={{ opacity: 0, x: -200 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.4,
          type: "tween",
        }}
        className="text-4xl font-extrabold text-center text-white/85 uppercase tracking-wide"
      >
        Tools & <span className="text-[#02a94c]">Technologies</span>
      </motion.h2>
      <hr className="w-35 m-[18px_auto] border-t-2 border-[#02a94c]/50" />

      <motion.div
        initial={{ opacity: 0, scale: 0.4 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: easeInOut, type: "tween" }}
        className="max-w-4xl mx-auto mt-10 border-[#02a94c]/60 bg-[#02a94c]/6 backdrop-blur-3xl hover:shadow-[1px_1px_10px_#02a94c] duration-500 ease-in-out hover:-translate-y-1 border p-6 rounded-md"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {toolsAndTech.map((item, index) => {
            return (
              <div key={index + 1}>
                <div className="flex px-2 py-1 text-gray-200 text-md font-semibold justify-between">
                  <p>{item.name}</p>
                  <p>{item.rate}%</p>
                </div>
                <div className="w-full h-3 border border-[#02a94c] rounded-md overflow-hidden flex items-center">
                  <span
                    style={{ width: `${item.rate}%` }}
                    className="inline-block h-2 mx-1 rounded-l-lg bg-gradient-to-r from-0 to-[#02a94c] rounded-r-3xl"
                  ></span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default Tools;
