"use client"

import { type ReactNode } from "react"
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface IconButtonProps {
  icon: ReactNode;
  onClick: () => void;
  isActive: boolean;
}

export function IconButton({ icon, onClick, isActive }: IconButtonProps) {
  return (
    <Button variant="default" size="icon" onClick={onClick} className={cn("rounded-full hover:text-accent-pink border border-transparent hover:border-text-2", {
      "bg-surface-1": isActive,
    })}>
      {icon}
    </Button>
  );
}