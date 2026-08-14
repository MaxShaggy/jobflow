"use client";

import { type ReactNode } from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface IconButtonProps {
  icon: ReactNode;
  onClick: () => void;
  isActive?: boolean;
}

export function IconButton({ icon, onClick, isActive }: IconButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className={cn(
        "size-9 rounded-full text-xs font-semibold text-white/70 transition-[color,background-color,border-color,transform] duration-300 border border-white/20 bg-white/[0.04] backdrop-blur-sm hover:bg-white/15 hover:text-white hover:border-white/40 hover:scale-105 will-change-transform active:scale-95 cursor-pointer",
        {
          "bg-white/15 text-white border-white/40 shadow-[0_0_12px_rgba(34,211,238,0.4)]": isActive,
        }
      )}
    >
      <span className={cn({
          "text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]": isActive,
      })}>{icon}</span>
    </Button>
  );
}