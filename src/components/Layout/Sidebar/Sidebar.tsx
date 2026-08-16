import Image from "next/image";
import { LayoutDashboard, ChartColumnBig, Building2, ArchiveX, type LucideIcon } from "lucide-react";
import { SidebarNavItem } from './SidebarNavItem';

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { label: "Board", href: "/", icon: LayoutDashboard },
  { label: "Statistics", href: "/statistics", icon: ChartColumnBig },
  { label: "Companies", href: "/companies", icon: Building2 },
  { label: "Archive", href: "/archive", icon: ArchiveX },
];

export function Sidebar() {
  return <aside className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl w-64 flex flex-col gap-5 transition-all duration-300 hover:bg-white/15 hover:border-white/40 hover:shadow-[0_0_40px_rgba(99,102,241,0.25)]">
    <Image
      src="/images/logo.svg"
      alt="JobFlow"
      width={210}
      height={56}
      priority
      className="self-center pt-4"
    />
    <ul className="text-text-2 p-6 flex flex-col gap-6">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <li key={item.href}>
            <SidebarNavItem
              href={item.href}
              label={item.label}
              icon={<Icon className="size-5" />}
            />
          </li>
        );
      })}
    </ul >
  </aside>
}