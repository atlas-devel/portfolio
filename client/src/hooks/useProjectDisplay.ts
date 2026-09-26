import { useMemo, useState } from "react";
import { IProject } from "../context/GlobalContext";

const PROJECT_LIMIT = 4;
const ALL_STACKS = "__all__";

export const useProjectDisplay = (allProjects: IProject[]) => {
  const [activeStack, setActiveStack] = useState(ALL_STACKS);
  const [showAll, setShowAll] = useState(false);
  const ordered = useMemo(() => [...allProjects].sort((a, b) => (a.displayOrder ?? 1000) - (b.displayOrder ?? 1000)), [allProjects]);
  const stacks = useMemo(() => [...new Set(ordered.flatMap((project) => project.techs ?? []))], [ordered]);
  const projects = activeStack === ALL_STACKS ? ordered : ordered.filter((project) => project.techs?.some((tech) => tech.toLowerCase() === activeStack.toLowerCase()));
  const selectStack = (stack: string) => { setActiveStack(stack); setShowAll(false); };

  return { stacks, projects, visible: showAll ? projects : projects.slice(0, PROJECT_LIMIT), activeStack, showAll, selectStack, toggleAll: () => setShowAll((value) => !value), limit: PROJECT_LIMIT };
};
