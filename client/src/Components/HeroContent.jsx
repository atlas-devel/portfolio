import { motion } from "framer-motion";
import React, { useState } from "react";
import { slideInFromLeft, slideInFromTop } from "../utilis/motion";
import { HiSparkles } from "react-icons/hi2";
import { socialIcons } from "../assets/data";
import Typewriter from "typewriter-effect";
import { useNavigate } from "react-router-dom";

const HeroContent = () => {
  const [readMore, setreadMore] = useState(false);
  const navigate = useNavigate();

  return (
    <section className="min-h-screen mb-10">
      <motion.div
        id="home"
        initial="hidden"
        animate="visible"
        className="flex mt-20 py-4 lg:py-10 border rounded-md border-[#02a94c]/40 flex-col-reverse md:flex-row items-center w-full z-0 relative overflow-hidden"
      >
        {/* Animated background gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#02a94c]/5 via-transparent to-cyan-600/5 pointer-events-none" />
        <div className="absolute top-20 -left-20 w-72 h-72 bg-[#02a94c]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20-right-20 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="h-full w-full flex flex-col gap-6 m-auto text-start px-6 md:px-12 lg:px-16 relative z-10">
          <motion.div
            variants={slideInFromTop}
            className="py-3 sm:py-4 px-4 sm:px-6 welcome-box border border-[#0eac7ab1]/50 bg-[#0eac7a]/5 backdrop-blur-sm rounded-full opacity-[0.9] inline-flex items-center gap-3 w-fit shadow-lg shadow-[#02a94c]/10"
          >
            <HiSparkles className="text-[#22d096c2] h-5 w-5 animate-pulse" />
            <h1 className="welcome-text text-[13px] font-medium tracking-wide text-gray-300">
              Full-Stack Developer Portfolio
            </h1>
          </motion.div>

          <motion.div
            variants={slideInFromLeft(1)}
            className="flex flex-col mt-4 gap-4 font-bold text-gray-300 w-auto h-auto"
          >
            <div className="text-2xl sm:text-3xl leading-relaxed w-full text-wrap inline-block overflow-hidden text-start items-center">
              <span className="text-gray-400 font-normal tracking-wide">
                Hi, I'm
              </span>
              <motion.span
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="block mt-2 text-4xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#02a94c] via-[#22d096] to-cyan-600 font-extrabold tracking-tight"
              >
                <span className="hidden sm:inline">IRAKARAMA </span>
                <span className="hidden sm:inline">Jean </span>
                <span className="hidden sm:inline">Francois Leon </span>
                <span className="text-wrap sm:hidden">IRAKARAMA</span>
              </motion.span>

              <div className="lg:inline-flex lg:flex-wrap overflow-hidden justify-center  items-center gap-3 mt-6 ">
                <span className="flex self-start  text-gray-300">I am </span>
                <Typewriter
                  options={{
                    strings: [
                      "Full-Stack Developer",
                      "MERN Stack Developer",
                      "PERN Stack Developer",
                      "IT Student",
                    ],
                    autoStart: true,
                    delay: 200,
                    loop: true,
                    wrapperClassName:
                      "text-transparent  lg:text-xl bg-clip-text bg-gradient-to-r from-[#02a94c] to-cyan-600 font-bold",
                    cursorClassName:
                      "text-cyan-600 inline-block scale-y-75 origin-bottom",
                  }}
                />
              </div>
            </div>
          </motion.div>

          <div className="max-w-[700px]">
            <motion.p
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className={`text-base sm:text-lg text-gray-400/90 leading-relaxed md:mt-4 ${
                readMore ? "line-clamp-none" : "line-clamp-3 lg:line-clamp-none"
              }`}
            >
              I'm a Year 2 IT student at{" "}
              <span className="text-[#02a94c] font-medium">IPRC Kigali</span>{" "}
              with hands-on experience building full-stack web applications. I
              specialize in{" "}
              <span className="text-[#02a94c] font-medium">
                MERN and PERN stacks
              </span>{" "}
              — React, Node.js, Express, PostgreSQL, and MongoDB. Recently, I
              led web development for an IoT dashboard project that earned{" "}
              <span className="text-[#02a94c] font-medium">
                3rd place recognition
              </span>{" "}
              and was presented to the Korean Ambassador. I'm passionate about
              solving real-world problems through code and always eager to learn
              new technologies. Currently expanding my skills in TypeScript and
              Python. Let's build something great together!
            </motion.p>
            <button
              onClick={() => setreadMore((prev) => !prev)}
              className="lg:hidden inline-block mt-2 text-[#02a94c] cursor-pointer hover:text-[#4bd3a8f0] transition-colors duration-300 font-medium text-sm"
            >
              {!readMore ? "Read More →" : "Show Less ←"}
            </button>
          </div>

          <motion.a
            href="#contacts"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.3 }}
            className="group relative py-3 px-8 border-2 border-[#02a94c] text-[#02a94c] overflow-hidden font-semibold text-center rounded-xl max-w-[200px] transition-all duration-300 hover:shadow-lg hover:shadow-[#02a94c]/30 hover:scale-105"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-[#02a94c] to-cyan-600/15 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">
              Say Hello!
            </span>
          </motion.a>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 150 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="hidden md:flex w-full h-full justify-center items-center relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#02a94c]/10 to-cyan-600/20 rounded-full blur-3xl scale-75" />
          <img
            src="/avatar.png"
            className="bounce relative z-10 drop-shadow-2xl"
            alt="work icons"
            height={650}
            width={650}
          />
        </motion.div>

        {/* Enhanced socials sidebar */}
        <div className="hidden overflow-hidden ml-5 lg:ml-10 sm:flex justify-end items-center flex-col gap-10 w-10 h-[80vh] text-gray-300 fixed left-0 bottom-16 z-50">
          <div className="flex flex-col justify-center items-center gap-4 h-full backdrop-blur-sm bg-gray-900/20 rounded-full py-8 px-2 border border-gray-700/30">
            <span
              onClick={() => navigate("/auth/secret/admin-login")}
              className="cursor-pointer text-nowrap mt-4 hover:text-[#02a94c] transition-colors duration-300 -rotate-90 mb-6 text-sm font-semibold capitalize tracking-wider"
            >
              V. franco
            </span>
            <hr color="#c7cbd3" className="w-[1.8px] h-16 opacity-50" />

            <div className="flex flex-col justify-center items-center gap-4">
              {socialIcons.map(({ icon: Icon, color, link }, index) => {
                return (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#02a94c] transition-all duration-300 hover:scale-125 text-xl cursor-pointer p-2 hover:bg-[#02a94c]/10 rounded-lg"
                    key={index + 1}
                  >
                    <Icon />
                  </a>
                );
              })}
              <hr color="#c7cbd3" className="w-[1.8px] h-16 opacity-50" />

              <span className="text-nowrap mt-6 -rotate-90 mb-6 text-sm font-semibold capitalize tracking-wider">
                contact me
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroContent;
