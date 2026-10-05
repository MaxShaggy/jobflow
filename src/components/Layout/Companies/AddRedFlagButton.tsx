"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ComponentProps } from "react";

export function AddRedFlagButton(props: ComponentProps<typeof Button>) {
  return (
    <Button
      aria-label="Add red flag company"
      title="Add red flag company"
      className="border-2 border-white/20 bg-white/[0.04] backdrop-blur-sm hover:bg-white/15 hover:text-cyan-400/70 hover:border-white/40 transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-cyan-400/70"
      {...props}
    >
      <Plus/>
    </Button>
  )
}