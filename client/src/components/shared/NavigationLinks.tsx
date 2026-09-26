interface NavigationItem {
  name: string;
  link: string;
}

interface NavigationLinksProps {
  items: NavigationItem[];
  variant: "desktop" | "mobile";
  activeTab?: string;
  onSelect?: (name: string) => void;
  onNavigate?: () => void;
}

const NavigationLinks = ({
  items,
  variant,
  activeTab,
  onSelect,
  onNavigate,
}: NavigationLinksProps) => {
  if (variant === "desktop") {
    return (
      <ul className="hidden items-center gap-1 rounded-full border border-white/[0.06] bg-white/[0.025] p-1 lg:flex">
        {items.map((item) => (
          <li key={item.link}>
            <a
              href={`#${item.link}`}
              onClick={() => onSelect?.(item.name)}
              aria-current={activeTab === item.name ? "location" : undefined}
              className={`relative inline-flex rounded-full px-3 py-2 text-sm font-medium transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#02a94c] ${
                activeTab === item.name
                  ? "bg-[#02a94c]/15 text-[#02a94c]"
                  : "text-gray-300 hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <>
      {items.map(({ name, link }) => (
        <a
          href={`#${link}`}
          onClick={onNavigate}
          className="rounded-xl border border-transparent px-4 py-3 text-sm font-medium text-gray-300 transition hover:border-[#02a94c]/15 hover:bg-[#02a94c]/10 hover:text-[#b8f7dc] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#02a94c]"
          key={link}
        >
          {name}
        </a>
      ))}
    </>
  );
};

export default NavigationLinks;
