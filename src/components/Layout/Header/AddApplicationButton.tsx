"use client"

import { FilePlus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AddApplicationButton() {
  return (
    <Button className="p-4 hover:text-accent-pink border border-transparent hover:border-text-2">
      <FilePlus className="size-4 transition-colors duration-300"  />
      Add Application
    </Button>
  );
}