import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { socialIcons } from "../assets/data";
import HeroArtwork from "./shared/HeroArtwork";
import HeroBackdrop from "./shared/HeroBackdrop";
import HeroBiography from "./shared/HeroBiography";
import HeroContactLink from "./shared/HeroContactLink";
import HeroIdentity from "./shared/HeroIdentity";
import HeroSocialRail from "./shared/HeroSocialRail";
import HeroWelcomeBadge from "./shared/HeroWelcomeBadge";

const HeroContent = () => {
  const navigate = useNavigate();
  return (
    <section id="home" className="mb-10 min-h-[100svh] scroll-mt-24 pt-[5.25rem] sm:pt-24 md:pt-28">
      <motion.div initial="hidden" animate="visible" className="relative z-0 flex min-h-[calc(100svh-7.5rem)] flex-col-reverse items-center overflow-hidden rounded-[2rem] border border-[#02a94c]/20 bg-gradient-to-br from-[#06191a]/90 via-[#031211]/70 to-[#071c25]/80 shadow-[0_24px_80px_rgba(0,0,0,0.28)] md:min-h-[calc(100svh-8.5rem)] lg:flex-row">
        <HeroBackdrop />
        <div className="relative z-10 m-auto flex w-full flex-col gap-4 px-5 py-6 text-start sm:px-7 md:px-10 md:py-10 lg:px-14">
          <HeroWelcomeBadge />
          <HeroIdentity />
          <HeroBiography />
          <HeroContactLink />
        </div>
        <HeroArtwork />
        <HeroSocialRail items={socialIcons} onAdminClick={() => navigate("/auth/secret/admin-login")} />
      </motion.div>
    </section>
  );
};

export default HeroContent;
