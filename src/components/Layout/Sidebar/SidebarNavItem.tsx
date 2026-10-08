"use client"

import Link from "next/link";
import { type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarNavItemProps {
  href: string;
  label: string;
  icon: ReactNode;
}

export function SidebarNavItem({ href, label, icon }: SidebarNavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn("group relative flex items-center gap-4 py-2 text-contrast/70 transition-colors duration-300 hover:text-accent-cyan before:content-[''] before:block before:w-1 before:h-4 before:bg-black/20 before:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.5),inset_-2px_-4px_2px_rgba(255,255,255,0.1)]", {
        "text-accent-cyan before:bg-accent-cyan before:shadow-[0_0_8px_var(--glow)] dark:before:shadow-[0_0_10px_rgba(34,211,238,0.8)]": isActive,
      })}>
      <span
        className="transition-all duration-300 dark:group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
        {icon}
      </span>
      <span
        className="transition-all duration-300 dark:group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]">
        {label}
      </span>
    </Link>
  );
}