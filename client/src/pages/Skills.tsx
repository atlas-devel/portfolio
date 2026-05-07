import React from "react";
import { BackendSkills, frontEndSkills, skillIcons } from "../assets/data";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css";
import { Pagination, Autoplay } from "swiper/modules";
import { easeInOut, motion } from "framer-motion";
const Skills = () => {
  return (
    <section
      id="skills"
      className="flex  flex-col items-center justify-center gap-3 w-full  h-full relative overflow-hidden py-20 lg:px-10"
    >
      <div>
        <motion.h2
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.4,
            type: "tween",
          }}
          className="text-4xl font-extrabold text-center  text-white/85 uppercase tracking-wide"
        >
          My <span className="text-[#02a94c]">Skills </span>
        </motion.h2>
        <hr className="w-35 m-[18px_auto] border-t-2 border-[#02a94c]/50" />
      </div>
      <Swiper
        modules={[Pagination, Autoplay]}
        autoplay={{ delay: 2000 }}
        loop={true}
        spaceBetween={20}
        slidesPerView={1}
        centeredSlides={true}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        className="w-full"
        style={{ transform: "scale(0.9)" }}
      >
        {" "}
        {skillIcons.map((item, index) => {
          return (
            <SwiperSlide key={index + 1}>
              <div
                style={{ color: item.color }}
                className="text-white w-[70vw] m-auto hover:shadow-[1px_1px_10px_#02a94c] cursor-pointer flex border border-[#02a94c] flex-col items-center backdrop-blur-3xl bg-gradient-to-b from-50% to-[#02a94c]/30 rounded-md sm:w-[12em] py-3"
              >
                <span className="text-5xl mb-3">
                  <item.Icon />
                </span>
                <h1 className="font-semibold text-gray-100">{item.name}</h1>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* sections */}
      <div className="grid  grid-cols-1 px-3 sm:px-1 md:grid-cols-2 h-full  w-full gap-6 mt-10 pb-10">
        {/* fronted */}
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="text-gray-300 mb-6 text-center uppercase font-bold text-xl"
          >
            Frontend
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scale: 0.4 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: easeInOut, type: "tween" }}
            className="border-[#02a94c]/60 bg-[#02a94c]/6  backdrop-blur-3xl h-full hover:-translate-[2px] ease-in-out hover:shadow-[0px_3px_12px_#02a94c] duration-500 border p-3 rounded-md flex flex-col justify-center"
          >
            {frontEndSkills.map((item, index) => {
              return (
                <div key={index + 1}>
                  <div className="flex px-2 py-1 text-gray-200 text-md font-semibold justify-between">
                    <p>{item.name}</p>
                    <p>{item.rate}%</p>
                  </div>
                  <div className="w-full h-3 border border-[#02a94c] rounded-md overflow-hidden flex items-center">
                    <span
                      style={{ width: `${item.rate}%` }}
                      className="inline-block  h-2 mx-1 rounded-l-lg bg-gradient-to-r from-0 to-[#02a94c] rounded-r-3xl"
                    ></span>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* backend */}
        <div className="space-y-10  mt-14 md:mt-0 ">
          <motion.h1
            className="text-gray-300 mb-6 text-center uppercase font-bold text-xl"
            initial={{ opacity: 0, x: -200 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: easeInOut, type: "tween" }}
          >
            Backend
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scale: 0.4 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              ease: easeInOut,
              type: "tween",
              delay: 0.4,
            }}
            className="border-[#02a94c]/60 bg-[#02a94c]/6 backdrop-blur-3xl hover:shadow-[1px_1px_10px_#02a94c] duration-500 ease-in-out hover:-translate-1.5  h-full border p-3 rounded-md flex flex-col justify-start pt-12"
          >
            {BackendSkills.map((item, index) => {
              return (
                <div key={index + 1}>
                  <div className=" flex px-2 py-1 text-gray-200 text-md font-semibold justify-between">
                    <p>{item.name}</p>
                    <p>{item.rate}%</p>
                  </div>
                  <div className="w-full h-3 border border-[#02a94c] rounded-md overflow-hidden flex items-center">
                    <span
                      style={{ width: `${item.rate}%` }}
                      className="inline-block  h-2 mx-1 rounded-l-lg bg-gradient-to-r from-0 to-[#02a94c] rounded-r-3xl"
                    ></span>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
