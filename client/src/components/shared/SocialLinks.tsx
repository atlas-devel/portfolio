import { ComponentType } from "react";

export interface SocialLink {
  icon: ComponentType;
  link: string;
  color?: string;
}

interface SocialLinksProps {
  items: SocialLink[];
  variant?: "sidebar" | "contact";
}

const SocialLinks = ({ items, variant = "contact" }: SocialLinksProps) => (
  <div
    className={
      variant === "contact"
        ? "mt-7 flex justify-center gap-3 border-t border-white/[0.07] pt-6"
        : "flex flex-col justify-center items-center gap-4"
    }
  >
    {items.map(({ icon: Icon, color, link }, index) => (
      <a
        key={`${link}-${index}`}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={
          variant === "contact" ? `Open social profile ${index + 1}` : undefined
        }
        className={
          variant === "contact"
            ? "flex h-10 w-10 items-center justify-center rounded-full text-white shadow-md transition hover:-translate-y-1 hover:shadow-lg"
            : "hover:text-[#02a94c] transition-all duration-300 hover:scale-125 text-xl cursor-pointer p-2 hover:bg-[#02a94c]/10 rounded-lg"
        }
        style={variant === "contact" ? { backgroundColor: color } : undefined}
      >
        <Icon />
      </a>
    ))}
  </div>
);

export default SocialLinks;
