import { useState } from "react";
import { FaAward, FaCalendarAlt } from "react-icons/fa";

interface CertificateMediaProps { title: string; date: string; fileUrl?: string; isPdf: boolean }

const CertificateMedia = ({ title, date, fileUrl, isPdf }: CertificateMediaProps) => {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(fileUrl && !isPdf && !imageFailed);
  return (
    <div className="relative m-3 mb-0 flex aspect-[16/10] items-center justify-center overflow-hidden rounded-xl border border-white/[0.06] bg-gradient-to-br from-[#02a94c]/15 via-[#062321] to-[#001012]">
      {showImage ? <img src={fileUrl} alt={`${title} certificate`} loading="lazy" decoding="async" onError={() => setImageFailed(true)} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" /> : <div className="flex flex-col items-center gap-3 text-[#02a94c]"><FaAward className="text-5xl opacity-80" aria-hidden="true" /><span className="text-xs font-semibold uppercase tracking-[0.2em]">{isPdf ? "Certificate document" : "Achievement"}</span></div>}
      <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-[#001012]/80 px-3 py-1 text-xs font-medium text-gray-200 backdrop-blur"><FaCalendarAlt className="mr-1.5 inline text-[#02a94c]" aria-hidden="true" />{date}</span>
    </div>
  );
};

export default CertificateMedia;
