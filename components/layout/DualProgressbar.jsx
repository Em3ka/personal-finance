"use client";

import { cn } from "@/utils/helpers";
import { motion, AnimatePresence } from "motion/react";

export default function DualProgressBar({
  current,
  change = 0,
  maximum,
  type = "add",
  confirmed = false,
}) {
  const basePercent = Math.min((current / maximum) * 100, 100);
  const isWithdraw = type === "withdraw";

  // Clamp the delta so we can’t withdraw more than we have,
  // or add beyond the target’s remaining capacity.
  const rawDeltaPercent = (Math.abs(change) / maximum) * 100;
  const maxDelta = isWithdraw ? basePercent : 100 - basePercent;
  const deltaPercent = Math.min(rawDeltaPercent, maxDelta);

  const deltaColor = isWithdraw ? "#c94736" : "#277c78";
  const transition = { duration: 0.6, ease: "easeInOut" };

  // Where the delta begins
  const deltaStart = isWithdraw ? basePercent - deltaPercent : basePercent;

  // Prevent final percent from going below zero or above 100
  const finalPercent = confirmed
    ? Math.min(
        Math.max(
          isWithdraw ? basePercent - deltaPercent : basePercent + deltaPercent,
          0,
        ),
        100,
      )
    : basePercent;

  return (
    <div className="relative w-full">
      {/* Track */}
      <div className="bg-beige-100 relative h-2 w-full overflow-hidden rounded-sm">
        <motion.div
          className="bg-grey-900 absolute top-0 left-0 h-full"
          animate={{ width: `${finalPercent}%` }}
          transition={transition}
        />

        <AnimatePresence>
          {!confirmed && deltaPercent > 0 && (
            <motion.div
              key={type}
              initial={{ width: 0 }}
              animate={{ width: `${deltaPercent}%` }}
              exit={{ opacity: 0 }}
              transition={transition}
              className={cn(
                "absolute top-0 h-2",
                !isWithdraw && "rounded-r-sm",
              )}
              style={{
                backgroundColor: deltaColor,
                left: `${deltaStart}%`,
              }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* White boundary */}
      {!confirmed && deltaPercent > 0 && (
        <motion.div
          className="absolute top-0 bottom-0 w-[2px] bg-white"
          animate={{
            left: `${isWithdraw ? basePercent - deltaPercent : basePercent}%`,
          }}
          transition={transition}
        />
      )}
    </div>
  );
}
