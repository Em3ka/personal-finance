"use client";

import { useSidebar } from "./SidebarContext";

export default function Header() {
  const { sidebarConfig, sidebarState } = useSidebar();
  const { Icon, alt, collapsed, expanded } = sidebarConfig.branding;

  if (!Icon) return null;

  return (
    <div className="hidden py-10 pl-8 transition-transform duration-300 lg:block">
      <Icon
        alt={alt}
        height={sidebarState.isCollapsed ? collapsed.height : expanded.height}
        width={sidebarState.isCollapsed ? collapsed.width : expanded.width}
      />
    </div>
  );
}
