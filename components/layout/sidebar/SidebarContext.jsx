"use client";

import { motion } from "motion/react";
import { sidebarConfig } from "@/utils/constants";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { createContext, use, useEffect, useState } from "react";

const SidebarContext = createContext();

function SidebarProvider({ defaultOpen, children }) {
  const isMobile = useMediaQuery("(max-width: 1024px)");

  const [sidebarState, setSidebarState] = useState({
    hasInteracted: false,
    isCollapsed: defaultOpen,
  });

  function handleToggle() {
    setSidebarState((prev) => ({
      hasInteracted: true,
      isCollapsed: !prev.isCollapsed,
    }));
  }

  useEffect(() => {
    document.cookie = `sidebar-state=${sidebarState.isCollapsed}; path=/; max-age=31536000;`;
  }, [sidebarState.isCollapsed]);

  return (
    <SidebarContext.Provider
      value={{ sidebarState, handleToggle, sidebarConfig }}>
      <motion.nav
        key={isMobile}
        initial={sidebarState.isCollapsed}
        animate={{
          width: isMobile
            ? undefined
            : sidebarState.isCollapsed
              ? sidebarConfig.width.collapsed
              : sidebarConfig.width.expanded,
        }}
        transition={sidebarConfig.transitions.sidebar}
        className="bg-grey-900 fixed right-0 bottom-0 left-0 z-50 overflow-clip rounded-tl-lg rounded-tr-lg px-4 pt-2 text-white sm:px-10 lg:static lg:grid lg:grid-rows-[auto_1fr_auto] lg:gap-6 lg:rounded-tl-none lg:rounded-r-2xl lg:rounded-br-2xl lg:px-0 lg:pb-6">
        {children}
      </motion.nav>
    </SidebarContext.Provider>
  );
}

function useSidebar() {
  const context = use(SidebarContext);
  if (context === undefined)
    throw new Error("useSidebar was used outside SidebarProvider.");
  return context;
}

export { SidebarProvider, useSidebar };
