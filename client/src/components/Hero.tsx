import HeroContent from "./HeroContent";
import NavBar from "./NavBar";
import { GlobalContext } from "../context/GlobalContext";
import AboutMe from "../pages/AboutMe";
import Skills from "../pages/Skills";
import Project from "../pages/Project";
import Contacts from "../pages/Contacts";
import Tools from "./Tools";
import Experience from "./Experience";
import Certificates from "./Certificates";

const Hero = () => {
  return (
    <div className="px-4 sm:px-8 lg:px-16 xl:px-28 relative z-10 flex flex-col min-h-screen w-full">
      <NavBar />
      <HeroContent />
      <AboutMe />
      <Skills />
      <Tools />
      <Experience />
      <Certificates />
      <Project />
      <Contacts />
    </div>
  );
};

export default Hero;
