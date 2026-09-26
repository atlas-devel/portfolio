interface CertificateShowcaseFooterProps {
  total: number;
  expanded: boolean;
  onToggle: () => void;
}

const CertificateShowcaseFooter = ({ total, expanded, onToggle }: CertificateShowcaseFooterProps) => (
  <>
    {total > 3 && <div className="mt-8 text-center"><button type="button" aria-expanded={expanded} onClick={onToggle} className="rounded-full border border-[#02a94c]/50 px-5 py-2 text-sm font-semibold text-[#02a94c] transition hover:bg-[#02a94c]/10 hover:text-white">{expanded ? "Show less" : `See all ${total} certificates`}</button></div>}
    <p className="mt-10 text-center text-sm text-gray-400">More about my journey on <a href="https://linkedin.com/in/irakarama-jean-francois-leon-070831278" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#02a94c] transition hover:text-white">LinkedIn <span aria-hidden="true">↗</span></a></p>
  </>
);

export default CertificateShowcaseFooter;
