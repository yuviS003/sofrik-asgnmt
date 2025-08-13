"use client";

import { usePathname } from "next/navigation";

interface NavListItemsProps {
  label: string;
  href: string;
}

const NavListItems: React.FC<NavListItemsProps> = ({ label, href }) => {
  const pathname = usePathname();
  return (
    <li>
      <a
        className={
          pathname.startsWith(href) ? "underline underline-offset-2" : ""
        }
        href={href}
      >
        {label}
      </a>
    </li>
  );
};

export default NavListItems;
