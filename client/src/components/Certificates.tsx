import { FaAward } from "react-icons/fa";
import { useGlobalContext } from "../context/GlobalContext";
import { useCertificateDisplay } from "../hooks/useCertificateDisplay";
import CertificateCollection from "./shared/CertificateCollection";
import CertificateShowcaseFooter from "./shared/CertificateShowcaseFooter";
import SectionTitle from "./SectionTitle";

const Certificates = () => {
  const { allCertificates } = useGlobalContext();
  const { ordered, visible, showAll, toggle } = useCertificateDisplay(allCertificates);

  return (
    <section id="certificates" className="relative isolate py-16 text-gray-300 md:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-24 -z-10 mx-auto h-64 max-w-4xl rounded-full bg-[#02a94c]/[0.08] blur-[100px]" />
      <SectionTitle title="Certificates" accent="& recognition" eyebrow="Learning milestones" icon={<FaAward aria-hidden="true" />} description="A few milestones that reflect the skills I keep building and the work I am proud to share." className="mb-12" />
      <CertificateCollection items={visible} />
      <CertificateShowcaseFooter total={ordered.length} expanded={showAll} onToggle={toggle} />
    </section>
  );
};

export default Certificates;
