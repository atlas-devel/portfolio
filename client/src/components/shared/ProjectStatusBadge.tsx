type ProjectStatus = "dev" | "live" | "dep-local";

interface ProjectStatusBadgeProps {
  status: ProjectStatus;
  variant?: "public" | "admin";
}

const ProjectStatusBadge = ({
  status,
  variant = "public",
}: ProjectStatusBadgeProps) => {
  const label =
    variant === "admin"
      ? status === "dep-local"
        ? "Dep-Local"
        : status === "live"
          ? "Live"
          : "Dev"
      : status === "dep-local"
        ? "Private deployment"
        : status === "live"
          ? "Live"
          : "In development";
  const className =
    variant === "admin"
      ? status === "live"
        ? "absolute z-10 top-0 right-0 m-2 text-sm text-green-400 bg-green-500/20 inline-block px-2 rounded-full border border-green-400/50"
        : status === "dev"
          ? "absolute z-10 top-0 right-0 m-2 text-sm text-orange-400 bg-[#ff6900]/20 inline-block px-2 rounded-full border border-orange-500/50"
          : "absolute z-10 top-0 right-0 m-2 text-sm text-indigo-300 bg-indigo-500/20 inline-block px-2 rounded-full border border-indigo-400/50"
      : `absolute right-4 top-4 rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur ${status === "live" ? "border-[#02a94c]/50 bg-[#02a94c]/20 text-[#02a94c]" : status === "dev" ? "border-orange-400/40 bg-orange-500/20 text-orange-200" : "border-indigo-300/40 bg-indigo-500/20 text-indigo-100"}`;

  return <span className={className}>{label}</span>;
};

export default ProjectStatusBadge;
