import { useContext, useState } from "react";
import { easeInOut, motion } from "framer-motion";
import { GlobalContext } from "../context/GlobalContext";
import { navbar } from "../assets/data";
import MobileNav from "./MobileNav";
import NavigationLinks from "./shared/NavigationLinks";
import NavbarActions from "./shared/NavbarActions";
import NavbarBrandMenu from "./shared/NavbarBrandMenu";
import NavbarMenuToggle from "./shared/NavbarMenuToggle";

const NavBar = () => {
  const { isOpen, setIsOpen, showMenu } = useContext(GlobalContext)!;
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <motion.nav initial={{ opacity: 0, y: -200 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -200 }} transition={{ duration: 0.9, type: "tween", ease: easeInOut }} className={`${showMenu ? "fixed" : "hidden"} left-0 top-0 z-20 w-full rounded-b-2xl border-b border-[#02a94c]/20 bg-[#001012]/80 px-3 py-3 text-white shadow-lg shadow-black/20 backdrop-blur-xl sm:px-6 lg:px-10`}>
      <div className="flex items-center justify-between">
        <NavbarBrandMenu />
        <NavigationLinks items={navbar} variant="desktop" activeTab={activeTab} onSelect={setActiveTab} />
        <NavbarActions />
        <NavbarMenuToggle open={isOpen} onToggle={() => setIsOpen((value) => !value)} />
      </div>
      {isOpen && <MobileNav />}
    </motion.nav>
  );
};

export default NavBar;
