import { FaBarsStaggered } from "react-icons/fa6";

interface NavbarMenuToggleProps {
  open: boolean;
  onToggle: () => void;
}

const NavbarMenuToggle = ({ open, onToggle }: NavbarMenuToggleProps) => (
  <button type="button" aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={onToggle} className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-xl text-gray-200 transition hover:border-[#02a94c]/40 hover:bg-[#02a94c]/10 hover:text-[#02a94c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#02a94c] lg:hidden">
    {open ? <span aria-hidden="true">×</span> : <FaBarsStaggered />}
  </button>
);

export default NavbarMenuToggle;
