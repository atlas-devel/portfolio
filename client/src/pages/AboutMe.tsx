import { Sparkles } from "lucide-react";
import AboutPortrait from "../components/shared/AboutPortrait";
import AboutSummary from "../components/shared/AboutSummary";
import SectionTitle from "../components/SectionTitle";

const AboutMe = () => (
  <section id="about" className="scroll-mt-24 py-10 md:py-14">
    <SectionTitle title="About" accent="me" eyebrow="A little about me" icon={<Sparkles className="h-4 w-4" />} />
    <div className="relative mx-auto grid w-full overflow-hidden rounded-[2rem] border border-[#02a94c]/20 bg-gradient-to-br from-[#06191a]/90 via-[#031211]/70 to-[#071c25]/80 shadow-[0_24px_80px_rgba(0,0,0,0.24)] md:min-h-[70vh] lg:min-h-[78vh] md:grid-cols-[0.8fr_1.2fr]">
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#02a94c]/10 blur-3xl" />
      <AboutPortrait />
      <AboutSummary />
    </div>
  </section>
);

export default AboutMe;
