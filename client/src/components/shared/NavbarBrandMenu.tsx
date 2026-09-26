import { useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useOutsideClick from "../../hooks/useOutsideClick";

const NavbarBrandMenu = () => {
  const [open, setOpen] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useOutsideClick(menuRef, () => setOpen(false));

  return (
    <div ref={menuRef} className="relative flex items-center gap-3 text-xl font-black">
      <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 transition-colors duration-300 hover:bg-white/5">
        {imageFailed ? <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#02a94c]/60 bg-[#02a94c] text-sm font-extrabold text-[#001012]">LN</span> : <img src="/leon.jpeg" alt="Leon's profile photo" onError={() => setImageFailed(true)} className="h-10 w-10 rounded-full border border-[#02a94c]/60 object-cover object-center shadow-md shadow-[#02a94c]/20" />}
        <FaChevronDown className={`text-sm text-gray-300 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }} className="absolute left-0 top-14 min-w-[11rem] rounded-md border border-[#02a94c]/40 bg-[#001012]/95 p-2 shadow-lg shadow-black/40 backdrop-blur-md">
        <Link to="/auth/secret/admin-login" onClick={() => setOpen(false)} className="block rounded-sm px-3 py-2 text-sm font-semibold text-gray-200 transition-colors duration-300 hover:bg-[#02a94c]/20 hover:text-[#7ef0b7]">Admin Login</Link>
      </motion.div>}
    </div>
  );
};

export default NavbarBrandMenu;
