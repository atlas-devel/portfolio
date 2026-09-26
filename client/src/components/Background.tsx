import { FaGraduationCap, FaLanguage, FaTrophy } from "react-icons/fa";
import { education, languages, recognitions } from "../assets/data";
import SectionTitle from "./SectionTitle";

const Background = () => (
  <section id="background" className="py-14 text-gray-300 md:py-20">
    <SectionTitle title="Education" accent="& recognition" />

    <div className="grid gap-5 lg:grid-cols-2">
      <div className="rounded-2xl border border-[#02a94c]/20 bg-[#02a94c]/[0.045] p-5 sm:p-7">
        <h3 className="mb-5 flex items-center gap-3 text-xl font-bold text-[#02a94c]">
          <FaGraduationCap aria-hidden="true" /> Education
        </h3>
        <div className="space-y-6">
          {education.map((item) => (
            <article key={item.institution}>
              <h4 className="font-semibold text-white">{item.institution}</h4>
              <p className="mt-1 text-sm text-[#02a94c]">
                {item.qualification}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                {item.location} · {item.period}
              </p>
              <p className="mt-2 text-sm leading-6 text-gray-400">
                {item.detail}
              </p>
            </article>
          ))}
        </div>
      </div>
      <div className="rounded-2xl border border-[#02a94c]/20 bg-[#02a94c]/[0.045] p-5 sm:p-7">
        <h3 className="mb-5 flex items-center gap-3 text-xl font-bold text-[#02a94c]">
          <FaTrophy aria-hidden="true" /> Recognition
        </h3>
        <div className="space-y-4">
          {recognitions.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-white/[0.06] bg-black/10 p-4"
            >
              <h4 className="font-semibold text-white">{item.title}</h4>
              <p className="mt-1 text-sm text-gray-400">{item.detail}</p>
            </article>
          ))}
        </div>
      </div>
      <div className="rounded-2xl border border-[#02a94c]/20 bg-[#02a94c]/[0.045] p-5 sm:p-7 lg:col-span-2">
        <h3 className="mb-4 flex items-center gap-3 text-xl font-bold text-[#02a94c]">
          <FaLanguage aria-hidden="true" /> Languages
        </h3>
        <div className="flex flex-wrap gap-3">
          {languages.map((language) => (
            <span
              key={language.name}
              className="rounded-full border border-white/10 bg-black/10 px-4 py-2 text-sm text-gray-300"
            >
              <strong className="text-white">{language.name}</strong> ·{" "}
              {language.level}
            </span>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Background;
