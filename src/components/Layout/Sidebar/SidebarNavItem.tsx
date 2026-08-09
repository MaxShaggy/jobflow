"use client"

import Link from "next/link";
import { type ReactNode } from "react";

interface SidebarNavItemProps {
  href: string;
  label: string;
  icon: ReactNode;
}

export function SidebarNavItem({ href, label, icon }: SidebarNavItemProps) {
  return (
    <Link href={href} className="flex items-center gap-4 text-text-2 hover:text-accent-pink transition-colors duration-300">
      {icon}
      {label}
    </Link>
  );
}