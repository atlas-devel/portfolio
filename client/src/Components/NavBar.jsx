import { FaBarsStaggered } from "react-icons/fa6";
import { useContext, useState } from "react";
import { GlobalContext } from "../GlobalContext/GlobalContext";
import { easeInOut, motion } from "framer-motion";
import MobileNav from "./MobileNav";
import { navbar } from "../assets/data";

const NavBar = () => {
  const { isOpen, setIsOpen, showMenu } = useContext(GlobalContext);
  const [activeTab, setactiveTab] = useState("Home");

  return (
    <motion.nav
      initial={{ opacity: 0, y: -200 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -200 }}
      transition={{ duration: 0.9, type: "tween", ease: easeInOut }}
      className={`${
        showMenu ? "fixed" : "hidden"
      } px-10 md:px-15 border-b-1 border-[#02a94c]/60 bg-transparent rounded-b-xl left-0 top-0  backdrop-blur-md py-3 shadow-md shadow-[#484468b0] shadow-md/40 w-full text-white z-10`}
    >
      <div className="flex items-center justify-between ">
        <div className="flex items-center text-xl gap-3 font-black">
          <p className="inline-block text-lg  text-[#020015] bg-[#02a94c] rounded-sm p-2">
            LN
          </p>
          <span className="text-white/80">Leon</span>
        </div>
        <ul className="hidden lg:flex gap-6 font-semibold text-md  ">
          {navbar.map((n, i) => {
            return (
              <a href={`#${n.link}`} key={i + 1}>
                <li
                  onClick={() => {
                    setactiveTab(n.name);
                  }}
                  className={`hover:border-b-2 cursor-pointer font-medium ${
                    activeTab === n.name
                      ? "text-[#02a94c] border-b-2 border-[#02a94c]"
                      : "text-gray-300 "
                  }duration-300 ease-in-out hover:text-[#02a94c] hover:border-[#02a94c] rounded-2xl px-2`}
                >
                  {n.name}
                </li>
              </a>
            );
          })}
        </ul>
        <div className="hidden lg:flex gap-3   text-gray-300 items-center">
          <a
            href={`#contacts`}
            className="inline-block ml-3 px-3 cursor-pointer hover:bg-[#02a94c]  hover:scale-102 transition-all duation-700 hover:text-black  duration-300 ease-in-out text-lg font-semibold text-[#10b981] border border-[#02a94c]  rounded-sm p-1"
          >
            Hire Me
          </a>

          <p
            onClick={() => {
              window.open("/Jean Francois Leon IRAKARAMA - CV.pdf", "_blank");
            }}
            className="inline-block  bg-[#02a94c] duration-300 hover:bg-transparent hover:outline-[#02a94c] hover:text-[#10b981] hover:outline px-3 p-1 text-lg rounded-sm cursor-pointer  text-black font-semibold tex-md"
          >
            Resume
          </p>
        </div>
        <div className="lg:hidden ">
          <span
            onClick={() => setIsOpen((prev) => !prev)}
            className="text-2xl text-gray-200  cursor-pointer active:text-[#02a94c]"
          >
            {!isOpen && <FaBarsStaggered />}
          </span>
        </div>
      </div>
      {isOpen && <MobileNav />}
    </motion.nav>
  );
};

export default NavBar;
