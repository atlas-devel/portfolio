import { ICertificate } from "../../context/GlobalContext";
import CertificateOrderCard from "../../components/shared/CertificateOrderCard";

interface DashboardCertificateSectionProps {
  certificates: ICertificate[];
  onSaveOrder: (id: string, order: number) => Promise<void>;
}

const DashboardCertificateSection = ({
  certificates,
  onSaveOrder,
}: DashboardCertificateSectionProps) => (
  <section className="mt-10 rounded-xl border border-white/10 bg-[#06191a]/70 p-5">
    <h2 className="mb-4 text-xl font-bold text-white">
      Certificate display order
    </h2>
    <p className="mb-5 text-sm text-gray-400">
      Use a lower number to show a certificate earlier in the portfolio.
    </p>
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {certificates.map((certificate) => (
        <CertificateOrderCard
          key={certificate._id}
          title={certificate.title}
          issuer={certificate.issuer}
          displayOrder={certificate.displayOrder ?? 1000}
          onSave={(order) => onSaveOrder(certificate._id, order)}
        />
      ))}
      {!certificates.length && (
        <p className="text-sm text-gray-400">
          No certificates have been added yet.
        </p>
      )}
    </div>
  </section>
);

export default DashboardCertificateSection;
