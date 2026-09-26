import { useGlobalContext } from "../context/GlobalContext";
import { IoClose } from "react-icons/io5";
import { easeInOut, motion } from "framer-motion";
import { navbar } from "../assets/data";
import NavigationLinks from "./shared/NavigationLinks";

const MobileNav = () => {
  const { setIsOpen } = useGlobalContext();

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: easeInOut }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed right-0 top-0 z-30 flex h-screen w-[min(20rem,85vw)] flex-col justify-between border-l border-[#02a94c]/20 bg-[#001012]/95 shadow-2xl shadow-black/40 backdrop-blur-2xl lg:hidden"
    >
      <div className="flex flex-col gap-2 px-4">
        <span
          onClick={() => setIsOpen(false)}
          className="flex cursor-pointer justify-end py-4"
        >
          <IoClose className="text-3xl text-gray-400 active:text-[#02a94c]" />
        </span>
        <NavigationLinks
          items={navbar}
          variant="mobile"
          onNavigate={() => setIsOpen(false)}
        />
        <a
          href="/Jean Francois Leon IRAKARAMA - CV.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="mx-4 mt-3 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#02a94c] to-[#02a94c] px-4 py-3 text-sm font-bold text-[#001012] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#02a94c]"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          Resume
        </a>
      </div>
      <div className="text-gray-400 mb-5 px-2 text-sm">
        <h1>&copy; 2025 Leon(Atlas-Developer) ,Built with passion.</h1>
      </div>
    </motion.div>
  );
};

export default MobileNav;
