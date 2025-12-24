"use client";

import { cn } from "@/utils/helpers";
import { motion, AnimatePresence } from "motion/react";

export default function PreviewProgressBar({
  savedAmount,
  pendingDelta = 0,
  targetAmount,
  operation = "add", // "add" | "withdraw"
}) {
  const isWithdraw = operation === "withdraw";

  // Base progress (current saved amount)
  const basePercent = Math.min((savedAmount / targetAmount) * 100, 100);

  // Delta preview (white boundary line)
  const rawDeltaPercent = (pendingDelta / targetAmount) * 100;
  const maxDeltaPercent = isWithdraw ? basePercent : 100 - basePercent;

  const deltaPercent = Math.min(rawDeltaPercent, maxDeltaPercent);

  // Where the delta starts visually
  const deltaStart = isWithdraw ? basePercent - deltaPercent : basePercent;

  const deltaColor = isWithdraw ? "#c94736" : "#277c78";
  const transition = { duration: 0.6, ease: "easeInOut" };

  return (
    <div className="relative w-full">
      {/* Track */}
      <div className="bg-beige-100 relative h-2 w-full overflow-hidden rounded-sm">
        {/* Current saved progress */}
        <motion.div
          transition={transition}
          animate={{ width: `${basePercent}%` }}
          className="bg-grey-900 absolute top-0 left-0 h-full"
        />

        {/* Preview delta */}
        <AnimatePresence>
          {deltaPercent > 0 && (
            <motion.div
              key={operation}
              initial={{ width: 0 }}
              exit={{ opacity: 0 }}
              transition={transition}
              animate={{ width: `${deltaPercent}%` }}
              style={{ left: `${deltaStart}%`, backgroundColor: deltaColor }}
              className={cn("absolute top-0 h-full", !isWithdraw && "rounded-r-sm")}
            />
          )}
        </AnimatePresence>
      </div>

      {/* White boundary */}
      {deltaPercent > 0 && (
        <motion.div
          transition={transition}
          animate={{ left: `${deltaStart}%` }}
          className="absolute top-0 bottom-0 w-0.5 bg-white"
        />
      )}
    </div>
  );
}
