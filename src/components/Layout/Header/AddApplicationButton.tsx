"use client";

import { FilePlus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AddApplicationButton() {
  return (
    <Button
      className="px-5 py-2.5 h-auto rounded-xl font-medium text-white bg-gradient-to-r from-cyan-500 via-sky-600 to-indigo-400 bg-[length:200%_auto] bg-left hover:bg-right border border-white/20 shadow-[0_0_20px_rgba(34,211,238,0.35)] hover:shadow-[0_0_22px_rgba(34,211,238,0.55)] transition-colors duration-300 ease-out hover:scale-[1.02] will-change-transform active:scale-[0.98] transition-transform duration-300 flex items-center gap-2.5 cursor-pointer"
    >
      <FilePlus className="size-4 text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.8)]" />
      <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
        Add Application
      </span>
    </Button>
  );
}