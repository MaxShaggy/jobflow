"use client";

import { type ReactNode } from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface IconButtonProps {
  icon: ReactNode;
  onClick: () => void;
  isActive?: boolean;
  label: string;
}

export function IconButton({ icon, onClick, isActive, label }: IconButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      aria-label={label}
      aria-pressed={isActive}
      title={label}
      className={cn(
        "size-9 rounded-full text-xs font-semibold text-contrast/70 transition-[color,background-color,border-color,transform] duration-300 border border-edge bg-surface backdrop-blur-sm hover:bg-surface-hover hover:text-contrast hover:border-edge-hover hover:scale-105 will-change-transform active:scale-95 cursor-pointer dark:border-white/20 dark:bg-white/[0.04] dark:hover:bg-white/15 dark:hover:border-white/40",
        {
          "bg-glass/80 text-contrast border-edge-hover shadow-[0_2px_10px_rgba(26,27,46,0.15)] dark:bg-white/15 dark:border-white/40 dark:shadow-[0_0_12px_rgba(34,211,238,0.4)]": isActive,
        }
      )}
    >
      <span className={cn({
        "text-accent-cyan drop-shadow-[0_0_10px_var(--glow)] dark:drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]": isActive,
      })}>{icon}</span>
    </Button>
  );
}