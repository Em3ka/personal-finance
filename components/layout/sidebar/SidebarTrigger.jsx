"use client";

import { motion } from "motion/react";
import { useSidebar } from "./SidebarContext";

export default function Trigger() {
  const { sidebarConfig, handleToggle, sidebarState } = useSidebar();
  const { Icon, label } = sidebarConfig.toggle;

  if (!Icon) return null;

  return (
    <motion.button
      aria-label={sidebarState.isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      aria-expanded={!sidebarState.isCollapsed}
      whileTap={{ scale: 0.9 }}
      initial={false}
      animate={{ rotate: sidebarState.isCollapsed ? 180 : 0 }}
      transition={sidebarConfig.transitions.button}
      onClick={handleToggle}
      className="text-grey-300 hidden cursor-pointer gap-4 px-8 py-4 font-bold hover:text-white lg:flex">
      <div className="flex size-6 items-center justify-center">
        <Icon aria-hidden="true" />
      </div>

      {!sidebarState.isCollapsed && (
        <motion.span
          initial={sidebarState.hasInteracted ? { opacity: 0, x: -10 } : false}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={sidebarConfig.transitions.text}>
          {label}
        </motion.span>
      )}
    </motion.button>
  );
}
