import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";
import { ICertificate } from "../context/GlobalContext";
import CertificateMedia from "./shared/CertificateMedia";

interface CertificateCardProps {
  certificate: ICertificate;
  index: number;
}

const CertificateCard = ({ certificate, index }: CertificateCardProps) => {
  const fileUrl = certificate.imageUrl?.trim();
  const isPdf = fileUrl?.toLowerCase().includes(".pdf") ?? false;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.08, 0.32) }}
      className="group overflow-hidden rounded-2xl border border-[#02a94c]/20 bg-[#06191a]/80 shadow-[0_12px_40px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-1 hover:border-[#02a94c]/60 hover:shadow-[0_18px_50px_rgba(2,169,76,0.12)]"
    >
      <CertificateMedia title={certificate.title} date={certificate.date} fileUrl={fileUrl} isPdf={isPdf} />

      <div className="flex min-h-52 flex-col p-5 pt-4">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-[#02a94c]">
          {certificate.issuer}
        </p>
        <h3 className="text-lg font-bold leading-snug text-white transition-colors group-hover:text-[#02a94c]">
          {certificate.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-gray-400">
          {certificate.description}
        </p>
        {fileUrl && (
          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-[#02a94c]/35 px-4 py-2 text-xs font-semibold text-[#02a94c] transition hover:border-[#02a94c] hover:bg-[#02a94c]/10 hover:text-white"
          >
            {isPdf ? "View certificate" : "View original"}
            <FaExternalLinkAlt className="text-[10px]" aria-hidden="true" />
          </a>
        )}
      </div>
    </motion.article>
  );
};

export default CertificateCard;
