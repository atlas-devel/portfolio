import SocialLinks, { SocialLink } from "./SocialLinks";

interface HeroSocialRailProps {
  items: SocialLink[];
  onAdminClick: () => void;
}

const HeroSocialRail = ({ items, onAdminClick }: HeroSocialRailProps) => (
  <div className="hidden overflow-hidden ml-5 xl:ml-10 xl:flex justify-end items-center flex-col gap-10 w-10 h-[80vh] text-gray-300 fixed left-0 bottom-16 z-50">
    <div className="flex flex-col justify-center items-center gap-4 h-full backdrop-blur-sm bg-gray-900/20 rounded-full py-8 px-2 border border-gray-700/30">
      <span
        onClick={onAdminClick}
        className="cursor-pointer text-nowrap mt-4 hover:text-[#02a94c] transition-colors duration-300 -rotate-90 mb-6 text-sm font-semibold capitalize tracking-wider"
      >
        V. franco
      </span>
      <hr color="#c7cbd3" className="w-[1.8px] h-16 opacity-50" />
      <SocialLinks items={items} variant="sidebar" />
      <hr color="#c7cbd3" className="w-[1.8px] h-16 opacity-50" />
      <span className="text-nowrap mt-6 -rotate-90 mb-6 text-sm font-semibold capitalize tracking-wider">
        contact me
      </span>
    </div>
  </div>
);

export default HeroSocialRail;
