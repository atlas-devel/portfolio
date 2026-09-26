import { ComponentType } from "react";

interface ContactMethodProps {
  label: string;
  value: string;
  icon: ComponentType;
  href?: string;
}

const ContactMethod = ({
  label,
  value,
  icon: Icon,
  href,
}: ContactMethodProps) => {
  const content = (
    <>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#02a94c]/15 text-lg text-[#02a94c]">
        <Icon />
      </span>
      <span className="min-w-0">
        <span className="block text-[11px] uppercase tracking-wider text-gray-500">
          {label}
        </span>
        <span className="block truncate text-sm font-medium">{value}</span>
      </span>
    </>
  );

  const className =
    "flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] p-3 text-gray-300";

  return href ? (
    <a
      href={href}
      className={`${className} transition hover:border-[#02a94c]/25 hover:bg-[#02a94c]/[0.07] hover:text-[#b8f7dc]`}
    >
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  );
};

export default ContactMethod;
