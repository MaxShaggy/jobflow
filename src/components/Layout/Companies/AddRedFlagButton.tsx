"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ComponentProps } from "react";

export function AddRedFlagButton(props: ComponentProps<typeof Button>) {
  return (
    <Button
      aria-label="Add red flag company"
      title="Add red flag company"
      variant="glass"
      {...props}
    >
      <Plus/>
    </Button>
  )
}