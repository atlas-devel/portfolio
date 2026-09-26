import { useState } from "react";

const useExpandableText = (text: string, threshold = 180) => {
  const [expanded, setExpanded] = useState(false);
  const toggle = () => setExpanded((value) => !value);
  return { expanded, toggle, canExpand: text.length > threshold };
};

export default useExpandableText;
