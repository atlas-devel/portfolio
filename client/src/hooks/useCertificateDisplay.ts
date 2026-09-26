import { useMemo, useState } from "react";
import { ICertificate } from "../context/GlobalContext";

export const useCertificateDisplay = (certificates: ICertificate[]) => {
  const [showAll, setShowAll] = useState(false);
  const ordered = useMemo(() => [...certificates].sort((a, b) => (a.displayOrder ?? 1000) - (b.displayOrder ?? 1000)), [certificates]);
  return {
    ordered,
    visible: showAll ? ordered : ordered.slice(0, 3),
    showAll,
    toggle: () => setShowAll((value) => !value),
  };
};
