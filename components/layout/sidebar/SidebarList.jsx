"use client";

import Link from "next/link";
import { cn } from "@/utils/helpers";
import { navLinks } from "@/utils/constants";
import { usePathname } from "next/navigation";
import { useSidebar } from "./SidebarContext";

export default function List() {
  if (!navLinks?.length) return null;

  return (
    <ul className="flex items-center justify-around lg:block lg:space-y-1">
      {navLinks.map((link) => (
        <ListItem key={link.name} Icon={link.icon} to={link.to}>
          {link.name}
        </ListItem>
      ))}
    </ul>
  );
}

function ListItem({ to, Icon, children }) {
  const { sidebarState } = useSidebar();

  const pathname = usePathname();
  const isActive = pathname === to;

  return (
    <li
      className={cn(
        "flex-1 lg:flex-none lg:transition-all",
        sidebarState.isCollapsed ? "lg:pr-2" : "lg:pr-6",
      )}>
      <Link
        href={to}
        className={cn(
          "flex flex-col items-center gap-1 rounded-tl-xl rounded-tr-xl py-2 transition-colors lg:flex-row lg:gap-4 lg:rounded-tl-none lg:rounded-tr-xl lg:rounded-br-xl lg:py-4 lg:pl-5",
          {
            "bg-beige-100 border-b-4 border-b-green-500 text-green-500 lg:border-b-0 lg:border-l-4 lg:border-l-green-500 lg:text-gray-900":
              isActive,
            "lg:border-l-grey-900 text-gray-300 hover:text-white lg:border-l-4":
              !isActive,
          },
        )}>
        <div className="flex h-6 w-6 items-center justify-center">
          <Icon
            aria-hidden="true"
            className={cn("transition-colors", {
              "text-grey-900": isActive && sidebarState.isCollapsed,
              "text-green-500": isActive && !sidebarState.isCollapsed,
            })}
          />
        </div>

        <span
          className={cn(
            "hidden text-xs font-bold sm:block",
            !sidebarState.isCollapsed && "lg:block lg:text-base lg:whitespace-nowrap",
            sidebarState.isCollapsed && "lg:hidden",
          )}>
          {children}
        </span>
      </Link>
    </li>
  );
}
