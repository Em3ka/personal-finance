"use client";

import { cn } from "@/utils/helpers";
import { Progress } from "../ui/Progress";
import { useEffect, useState } from "react";

export default function Progressbar({
  min,
  theme,
  maximum,
  size = "default",
  trackColor = "#f8f5f1",
}) {
  const [progress, setProgress] = useState(0);

  const sizeClasses = {
    default: "h-2",
    large: "h-6",
  };

  useEffect(() => {
    const percentage = Math.min((min / maximum) * 100, 100);
    const timer = setTimeout(() => setProgress(percentage), 500);
    return () => clearTimeout(timer);
  }, [min, maximum]);

  return (
    <div
      className={cn("w-full rounded-sm", size === "large" ? "p-1" : "")}
      style={{
        "--indicator-color": theme,
        "--track-color": trackColor,
        backgroundColor: trackColor,
      }}>
      <Progress
        value={progress}
        className={`${sizeClasses[size]} overflow-hidden rounded-sm bg-(--track-color) [&>div]:rounded-sm [&>div]:bg-(--indicator-color) [&>div]:transition-all [&>div]:duration-700 [&>div]:ease-in-out`}
      />
    </div>
  );
}
