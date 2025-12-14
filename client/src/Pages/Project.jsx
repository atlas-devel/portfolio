import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { slideInFromLeft } from "../utilis/motion";
import {
  ExternalLink,
  Github,
  Code,
  Calendar,
  ArrowRight,
  Star,
  Eye,
} from "lucide-react";
import { GlobalContext } from "../GlobalContext/GlobalContext";
import { toast } from "react-toastify";

const Project = () => {
  const [desc, setDesc] = useState({});
  // const [showToolTip, setshowToolTip] = useState({});
  const [learnMore, setLearnMore] = useState(false);
  const [filterStack, setFilterStack] = useState({ 1: true });
  const { allProjects, setAllProjects, baseUrl } = useContext(GlobalContext);
  const [projectsRender, setProjectsRender] = useState([]);

  // responsiveness based on screen size

  useEffect(() => setProjectsRender(allProjects), [allProjects]);

  // project render
  useEffect(() => {}, [allProjects]);

  const projectFilters = [
    { id: 1, label: "All" },
    { id: 2, label: "Featured" },
    { id: 3, label: "React" },
    { id: 4, label: "Node js" },
    { id: 5, label: "Mongo DB" },
    { id: 6, label: "Socket Io" },
    { id: 7, label: "Full stack" },
  ];
  const filterByStack = (id) => {
    return setFilterStack(() => {
      return { [id]: true };
    });
  };

  const filterProjects = (label) => {
    if (label !== "All") {
      const renderProject = allProjects.filter((proj) =>
        proj.techs.some((item) => item.toLowerCase() === label.toLowerCase())
      );
      setProjectsRender(renderProject);
    } else {
      setProjectsRender(allProjects);
    }
  };

  let allProject = 0;
  let projectLimit = 4;

  return (
    <section id="projects" className="mb-10 overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, x: 200 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.4,
          type: "tween",
        }}
        className="text-4xl w-full  text-center font-extrabold  mt-12 text-white/85 uppercase tracking-wide"
      >
        Recent <span className="text-[#02a94c]">works </span>
        <hr className="w-35 m-[18px_auto] border-t-2 border-[#02a94c]/50" />
      </motion.h2>
      <div>
        <motion.p
          initial={{ opacity: 0, x: 200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.4,
            delay: 0.4,
            type: "tween",
          }}
          className=" mt-5 text-start text-lg md:mx-auto md:mt-10 md:text-center text-gray-400 text-md max-w-4xl  mb-10"
        >
          Explore my journey through code. Each project represents a unique
          challenge, innovative solution, and a step forward in my development
          journey.
        </motion.p>
      </div>
      {/* filters */}
      <div className="flex flex-wrap gap-2 2md:gap-6 justify-center mb-20">
        {projectFilters.map((item) => (
          <span
            onClick={() => {
              filterByStack(item.id);
              filterProjects(item.label);
            }}
            key={item.id}
            className={`${
              filterStack[item.id]
                ? "bg-green-600  shadow-green-600 hover:shadow-sm text-white "
                : ""
            }text-nowrap cursor-pointer duration-600  rounded-full border border-green-600/30 bg-gray-700/20 text-gray-400 capitalize py-2 px-6`}
          >
            {item.label}
          </span>
        ))}
      </div>
      {/* project description */}
      {projectsRender.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, x: -200 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.6,
            type: "tween",
            delay: 0.6,
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4 lg:gap-8 backdrop-blur-3xl "
        >
          {projectsRender

            .slice(allProject, learnMore ? projectsRender.length : projectLimit)
            .map((item) => {
              console.log(item);
              return (
                <div
                  key={item._id}
                  className="border border-green-500/50 bg-[#02a94c]/4  rounded-md overflow-hidden"
                >
                  <div
                    onMouseEnter={() => setDesc({ [item._id]: true })}
                    onMouseLeave={() => setDesc({ [item._id]: false })}
                    className="border relative overflow-hidden h-[280px] w-full   md:h-[280px] md:min-w-[300px] lg:min-w-[200px] border-[#02a94c]/30   group hover:-translate-[2px] duration-300 ease-in-out"
                  >
                    <div className="relative w-full bg-gradient-to-bl from-white/20 to-0 h-full">
                      {item.isLive ? (
                        <p className="absolute  z-10 top-0 right-0 m-2 text-sm text-green-400  bg-green-500/20 inline-block px-2 rounded-full border border-green-400/50">
                          Live
                        </p>
                      ) : (
                        <p className="absolute z-10 top-0 right-0 m-2 text-sm text-orange-400  bg-[#ff6900]/20 inline-block px-2 rounded-full border border-orange-500/50">
                          Dev
                        </p>
                      )}
                      {item.imageFile ? (
                        <img
                          src={`${item.imageFile}`}
                          alt=""
                          className="object-fill w-full h-full brightness-75 duration-400 ease-in-out cursor-pointer hover:brightness-95"
                        />
                      ) : (
                        <div className=" text-gray-400  flex items-center h-full w-full">
                          <Code className=" m-auto h-15 w-20" />
                        </div>
                      )}
                    </div>
                    <p className="z-100 flex items-center gap-3 absolute top-0 left-0 m-4 text-sm text-green-400  bg-green-500/20  px-2 rounded-full border border-green-400/50">
                      <Star className="w-4" /> Featured
                    </p>

                    {/* description */}
                    {desc[item._id] && (
                      <motion.div
                        initial={{ opacity: 0, x: 200 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.2,
                          type: "tween",
                          ease: "easeInOut",
                        }}
                        exit={{ opacity: 0, x: 200 }}
                        className="absolute z-10 top-0 left-0 bg-gradient-to-t from-[#0f192d] to-[#44c49c8a] border border-[#02a94c] flex flex-col justify-center items-center backdrop-blur-md h-full w-full"
                      >
                        {item.isLive ? (
                          <a
                            href={`https://${item.liveLink}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className=" rounded-sm hover:bg-[#0f192d] cursor-pointer border border-[#4ad3a8] px-5 py-2  text-white uppercase text-md font-semibold "
                          >
                            <button>Live Demo</button>
                          </a>
                        ) : (
                          <a
                            href={item.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className=" rounded-sm hover:bg-[#0f192d] cursor-pointer border border-[#4ad3a8] px-5 py-2  text-white uppercase text-md font-semibold "
                          >
                            <button>Github Repo</button>
                          </a>
                        )}
                      </motion.div>
                    )}
                  </div>
                  <div className="p-3">
                    <div className="w-full space-y-2 font-semibold text-gray-300 ">
                      <h1 className=" uppercase mt-2 ">{item.projectName}</h1>
                      <p className="text-sm font-medium text-gray-400">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex gap-3 mt-3 overflow-auto hide-scroll">
                      {item.techs.map((tech, index) => {
                        return (
                          <span
                            key={index + 10}
                            className="text-nowrap rounded-sm text-gray-300 text-sm bg-gray-600/30 backdrop-blur-md border border-green-500/20 px-2 py-0.5"
                          >
                            {tech}
                          </span>
                        );
                      })}
                    </div>
                    <div className="flex justify-between text-gray-200 mt-4">
                      <div className=" flex gap-4 text-sm text-gray-400">
                        <div className="flex gap-2 items-center">
                          <Eye className="w-5 h-4" />
                          <p>1024</p>
                        </div>
                        <div className="flex gap-2 items-center">
                          <Star className="w-5 h-4" />
                          <p>24</p>
                        </div>
                      </div>
                      <div className="flex gap-2 items-center text-gray-400">
                        <Calendar className="w-5 h-4" />
                        <span>2025</span>
                      </div>
                    </div>
                    <div className="flex justify-between gap-12 my-6 cursor-pointer ">
                      {/* view live project */}
                      {item.isLive ? (
                        <a
                          href={item.liveLink}
                          target="_black"
                          rel="noopener noreferrer"
                          className="cursor-pointer w-full  flex items-center justify-center gap-2 py-2 bg-green-600 duration-400 hover:bg-green-500 text-white rounded-lg"
                        >
                          <button className="flex items-center gap-2 ">
                            <ExternalLink className="w-5 h-4" /> View Live
                          </button>
                        </a>
                      ) : (
                        <button
                          className="cursor-pointer w-full  flex items-center justify-center gap-2 py-2 bg-green-600 duration-400 hover:bg-green-500 text-white rounded-lg"
                          onClick={() =>
                            !item.isLive &&
                            toast.info("project still under development phase")
                          }
                        >
                          <ExternalLink className="w-5 h-4" /> View Live
                        </button>
                      )}
                      <button
                        onClick={() => window.open(item.githubLink, "_blank")}
                        className="w-full  cursor-pointer flex justify-center items-center gap-2 py-2 bg-[#242e3e] duration-400 hover:bg-gray-700 rounded-lg text-white"
                      >
                        <Github className="w-5 h-4" /> Code
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </motion.div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="inline-block animate-bounce duration-600 transition-all">
            <img className="w-40 sm:w-50" src="/empty.png" alt="" />
          </div>
          <p className="text-gray-400 ">Projects not available</p>
        </div>
      )}
      {projectsRender > 0 && (
        <div className="flex justify-center mt-10">
          <motion.a
            onClick={() => setLearnMore((prev) => !prev)}
            variants={slideInFromLeft(1)}
            className="py-2 px-4 border-[#02a94c] border  text-[#02a94c] hover:bg-[#02a94c] font-semibold text-center hover:-translate-1.5 hover:scale-105 transition-color duration-300 hover:text-white cursor-pointer rounded-sm max-w-[200px]"
          >
            {learnMore ? "Show Less" : "Learn More!"}
          </motion.a>
        </div>
      )}
    </section>
  );
};

export default Project;
