import { ICertificate } from "../../context/GlobalContext";
import { FaAward } from "react-icons/fa";
import CertificateCard from "../CertificateCard";

const CertificateCollection = ({ items }: { items: ICertificate[] }) => items.length ? (
  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
    {items.map((certificate, index) => <CertificateCard key={certificate._id} certificate={certificate} index={index} />)}
  </div>
) : (
  <div className="rounded-2xl border border-white/10 bg-white/[0.025] px-6 py-12 text-center">
    <FaAward className="mx-auto mb-4 text-3xl text-[#02a94c]" aria-hidden="true" />
    <p className="font-medium text-white">New milestones are on the way.</p>
    <p className="mt-2 text-sm text-gray-400">Check back soon to see what I have been learning.</p>
  </div>
);

export default CertificateCollection;
