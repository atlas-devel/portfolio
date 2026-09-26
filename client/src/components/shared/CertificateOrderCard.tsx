import DisplayOrderEditor from "./DisplayOrderEditor";

interface CertificateOrderCardProps {
  title: string;
  issuer: string;
  displayOrder: number;
  onSave: (order: number) => Promise<void>;
}

const CertificateOrderCard = ({
  title,
  issuer,
  displayOrder,
  onSave,
}: CertificateOrderCardProps) => (
  <article className="rounded-lg border border-white/10 bg-black/10 p-4">
    <h3 className="font-semibold text-white">{title}</h3>
    <p className="mt-1 text-sm text-gray-400">{issuer}</p>
    <DisplayOrderEditor displayOrder={displayOrder} onSave={onSave} />
  </article>
);

export default CertificateOrderCard;
